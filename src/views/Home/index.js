import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from './Home';

import {
  addProduct,
  fetchProducts,
  updateProduct,
  deleteProduct,
  resetProductForm,
} from '../../actions/productsActions';

const mapStateToProps = ({ products }) => ({ products: products.products });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addProduct,
      fetchProducts,
      updateProduct,
      deleteProduct,
      resetProductForm,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
