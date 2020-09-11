import { combineReducers } from 'redux';

import PaginationReducer from './reduers/paginationReducer';
import ProductsReducer from './reduers/productsReducer';
import FiltersReducer from './reduers/filtersReducer';
import ShoppingCartReducer from './reduers/shoppingCartReducer';
import AuthorizationReducer from './reduers/authorizationReducer';

class StoreManager {
  constructor() {
    this.filtersReducer = new FiltersReducer(this);
    this.paginationReducer = new PaginationReducer(this);
    this.productsReducer = new ProductsReducer(this);
    this.shoppingCartReducer = new ShoppingCartReducer(this);
    this.authorizationReducer = new AuthorizationReducer(this);

    this.reducer = combineReducers({
      filters: this.filtersReducer.reduce,
      products: this.productsReducer.reduce,
      pagination: this.paginationReducer.reduce,
      shoppingCart: this.shoppingCartReducer.reduce,
      authorization: this.authorizationReducer.reduce,
    });
  }
}

export default StoreManager;
