import { useDispatch, useSelector } from "react-redux";
import { addElementToCart, removeElementFromCart } from "../redux/cartSlice";
export default function CartElement({ product }) {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const productIconUrl = new URL(`../assets/${product.brand}-${product.itemName}-${product.color}.png`, import.meta.url).href;
  const addIconUrl = new URL("../assets/add.png", import.meta.url).href;
  const removeIconUrl = new URL("../assets/cancel.png", import.meta.url).href;
  const selectedItem = cart.items.filter(item => item.cartId === product.cartId);
  const numberOfItems = selectedItem.length

  //product element for cart page
  return (
    <div className="flex flex-col items-center w-3/5 md:w-1/4 p-4">
      <img src={productIconUrl} alt="product icon"/>
      <div className="flex w-full flex-col items-center">
        <p>{product.brand}</p>
        <p>{product.name}</p>
        <div className="flex gap-4">
          <p>{product.price}</p>
          <p>{product.size}</p>
          <p>{product.color}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={() => dispatch(addElementToCart({ ...product, quantity: product.quantity + 1 }))}>
          <img className="w-6" src={addIconUrl} alt="add" />
        </button>
        <div aria-label="number of items" className="border rounded p-1">
          {numberOfItems}
        </div>
        <button onClick={() => dispatch(removeElementFromCart(product.cartId))}>
          <img className="w-6" src={removeIconUrl} alt="remove" />
        </button>
      </div>
    </div>
  )
}