function shoppingCartMinusAction(productId) {
  return {
    type: "PRODUCT_COUNT_MINUS",
    productId,
  };
}

export default shoppingCartMinusAction;
