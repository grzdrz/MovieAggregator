import React from 'react';
import PropTypes from 'prop-types';

import CreateButton from '../../components/create-button/create-button.jsx';
import SorterForm from '../../components/sorter-form/sorter-form.jsx';
import ProductShortInfo from '../../components/product-short-info/product-short-info.jsx';
import Pagination from '../../components/pagination/pagination.jsx';

import ProductsType from '../../store/Products/ProductsType';
import PaginationType from '../../store/Pagination/PaginationType';
import FiltersType from '../../store/Filters/FilersType';
import ShoppingCartType from '../../store/ShoppingCart/ShoppingCartType';
import AuthorizationType from '../../store/Authorization/AuthorizationType';
import defaultProducts from '../../store/Products/initialState';
import defaultPagination from '../../store/Pagination/initialState';
import defaultFilters from '../../store/Filters/initialState';
import defaultShoppingCart from '../../store/ShoppingCart/initialState';
import defaultAuthorization from '../../store/Authorization/initialState';

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
                chosenProducts={shoppingCart.chosenProducts}
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

ProductsList.propTypes = {
  products: ProductsType,
  pagination: PaginationType,
  filters: FiltersType,
  shoppingCart: ShoppingCartType,
  authorization: AuthorizationType,
  createItemAction: PropTypes.func,
  sorterAction: PropTypes.func,
  filterByCategoryAction: PropTypes.func,
  updateItemAction: PropTypes.func,
  deleteItemAction: PropTypes.func,
  shoppingCartPlusAction: PropTypes.func,
  shoppingCartMinusAction: PropTypes.func,
  changeCurrentPageAction: PropTypes.func,
};

ProductsList.defaultProps = {
  products: defaultProducts,
  pagination: defaultPagination,
  filters: defaultFilters,
  shoppingCart: defaultShoppingCart,
  authorization: defaultAuthorization,
  createItemAction: () => { },
  sorterAction: () => { },
  filterByCategoryAction: () => { },
  updateItemAction: () => { },
  deleteItemAction: () => { },
  shoppingCartPlusAction: () => { },
  shoppingCartMinusAction: () => { },
  changeCurrentPageAction: () => { },
};

export default ProductsList;
