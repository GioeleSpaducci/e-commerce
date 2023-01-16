import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../src/redux/cartSlice";
import orderReducer from "../../src/redux//orderSlice";

const initialState = {
  isRegistered: true,
  isLoggedIn: true,
  userName: "username",
  password: "password",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.isRegistered = true;
      state.userName = action.payload.userName;
      state.password = action.payload.password
    },
    loginUser: (state, action) => {
      state.isLoggedIn = true
    },
    logOutUser: (state, action) => {
      state.isLoggedIn = false
    },
  }
});

const userReducer = userSlice.reducer;

export const userIsLoggedIn = () => configureStore({
    reducer: {
      cart: cartReducer,
      user: userReducer,
      order: orderReducer,
    }
  })