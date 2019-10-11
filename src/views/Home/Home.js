import React, { Component } from 'react';
import { array, func } from 'prop-types';
import { isFirstRender } from '../../shared/utils/frontend';

const ProductsList = ({ products }) => (
  <ul>
    {products.map(product => (
      <li key={product.id}>
        <span className="left">
          {product.id} {product.name} {product.quantity}
        </span>
        <span className="right">${product.price}</span>
      </li>
    ))}
  </ul>
);

ProductsList.propTypes = {
  products: array,
};

class Home extends Component {
  componentDidMount() {
    const { fetchProducts } = this.props;
    fetchProducts();
    // this.props.fetchProducts();
  }

  render() {
    const {
      products,
    } = this.props;
    if (isFirstRender(products)) {
      return <div>No products.</div>;
    }
    return (
      <div>
        <h1>Hello World</h1>
        <ProductsList products={products} />
      </div>
    );
  }
}

Home.propTypes = {
  products: array,
  fetchProducts: func,
};
export default Home;
