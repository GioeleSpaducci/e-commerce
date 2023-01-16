import { Link } from "react-router-dom"
import Product from "../components/Product";
import { allProducts } from "../productsJson";


export default function HomePage() {
  
  return (
    <main className="flex flex-col items-center gap-4">
      <h1 className="text-3xl text-center font-extrabold">Welcome To The Apparel Shop!</h1>
      <h1 className="text-xl font-semibold">Our Best Sellers:</h1>
      <div className="flex flex-col md:flex-row w-full px-8 md:px-16 items-center md:items-end mb-12">
        <Product product={allProducts[16]} page="home" />
        <Product product={allProducts[22]} page="home" />
      </div>
      <Link to="products" className="fixed bottom-4 underline underline-offset-4 rounded-lg bg-blue-100 px-2 py-1 font-semibold">Shop All Products</Link>
    </main>
  )
}