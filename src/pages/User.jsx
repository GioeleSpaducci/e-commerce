import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import OrderElement from "../components/OrderElement";
import { logOutUser } from "../redux/userSlice";

export default function User() {
  const userIconUrl = new URL("../assets/profile.png", import.meta.url).href
  const user = useSelector(state => state.user);
  const order = useSelector(state => state.order)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderElements = order.map(order => <OrderElement order={order} />);

  //redirect to login page if user is not logged in
  useEffect(() => {
    if (!user.isLoggedIn) navigate("/login?redirectTo=/")
  }, [])

  function handleLogOut() {
    dispatch(logOutUser());
    navigate("/")
  }

  return (
    <main className="flex flex-col items-center gap-4">
      <img className="w-2/5 md:w-1/5" src={userIconUrl} alt="user icon"/>
      <h1 className="text-3xl font-extrabold text-center">Welcome Back <span className="underline">{user.userName}</span>!</h1>
      {order.length > 0 ?
        <div className="flex flex-col items-center w-full gap-4">
          <h1 className="mt-4 text-xl">your orders:</h1>
          <table className="w-3/4 md:w-1/2 mb-4 border-2">
            <tr className="bg-blue-100">
              <th align="left" className="p-2">Order N°</th>
              <th align="left">Number of Items</th>
              <th align="left">Total</th>
            </tr>
            {orderElements}
          </table>
        </div> :
        <p>No orders to show...</p>
      }
      <button className="bg-blue-100 p-2 rounded-lg font-semibold" onClick={handleLogOut}>
        Log Out
      </button>
    </main>
  )
}
