import AddedButton from './AddedButton'
import { Link } from 'react-router-dom'

type ProductCardProps = {
  id: number
  name: string
  price: number
  image: string
  onAddToCart: (price: number) => void
  onRemoveFromCart: (price: number) => void
}

export default function BasicCard({ id, name, price, image, onAddToCart, onRemoveFromCart }: ProductCardProps) {
  return (
    <div className="min-w-[100px] max-h-[300px] bg-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col justify-between">
      <div>
        <p className="text-gray-400 text-sm mb-2">{name}</p>
        <p className="text-gray-500 text-xs">{image}</p>
        <h3 className="text-white text-xl font-semibold mb-1">{price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</h3>
        <Link to={`/product/${id}`} className="text-blue-400 hover:text-blue-300 text-sm">
          View Product
        </Link>
      </div>
      <AddedButton price={price} onAdd={onAddToCart} onRemove={onRemoveFromCart} />
    </div>
  )
}
