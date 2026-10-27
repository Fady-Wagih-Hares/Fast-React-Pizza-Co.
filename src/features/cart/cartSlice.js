import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  // for development purposes => derived state
  //   cart: [
  //     {
  //       pizzaId: 12,
  //       name: "Mediterranean",
  //       quantity: 2,
  //       unitPrice: 16,
  //       totalPrice: 32,
  //     },
  //   ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // in redux you can mutate the state
      //   payload = new Item
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // 1. find item
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      // 2. mutate the item
      item.quantity = item.quantity + 1;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // 1. find item
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      // 2. mutate the item
      item.quantity = item.quantity - 1;
      item.totalPrice = item.quantity * item.unitPrice;
      // nice trick to reuse the reducers
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },

    clearEntireCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearEntireCart,
} = cartSlice.actions;

export default cartSlice.reducer;
// function selector the convention that the name starts with get
// notice that if u have selector function like this in large apps might cause issues in performance ==> look at 'reselect' library on redux it solves the problem that optimize the selectors
export const getTotalCartQuantityOfPizzas = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
export const getTotalCartPriceOfPizzas = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCart = (state) => state.cart.cart;

export const getUserName = (state) => state.user.userName;

// find the id of pizza if exist get the quantity if not return 0
export const getCurrentPizzaById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
