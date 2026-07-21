import { Container, Typography, Button, Stack } from '@mui/material'
import { Link } from 'react-router-dom'

function Products() {
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Products Page
      </Typography>
      <Stack spacing={2} sx={{ mt: 4 }}>
        <Button component={Link} to="/" variant="contained" fullWidth>
          Go to Home
        </Button>
        <Button component={Link} to="/cart" variant="outlined" fullWidth>
          Go to Cart
        </Button>
      </Stack>
    </Container>
  )
}

export default Products
