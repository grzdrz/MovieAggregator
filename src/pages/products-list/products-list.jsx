import React from 'react';
import { connect } from 'react-redux';

import actions from './actions';

import CreateButton from '../../components/create-button/create-button.jsx';
import SorterForm from '../../components/sorter-form/sorter-form.jsx';
import ProductShortInfo from '../../components/product-short-info/product-short-info.jsx';
import Pagination from '../../components/pagination/pagination.jsx';

import './products-list.scss';

function ProductsList(props) {
  const {
    products,
    pagination,
    filters,
    shoppingCart,
    authorization,
    createItemAction,
    sorterAction,
    filterByCategoryAction,
    updateItemAction,
    deleteItemAction,
    shoppingCartPlusAction,
    shoppingCartMinusAction,
    changeCurrentPageAction,
  } = props;

  const { activeProducts } = products;
  const { pagesCount, pageNumber, productsOfPage } = pagination;
  const totalItemsCount = activeProducts.length;

  return (
    <div className='products-list'>
      <div className='products-list__filters-and-sorters'>
        {authorization.cookie
          ? (
            <div className='products-list__create-button'>
              <CreateButton createItemAction={createItemAction} />
            </div>
          ) : null}
        <div className='products-list__sorter-form'>
          <SorterForm
            sorterAction={sorterAction}
            filterByCategoryAction={filterByCategoryAction}
            filters={filters}
          />
        </div>
      </div>
      <div className='products-list__list'>
        <div className='products-list__products'>
          {productsOfPage.map((product) => (
            <div className='products-list__item' key={`products-list__item-${product.id}`}>
              <ProductShortInfo
                product={product}
                updateItemAction={updateItemAction}
                deleteItemAction={deleteItemAction}
                shoppingCart={shoppingCart.chosenProducts}
                shoppingCartPlusAction={shoppingCartPlusAction}
                shoppingCartMinusAction={shoppingCartMinusAction}
                cookie={authorization.cookie}
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
                changeCurrentPageAction={changeCurrentPageAction}
              />
            ) : null}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = function (state) {
  return state;
};

export default connect(mapStateToProps, actions)(ProductsList);
