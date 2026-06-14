import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginComponent from './pages/login'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginComponent />
  </StrictMode>,
)