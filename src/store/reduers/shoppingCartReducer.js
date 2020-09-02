const initialState = [
  {
    productId: 0,
    productCount: 0,
  },
];

function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case "PRODUCT_COUNT_PLUS": {
      const stateCopy = [...state];
      let targetProduct = stateCopy.find((product) => product.productId === action.productId)
      if (targetProduct) {
        targetProduct.productCount += 1;
      } else {
        stateCopy.push({
          productId: action.productId,
          productCount: 1,
        });
      }
      return stateCopy;
      break;
    }
    default: {
      return state;
      break;
    }
  }
}

export default shoppingCartReducer;
