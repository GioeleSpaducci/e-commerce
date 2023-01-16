import cartReducer from "../../src/redux/cartSlice";
import orderReducer from "../../src/redux//orderSlice";
import userReducer from "../../src/redux//userSlice";
import { configureStore } from "@reduxjs/toolkit";

export function initialState() {
  configureStore({
    reducer: {
      cart: cartReducer,
      user: userReducer,
      order: orderReducer,
    }
  })
}