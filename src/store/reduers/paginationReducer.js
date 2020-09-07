import Reducer from './reducer';

const initialState = {
  itemsCountOnPage: 9,
  pageNumber: 1,
  pagesCount: 0,
};

class PaginationReducer extends Reducer {
  constructor(reducerManager) {
    super(reducerManager);
    this.state = { ...initialState };
  }

  validatePageNummber() {
    if (this.state.pageNumber > this.state.pagesCount) return this.state.pagesCount;
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

  reduce = (state = this.state, action) => {
    this.state = { ...state };
    this.state.pagesCount = this.calculatePagesCount();
    this.state.pageNumber = this.validatePageNummber();

    switch (action.type) {
      case 'CHANGE_CURRENT_PAGE': {
        this.state.pageNumber = action.pageNumber;
        return this.state;
      }
      default:
        return this.state;
    }
  }
}

export default PaginationReducer;
