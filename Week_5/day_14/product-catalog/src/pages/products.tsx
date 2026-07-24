import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { api } from "../services/api"

type ProductType = {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
}

export default function Products() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get<ProductType[]>("/products")
            .then(res => setProducts(res.data))
            .catch(() => setError("Failed to load products"))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <p className="text-center py-12">Loading products...</p>
    }

    if (error) {
        return <p className="text-center py-12 text-destructive">{error}</p>
    }

    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map(product => (
                    <Link key={product.id} to={`/products/${product.id}`}>
                        <Card className="h-full hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <img src={product.image} alt={product.title} className="h-40 object-contain mx-auto" />
                                <CardTitle className="line-clamp-2">{product.title}</CardTitle>
                                <CardDescription>${product.price.toFixed(2)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
