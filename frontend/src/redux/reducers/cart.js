
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("cart/addToCart", (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find(i => i._id === item._id);

      if (isItemExist) {
        state.cart = state.cart.map((i) =>
          i._id === item._id ? item : i
        );
      } else {
        state.cart.push(item);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    })

    .addCase("cart/removeFromCart", (state, action) => {
      state.cart = state.cart.filter(
        (i) => i._id !== action.payload
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    });
});
