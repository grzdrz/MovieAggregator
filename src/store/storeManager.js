import { combineReducers } from 'redux';

import PaginationReducer from './reduers/paginationReducer';
import ProductsReducer from './reduers/productsReducer';
import FiltersReducer from './reduers/filtersReducer';
import ShoppingCartReducer from './reduers/shoppingCartReducer';

class StoreManager {
  constructor() {
    this.filtersReducer = new FiltersReducer(this);
    this.paginationReducer = new PaginationReducer(this);
    this.productsReducer = new ProductsReducer(this);
    this.shoppingCartReducer = new ShoppingCartReducer(this);

    /* this.filtersReducer.onStateChange.subscribe(this.productsReducer.validateProducts);
    this.filtersReducer.onStateChange.subscribe(this.paginationReducer.validatePageNummber); */

    this.reducer = combineReducers({
      filters: this.filtersReducer.reduce,
      products: this.productsReducer.reduce,
      pagination: this.paginationReducer.reduce,
      shoppingCart: this.shoppingCartReducer.reduce,
    });
  }
}

export default StoreManager;
