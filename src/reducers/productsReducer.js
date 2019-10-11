import {
  FETCH_PRODUCTS_SUCCESS,
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
    default:
      return state;
  }
}
