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
  return response;
};

const deleteProduct = async id => {
  const response = await API.delete(`${URL_PRODUCTS}/${id}`);
  if (response.error) {
    throw new Error('dont deleted');
  }
  return response;
};

const updateProduct = async product => {
  const response = await API.put(`${URL_PRODUCTS}/${product.id}`, product);
  if (response.error) {
    throw new Error('dont updated');
  }
  return response;
};

export default {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
};
