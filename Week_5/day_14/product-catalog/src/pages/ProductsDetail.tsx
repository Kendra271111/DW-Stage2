import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { api } from "../services/api"

type ProductType = {
  id: number
  title: string
  description: string
  price: number
  image: string
}

export default function ProductsDetail() {
  const { productid } = useParams<{ productid: string }>()
  const [product, setProduct] = useState<ProductType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!productid) return

    setLoading(true)
    setError(false)

    api.get<ProductType>(`/products/${productid}`)
      .then(res => setProduct(res.data))
      .catch(err => {
        console.error("Failed to load product:", err)
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [productid])

  if (!productid) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <p className="text-muted-foreground">Invalid product ID.</p>
        <Link to="/products">
          <Button variant="outline" className="mt-4">Back to Products</Button>
        </Link>
      </div>
    )
  }

  if (loading) {
    return <p className="text-center py-12">Loading product...</p>
  }

  if (error || !product) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <p className="text-destructive mb-4">Failed to load product.</p>
        <Link to="/products">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Link to="/products">
        <Button variant="outline" className="mb-6">← Back to Products</Button>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <img src={product.image} alt={product.title} className="w-40 h-40 object-contain mx-auto" />
          <p className="text-sm text-muted-foreground">{product.description}</p>
          <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
        </CardContent>
      </Card>
    </div>
  )
}
