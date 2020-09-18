function createItemAction(product) {
  return {
    type: 'CREATE',
    product,
  };
}

export default createItemAction;
