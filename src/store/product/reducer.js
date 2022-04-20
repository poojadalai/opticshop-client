import { LIST_OF_PRODUCTS, PRODUCT_DETAILS } from "./actions";

const initialState = {
  products: [],
  details: null,
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

    case PRODUCT_DETAILS: {
      return {
        ...state,
        details: payload,
      };
    }
    default: {
      return state;
    }
  }
}
