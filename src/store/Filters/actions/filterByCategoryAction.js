function filterByCategoryAction(filter) {
  return {
    type: 'BY_CATEGORY',
    filter,
  };
}

export default filterByCategoryAction;
