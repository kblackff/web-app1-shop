import fs from 'node:fs/promises'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { errorHandler } from './src/serverMiddleware/errorHandler.js'
import routes from './src/serverMiddleware/routes/router.js'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/web-app1-shop/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/index.html', 'utf-8')
  : ''

// Create http server
const app = express()

app.use(express.json())
dotenv.configDotenv()

/** @type {import('vite').ViteDevServer | undefined} */
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist', { extensions: [] }))
}

app.use('/user', routes)

app.use('/api', routes)

// Serve HTML
app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    /** @type {string} */
    let template
    /** @type {import('./src/entry-server.js').render} */
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render
    }

    const rendered = await render(url)

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

mongoose.connect(process.env.CONNECTION_STRING.toString())
.then(() => console.log('Connected to db!'))
.catch((err) => console.error('Connection failed--', err))

app.use(errorHandler)

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
