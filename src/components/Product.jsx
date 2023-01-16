import { Link } from "react-router-dom";

export default function Product({ product, page }) {
  const url = new URL(`../assets/${product.brand}-${product.itemName}-${product.color}.png`, import.meta.url).href;

  //product element for products page
  return (
    <div className={`flex flex-col items-center w-1/2 p-4 ${page !== "home" && "md:w-1/4"}`}>
      <Link to={page === "home" ? `/products/${product.productCode}` : `${product.productCode}`}>
        <img src={url} alt="product icon" />
      </Link>
      <h2 className="font-light">
        {product.brandName}
      </h2>
      <h1 className="text-xl text-center">
        {product.name}
      </h1>
      <h1 className="text-xl">
        {product.price}
      </h1>
    </div>
  )
}