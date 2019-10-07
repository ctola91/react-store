import { combineReducers } from 'redux';
import products from '../../reducers/productsReducer';

const rootReducer = combineReducers({
  products,
});

export default rootReducer;
