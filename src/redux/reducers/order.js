import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  adminOrders: [],
  adminOrderLoading: false,
};

// get all order of user 
export const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("getAllOrderUserRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrderUserSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
      state.success = true;
    })
    .addCase("getAllOrderUserFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    
    // get all order of seller
builder
    .addCase("getAllOrderShoprRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrderShopSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
      state.success = true;
    })
    .addCase("getAllOrderShopFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

     // get all orders for admin
     .addCase("adminAllOrdersRequest", (state) => {
      state.adminOrderLoading = true;
    })

    .addCase("adminAllOrdersSuccess", (state, action) => {
      state.isLoading = false;
      state.adminOrders = action.payload;
    })

    .addCase("adminAllOrdersFailed", (state, action) => {
      state.adminOrderLoading = false;
      state.error = action.payload;
    })
    

    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});







