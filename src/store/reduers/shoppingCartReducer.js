import Reducer from './reducer';

const initialState = [
  {
    productId: 0,
    productCount: 0,
  },
];

class ShoppingCartReducer extends Reducer {
  constructor(reducerManager) {
    super(reducerManager);
    this.state = [...initialState];
  }

  reduce = (state = this.state, action) => {
    switch (action.type) {
      case 'PRODUCT_COUNT_PLUS': {
        const stateCopy = [...state];
        const targetProduct = stateCopy.find((product) => product.productId === action.productId);
        if (targetProduct) {
          targetProduct.productCount += 1;
        } else {
          stateCopy.push({
            productId: action.productId,
            productCount: 1,
          });
        }
        return stateCopy;
      }
      case 'PRODUCT_COUNT_MINUS': {
        const stateCopy = [...state];
        const targetProduct = stateCopy.find((product) => product.productId === action.productId);
        if (targetProduct && targetProduct.productCount > 0) {
          targetProduct.productCount -= 1;
        } else if (targetProduct && targetProduct.productCount === 0) {
          targetProduct.productCount = 0;
        }
        return stateCopy;
      }
      default: {
        return state;
      }
    }
  }
}

export default ShoppingCartReducer;
