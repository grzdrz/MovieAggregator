import React from "react";

import "./shopping-cart.scss";

function ShoppingCart(props) {
  /* const {
    productsCount = 14,
  } = props; */
  const { shoppingCart } = props;
  const sumCount = shoppingCart.reduce((sum, product) => {
    if (product.productCount !== undefined) return sum += product.productCount;
  }, 0);

  return (
    <div className="shopping-cart">
      <p className="shopping-cart__main-image">shopping_cart</p>
      <p className="shopping-cart__products-count">
        <span className="shopping-cart__products-count-number">{sumCount}</span>
      </p>
    </div>
  );
}

export default ShoppingCart;
