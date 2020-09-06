/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import ProductCounter from '../product-counter/product-counter.jsx';
import './shopping-cart.scss';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormOpened: false,
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
  }

  handleIconClick = () => {
    const { isFormOpened } = this.state;
    this.setState({
      isFormOpened: !isFormOpened,
    });
  }

  render() {
    const {
      products,
      shoppingCart,
      shoppingCartPlusAction,
      shoppingCartMinusAction,
    } = this.props;
    const { isFormOpened } = this.state;

    const sumCount = shoppingCart.reduce((sum, product) => {
      if (product.productCount !== undefined) {
        const newSum = sum + product.productCount;
        return newSum;
      }
      return sum;
    }, 0);
    const sumPrice = products.reduce((sum, product) => {
      const shoppingCartProduct = shoppingCart.find((item) => item.productId === product.id);
      if (shoppingCartProduct) {
        const newSum = sum + product.price * shoppingCartProduct.productCount;
        return newSum;
      }
      return sum;
    }, 0);

    return (
      <div className='shopping-cart'>
        <div className='shopping-cart__icon' onClick={this.handleIconClick}>
          <p className='shopping-cart__main-image'>shopping_cart</p>
          <p className='shopping-cart__products-count'>
            <span className='shopping-cart__products-count-number'>{sumCount}</span>
          </p>
        </div>

        <form
          className={`shopping-cart__form ${isFormOpened ? 'shopping-cart__form_opened' : ''}`}
          onSubmit={this.handleFormSubmit}
        >
          <p className='shopping-cart__form-title'>
            <span className='shopping-cart__form-title-id'>id</span>
            <span className='shopping-cart__form-title-count'>Количество</span>
            <span className='shopping-cart__form-title-name'>Наименование</span>
            <span className='shopping-cart__form-title-counter'>Счетчик</span>
          </p>
          {shoppingCart.map((product) => {
            if (product.productCount > 0) {
              return (
                <div className='shopping-cart__form-product' key={`shopping-cart__form-product_${product.productId}`}>
                  <input
                    className='shopping-cart__form-product-id'
                    type='text'
                    value={product.productId}
                    disabled
                    onChange={() => { }}
                  />
                  <input
                    className='shopping-cart__form-product-count'
                    type='text'
                    value={product.productCount}
                    disabled
                    onChange={() => { }}
                  />
                  <p className='shopping-cart__form-product-name'>{products.find((item) => item.id === product.productId).name}</p>
                  <div className='shopping-cart__form-product-counter'>
                    <ProductCounter
                      shoppingCart={shoppingCart}
                      shoppingCartPlusAction={shoppingCartPlusAction}
                      shoppingCartMinusAction={shoppingCartMinusAction}
                      productId={product.productId}
                    />
                  </div>
                </div>
              );
            }
          })}
          <div className='shopping-cart__total-value'>
            <span className='shopping-cart__total-value-text'>Суммарное количество: </span>
            <input
              className='shopping-cart__total-value-input'
              value={sumCount}
              disabled
              onChange={() => { }}
            />
          </div>
          <div className='shopping-cart__total-price'>
            <span className='shopping-cart__total-price-text'>Суммарная цена: </span>
            <span className='shopping-cart__total-price-value'>{sumPrice}</span>
            <span className='shopping-cart__total-price-currency'>{products[0].currencyType}</span>
          </div>
        </form>
      </div>
    );
  }
}

export default ShoppingCart;
