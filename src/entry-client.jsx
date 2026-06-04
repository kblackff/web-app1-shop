import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import LoginComponent from './pages/login'
import App from './App'
import { 
  BrowserRouter as Router,
  Routes, 
  Route, 
  Navigate
} from 'react-router-dom'

import './index.css'


hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <Router>
      <Routes>
        <Route 
          path='/web-app1-shop/home'
          element={<App />}
        />
        <Route
          exact
          path='/web-app1-shop/login'
          element={<LoginComponent />}
        />
        <Route
          path='/web-app1-shop/register'
          element={<LoginComponent RegComp={true} />}
        />
        <Route
          path='*'
          element={<Navigate to={'/web-app1-shop/login'} />}
        />
        <Route render={() => <h1>404: page not found</h1>} />
      </Routes>
    </Router>
  </StrictMode>,
)
