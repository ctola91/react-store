import React, { Component } from 'react';
import { array, func } from 'prop-types';
import { Form, Control, Errors, actions } from 'react-redux-form';
import uuid from 'uuid/v4';
import { Row, Label, Col, Button, Container } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { isFirstRender } from '../../shared/utils/frontend';

import './Home.css';
// validations
const required = val => val && val.length;

const ProductsList = ({ products, handleDeleteElement, handleEditElement }) => (
  <Container>
    <ReactCSSTransitionGroup 
      transitionName="product" 
      transitionAppear={true}>
    <Row md={12}>
      <Col md={3} className="font-weight-bold">Product</Col>
      <Col md={3} className="font-weight-bold">Price</Col>
      <Col md={3} className="font-weight-bold">Quantity</Col>
      <Col md={3} className="font-weight-bold"></Col>
    </Row>
    {products.map(product => (
      <Row md={12} key={product.id}>
        <Col md={3}>{product.name}</Col>
        <Col md={3}>{product.price}</Col>
        <Col md={3}>{product.quantity}</Col>
        <Col md={3}>
          <Button
            color="link"
            onClick={() => {
              handleDeleteElement(product.id);
            }}
          >
            <i className="fa fa-close"></i>
          </Button>
          <Button color="link" onClick={() => handleEditElement(product)}>
            <i className="fa fa-pencil"></i>
          </Button>
        </Col>
      </Row>
    ))}
    </ReactCSSTransitionGroup>
  </Container>
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
            <Container>
              <Row className="form-group" md={12}>
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
              <Row className="form-group" md={12}>
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
              <Row className="form-group" md={12}>
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
              <Row md={12}>
                <Col md={4}>
                  <Button type="submit" color="primary">
                    {this.state.id ? 'Edit Product' : 'Add New product'}
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </div>
        <Container className="products-list">
          {isFirstRender(products) ? (
            <div>No products.</div>
          ) : (
            <div>
              <h1>Products</h1>
              <ProductsList
                products={products}
                handleEditElement={this.handleEditProduct}
                handleDeleteElement={this.handleDeleteProduct}
              />
            </div>
          )}
        </Container>
      </div>
    );
  }
}

Home.propTypes = {
  products: array,
  fetchProducts: func,
};
export default Home;
