const initialState = {
  itemsCountOnPage: 9,
};

const paginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "change_items_count_on_page": {
      const updatedState = {
        itemsCountOnPage: action.itemsCountOnPage,
      };
      return updatedState;
      break;
    }
    default:
      return state;
      break;
  }
};

export default paginationReducer;
