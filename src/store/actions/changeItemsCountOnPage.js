const changeItemsCountOnPage = function (itemsCount) {
  return {
    type: "change_items_count_on_page",
    itemsCount,
  }
};

export default changeItemsCountOnPage;