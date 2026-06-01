import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import LoginComponent from './pages/login'


/**
 * @param {string} _url
 */
export function render(_url) {
  const html = renderToString(
    <StrictMode>
      <LoginComponent />
    </StrictMode>,
  )
  return { html }
}
