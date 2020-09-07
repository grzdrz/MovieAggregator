import Reducer from './reducer';

const initialState = {
  chosenProducts: [
    {
      productId: 0,
      productCount: 0,
    },
  ],
};

class ShoppingCartReducer extends Reducer {
  constructor(reducerManager, state = { ...initialState }) {
    super(reducerManager, state);
  }

  reduce = (state = this.state, action) => {
    this.state = { ...state };

    switch (action.type) {
      case 'PRODUCT_COUNT_PLUS': {
        const targetProduct = this.state.chosenProducts.find((product) => product.productId === action.productId);
        if (targetProduct) {
          targetProduct.productCount += 1;
        } else {
          this.state.chosenProducts.push({
            productId: action.productId,
            productCount: 1,
          });
        }
        return this.state;
      }
      case 'PRODUCT_COUNT_MINUS': {
        const targetProduct = this.state.chosenProducts.find((product) => product.productId === action.productId);
        if (targetProduct && targetProduct.productCount > 0) {
          targetProduct.productCount -= 1;
        } else if (targetProduct && targetProduct.productCount === 0) {
          targetProduct.productCount = 0;
        }
        return this.state;
      }
      default: {
        return state;
      }
    }
  }
}

export default ShoppingCartReducer;
