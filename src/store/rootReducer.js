import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import product from "./product/reducer"

export default combineReducers({
  appState,
  user,
  product,
});
