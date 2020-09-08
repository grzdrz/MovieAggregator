import Reducer from './reducer';

const allProducts = require('../../data/productData.json').products;

const initialState = {
  allProducts,
  activeProducts: [],
};

const baseProduct = {
  name: 'Чевапчичи',
  price: 543,
  currencyType: '₽',
  descriptions: 'выпаыпываыпвпап',
  manufacturer: 'ООО Четотам',
  energyValue: 34,
  proteins: 0.8,
  fats: 0.2,
  carbohydrates: 8,
  energyUnits: 'кКал',
  weightUnits: 'г',
  shelfLife: 7,
  shelfLifeUnits: 'день',
  packaging: 'amount',
  imageNames: [],
  checkedStars: 2,
  reviewsCount: 3534,
  category: 'meat',
};

class ProductsReducer extends Reducer {
  constructor(reducerManager, state = { ...initialState }) {
    super(reducerManager, state);
  }

  createItem(product) {
    if (product) {
      const result = { ...baseProduct };
      const productKeys = Object.keys(product);
      productKeys.forEach((key) => {
        result[key] = product[key];
      });
      result.id = this.findMaxId(this.state.allProducts) + 1;
      return result;
    }
    return undefined;
  }

  updateItem(product) {
    const result = this.state.allProducts.map((block) => {
      if (block.id === Number.parseFloat(product.id)) {
        const blockCopy = { ...block };
        const productKeys = Object.keys(product);
        productKeys.forEach((key) => {
          blockCopy[key] = product[key];
        });
        return blockCopy;
      }
      return block;
    });

    return result;
  }

  findMaxId(blocks) {
    const arrayOfId = blocks.map((block) => Number.parseInt(block.id, 10));
    const firstId = arrayOfId[0] !== undefined ? arrayOfId[0] : 0;
    const biggestId = arrayOfId.reduce((prevId, curId) => Math.max(prevId, curId), firstId);
    return biggestId;
  }

  filterProductsByCategory(products, filter) {
    let productsCopy = [...products];
    productsCopy = productsCopy.filter((product) => filter.includes(product.category));
    return productsCopy;
  }

  sortProducts(products, sorters) {
    let productsCopy = [...products];
    sorters.forEach((sorterName) => {
      const comparer = this.makeObjectComparer(sorterName);
      productsCopy = productsCopy.sort(comparer);
    });
    return productsCopy;
  }

  makeObjectComparer(propertyName) {
    return (objectA, objectB) => {
      if (objectA[propertyName] < objectB[propertyName]) {
        return -1;
      }
      if (objectA[propertyName] > objectB[propertyName]) {
        return 1;
      }
      return 0;
    };
  }

  obtainActiveProducts() {
    let products = [...this.state.allProducts];
    const filters = this.reducerManager.filtersReducer.state;

    if (filters.sorters.length !== 0) products = this.sortProducts(products, filters.sorters);
    if (filters.byCategory.length !== 0) products = this.filterProductsByCategory(products, filters.byCategory);

    return products;
  }

  reduce = (state = this.state, action) => {
    this.state = { ...state };

    switch (action.type) {
      case 'CREATE': {
        const newItem = this.createItem(action.product);
        this.state.allProducts.push(newItem);
        // обновляем б/д файл
        // const newData = JSON.stringify({
        //   products: state.products,
        // });
        break;
      }
      case 'UPDATE': {
        const updatedProducts = this.updateItem(action.product);
        this.state.allProducts = updatedProducts;
        break;
      }
      /* case 'DELETE': {
        break;
      } */
      default: {
        break;
      }
    }

    this.state.activeProducts = this.obtainActiveProducts();
    return this.state;
  }
}

export default ProductsReducer;

/* {
  'id': 3,
  'name': 'Навоз',
  'price': 543,
  'currencyType': '₽',
  'descriptions': 'выпаыпываыпвпап',
  'manufacturer': 'ООО Четотам',
  'energyValue': 34,
  'proteins': 0.8,
  'fats': 0.2,
  'carbohydrates': 8,
  'energyUnits': 'кКал',
  'weightUnits': 'г',
  'shelfLife': 7,
  'shelfLifeUnits': 'день',
  'packaging': 'amount',
  'imageNames': [
    6
  ],
  'checkedStars': 2,
  'reviewsCount': 3534
}, */
