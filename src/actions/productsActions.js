import axios from 'axios';

import { request, received, error } from '../shared/redux/baseActions';
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
} from './actionTypes';

export const fetchProducts = () => dispatch => {
  dispatch(request(FETCH_PRODUCTS_REQUEST));

  const axiosData = {
    method: 'GET',
    url: 'http://localhost:3001/products',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  axios(axiosData)
    .then(response => {
      dispatch(received(FETCH_PRODUCTS_SUCCESS, response.data));
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log('AXIOS_ERROR:', err.response);
      dispatch(error(FETCH_PRODUCTS_ERROR));
    });
};

export const addProduct = () => {};
