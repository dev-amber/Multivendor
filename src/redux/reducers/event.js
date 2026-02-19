import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  allEvents: [],
  success: false,
  error: null,
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    // ✅ Create event
    .addCase("eventCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("eventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase("eventCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // ✅ Get all events for shop
    .addCase("getAlleventsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAlleventsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.events = action.payload; 
    })
    .addCase("getAlleventsShopFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // delete product shop
   .addCase("deleteeventRequest", (state) => {
      state.isLoading = true;
    })
   .addCase("deleteeventSuccess", (state, action) => {
      state.isLoading = true;
      state.message= action.payload;
    })
    .addCase("deleteeventFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })


    // ✅ Get all events
    .addCase("getAlleventsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAlleventsSuccess", (state, action) => {
      state.isLoading = false;
      state.allEvents = action.payload; 
    })
    .addCase("getAlleventsFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // ✅ Clear errors
    .addCase("clearErrors", (state) => {
      state.error = null;
    });


});
