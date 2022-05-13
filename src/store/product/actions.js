import axios from "axios";
import { appLoading, appDoneLoading } from "../appState/actions";
import { apiUrl } from "../../config/constants";
export const LIST_OF_PRODUCTS = "LIST_OF_PRODUCTS";
export const PRODUCT_DETAILS = "ARTWORK_DETAILS";
export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATE_CART = "UPDATE_CART";
export const INCREASE_AMOUNT = "INCREASE_AMOUNT";
export const DECREASE_AMOUNT = "DECREASE_AMOUNT";
export const DELETE_CARTITEM = "DELETE_CARTITEM";
export const CREATE_ORDER = "CREATE_ORDER";

export const getListOfArtworks = (product) => ({
  type: LIST_OF_PRODUCTS,
  payload: product,
});

export const getArtworkDetails = (product) => ({
  type: PRODUCT_DETAILS,
  payload: product,
});

export const addToCart = (details) => ({
  type: ADD_TO_CART,
  payload: { details },
});

export const updateCart = (cart) => ({
  type: UPDATE_CART,
  payload: cart,
});

export const increaseAmount = (id) => ({
  type: INCREASE_AMOUNT,
  payload: id,
});

export const decreaseAmount = (id) => ({
  type: DECREASE_AMOUNT,
  payload: id,
});

export const deleteItem = (id) => ({
  type: DELETE_CARTITEM,
  payload: id,
});

export const orderCreated = (order) => ({
  type: CREATE_ORDER,
  payload: order,
});
//get list of products
export const getProducts = () => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const products = await axios.get(`${apiUrl}/products`);
      dispatch(getListOfArtworks(products.data));
      dispatch(appDoneLoading());
    } catch (e) {
      console.error(e.message);
    }
    dispatch(appDoneLoading());
  };
};

//get product by id thunk
export const getProductById = (id) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const product = await axios.get(`${apiUrl}/products/${id}`);
      dispatch(getArtworkDetails(product.data));
      dispatch(appDoneLoading());
    } catch (e) {
      console.error(e.message);
    }
    dispatch(appDoneLoading());
  };
};
