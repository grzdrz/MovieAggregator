function deleteItem(productId) {
  return {
    type: 'DELETE',
    productId,
  };
}

export default deleteItem;
