function deleteItemAction(productId) {
  return {
    type: 'DELETE',
    productId,
  };
}

export default deleteItemAction;
