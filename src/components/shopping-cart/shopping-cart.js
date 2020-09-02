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
      shoppingCart,
      shoppingCartPlusAction,
      shoppingCartMinusAction,
    } = this.props;
    const sumCount = shoppingCart.reduce((sum, product) => {
      if (product.productCount !== undefined) return sum += product.productCount;
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
          {shoppingCart.map((product) => {
            if (product.productCount > 0)
              return (
                <div className="shopping-cart__form-product" key={`shopping-cart__form-product_${product.productId}`}>
                  <input className="shopping-cart__form-product-id"
                    type="text"
                    value={product.productId}
                    onChange={() => { }}
                  ></input>
                  <input className="shopping-cart__form-product-count"
                    type="text"
                    value={product.productCount}
                    onChange={() => { }}
                  ></input>
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
        </form>
      </div>
    );
  }
}

export default ShoppingCart;
