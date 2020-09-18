function changeCurrentPageAction(pageNumber) {
  return {
    type: 'CHANGE_CURRENT_PAGE',
    pageNumber,
  };
}

export default changeCurrentPageAction;
