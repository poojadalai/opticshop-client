import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  POST_ADDRESS,
  DELETE_SUCCESS,
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  order: [],
  address: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case POST_ADDRESS:
      return {
        ...state,
        address: [...state.address, action.payload],
      };

    case DELETE_SUCCESS:
      const id = action.payload;
      const newAdd = state.address.filter((address) => address.id !== id);

      return {
        ...state,
        address: newAdd,
      };

    default:
      return state;
  }
};

export default reducer;
