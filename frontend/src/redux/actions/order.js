import { server } from "../../server";
import axios from "axios";

// get all order of user
export const getAllOrderOfUser = (userId) => async (dispatch) => {
  // dispatch means run
  try {
    dispatch({
      type: "getAllOrderUserRequest",
    });

    const { data } = await axios.get(
      `${server}/order/get-all-orders/${userId}`,
    );
    // dispatch write we awnt result to reducer used
    dispatch({
      type: "getAllOrderUserSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrderUserFail",
      payload: error.response.data.message,
    });
  }
};

// get all order of seller
export const getAllOrderOfShop = (shopId) => async (dispatch) => {
  // dispatch means run
  try {
    dispatch({
      type: "getAllOrderShopRequest",
    });

    const { data } = await axios.get(
      `${server}/order/get-seller-all-orders/${shopId}`,
    );
    // dispatch write we awnt result to reducer used
    dispatch({
      type: "getAllOrderShopSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrderShopFail",
      payload: error.response.data.message,
    });
  }
};

// get all orders of admin
export const getAllOrdersOfAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "adminAllOrdersRequest",
    });

    const { data } = await axios.get(`${server}/order/admin-all-orders`, {
      withCredentials: true,
    });

    dispatch({
      type: "adminAllOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "adminAllOrdersFailed",
      payload: error.response.data.message,
    });
  }
};
