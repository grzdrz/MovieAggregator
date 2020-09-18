import Reducer from '../reducer';

const initialState = {
  sorters: [
    'price',
  ],
  byCategory: [
    'meat',
    'fish',
    'milk',
    'fruit',
    'berry',
  ],
};

class FiltersReducer extends Reducer {
  constructor(reducerManager, state = { ...initialState }) {
    super(reducerManager, state);
  }

  reduce = (state = this.state, action) => {
    this.state = { ...state };
    switch (action.type) {
      case 'BY_CATEGORY': {
        this.state.byCategory = [...action.filter];
        // this.onStateChange.invoke();
        return this.state;
      }
      case 'SORTERS': {
        this.state.sorters = [...action.sorters];
        return this.state;
      }
      default: {
        return this.state;
      }
    }
  }
}

export default FiltersReducer;
