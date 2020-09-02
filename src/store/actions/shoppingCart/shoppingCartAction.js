function shoppingCartAction(productId) {
  return {
    type: "PRODUCT_COUNT_PLUS",
    productId,
  };
}

export default shoppingCartAction;
