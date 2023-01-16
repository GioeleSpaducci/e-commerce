import { configureStore, createSlice } from "@reduxjs/toolkit";
import orderReducer from "../../src/redux//orderSlice";
import userReducer from "../../src/redux//userSlice";

const initialState = {
  "isEmpty": false,
  "items": [
    {
      "productCode": 2,
      "icons": {
        "white": "../assets/silky-brand-albuquerque-shirt-white.png",
        "red": "../assets/silky-brand-albuquerque-shirt-red.png",
        "yellow": "../assets/silky-brand-albuquerque-shirt-yellow.png",
        "blue": "../assets/silky-brand-albuquerque-shirt-blue.png"
      },
      "brand": "silky-brand",
      "brandName": "Silky Brand",
      "name": "Albuquerque Shirt",
      "itemName": "albuquerque-shirt",
      "price": 19.99,
      "category": "shirts",
      "colors": [
        "white",
        "yellow",
        "blue",
        "red"
      ],
      "color": "red",
      "sizes": [
        "s",
        "m",
        "l",
        "xl"
      ],
      "quantity": 1,
      "size": "s",
      "cartId": "2sred"
    },
    {
      "productCode": 2,
      "icons": {
        "white": "../assets/silky-brand-albuquerque-shirt-white.png",
        "red": "../assets/silky-brand-albuquerque-shirt-red.png",
        "yellow": "../assets/silky-brand-albuquerque-shirt-yellow.png",
        "blue": "../assets/silky-brand-albuquerque-shirt-blue.png"
      },
      "brand": "silky-brand",
      "brandName": "Silky Brand",
      "name": "Albuquerque Shirt",
      "itemName": "albuquerque-shirt",
      "price": 19.99,
      "category": "shirts",
      "colors": [
        "white",
        "yellow",
        "blue",
        "red"
      ],
      "color": "red",
      "sizes": [
        "s",
        "m",
        "l",
        "xl"
      ],
      "quantity": 1,
      "size": "s",
      "cartId": "2sred"
    },
    {
      "productCode": 2,
      "icons": {
        "white": "../assets/silky-brand-albuquerque-shirt-white.png",
        "red": "../assets/silky-brand-albuquerque-shirt-red.png",
        "yellow": "../assets/silky-brand-albuquerque-shirt-yellow.png",
        "blue": "../assets/silky-brand-albuquerque-shirt-blue.png"
      },
      "brand": "silky-brand",
      "brandName": "Silky Brand",
      "name": "Albuquerque Shirt",
      "itemName": "albuquerque-shirt",
      "price": 19.99,
      "category": "shirts",
      "colors": [
        "white",
        "yellow",
        "blue",
        "red"
      ],
      "color": "red",
      "sizes": [
        "s",
        "m",
        "l",
        "xl"
      ],
      "quantity": 1,
      "size": "s",
      "cartId": "2sred"
    }
  ]
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addElementToCart: (state, action) => {
      state.items.push(action.payload);
      state.isEmpty = false
    },
    removeElementFromCart: (state, action) => {
      const itemToRemoveIndex = state.items.findLastIndex(item => item.cartId === action.payload);
      state.items = state.items.filter((item, i) => i !== itemToRemoveIndex);
      if (state.items.length === 0) state.isEmpty = true
    },
    clearCart: (state, action) => {
      state.isEmpty = true;
      state.items = []
    },
  }
});

const cartReducer = cartSlice.reducer;

// export const cartIsFull = () => {return configureStore({
//   reducer: {
//     cart: cartReducer,
//     user: userReducer,
//     order: orderReducer,
//   }
// })}

export const cartIsFull = () => configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
  }
})
