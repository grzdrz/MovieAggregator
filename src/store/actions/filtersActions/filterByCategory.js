function filterByCategory(filter) {
  return {
    type: 'BY_CATEGORY',
    filter,
  };
}

export default filterByCategory;
