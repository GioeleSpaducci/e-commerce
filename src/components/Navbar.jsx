import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom"

export default function Navbar() {
  const location = useLocation();
  const user = useSelector(state => state.user);
  const shopIconUrl = new URL("../assets/clothes-shop.png", import.meta.url).href;
  const arrowIconUrl = new URL("../assets/arrow-down.png", import.meta.url).href;
  const userIconUrl = new URL("../assets/user.png", import.meta.url).href;
  const cartIconUrl = new URL("../assets/cart.png", import.meta.url).href;

  return (
    <nav className="flex justify-center items-end p-5">
      <div className="w-1/3 dropdown relative">
        <Link to="products">
          <div className="flex items-center gap-1">
            <p className="underline underline-offset-4 font-semibold">Products</p>
            <img src={arrowIconUrl} alt="arrow icon" className="w-3 mt-1" />
          </div>
        </Link>
        <ul className="dropdown-menu w-3/4 absolute hidden flex flex-col z-10 bg-white border rounded-lg">
          <li className="hover:bg-gray-100 pl-4"><Link to="products?category=shirts">Shirts</Link></li>
          <li className="hover:bg-gray-100 pl-4"><Link to="products?category=pants">Pants</Link></li>
          <li className="hover:bg-gray-100 pl-4"><Link to="products?category=dresses">Dresses</Link></li>
          <li className="hover:bg-gray-100 pl-4"><Link to="products?category=shoes">Shoes</Link></li>
        </ul>
      </div>
      <Link to="/" className="w-1/6 md:w-20 mx-auto"><img src={shopIconUrl} alt="shop image" /></Link>
      <div className="flex justify-end w-1/3 gap-4">
        <Link to="cart" className="w-8">
          <img src={cartIconUrl} alt="cart icon" />
        </Link>
        <Link to={user.isLoggedIn ? "user" : `login?redirectTo=${location.pathname}`} className="w-8">
          <img src={userIconUrl} alt="user icon" />
        </Link>
      </div>
    </nav>
  )
}