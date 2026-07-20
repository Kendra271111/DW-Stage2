import { useState } from 'react'
import Button from '@mui/material/Button'

type AddedButtonProps = {
  price: number
  onAdd: (price: number) => void
  onRemove: (price: number) => void
}

export default function AddedButton({ price, onAdd, onRemove }: AddedButtonProps) {
  const [isAdded, setIsAdded] = useState(false)

  const handleClick = () => {
    setIsAdded(prev => !prev)
    if (!isAdded) {
      onAdd(price)
    } else {
      onRemove(price)
    }
  }

  return (
    <Button
      variant="contained"
      color={isAdded ? 'success' : 'primary'}
      onClick={handleClick}
    >
      {isAdded ? 'Added ✓' : 'Add'}
    </Button>
  )
}
