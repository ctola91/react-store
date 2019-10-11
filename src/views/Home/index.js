import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from './Home';

import { addProduct, fetchProducts } from '../../actions/productsActions';

const mapStateToProps = ({ products }) => ({ products: products.products });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addProduct,
      fetchProducts,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
