import { combineReducers } from 'redux';
import products from '../../reducers/productsReducer';
import formsReducer from '../../reducers/formsReducer';

const rootReducer = combineReducers({
  products,
  ...formsReducer()
});

export default rootReducer;
