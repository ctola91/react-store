import React, { Component } from 'react';
import { array, func } from 'prop-types';
import { Form, Control, Errors, actions } from 'react-redux-form';
import uuid from 'uuid/v4';
import { Row, Label, Col, Button } from 'reactstrap';

import { isFirstRender } from '../../shared/utils/frontend';

// validations
const required = val => val && val.length;

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
  handleDeleteElement: func,
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

  attachDispatch(dispatch) {
    this.formDispatch = dispatch;
  }

  handleSubmit = values => {
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
    this.state.id
      ? this.handleUpdateProduct(values)
      : this.handleAddNewProduct(values);
    this.props.resetProductForm();
  };

  handleAddNewProduct = values => {
    const { addProduct } = this.props;
    if (values.name && values.price && values.quantity) {
      addProduct({
        id: uuid(),
        name: values.name,
        price: values.price,
        quantity: values.quantity,
      });
    }
  };

  handleDeleteProduct = key => {
    console.log(key);
    const { deleteProduct } = this.props;
    deleteProduct(key);
  };

  handleEditProduct = product => {
    console.log(product);
    this.setState({
      id: product.id,
    });
    this.formDispatch(actions.change('productForm', product));
  };

  handleUpdateProduct = values => {
    const { updateProduct } = this.props;
    if (values.id && values.name) {
      updateProduct({
        id: values.id,
        name: values.name,
        price: values.price,
        quantity: values.quantity,
      });
      this.setState({
        id: false,
      });
    }
  };

  render() {
    const { products } = this.props;
    return (
      <div className="products">
        <div className="products-form">
          <Form
            model="productForm"
            onSubmit={values => this.handleSubmit(values)}
            getDispatch={dispatch => this.attachDispatch(dispatch)}
          >
            <Row className="form-group">
              <Label htmlFor="name" md={2}>
                Name:
              </Label>
              <Col md={10}>
                <Control.text
                  model=".name"
                  id="name"
                  name="name"
                  placeholder="Name"
                  className="form-control"
                  validators={{
                    required,
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".name"
                  show="touched"
                  messages={{
                    required: 'Required',
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="price" md={2}>
                Price:
              </Label>
              <Col md={10}>
                <Control.text
                  model=".price"
                  id="price"
                  name="price"
                  placeholder="Price"
                  className="form-control"
                  validators={{
                    required,
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".price"
                  show="touched"
                  messages={{
                    required: 'Required',
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="quantity" md={2}>
                quantity:
              </Label>
              <Col md={10}>
                <Control.text
                  model=".quantity"
                  id="quantity"
                  name="quantity"
                  placeholder="Quantity"
                  className="form-control"
                  validators={{
                    required,
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".quantity"
                  show="touched"
                  messages={{
                    required: 'Required',
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button type="submit" color="primary">
                  {this.state.id ? 'Edit Product' : 'Add New product'}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="products-list">
          {isFirstRender(products) ? (
            <div>No products.</div>
          ) : (
            <div>
              <h1>Hello World</h1>
              <ProductsList
                products={products}
                handleEditElement={this.handleEditProduct}
                handleDeleteElement={this.handleDeleteProduct}
              />
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
