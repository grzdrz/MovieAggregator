import React from 'react';
import { connect } from 'react-redux';

import changeCurrentPage from '../../store/actions/changeCurrentPage';
import createItem from '../../store/actions/roomsInfoActions/createItem';
import deleteItem from '../../store/actions/roomsInfoActions/deleteItem';
import updateItem from '../../store/actions/roomsInfoActions/updateItem';
import sorter from '../../store/actions/sortersActions/sorter';
import filterByCategory from '../../store/actions/filtersActions/filterByCategory';
import shoppingCartPlusAction from '../../store/actions/shoppingCart/shoppingCartPlusAction';
import shoppingCartMinusAction from '../../store/actions/shoppingCart/shoppingCartMinusAction';

import CreateButton from '../../components/create-button/create-button.jsx';
import SorterForm from '../../components/sorter-form/sorter-form.jsx';
import ProductShortInfo from '../../components/product-short-info/product-short-info.jsx';
import Pagination from '../../components/pagination/pagination.jsx';

import './products-list.scss';

class ProductsList extends React.Component {
  /* filterAndSortProducts() {
    let {
      products,
      sorters,
      filters,
    } = this.props;

    if (sorters.length !== 0) products = this.sortProducts(products, sorters);
    if (filters.byCategory.length !== 0) products = this.filterProductsByCategory(products, filters.byCategory);

    return products;
  } */

  /*   validatePageNummber(pagesCount, pageNumber) {
      if (pageNumber >= pagesCount) return pagesCount;
      return pageNumber;
    } */

  selectProductsForPage(products, pageNumber) {
    let {
      pagination,
    } = this.props;
    const { itemsCountOnPage } = pagination;

    const maxProducts = pageNumber * itemsCountOnPage;
    const result = products.filter((product, index) => index >= maxProducts - itemsCountOnPage && index < maxProducts);
    return result;
  }

  /* sortProducts(products, sorters) {
    let productsCopy = [...products];
    sorters.forEach((sorterName) => {
      const comparer = this.makeObjectComparer(sorterName);
      productsCopy = productsCopy.sort(comparer);
    });
    return productsCopy;
  } */

  /* filterProductsByCategory(products, filter) {
    let productsCopy = [...products];
    productsCopy = productsCopy.filter((product) => {
      if (filter.includes(product.category)) return product;
    });
    return productsCopy;
  } */

  /* makeObjectComparer(propertyName) {
    return (objectA, objectB) => {
      if (objectA[propertyName] < objectB[propertyName]) {
        return -1;
      }
      if (objectA[propertyName] > objectB[propertyName]) {
        return 1;
      }
      return 0;
    };
  } */

  /* calculatePagesCount(products) {
    const { pagination } = this.props;
    const { itemsCountOnPage } = pagination;
    const totalItemsCount = products.length;

    const test = totalItemsCount / itemsCountOnPage;
    const test2 = `${test}`;
    const test3 = test2.split(/\.|\,/);
    if (test3.length < 2) return test;
    const n1 = Number.parseInt(test3[0], 10);
    return n1 + 1;
  } */

  render() {
    const {
      products,
      pagination,
      /* pageNumber, */
      createItem,
      sorter,
      filterByCategory,
      sorters,
      filters,
      updateItem,
      shoppingCart,
      shoppingCartPlusAction,
      shoppingCartMinusAction,
      changeCurrentPage,
    } = this.props;

    /* const products = this.filterAndSortProducts(); */
    const { activeProducts } = products;
    const { pagesCount, pageNumber } = pagination;
    const productsForPage = this.selectProductsForPage(activeProducts, pageNumber);
    const totalItemsCount = activeProducts.length;

    return (
      <div className='products-list'>
        <div className='products-list__filters-and-sorters'>
          <div className='products-list__create-button'>
            <CreateButton createItem={createItem} />
          </div>
          <div className='products-list__sorter-form'>
            <SorterForm
              sorter={sorter}
              filterByCategory={filterByCategory}
              sorters={sorters}
              filters={filters}
            />
          </div>
        </div>
        <div className='products-list__list'>
          <div className='products-list__products'>
            {productsForPage.map((product) => (
              <div className='products-list__item' key={`products-list__item-${product.id}`}>
                <ProductShortInfo
                  product={product}
                  updateItem={updateItem}
                  shoppingCart={shoppingCart}
                  shoppingCartPlusAction={shoppingCartPlusAction}
                  shoppingCartMinusAction={shoppingCartMinusAction}
                />
              </div>
            ))}
          </div>
          <div className='products-list__pagination'>
            {totalItemsCount > 0
              ? (
                <Pagination
                  title='Pagination'
                  pageNumber={pageNumber}
                  pagesCount={pagesCount}
                  totalItemsCount={totalItemsCount}
                  changeCurrentPage={changeCurrentPage}
                />
              ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return state;
};

const actions = {
  changeCurrentPage,
  createItem,
  updateItem,
  deleteItem,
  sorter,
  filterByCategory,
  shoppingCartPlusAction,
  shoppingCartMinusAction,
};

export default connect(mapStateToProps, actions)(ProductsList);
