import {
  FETCH_PRODUCTS_SUCCESS,
  ADD_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_SUCCESS,
  UPDATE_PRODUCTS_SUCCESS,
} from '../actions/actionTypes';
import { getNewState } from '../shared/utils/frontend';

const initialState = {
  products: [],
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS: {
      const { payload: products } = action;
      return getNewState(state, {
        products,
      });
    }

    case ADD_PRODUCTS_SUCCESS: {
      const { payload: product } = action;
      const newProducts = [...state.products, product];
      return getNewState(state, {
        products: newProducts,
      });
    }
    case DELETE_PRODUCTS_SUCCESS: {
      const { payload: id } = action;
      const filteredProducts = state.products.filter(
        product => product.id !== id
      );

      return getNewState(state, {
        products: filteredProducts,
      });
    }
    case UPDATE_PRODUCTS_SUCCESS: {
      const { payload: updatedProduct } = action;
      const index = state.products.findIndex(
        product => product.id === updatedProduct.id
      );

      state.products[index] = updatedProduct;
      // const editedProducts = [...state.products, updatedProduct]
      return getNewState(state, {
        products: state.products,
      });
    }
    default:
      return state;
  }
}
