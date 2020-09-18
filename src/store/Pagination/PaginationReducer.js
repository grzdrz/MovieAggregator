import Reducer from '../reducer';

const initialState = {
  itemsCountOnPage: 9,
  pageNumber: 1,
  pagesCount: 0,
  productsOfPage: [],
};

class PaginationReducer extends Reducer {
  constructor(reducerManager, state = { ...initialState }) {
    super(reducerManager, state);
  }

  validatePageNummber() {
    if (this.state.pageNumber > this.state.pagesCount) return this.state.pagesCount;
    if (this.state.pageNumber <= 0) return 1;
    return this.state.pageNumber;
  }

  calculatePagesCount() {
    const { itemsCountOnPage } = this.state;
    const { activeProducts } = this.reducerManager.productsReducer.state;
    const totalItemsCount = activeProducts.length;

    const test = totalItemsCount / itemsCountOnPage;
    const test2 = `${test}`;
    const test3 = test2.split(/\.|\,/);
    if (test3.length < 2) return test;
    const n1 = Number.parseInt(test3[0], 10);
    return n1 + 1;
  }

  selectProductsForPage = () => {
    const { itemsCountOnPage, pageNumber } = this.state;
    const { activeProducts } = this.reducerManager.productsReducer.state;

    const maxProducts = pageNumber * itemsCountOnPage;
    const result = activeProducts.filter((product, index) => index >= maxProducts - itemsCountOnPage && index < maxProducts);
    return result;
  }

  reduce = (state = this.state, action) => {
    this.state = { ...state };

    switch (action.type) {
      case 'CHANGE_CURRENT_PAGE': {
        this.state.pageNumber = action.pageNumber;
        break;
      }
      default:
        break;
    }

    this.state.pagesCount = this.calculatePagesCount();
    this.state.pageNumber = this.validatePageNummber();
    this.state.productsOfPage = this.selectProductsForPage();

    return this.state;
  }
}

export default PaginationReducer;
