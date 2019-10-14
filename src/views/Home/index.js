import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from './Home';

import { addProduct, fetchProducts, updateProduct, deleteProduct } from '../../actions/productsActions';

const mapStateToProps = ({ products }) => ({ products: products.products });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addProduct,
      fetchProducts,
      updateProduct,
      deleteProduct
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
