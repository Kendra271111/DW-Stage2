import { useParams, Link } from 'react-router-dom'
import { Container, Typography, Button, Stack } from '@mui/material'

const products = [
  { id: 1, name: 'Sample Product 1', price: 10000, image: 'Sample image 1' },
  { id: 2, name: 'Sample Product 2', price: 10000, image: 'Sample image 2' },
  { id: 3, name: 'Sample Product 3', price: 10000, image: 'Sample image 3' },
]

function ProductDetail() {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))

  if (!product) {
    return (
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Typography variant="h4" align="center">Product not found</Typography>
        <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>Go Home</Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Button component={Link} to="/" variant="outlined" sx={{ mb: 3 }}>
        ← Back to Products
      </Button>
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <Typography variant="h4" component="h1" sx={{ color: 'white', mb: 2 }}>
          {product.name}
        </Typography>
        <Typography variant="body1" sx={{ color: 'gray.400', mb: 1 }}>
          {product.image}
        </Typography>
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', mb: 4 }}>
          {product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
        </Typography>
        <Stack spacing={2}>
          <Button variant="contained" fullWidth>Buy Now</Button>
          <Button component={Link} to="/cart" variant="outlined" fullWidth>Add to Cart</Button>
        </Stack>
      </div>
    </Container>
  )
}

export default ProductDetail
