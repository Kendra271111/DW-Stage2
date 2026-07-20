import { useState } from 'react'
import ProductCard from './components/productCard'
import { Container, Stack, Typography, Badge, Box } from '@mui/material'

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

  const products = [
    { id: 1, name: 'Sample Product 1', price: 10000, image: 'Sample image 1' },
    { id: 2, name: 'Sample Product 2', price: 10000, image: 'Sample image 2' },
    { id: 3, name: 'Sample Product 3', price: 10000, image: 'Sample image 3' },
  ]

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ flexGrow: 1 }}>
          Product List
        </Typography>
        <Badge badgeContent={cartCount} color="primary">
          <Box sx={{ px: 2, py: 1, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            Cart
          </Box>
        </Badge>
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
  )
}

export default App
