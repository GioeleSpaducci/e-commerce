import { fireEvent, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { pathRender } from '../tests/utils';
import { store } from './redux/store';
import App from './App';
import userEvent from '@testing-library/user-event';
import { userIsLoggedIn } from '../tests/mocks/userIsLoggedIn';
import { cartIsFull } from '../tests/mocks/cartIsFull';

describe('Links in Home', () => {
  const user = userEvent.setup();
  it('renders homepage correctly', () => {
    pathRender(<App />, "/", store);
    const headline = screen.getByRole('heading', { name: /welcome to the apparel shop!/i });
    const productName1 = screen.getByRole('heading', { name: /philadelphia shoes/i });
    const productName2 = screen.getByRole('heading', { name: /detroit pants/i });
    const allProductsButton = screen.getByRole('link', { name: /shop all products/i });

    expect(headline).toBeInTheDocument();
    expect(productName1).toBeInTheDocument();
    expect(productName2).toBeInTheDocument();
    expect(allProductsButton).toBeInTheDocument();
  });
  it("renders products page correctly after clicking products link", async () => {
    pathRender(<App />, "/", store);
    const link = screen.getByRole('link', { name: /products arrow icon/i }); within(link).getByText(/products/i);
    await userEvent.click(link);
    const heading = screen.getByRole('heading', { name: /all products/i });
    const filtersButton = screen.getByRole('button', { name: /filters/i });

    expect(heading).toBeInTheDocument();
    expect(filtersButton).toBeInTheDocument()
  });
  it("renders empty cart page correctly after clicking cart link", async () => {
    pathRender(<App />, "/", store);
    const link = screen.getByRole('img', { name: /cart icon/i });
    await user.click(link);
    const emptyCartHeading = screen.getByRole('heading', { name: /your cart is empty!/i });
    const emptyCartIcon = screen.getByRole('img', { name: /empty cart/i });

    expect(emptyCartHeading).toBeInTheDocument();
    expect(emptyCartIcon).toBeInTheDocument();
  });
  it("renders full cart page correctly after clicking cart link", async () => {
    const store = cartIsFull();
    pathRender(<App />, "/", store);
    const link = screen.getByRole('img', { name: /cart icon/i });
    await user.click(link);
    const addQuantityButton = screen.getByRole('img', { name: /add/i });
    const checkoutButton = screen.getByRole('button', { name: /checkout/i });

    expect(addQuantityButton).toBeInTheDocument();
    expect(checkoutButton).toBeInTheDocument();
  });
  it("when user is not logged in app renders login page after clicking user link", async () => {
    pathRender(<App />, "/", store);
    const link = screen.getByRole('img', { name: /user icon/i });
    await user.click(link);
    const loginButton = screen.getByRole('button', { name: /login/i });
    const registerButton = screen.getByRole('button', { name: /login/i });

    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });
  it("when user is logged in app renders user page after clicking user link", async () => {
    const store = userIsLoggedIn();
    pathRender(<App />, "/", store);
    const link = screen.getByRole('img', { name: /user icon/i });
    await user.click(link);
    const logoutButton = screen.getByRole('button', { name: /log out/i });
    const userIcon = screen.getByRole('main'); within(userIcon).getByRole('img');

    expect(logoutButton).toBeInTheDocument();
    expect(userIcon).toBeInTheDocument();
  });
  it("removes category filter correctly", async () => {
    const storecopy = { ...store };
    pathRender(<App />, "/", storecopy);
    const categoryLink = screen.getByRole('link', { name: /pants/i });
    await user.click(categoryLink);
    const filterRemoveButton = screen.getByRole('button', {
      name: /pants/i
    });
    await user.click(filterRemoveButton);
    expect(screen.getByRole('heading', { name: /all products/i })).toBeInTheDocument()
  })
});

describe('Cart', () => {
  const user = userEvent.setup();
  it('cart item add button increases product quantity', async () => {
    const store = cartIsFull()
    pathRender(<App />, "/cart", store);

    const addbutton = screen.getByRole('button', { name: /add/i });
    const quantity = screen.getByText(/3/i);
    await user.click(addbutton);

    expect(screen.getByText(/4/i)).toBeInTheDocument();
  });
  it("renders go to login when trying to checkout without being logged in", async () => {
    const store = cartIsFull()
    pathRender(<App />, "/cart", store);

    const checkoutButton = screen.getByRole('button', { name: /checkout/i });
    await userEvent.click(checkoutButton);
    const loginButton = screen.getByRole('button', { name: /go to login/i });

    expect(loginButton).toBeInTheDocument();
  });
});
describe("checkout", () => {
  const user = userEvent.setup();
  it("shows error if not all fields are completed", async () => {
    const store = userIsLoggedIn()
    pathRender(<App />, "/checkout", store);

    const firstNameInput = screen.getByPlaceholderText("First Name");
    const lastNameInput = screen.getByPlaceholderText("Last Name");
    const cityInput = screen.getByPlaceholderText("City");
    const stateInput = screen.getByPlaceholderText("State");
    const addressInput = screen.getByPlaceholderText("Address");
    const zipCodeInput = screen.getByPlaceholderText("Zip Code");
    const creditCardRadio = screen.getByRole('img', { name: /credit card/i });

    fireEvent.change(firstNameInput, { target: { value: 'a' } });
    fireEvent.change(lastNameInput, { target: { value: 'a' } });
    fireEvent.change(firstNameInput, { target: { value: 'a' } });
    fireEvent.change(cityInput, { target: { value: 'a' } });
    fireEvent.change(stateInput, { target: { value: 'a' } });
    fireEvent.change(addressInput, { target: { value: 'a' } });
    fireEvent.change(zipCodeInput, { target: { value: 'a' } });

    await user.click(screen.getByRole('button', { name: /place order/i }));

    expect(screen.getByRole('heading', { name: /please complete all fields\./i })).toBeInTheDocument();

  });
  it("shows error if not all fields are completed", async () => {
    const store = userIsLoggedIn()
    pathRender(<App />, "/checkout", store);

    const firstNameInput = screen.getByPlaceholderText("First Name");
    const lastNameInput = screen.getByPlaceholderText("Last Name");
    const cityInput = screen.getByPlaceholderText("City");
    const stateInput = screen.getByPlaceholderText("State");
    const addressInput = screen.getByPlaceholderText("Address");
    const zipCodeInput = screen.getByPlaceholderText("Zip Code");
    const creditCardRadio = screen.getByRole('img', { name: /credit card/i });

    fireEvent.change(firstNameInput, { target: { value: 'a' } });
    fireEvent.change(lastNameInput, { target: { value: 'a' } });
    fireEvent.change(firstNameInput, { target: { value: 'a' } });
    fireEvent.change(cityInput, { target: { value: 'a' } });
    fireEvent.change(stateInput, { target: { value: 'a' } });
    fireEvent.change(addressInput, { target: { value: 'a' } });
    fireEvent.change(zipCodeInput, { target: { value: 'a' } });
    await user.click(creditCardRadio);
    await user.click(screen.getByRole('button', { name: /place order/i }));

    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
  })
})