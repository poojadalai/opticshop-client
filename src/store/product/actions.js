import axios from "axios";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from "../appState/actions";
export const LIST_OF_PRODUCTS = "LIST_OF_PRODUCTS";
export const ARTWORK_DETAILS = "ARTWORK_DETAILS";
export const ADD_LIKE = "ARTWORK_DETAILS";
export const CREATE_ARTWORK = "CREATE_ARTWORK";
const API_URL = "http://localhost:4000";

export const getListOfArtworks = (product) => ({
  type: LIST_OF_PRODUCTS,
  payload: product,
});

//get list of products
export const getProducts = () => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const products = await axios.get(`${API_URL}/products`);
      dispatch(getListOfArtworks(products.data));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
    dispatch(appDoneLoading());
  };
};