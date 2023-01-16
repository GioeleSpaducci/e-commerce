import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import { placeOrder } from "../redux/orderSlice";

export default function Checkout() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showError, setShowError] = useState(false);
  const order = useSelector(state => state.order);
  const cart = useSelector(state => state.cart);
  const creditCardUrl = new URL("../assets/credit-card.png", import.meta.url).href
  const paymentServiceUrl = new URL("../assets/payment-service.png", import.meta.url).href
  const dispacth = useDispatch();
  const navigate = useNavigate();

  const prices = cart.items.map(element => element.price);
  let totalPrice = 0;
  if (!cart.isEmpty) {
    totalPrice = Math.round(prices.reduce((a, b) => a + b) * 100) / 100;
  }


  function handleSubmit(e) {
    e.preventDefault();
    if (firstName !== "" && lastName !== "" && city !== "" && state !== "" && address !== "" && zipCode !== "" && paymentMethod !== "") {
      const orderData = {
        id: order.length + 1,
        totalPrice: totalPrice,
        status: "placed",
        billing: { firstName, lastName, city, state, address, zipCode, paymentMethod },
        items: cart.items,
      };

      dispacth(placeOrder(orderData));
      dispacth(clearCart());
      navigate("/user");
      alert("order placed!")
    } else setShowError(true);
  }

  function handleFirstName(e) {
    setFirstName(e.target.value);
    setShowError(false)
  }

  function handleLastName(e) {
    setLastName(e.target.value);
    setShowError(false)
  }

  function handleCity(e) {
    setCity(e.target.value);
    setShowError(false)
  }

  function handleState(e) {
    setState(e.target.value);
    setShowError(false)
  }

  function handleAddress(e) {
    setAddress(e.target.value);
    setShowError(false)
  }

  function handleZipCode(e) {
    setZipCode(e.target.value);
    setShowError(false)
  }


  return (
    <main className="flex flex-col items-center gap-4">
      <h1 className="font-extrabold">Total: {totalPrice}</h1>
      <h1 className="text-2xl font-semibold">Checkout</h1>
      {showError &&
        <h1>Please complete all fields.</h1>
      }
      <form onSubmit={handleSubmit} className="grid grid-cols-4 border border-black gap-2 mx-8 p-4 rounded-xl">
        <div className="col-span-2">
          <input type="text" placeholder="First Name" onChange={handleFirstName} value={firstName} className={`w-full border-2 rounded-lg p1 ${showError && "border-red-500"}`} />
        </div>
        <div className="col-span-2">
          <input type="text" placeholder="Last Name" onChange={handleLastName} value={lastName} className={`w-full border-2 rounded-lg p1 ${showError && "border-red-500"}`} />
        </div>
        <div className="col-span-2">
          <input type="text" placeholder="City" onChange={handleCity} value={city} className={`w-full border-2 rounded-lg p1 ${showError && "border-red-500"}`} />
        </div>
        <div className="col-span-2">
          <input type="text" placeholder="State" onChange={handleState} value={state} className={`w-full border-2 rounded-lg p1 ${showError && "border-red-500"}`} />
        </div>
        <div className="col-span-3">
          <input type="text" placeholder="Address" onChange={handleAddress} value={address} className={`w-full border-2 rounded-lg p1 ${showError && "border-red-500"}`} />
        </div>
        <div>
          <input type="text" placeholder="Zip Code" onChange={handleZipCode} value={zipCode} className={`w-full border-2 rounded-lg p1 ${showError && "border-red-500"}`} />
        </div>
        <h1 className="col-span-4 mt-2 font-semibold">Payment Method:</h1>
        <div className="col-span-4 flex justify-center gap-4">
          <div onClick={() => setPaymentMethod("creditcard")} className={`flex flex-col items-center w-1/4 md:w-10% p-2 border-2 rounded-lg ${showError && "border-red-500"}`}>
            <img src={creditCardUrl} alt="credit card" className="mb-2" />
            <input type="radio" value="creditcard" checked={paymentMethod === "creditcard"} />
          </div>
          <div onClick={() => setPaymentMethod("paymentService")} className={`flex flex-col items-center w-1/4 md:w-10% p-2 border-2 rounded-lg ${showError && "border-red-500"}`}>
            <img src={paymentServiceUrl} alt="payment service" className="mb-2" />
            <input type="radio" value="paymentService" checked={paymentMethod === "paymentService"} />
          </div>
        </div>
        <div className="col-span-4 flex justify-center mt-4">
          <button type="submit" className="px-4 py-2 bg-blue-200 rounded-lg font-semibold">
            place order
          </button>
        </div>
      </form>
    </main>
  )
}