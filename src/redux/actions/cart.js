// add to cart
export const addToCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "cart/addToCart", // plain string action type
    payload: data,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};

// remove from cart
export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "cart/removeFromCart", // plain string action type
    payload: data._id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};
