import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addElementToCart } from "../redux/cartSlice";
import { allProducts } from "../productsJson";

export default function ProductPage() {
  const { productCode } = useParams();
  const product = allProducts.filter(product => `${product.productCode}` === productCode)[0]
  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.sizes[0]);
  const [addedElement, setAddedElement] = useState(false);
  const [productIcon, setProductIcon] = useState(new URL(`../assets/${product.brand}-${product.itemName}-${product.color}.png`, import.meta.url).href)
  const backArrowUrl = new URL("../assets/arrow.png", import.meta.url).href;

  //options for select input
  const colorOptions = product.colors.map(color => <option value={color} key={nanoid()}>{color}</option>);
  const sizeOptions = product.sizes.map(size => <option value={size} key={nanoid()}>{size}</option>);


  const dispatch = useDispatch();


  function handleSelectColor(e) {
    setAddedElement(false);
    setColor(e.target.value);
    setProductIcon(new URL(`../assets/${product.brand}-${product.itemName}-${e.target.value}.png`, import.meta.url).href)
  }

  function handleSelectSize(e) {
    setAddedElement(false);
    setSize(e.target.value)
  }

  function handleAddElement() {
    if (size !== "" && color !== "") {
      dispatch(addElementToCart({ ...product, quantity: 1, size: size, color: color, cartId: `${product.productCode}${size}${color}` }));
      setAddedElement(true)
    }
  }


  return (
    <main className="flex flex-col items-center">
      <Link to="/products" className="flex items-center gap-1">
        <img src={backArrowUrl} alt="back" className="w-6" />
        <h2 className="underline">Back To Products</h2>
      </Link>
      {addedElement && <h1 className="mt-6 text-2xl font-semibold">Element Added To The Cart!</h1>}
      <div className="flex flex-col items-center gap-4 md:flex-row mt-8 px-4">
        <img className="w-3/4" alt="product icon" src={productIcon} />
        <div className="w-full flex flex-col gap-2">
          <h2>{product.brand}</h2>
          <h1 className="font-semibold text-xl">{product.name}</h1>
          <h1 className="font-semibold">{product.price}</h1>
          <select value={color} onChange={handleSelectColor} className="border-2 rounded-lg p-2">
            {colorOptions}
          </select>
          <select value={size} onChange={handleSelectSize} className="border-2 rounded-lg p-2">
            {sizeOptions}
          </select>
          <button onClick={handleAddElement} className="self-center mt-8 w-40 border py-1 px-2 rounded-lg bg-blue-100 font-semibold">add to cart</button>
        </div>
      </div>
    </main>
  )
}