const initialState = [
  "price",
];

const sortersReducer = (state = initialState, action) => {
  if (action.sorters) return [...action.sorters];
  return initialState;
};

export default sortersReducer;