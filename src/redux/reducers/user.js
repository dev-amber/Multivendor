import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  users:[],
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    // Request
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
      state.error = null; // clear previous errors
    })

    // Success
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user; // ✅ save user
      state.token = action.payload.token; // ✅ save token
      state.error = null;
    })

    // Fail
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to load user";
      state.isAuthenticated = false;
      state.user = null; // ✅ clear user
      state.token = null; // ✅ clear token
    })

    // update user information
    .addCase("updateUserInfoRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateUserInfoSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload; // clear previous errors
    })
    .addCase("updateUserInfoFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // update user address
    .addCase("updateUserAddressRequest", (state) => {
      state.addressloading = true;
      state.error = null;
      state.successMessage = null;
    })

    .addCase("updateUserAddressSuccess", (state, action) => {
      state.addressloading = false;
      state.user = action.payload.user;
      state.successMessage = action.payload.successMessage;
      state.error = null;
    })

    .addCase("updateUserAddressFailed", (state, action) => {
      state.addressloading = false; // IMPORTANT FIX
      state.error = action.payload;
    })

    // delete user address
    .addCase("deleteUserAddressRequest", (state) => {
      state.addressloading = true;
    })

    .addCase("deleteUserAddressSuccess", (state, action) => {
      state.addressloading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })

    .addCase("deleteUserAddressFailed", (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    })


     // get all user admin
    .addCase("getAllUsersRequest", (state) => {
      state.usersLoading = true;
    })

    .addCase("getAllUsersSuccess", (state, action) => {
      state.usersLoading = false;
      state.users = action.payload;
    })

    .addCase("getAllUsersFailed", (state, action) => {
      state.usersLoading = false;
      state.error = action.payload;
    })

    // Clear Errors
    .addCase("ClearErrors", (state) => {
      state.error = null;
    })

    // Logout
    .addCase("LogoutSuccess", (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    });
});
