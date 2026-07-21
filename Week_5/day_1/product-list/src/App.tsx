import { useState } from 'react'
import ProductCard from './components/productCard'
import { Container, Stack, Typography, Badge, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { Button as ShadcnButton } from '@/components/ui/button'

const products = [
  { id: 1, name: 'Sample Product 1', price: 10000, image: 'Sample image 1' },
  { id: 2, name: 'Sample Product 2', price: 10000, image: 'Sample image 2' },
  { id: 3, name: 'Sample Product 3', price: 10000, image: 'Sample image 3' },
]

function App() {
  const [cartCount, setCartCount] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const handleAddToCart = (price: number) => {
    setCartCount(prev => prev + 1)
    setTotalPrice(prev => prev + price)
  }

  const handleRemoveFromCart = (price: number) => {
    setCartCount(prev => Math.max(0, prev - 1))
    setTotalPrice(prev => Math.max(0, prev - price))
  }

  const router = [
      
      {id: 1, title: "Home"},
      {id: 2, title: "Products"},
      {id: 3, title: "Cart"},
  ]

  return (
    <>
      <nav className="bg-gray-800 text-white px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold hover:text-gray-300">
            Dashboard Page
          </Link>
          <div className="flex gap-2">
            {router.map((item) => (
              <Link key={item.id} to={'/' + item.title.toLowerCase()}>
                <ShadcnButton variant="ghost" size="sm" className="text-white hover:text-gray-300 hover:bg-gray-700">
                  {item.title}
                </ShadcnButton>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ flexGrow: 1 }}>
            Product List
          </Typography>
          <Button color="inherit">
            <Badge badgeContent={cartCount} color="primary">
              <Box sx={{ px: 2, py: 1, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                Cart
              </Box>
            </Badge>
          </Button>
        </Box>
        <Typography variant="body1" align="center" sx={{ mb: 2 }}>
          Total: {totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
        </Typography>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row' }}>
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product} 
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
            />
          ))}
        </Stack>
      </Container>
    </>
  )
}

export default App
