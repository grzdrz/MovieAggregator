import React from "react";

import ProductCounter from "../product-counter/product-counter";

import "./shopping-cart.scss";

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
    this.setState({
      isFormOpened: !this.state.isFormOpened
    });
  }

  render() {
    const {
      products,
      shoppingCart,
      shoppingCartPlusAction,
      shoppingCartMinusAction,
    } = this.props;

    const sumCount = shoppingCart.reduce((sum, product) => {
      if (product.productCount !== undefined) return sum += product.productCount;
    }, 0);
    const sumPrice = products.reduce((sum, product) => {
      const shoppingCartProduct = shoppingCart.find((item) => item.productId === product.id);
      if (shoppingCartProduct) return sum += product.price * shoppingCartProduct.productCount;
      else return sum;
    }, 0);

    return (
      <div className="shopping-cart">
        <div className="shopping-cart__icon" onClick={this.handleIconClick}>
          <p className="shopping-cart__main-image">shopping_cart</p>
          <p className="shopping-cart__products-count">
            <span className="shopping-cart__products-count-number">{sumCount}</span>
          </p>
        </div>

        <form className={`shopping-cart__form ${this.state.isFormOpened ? "shopping-cart__form_opened" : ""}`}
          onSubmit={this.handleFormSubmit}>
          <p className="shopping-cart__form-title">
            <span className="shopping-cart__form-title-id">id</span>
            <span className="shopping-cart__form-title-count">Количество</span>
            <span className="shopping-cart__form-title-name">Наименование</span>
            <span className="shopping-cart__form-title-counter">Счетчик</span>
          </p>
          {shoppingCart.map((product) => {
            if (product.productCount > 0)
              return (
                <div className="shopping-cart__form-product" key={`shopping-cart__form-product_${product.productId}`}>
                  <input className="shopping-cart__form-product-id"
                    type="text"
                    value={product.productId}
                    disabled={true}
                    onChange={() => { }}
                  ></input>
                  <input className="shopping-cart__form-product-count"
                    type="text"
                    value={product.productCount}
                    disabled={true}
                    onChange={() => { }}
                  ></input>
                  <p className="shopping-cart__form-product-name">{products.find((item) => item.id === product.productId).name}</p>
                  <div className="shopping-cart__form-product-counter">
                    <ProductCounter
                      shoppingCart={shoppingCart}
                      shoppingCartPlusAction={shoppingCartPlusAction}
                      shoppingCartMinusAction={shoppingCartMinusAction}
                      productId={product.productId}
                    />
                  </div>
                </div>
              );
          })}
          <div className="shopping-cart__total-value">
            <span className="shopping-cart__total-value-text">Суммарное количество: </span>
            <input className="shopping-cart__total-value-input"
              value={sumCount}
              disabled={true}
              onChange={() => { }}></input>
          </div>
          <div className="shopping-cart__total-price">
            <span className="shopping-cart__total-price-text">Суммарная цена: </span>
            <span className="shopping-cart__total-price-value">{sumPrice}</span>
            <span className="shopping-cart__total-price-currency">{products[0].currencyType}</span>
          </div>
        </form>
      </div>
    );
  }
}

export default ShoppingCart;
