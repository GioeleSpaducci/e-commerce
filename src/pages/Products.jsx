import { nanoid } from "@reduxjs/toolkit";
import { useLocation, useNavigate } from "react-router-dom";
import Product from "../components/Product";
import { allProducts } from "../productsJson"

export default function Products() {
  const closeIconUrl = new URL("../assets/cancel.png", import.meta.url).href
  const location = useLocation();
  const params = new URLSearchParams(location.search).entries();
  const category = new URLSearchParams(location.search).get("category")
  const filters = Array.from(params);
  const navigate = useNavigate();
  let filteredProducts = allProducts;

  //filter products
  for (let [filter, value] of filters) {
    filteredProducts = filteredProducts.filter(product => {
      if (Array.isArray(product[filter])) {
        for (let option of product[filter]) {
          if (option === value) return true
        }
      }
      return product[filter] === value
    })
  }

  function handleAddFilter(filter, value) {
    if (filters.length > 0) {
      navigate(`${location.pathname}${location.search}&${filter}=${value}`)
    } else navigate(`${location.pathname}?${filter}=${value}`)

  }

  function handleRemoveFilter(filter, value) {
    const newFilters = filters.filter(item => item[0] !== filter || item[1] !== value);
    let queryString = "?";
    for (let filter of newFilters) {
      queryString = `${queryString}&${filter[0]}=${filter[1]}`
    }
    navigate(`${location.pathname}${queryString}`)
  }


  
  const productElements = filteredProducts.map(product => <Product key={nanoid()} product={product} />)

  //buttons added to the ui based on active filters that remove the corrisponding filter when clicked
  const filterRemoversElements = filters.map(filter => {
    return (
      <button key={nanoid()} onClick={() => handleRemoveFilter(filter[0], filter[1])} className="flex items-center justify-center py-1 px-2 bg-blue-100 rounded-lg font-semibold">
        <span>{filter[1]}</span>
        <img className="w-4 ml-1" src={closeIconUrl} />
      </button>
    )
  })

  return (
    <main className="flex flex-col items-center">
      {category ?
        <h1 className="text-3xl p-5">
          {`${category.charAt(0).toUpperCase()}${category.slice(1)}`}
        </h1> :
        <h1 className="text-3xl p-5">
          All Products
        </h1>
      }
      <div className="w-full flex relative justify-center mb-6">
        <div className="dropdown absolute left-4">
          <button className="dropbtn ml-4 underline font-semibold">Filters</button>
          <div className="dropdown-menu w-32 absolute hidden flex flex-col border rounded-lg bg-white">
            <ul>
              <li>
                <a className="pl-2 font-semibold">Brand:</a>
                <ul>
                  <li className="hover:bg-gray-100 pl-2"><a onClick={() => handleAddFilter("brand", "silky-brand")} className="hover:cursor-pointer">Silky Brand</a></li>
                  <li className="hover:bg-gray-100 pl-2"><a onClick={() => handleAddFilter("brand", "street-brand")} className="hover:cursor-pointer">Street Brand</a></li>
                  <li className="hover:bg-gray-100 pl-2"><a onClick={() => handleAddFilter("brand", "fancy-brand")} className="hover:cursor-pointer">Fancy Brand</a></li>
                </ul>
              </li>
              <hr />
              <li>
                <a className="pl-2 font-semibold">Colors:</a>
                <ul>
                  <li className="hover:bg-gray-100 pl-6"><a onClick={() => handleAddFilter("color", "white")} className="hover:cursor-pointer">White</a></li>
                  <li className="hover:bg-gray-100 pl-6"><a onClick={() => handleAddFilter("color", "black")} className="hover:cursor-pointer">Black</a></li>
                  <li className="hover:bg-gray-100 pl-6"><a onClick={() => handleAddFilter("color", "red")} className="hover:cursor-pointer">Red</a></li>
                  <li className="hover:bg-gray-100 pl-6"><a onClick={() => handleAddFilter("color", "blue")} className="hover:cursor-pointer">Blue</a></li>
                  <li className="hover:bg-gray-100 pl-6"><a onClick={() => handleAddFilter("color", "green")} className="hover:cursor-pointer">Green</a></li>
                  <li className="hover:bg-gray-100 pl-6"><a onClick={() => handleAddFilter("color", "yellow")} className="hover:cursor-pointer">Yellow</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center gap-2">
          {filterRemoversElements}
        </div>
      </div>
      <div className="flex flex-wrap w-full">
        {productElements}
      </div>
    </main>
  )
}