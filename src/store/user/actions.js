import { apiUrl } from "../../config/constants";
import axios from "axios";

import { selectUser, selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const ORDER_DATA = "ORDER_DATA";
export const POST_ADDRESS = "POST_ADDRESS";
export const DELETE_SUCCESS = "DELETE_SUCCESS";
const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

const order = (order) => ({
  type: ORDER_DATA,
  payload: order,
});

const postAddress = (address) => ({
  type: POST_ADDRESS,
  payload: address,
});

const deleteAdd = (id) => {
  return {
    type: DELETE_SUCCESS,
    payload: id,
  };
};
export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.error(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.error(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      console.error(error?.response?.message);
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const orderData = (cart, id) => {
  return async (dispatch, getState) => {
    try {
      const { token } = selectUser(getState());
      dispatch(appLoading());

      console.log("cart", cart, "id", id);
      const response = await axios.post(
        `${apiUrl}/orders`,
        {
          cart,
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(order(response.data));
      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 3000)
      );
      localStorage.removeItem("cart");
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
      dispatch(appDoneLoading());
    }
  };
};

export const postAddresses = (
  company,
  address,
  city,
  zipcode,
  country,
  state,
  phone
) => {
  return async (dispatch, getState) => {
    const { token } = selectUser(getState());
    dispatch(appLoading());
    try {
      const response = await axios.post(
        `${apiUrl}/auth/profile`,
        {
          company,
          address,
          city,
          zipcode,
          country,
          state,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(postAddress(response.data));
      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 3000)
      );
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
      dispatch(appDoneLoading());
    }
  };
};

export const deleteAddress = (addressId) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const { token } = selectUser(getState());
    try {
      const response = await axios.delete(
        `${apiUrl}/auth/profile/${addressId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Address deleted?", response.data);
      dispatch(deleteAdd(addressId));
      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 3000)
      );
      dispatch(appDoneLoading());
    } catch (e) {
      console.error(e);
      dispatch(appDoneLoading());
    }
  };
};
