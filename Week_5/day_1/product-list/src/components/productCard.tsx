import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import AddedButton from './AddedButton'

type ProductCardProps = {
  name: string
  price: number
  image: string
  onAddToCart: (price: number) => void
  onRemoveFromCart: (price: number) => void
}

export default function BasicCard({ name, price, image, onAddToCart, onRemoveFromCart }: ProductCardProps) {
  return (
    <Card sx={{ 
      minWidth: 100, 
      maxHeight: 300 
      }}>

      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {name}
        </Typography>
        <Typography variant="h5" component="div">
          {price}
        </Typography>
        <Typography variant="body2">
          {image}
        </Typography>
        <AddedButton price={price} onAdd={onAddToCart} onRemove={onRemoveFromCart} />
      </CardContent>
    </Card>
  )
}
