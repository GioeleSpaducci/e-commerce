import { createSlice } from "@reduxjs/toolkit";

//DISCLAIMER: Redux Toolkit's createReducer and createSlice automatically use Immer internally to let you write simpler immutable update logic using "mutating" syntax.
//https://redux-toolkit.js.org/usage/immer-reducers

const initialState = []

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.push(action.payload)
    }
  }
})

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;