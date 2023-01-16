import { createSlice } from "@reduxjs/toolkit";

//DISCLAIMER: Redux Toolkit's createReducer and createSlice automatically use Immer internally to let you write simpler immutable update logic using "mutating" syntax.
//https://redux-toolkit.js.org/usage/immer-reducers

const initialState = {
  isRegistered: false,
  isLoggedIn: false,
  userName: "",
  password: "",
}

const userSlice = createSlice({
  name:"user",
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
})

export const {registerUser, loginUser, logOutUser} = userSlice.actions;
export default userSlice.reducer;