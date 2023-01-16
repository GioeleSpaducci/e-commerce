import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { store } from "../src/redux/store";
import { cartIsFull } from "./mocks/cartIsFull";
import { initialState } from "./mocks/initialState";
import { userIsLoggedIn } from "./mocks/userIsLoggedIn";

// function allWrappers({ children }) {
//   return (
//     <Provider store={store}>
//       <BrowserRouter>
//         {children}
//       </BrowserRouter>
//     </Provider>
//   )
// }


// function reduxWrapper({ children }) {
//   return (
//     <Provider store={store}>
//       {children}
//     </Provider>
//   )
// }


// export default function customRender(ui, options) {
//   return render(ui, { wrapper: allWrappers, ...options })
// }

// export function pathRender(ui, options) {
//   return render(ui, { wrapper: reduxWrapper, ...options })
// }


//working
// export function pathRender(children, path, store) {
//   return render(
//     <Provider store={store}>
//       <MemoryRouter initialEntries={[path]}>
//         {children}
//       </MemoryRouter>
//     </Provider>
//   )
// }


export function pathRender(children, path, store) {


  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        {children}
      </MemoryRouter>
    </Provider>
  )
}

export function renderWithStore(children, store) {

  return render(
    <Provider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  )
}