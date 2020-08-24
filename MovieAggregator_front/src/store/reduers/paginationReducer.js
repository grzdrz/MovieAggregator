import initialState from "../initialState";

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
      const defaultState = {
        itemsCountOnPage: 5,
      };
      return defaultState;
      break;
  }
};

export default paginationReducer;
