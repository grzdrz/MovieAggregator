import Reducer from './reducer';

const initialState = {
  byCategory: [
    'meat',
    'fish',
    'milk',
    'fruit',
    'berry',
  ],
};

class FiltersReducer extends Reducer {
  constructor(reducerManager) {
    super(reducerManager);
    this.state = { ...initialState };
  }

  reduce = (state = this.state, action) => {
    this.state = { ...state };
    switch (action.type) {
      case 'BY_CATEGORY': {
        this.state.byCategory = [...action.filter];

        // this.onStateChange.invoke();

        return this.state;
      }
      default: {
        return this.state;
      }
    }
  }
}

export default FiltersReducer;
