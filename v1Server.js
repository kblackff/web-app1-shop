import { createServer } from 'vite'


const server = await createServer({
    configFile: false,
    root: import.meta.dirname,
    server: {
        port: process.env.PORT || 5173,
    },
})


await server.listen()

server.printUrls()
server.bindCLIShortcuts({ print: true })


