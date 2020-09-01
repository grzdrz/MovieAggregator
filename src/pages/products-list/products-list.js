import React from "react";
import { connect } from "react-redux";
import changeItemsCountOnPage from "../../store/actions/changeItemsCountOnPage";
import createItem from "../../store/actions/roomsInfoActions/createItem";
import deleteItem from "../../store/actions/roomsInfoActions/deleteItem";
import updateItem from "../../store/actions/roomsInfoActions/updateItem";
import sorter from "../../store/actions/sortersActions/sorter";

import CreateButton from "../../components/create-button/create-button";
import SorterForm from "../../components/sorter-form/sorter-form";
import CheckboxList from "../../components/checkbox-list/checkbox-list";
import ProductShortInfo from "../../components/product-short-info/product-short-info";
import Pagination from "../../components/pagination/pagination";

import "./products-list.scss";

class ProductsList extends React.Component {
  constructor(props) {
    super(props);
  }

  getProducts() {
    let { pagination, products, sorters, pageNumber } = this.props;
    const { itemsCountOnPage } = pagination;
    const totalItemsCount = products.length;

    const t1 = pageNumber * itemsCountOnPage;

    if (sorters.length !== 0) products = this.sortProducts(products, sorters);

    const result = products.filter((product, index) =>
      (index >= t1 - itemsCountOnPage && index < t1)
    );
    return result;
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
    }
  }

  calculatePagesCount() {
    const { pagination, products, pageNumber } = this.props;
    const { itemsCountOnPage } = pagination;
    const totalItemsCount = products.length;

    const test = totalItemsCount / itemsCountOnPage;
    const test2 = `${test}`;
    const test3 = test2.split(/\.|\,/);
    if (test3.length < 2) return test;
    const n1 = Number.parseInt(test3[0]);
    /* const n2 = Number.parseInt(test3[1]);
    if (n2 === 0) return n1; */
    return n1 + 1;
  }

  /* handlerChangePage = (pageNumber) => {
      this.props.changePage(pageNumber);
  } */

  render() {
    const { pagination, products, pageNumber } = this.props;
    const { itemsCountOnPage } = pagination;
    const totalItemsCount = products.length;

    return (
      <div className="products-list">
        <div className="products-list__filters-and-sorters">
          <div className="products-list__create-button">
            <CreateButton createItem={this.props.createItem} />
          </div>
          <div className="products-list__sorter-form">
            <SorterForm sorter={this.props.sorter} sorters={this.props.sorters} />
          </div>
        </div>
        <div className="products-list__list">
          <div className="products-list__products">
            {this.getProducts().map((product, index) => {
              return (
                <div className="products-list__item" key={`products-list__item-${product.id}`}>
                  <ProductShortInfo
                    product={product}
                    updateItem={this.props.updateItem} />
                </div>
              );
            })}
          </div>
          <div className="products-list__pagination">
            <Pagination
              title="Pagination"
              pageNumber={pageNumber}
              pagesCount={this.calculatePagesCount()}
              totalItemsCount={totalItemsCount}
            /* handlerChangePage={this.handlerChangePage} */
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return state;
}

const actions = {
  changeItemsCountOnPage,
  createItem,
  updateItem,
  deleteItem,
  sorter,
};

export default connect(mapStateToProps, actions)(ProductsList);
