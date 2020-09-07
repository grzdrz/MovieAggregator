const changeCurrentPage = function (pageNumber) {
  return {
    type: 'CHANGE_CURRENT_PAGE',
    pageNumber,
  };
};

export default changeCurrentPage;
