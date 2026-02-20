import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { Toaster } from 'react-hot-toast'
import { ProductsProvider } from './context/ProductsContext.jsx';
import { OrdersProvider } from './context/OrdersContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ThemeProvider>
        <AuthProvider>
          <ProductsProvider> {/* ✅ Wrap with ProductsProvider */}
            <CartProvider>
              <FavoritesProvider>
                <OrdersProvider>
                  <App />
                  <Toaster /* ... */ />
                </OrdersProvider>
              </FavoritesProvider>
            </CartProvider>
          </ProductsProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);