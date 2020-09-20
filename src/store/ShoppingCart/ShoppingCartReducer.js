import Reducer from '../reducer';
import initialState from './initialState';

class ShoppingCartReducer extends Reducer {
  constructor(reducerManager, state = { ...initialState }) {
    super(reducerManager, state);
  }

  validateProducts() {
    const { allProducts } = this.reducerManager.productsReducer.state;

    this.state.chosenProducts = this.state.chosenProducts.filter((product) => {
      const hasProduct = allProducts.find((item) => item.id === product.productId);
      return hasProduct;
    });
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
        break;
      }
      case 'PRODUCT_COUNT_MINUS': {
        const targetProduct = this.state.chosenProducts.find((product) => product.productId === action.productId);
        if (targetProduct && targetProduct.productCount > 0) {
          targetProduct.productCount -= 1;
        } else if (targetProduct && targetProduct.productCount === 0) {
          targetProduct.productCount = 0;
        }
        break;
      }
      default: {
        break;
      }
    }

    this.validateProducts();
    return this.state;
  }
}

export default ShoppingCartReducer;
