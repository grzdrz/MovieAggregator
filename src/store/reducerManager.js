import { combineReducers } from 'redux';

import PaginationReducer from './Pagination/PaginationReducer';
import ProductsReducer from './Products/ProductsReducer';
import FiltersReducer from './Filters/FiltersReducer';
import ShoppingCartReducer from './ShoppingCart/ShoppingCartReducer';
import AuthorizationReducer from './Authorization/AuthorizationReducer';

class ReducerManager {
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

export default ReducerManager;
