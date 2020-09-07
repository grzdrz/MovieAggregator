import Reducer from './reducer';

const initialState = [
  'price',
];

class SortersReducer extends Reducer {
  constructor(reducerManager) {
    super(reducerManager);
    this.state = [...initialState];
  }

  reduce = (state = this.state, action) => {
    if (action.sorters) return [...action.sorters];
    return state;
  }
}

export default SortersReducer;
