import React from "react";
import { connect } from "react-redux";
import changeItemsCountOnPage from "../../store/actions/changeItemsCountOnPage";
import createItem from "../../store/actions/roomsInfoActions/createItem";
import deleteItem from "../../store/actions/roomsInfoActions/deleteItem";
import updateItem from "../../store/actions/roomsInfoActions/updateItem";

import CreateButton from "../../components/create-button/create-button";
import ProductShortInfo from "../../components/product-short-info/product-short-info";
import Pagination from "../../components/pagination/pagination";

import "./products-list.scss";

class ProductsList extends React.Component {
  constructor(props) {
    super(props);
  }

  getProducts() {
    const { pagination, products, pageNumber } = this.props;
    const { itemsCountOnPage } = pagination;
    const totalItemsCount = products.length;

    const t1 = pageNumber * itemsCountOnPage;
    const result = products.filter((product, index) =>
      (index >= t1 - itemsCountOnPage && index < t1)
    );
    return result;
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
        <div className="products-list__room-list">
          <div className="products-list__create-button">
            <CreateButton createItem={this.props.createItem} />
          </div>
          {this.getProducts().map((product, index) => {
            return (
              <div className="products-list__list-item" key={`products-list__list-item-${pageNumber}-${index}`}>
                <ProductShortInfo product={product} />
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
    );
  }
}

const mapStateToProps = function (state) {
  return state;
}

const actions = {
  changeItemsCountOnPage,
  createItem,
  deleteItem,
  updateItem,
};

export default connect(mapStateToProps, actions)(ProductsList);
