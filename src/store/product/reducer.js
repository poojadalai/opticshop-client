import {
  LIST_OF_PRODUCTS,
  PRODUCT_DETAILS,
  ADD_TO_CART,
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
  DELETE_CARTITEM,
} from "./actions";

const initialState = {
  products: [],
  details: null,
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
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
        products: [...state.products],
        details: payload,
      };
    }

    case ADD_TO_CART: {
      //check if the action id exists in the addedItems
      const addedItem = payload.details;

      const existed_item = state.cart.find(
        (product) => addedItem.id === product.id
      );

      if (!existed_item) {
        return {
          ...state,
          cart: [...state.cart, { ...addedItem, amount: 1 }],
        };
      }

      const products = state.cart.map((product) => {
        if (product.id === addedItem.id) {
          return {
            ...addedItem,
            amount: product.amount + 1,
          };
        }
        return {
          ...product,
        };
      });

      return {
        ...state,
        cart: products,
      };
    }

    case INCREASE_AMOUNT: {
      const id = payload;
      console.log(id, typeof id);
      return {
        ...state,
        cart: [...state.cart].map((cartItem) => {
          if (cartItem.id === id) {
            return {
              ...cartItem,
              amount: cartItem.amount + 1,
            };
          }
          return { ...cartItem };
        }),
      };
    }

    case DECREASE_AMOUNT: {
      const id = payload;
      console.log(id, typeof id);
      return {
        ...state,
        cart: [...state.cart].map((cartItem) => {
          if (cartItem.id === id) {
            return {
              ...cartItem,
              amount: cartItem.amount - 1,
            };
          }
          return { ...cartItem };
        }),
      };
    }
    case DELETE_CARTITEM: {
      const id = payload;
      const newCart = state.cart.filter((product) => product.id !== id);
      console.log(newCart);
      return {
        ...state,
        cart: newCart,
      };
    }

    default: {
      return state;
    }
  }
}
