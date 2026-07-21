import { useState } from 'react'

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
    <button
      onClick={handleClick}
      className={`w-full py-2 px-4 rounded font-medium transition-colors ${
        isAdded
          ? 'bg-green-600 text-white hover:bg-green-700'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {isAdded ? 'Added ✓' : 'Add'}
    </button>
  )
}
