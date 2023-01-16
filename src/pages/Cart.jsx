import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom";
import CartElement from "../components/CartElement";
import { clearCart } from "../redux/cartSlice";

export default function Cart() {
  const emptyCartUrl = new URL("../assets/empty-cart.png", import.meta.url).href;

  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const [showLoginBanner, setShowLoginBanner] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //filter same cart items to show just one element
  const uniqueItems = cart.items.filter((item, i, arr) => i === arr.findIndex(item2 => item2.cartId === item.cartId))
  const cartElements = uniqueItems.map(item => <CartElement key={nanoid()} product={item} />)

  const prices = cart.items.map(element => element.price);
  let totalPrice = 0;
  if (!cart.isEmpty) {
    totalPrice = Math.round(prices.reduce((a, b) => a + b) * 100) / 100;
  }

  function handleCheckout() {
    if (user.isLoggedIn) {
      if (!cart.isEmpty) {
        navigate("/checkout")
      }
    } else setShowLoginBanner(true);
  }

  function handleGoToLogin() {
    navigate(`/login?redirectTo=${location.pathname}`);
  }

  return (
    <main className="flex flex-col items-center gap-4 pt-8">
      {cart.isEmpty &&
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl">Your Cart Is Empty!</h1>
          <img className="w-1/2" src={emptyCartUrl} alt="empty cart" />
        </div>
      }
      {showLoginBanner &&
        <div className="flex flex-col items-center">
          <h1>You First Need To Log In.</h1>
          <button className="rounded-lg p-1 bg-blue-100 font-semibold" onClick={handleGoToLogin}>Go To Login</button>
        </div>
      }
      {!cart.isEmpty &&
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-extrabold">Total: {totalPrice}</h1>
          <div className="flex gap-4">
            <button className="rounded-lg p-1 bg-blue-100 font-semibold" onClick={handleCheckout}>Checkout</button>
            <button className="rounded-lg p-1 bg-blue-100 font-semibold" onClick={() => dispatch(clearCart())}>clear cart</button>
          </div>
        </div>
      }
      <div className="flex w-full flex-wrap justify-center px-4">
        {cartElements}
      </div>
    </main>
  )
}
