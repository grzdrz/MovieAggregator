const initialState = require("../../data/productData.json").products;
const initialProduct = {
  "id": 3,
  "name": "Навоз",
  "price": 543,
  "currencyType": "₽",
  "descriptions": "выпаыпываыпвпап",
  "manufacturer": "ООО Четотам",
  "energyValue": 34,
  "proteins": 0.8,
  "fats": 0.2,
  "carbohydrates": 8,
  "energyUnits": "кКал",
  "weightUnits": "г",
  "shelfLife": 7,
  "shelfLifeUnits": "день",
  "packaging": "amount",
  "imageNames": [
    6, 1, 11
  ],
  "checkedStars": 2,
  "reviewsCount": 3534
};

function productsReducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE": {
      const newItem = createItem(action.product, state);
      if (newItem) {
        const newState = state.map(e => e);
        newState.push(newItem);
        //обновляем б/д файл
        /* const newData = JSON.stringify({
          products: state.products,
        }); */
        // ...
        return newState;
      }
      break;
    }
    case "UPDATE": {
      if (action.product) {
        const updatedProducts = updateItem(action.product, state);
        return updatedProducts;
      }
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

function createItem(product, blocks) {
  // const blocks = require("../../data/productData.json").products;
  if (product) {
    const result = { ...initialProduct };
    for (let propertyName in product) {
      result[propertyName] = product[propertyName];
    }
    result.id = findMaxId(blocks) + 1;
    return result;
  }
}

function updateItem(product, blocks) {
  // const blocks = require("../../data/productData.json").products;
  const result = blocks.map((block, index) => {
    if (block.id === Number.parseFloat(product.id)) {
      const copyOfBlock = { ...block };
      for (let propertyName in product) {
        copyOfBlock[propertyName] = product[propertyName];
      }
      return copyOfBlock;
    };
    return block;
  });

  return result;
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

export default productsReducer;

/* {
  "id": 3,
  "name": "Навоз",
  "price": 543,
  "currencyType": "₽",
  "descriptions": "выпаыпываыпвпап",
  "manufacturer": "ООО Четотам",
  "energyValue": 34,
  "proteins": 0.8,
  "fats": 0.2,
  "carbohydrates": 8,
  "energyUnits": "кКал",
  "weightUnits": "г",
  "shelfLife": 7,
  "shelfLifeUnits": "день",
  "packaging": "amount",
  "imageNames": [
    6
  ],
  "checkedStars": 2,
  "reviewsCount": 3534
}, */
