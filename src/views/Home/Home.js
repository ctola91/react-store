import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { array, object, func } from 'prop-types';
import { fetchProducts } from '../../actions/productsActions';
import { isFirstRender } from '../../shared/utils/frontend';

const mapStateToProps = ({ products }) => ({ products });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProducts,
    },
    dispatch
  );

// const ProductsList = (products) => (
//   products.map()
// )

class Home extends Component {
  
  componentDidMount() {
    const { fetchProducts } = this.props;
    fetchProducts();
  }

  render() {
    const {
      products: { products },
    } = this.props;
    if (isFirstRender(products)) {
      return <div>No products.</div>;
    }
    return (
      <div>
        <h1>Hello World</h1>
        {/* <ProductsList products={products} /> */}
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <span className="left">
                {product.id} {product.name} {product.quantity}
              </span>
              <span className="right">${product.price}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  products: object,
  fetchProducts: func,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
