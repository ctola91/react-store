import API from '../api/API';

const URL_PRODUCTS = '/products';

const getProducts = async () => {
  const response = await API.get(`${URL_PRODUCTS}`);
  if (response.error) {
    throw new Error('an error occured ');
  }
  return response;
};

const addProduct = async product => {
  const response = await API.post(`${URL_PRODUCTS}`, product);
  if (response.error) {
    throw new Error('dont created');
  }
};
export default {
  getProducts,
  addProduct,
};
