const initialState = [
  "price",
];

const sortersReducer = (state = initialState, action) => {
  if (action.sorters) return [...action.sorters];
  return state;
};

export default sortersReducer;