import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Products from './pages/Products.tsx'
import Cart from './pages/Cart.tsx'
import ProductDetail from './pages/ProductDetail.tsx'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/home', element: <App /> },
  { path: '/products', element: <Products /> },
  { path: '/cart', element: <Cart /> },
  { path: '/product/:id', element: <ProductDetail /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
