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
    createItem,
    sorter,
    filterByCategory,
    filters,
    updateItem,
    deleteItem,
    shoppingCart,
    shoppingCartPlusAction,
    shoppingCartMinusAction,
    changeCurrentPage,
  } = props;

  const { activeProducts } = products;
  const { pagesCount, pageNumber, productsOfPage } = pagination;
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
                updateItem={updateItem}
                deleteItem={deleteItem}
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

const mapStateToProps = function (state) {
  return state;
};

export default connect(mapStateToProps, actions)(ProductsList);
