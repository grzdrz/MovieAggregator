function createItem(product) {
  return {
    type: 'CREATE',
    product,
  };
}

export default createItem;
