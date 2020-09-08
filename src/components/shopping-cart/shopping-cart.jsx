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

    document.addEventListener('click', this.handleDropdownLeave);
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

  handleDropdownLeave = (event) => {
    const cart = event.target.closest('.shopping-cart');
    const isMinusButton = event.target.classList.contains('product-counter__minus-button');
    if (!cart && !isMinusButton) {
      this.setState({
        isFormOpened: false,
      });
    }
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
          <div className='shopping-cart__selected-products-table'>
            <div className='shopping-cart__table-cell shopping-cart__title-cell'>id</div>
            <div className='shopping-cart__table-cell shopping-cart__title-cell'>Количество</div>
            <div className='shopping-cart__table-cell shopping-cart__title-cell'>Наименование</div>
            <div className='shopping-cart__table-cell shopping-cart__title-cell'>Счетчик</div>
            {shoppingCart.map((product) => {
              if (product.productCount > 0) {
                return (
                  <React.Fragment key={`shopping-cart__form-product_${product.productId}`}>
                    <div className='shopping-cart__table-cell'>
                      <input
                        className='shopping-cart__cell-input'
                        type='text'
                        defaultValue={product.productId}
                        /* disabled */
                        onChange={() => { }}
                      />
                    </div>
                    <div className='shopping-cart__table-cell'>
                      <input
                        className='shopping-cart__cell-input'
                        type='text'
                        defaultValue={product.productCount}
                        /* disabled */
                        onChange={() => { }}
                      />
                    </div>
                    <div className='shopping-cart__table-cell'>{products.find((item) => item.id === product.productId).name}</div>
                    <div className='shopping-cart__table-cell'>
                      <ProductCounter
                        shoppingCart={shoppingCart}
                        shoppingCartPlusAction={shoppingCartPlusAction}
                        shoppingCartMinusAction={shoppingCartMinusAction}
                        productId={product.productId}
                      />
                    </div>
                  </React.Fragment>
                );
              }
            })}
          </div>
          <div className='shopping-cart__total-value'>
            <span className='shopping-cart__total-value-text'>Суммарное количество: </span>
            <span className='shopping-cart__total-value-input'>{sumCount}</span>
            {/* <input
              className='shopping-cart__total-value-input'
              value={sumCount}
              disabled
              onChange={() => { }}
            /> */}
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
