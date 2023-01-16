import { createSlice } from "@reduxjs/toolkit";

//DISCLAIMER: Redux Toolkit's createReducer and createSlice automatically use Immer internally to let you write simpler immutable update logic using "mutating" syntax.
//https://redux-toolkit.js.org/usage/immer-reducers

const initialState = {
  isEmpty: true,
  items: []
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
})

export const { addElementToCart, removeElementFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer