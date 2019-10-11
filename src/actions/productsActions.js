import { request, received, error } from '../shared/redux/baseActions';
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  ADD_PRODUCTS_REQUEST,
  ADD_PRODUCTS_SUCCESS,
  ADD_PRODUCTS_ERROR,
  DELETE_PRODUCTS_REQUEST,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_ERROR,
  UPDATE_PRODUCTS_REQUEST,
  UPDATE_PRODUCTS_SUCCESS,
  UPDATE_PRODUCTS_ERROR,
} from './actionTypes';
import ProductService from '../services/ProductService';

export const fetchProducts = () => async dispatch => {
  dispatch(request(FETCH_PRODUCTS_REQUEST));

  try {
    const response = await ProductService.getProducts();
    dispatch(received(FETCH_PRODUCTS_SUCCESS, response.data));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('AXIOS_ERROR:', err.response);
    dispatch(error(FETCH_PRODUCTS_ERROR));
  }
};

export const addProduct = product => async dispatch => {
  dispatch(request(ADD_PRODUCTS_REQUEST));
  try {
    const response = await ProductService.addProduct(product);
    dispatch(received(ADD_PRODUCTS_SUCCESS, response.data));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('AXIOS_ERROR', err.response);
    dispatch(error(ADD_PRODUCTS_ERROR));
  }
};

export const deleteProduct = id => async dispatch => {
  dispatch(request(DELETE_PRODUCTS_REQUEST));

  try {
    const response = await ProductService.deleteProduct(id);
    dispatch(received(DELETE_PRODUCTS_SUCCESS, response.data));
  } catch (err) {
    console.log('AXIOS_ERROR', err.response);
    dispatch(error(DELETE_PRODUCTS_ERROR));
  }
};

export const updateProduct = product => async dispatch => {
  dispatch(request(UPDATE_PRODUCTS_REQUEST));

  try {
    const response = await ProductService.updateProduct(product);
    dispatch(received(UPDATE_PRODUCTS_SUCCESS, response.data));
  } catch (err) {
    console.log('AXIOS_ERROR', err.response);
    dispatch(error(UPDATE_PRODUCTS_ERROR));
  }
};
