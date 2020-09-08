function updateItem(product) {
  return {
    type: 'UPDATE',
    product,
  };
}

export default updateItem;
