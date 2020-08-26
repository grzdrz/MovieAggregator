const initialState =  require("../../data/data.json").roomsInfo;

function roomsInfoReducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE": {
      const newItem = createItem(action.roomInfo);
      if (newItem) {
        //обновляем стэйт
        const newState = Object.assign({}, state);
        newState.roomsInfo.push(newItem);
        //обновляем б/д файл
        /* const newData = JSON.stringify({
          roomsInfo: state.roomsInfo,
        }); */
        // ...
        return newState;
      }
      break;
    }
    case "UPDATE": {

      break;
    }
    case "DELETE": {

      break;
    }
    default: {
      return state;
      break;
    }
  }
}

function createItem(roomInfo) {
  const blocks = require("../../data/data.json").roomsInfo;
  if (roomInfo) {
    const result = {
      id: findMaxId(blocks) + 1,
      photosCount: roomInfo.photosCount !== undefined ? roomInfo.photosCount : initialState.photosCount,
      number: roomInfo.number !== undefined ? roomInfo.number : initialState.number,
      status: roomInfo.status !== undefined ? roomInfo.status : initialState.status,
      price: roomInfo.price !== undefined ? roomInfo.price : initialState.price,
      currencyType: roomInfo.currencyType !== undefined ? roomInfo.currencyType : initialState.currencyType,
      reviewsCount: roomInfo.reviewsCount !== undefined ? roomInfo.reviewsCount : initialState.reviewsCount,
      checkedStarIndex: roomInfo.checkedStarIndex !== undefined ? roomInfo.checkedStarIndex : initialState.checkedStarIndex,
      url: roomInfo.url !== undefined ? roomInfo.url : initialState.url,
    };
    return result;
  }
}

function findMaxId(blocks) {
  const arrayOfId = blocks.map((block) => {
    return Number.parseInt(block.id);
  });
  const firstId = arrayOfId[0] !== undefined ? arrayOfId[0] : 0;
  const biggestId = arrayOfId.reduce((prevId, curId) => {
    return Math.max(prevId, curId);
  }, firstId);

  return biggestId;
}

export default roomsInfoReducer;
