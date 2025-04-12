import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AppContextProvider } from './components/AppContext.jsx'
import { CartProvider } from './components/Cart/CartContext.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <CartProvider>
          <App></App>
        </CartProvider>
      </AppContextProvider >
    </BrowserRouter>
  </StrictMode>
)
