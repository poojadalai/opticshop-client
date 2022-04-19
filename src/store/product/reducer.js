
import { LIST_OF_PRODUCTS } from "./actions";

const initialState = {
  products: [],
};

export default function productReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LIST_OF_PRODUCTS: {
      return {
        ...state,
        products: payload,
      };
    }
    default: {
      return state;
    }
  }
}
