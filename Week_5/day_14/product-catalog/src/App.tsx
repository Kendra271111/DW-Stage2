import { Link, BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import {Button as ShadcnButton} from './components/ui/button'
import { AuthProvider } from './hooks/AuthProvider'
import { useAuth } from './hooks/useAuth'
import Login from './pages/login'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/products'
import ProductsDetail from './pages/ProductsDetail'
import PrivateRoute from './lib/PrivateRoute'

function Header() {
  const {token, logout} = useAuth();

  return(
    <div className="w-full flex gap-4 p-4 justify-center border-b mb-8">

      {token && (
        <Link to="/">
          <ShadcnButton variant="outline">Home</ShadcnButton>
        </Link>
      )}

      {token && (
        <Link to="/about">
          <ShadcnButton variant="outline">About</ShadcnButton>
        </Link>
      )}
      
      {token && (
        <Link to="/products">
          <ShadcnButton variant="outline">Products</ShadcnButton>
        </Link>
      )}

        {token ? (
        <ShadcnButton onClick={logout} variant="destructive">Logout</ShadcnButton>
      ) : (
        <ShadcnButton variant="outline">
          <Link to="/login">Login</Link>
        </ShadcnButton>
      )}
    </div>
  )
}

function App() {

  return (
    <AuthProvider>
    <BrowserRouter>  
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/products" element={
          <PrivateRoute>
            <Products/>
          </PrivateRoute>
        }/>
        <Route path='/products/:productid' element={<ProductsDetail />}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
