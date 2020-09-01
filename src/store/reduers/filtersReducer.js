const initialState = {
  byCategory: [
    "meat",
    "fish",
    /* "milk",
    "fruit",
    "berry", */
  ],
};

function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case "BY_CATEGORY": {
      const stateCopy = { ...state };
      stateCopy.byCategory = [...action.filter];
      return stateCopy;
      break;
    }
    default: {
      return state;
      break;
    }
  }
}

export default filtersReducer;
