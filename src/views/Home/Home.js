import React, { Component } from 'react';
import { array, func } from 'prop-types';
import uuid from 'uuid/v4';
import { isFirstRender } from '../../shared/utils/frontend';

const ProductsList = ({ products, handleDeleteElement, handleEditElement }) => (
  <ul>
    {products.map(product => (
      <li key={product.id}>
        <span className="left">
          {product.id} {product.name} {product.quantity}
        </span>
        <span className="right">${product.price}</span>
        <button
          onClick={() => {
            handleDeleteElement(product.id);
          }}
        >
          X
        </button>
        <button onClick={() => handleEditElement(product)}>Edit</button>
      </li>
    ))}
  </ul>
);

ProductsList.propTypes = {
  products: array,
  handleEditElement: func,
  handleDeleteElement: func
};

class Home extends Component {
  state = {
    id: '',
    name: '',
    price: '',
    quantity: '',
  };

  componentDidMount() {
    const { fetchProducts } = this.props;
    fetchProducts();
    // this.props.fetchProducts();
  }

  handleOnChange = e => {
    const {
      target: { name, value },
    } = e;
    this.setState({
      [name]: value,
    });
  };

  handleAddNewProduct = () => {
    const { addProduct } = this.props;
    if (this.state.name && this.state.price && this.state.quantity) {
      addProduct({
        id: uuid(),
        name: this.state.name,
        price: this.state.price,
        quantity: this.state.quantity,
      });
      this.setState({
        name: '',
        price: '',
        quantity: '',
      });
    }
  };

  handleDeleteProduct = key => {
    console.log(key);
    const { deleteProduct } = this.props;
    deleteProduct(key);
  };

  handleEditProduct = product => {
    this.setState({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    });
  };

  handleUpdateProduct = () => {
    const { updateProduct } = this.props;
    if (this.state.id && this.state.name) {
      updateProduct({
        id: this.state.id,
        name: this.state.name,
        price: this.state.price,
        quantity: this.state.quantity,
      });
      this.setState({
        id: false,
        name: '',
        price: '',
        quantity: '',
      });
    }
  };

  render() {
    const { products } = this.props;
    return (
      <div className="products">
        <div className="products-form">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleOnChange}
          />
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            name="price"
            value={this.state.price}
            onChange={this.handleOnChange}
          />
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="text"
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleOnChange}
          />
          <button
            onClick={
              this.state.id
                ? this.handleUpdateProduct
                : this.handleAddNewProduct
            }
          >
            {this.state.id ? 'Edit Product' : 'Add New product'}
          </button>
        </div>
        <div className="products-list">
          {isFirstRender(products) ? (
            <div>No products.</div>
          ) : (
            <div>
              <h1>Hello World</h1>
              <ProductsList products={products} handleEditElement={this.handleEditProduct} handleDeleteElement={this.handleDeleteProduct} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  products: array,
  fetchProducts: func,
};
export default Home;
