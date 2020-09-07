import React from 'react';
import { connect } from 'react-redux';

import changeCurrentPage from '../../store/actions/changeCurrentPage';
import createItem from '../../store/actions/roomsInfoActions/createItem';
import deleteItem from '../../store/actions/roomsInfoActions/deleteItem';
import updateItem from '../../store/actions/roomsInfoActions/updateItem';
import sorter from '../../store/actions/filtersActions/sorter';
import filterByCategory from '../../store/actions/filtersActions/filterByCategory';
import shoppingCartPlusAction from '../../store/actions/shoppingCart/shoppingCartPlusAction';
import shoppingCartMinusAction from '../../store/actions/shoppingCart/shoppingCartMinusAction';

import CreateButton from '../../components/create-button/create-button.jsx';
import SorterForm from '../../components/sorter-form/sorter-form.jsx';
import ProductShortInfo from '../../components/product-short-info/product-short-info.jsx';
import Pagination from '../../components/pagination/pagination.jsx';

import './products-list.scss';

class ProductsList extends React.Component {
  selectProductsForPage(products, pageNumber) {
    const { pagination } = this.props;
    const { itemsCountOnPage } = pagination;

    const maxProducts = pageNumber * itemsCountOnPage;
    const result = products.filter((product, index) => index >= maxProducts - itemsCountOnPage && index < maxProducts);
    return result;
  }

  render() {
    const {
      products,
      pagination,
      createItem,
      sorter,
      filterByCategory,
      /* sorters, */
      filters,
      updateItem,
      shoppingCart,
      shoppingCartPlusAction,
      shoppingCartMinusAction,
      changeCurrentPage,
    } = this.props;

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
              /* sorters={sorters} */
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
                  shoppingCart={shoppingCart.chosenProducts}
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
