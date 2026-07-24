import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
      <h1 className="text-4xl font-bold">Welcome to Product Catalog</h1>
      <p className="text-lg text-muted-foreground max-w-md">
        Browse our collection of products. Log in to see details and manage your favorites.
      </p>
      <Link to="/products">
        <Button>Browse Products</Button>
      </Link>
    </div>
  )
}
