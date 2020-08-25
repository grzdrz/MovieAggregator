function createItem(roomInfo) {
  return {
    type: "CREATE",
    roomInfo,
  };
}

export default createItem;
