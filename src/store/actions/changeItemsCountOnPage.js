const changeItemsCountOnPage = function (pageNumber) {
    return {
        type: "change_items_count_on_page",
        pageNumber,
    }
};

export default changeItemsCountOnPage;