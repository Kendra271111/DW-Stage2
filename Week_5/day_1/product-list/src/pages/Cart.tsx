import { Container, Typography, Button, Stack } from '@mui/material'
import { Link } from 'react-router-dom'

function Cart() {
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Cart Page
      </Typography>
      <Stack spacing={2} sx={{ mt: 4 }}>
        <Button component={Link} to="/" variant="contained" fullWidth>
          Go to Home
        </Button>
        <Button component={Link} to="/products" variant="outlined" fullWidth>
          Go to Products
        </Button>
      </Stack>
    </Container>
  )
}

export default Cart
