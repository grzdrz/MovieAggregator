import React from "react";

import "./shopping-cart.scss";

function ShoppingCart(props) {
  const {
    productsCount = 14,
  } = props;

  return (
    <div className="shopping-cart">
      <p className="shopping-cart__main-image">shopping_cart</p>
      <p className="shopping-cart__products-count">
        <span className="shopping-cart__products-count-number">{productsCount}</span>
      </p>
    </div>
  );
}

export default ShoppingCart;
