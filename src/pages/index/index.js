import ReactDOM from "react-dom";
import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, NavLink, Link, Redirect } from "react-router-dom";

import paginationReducer from "../../store/reduers/paginationReducer";
import productsReducer from "../../store/reduers/productsReducer";
import sortersReducer from "../../store/reduers/sortersReducer";
import filtersReducer from "../../store/reduers/filtersReducer";
import shoppingCartReducer from "../../store/reduers/shoppingCartReducer";

import Header from "../../components/header/header.js";
import ProductsList from "../products-list/products-list.js";
import ProductDetails from "../product-details/product-details";
import Footer from "../../components/footer/footer.js";

import "../base/base.scss";
import "./index.scss";

require.context("../../", true, /\.(ttf|eot|woff|woff2|svg|png|jpg|json)$/);

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route path="/ProductSupermarket/pageDetails/:productId(\d+)?"
            render={(props) => {
              const productId = props.match.params.productId;
              const id = Number.parseInt(productId ? productId : 0, 10);
              return (
                <ProductDetails id={id} />
              );
            }} />
          <Route path="/ProductSupermarket/productList/:pageNumber(\d+)?"
            render={(props) => {
              let pageNumber = props.match.params.pageNumber;
              if (pageNumber !== undefined) pageNumber = Number.parseInt(pageNumber);
              return (
                <ProductsList pageNumber={pageNumber !== undefined ? pageNumber : 1} />
              );
            }}
          />
        </Switch>
        <Footer />
      </>
    );
  }
}

const reducer = combineReducers({
  pagination: paginationReducer,
  products: productsReducer,
  sorters: sortersReducer,
  filters: filtersReducer,
  shoppingCart: shoppingCartReducer,
});

const store = createStore(reducer);
store.dispatch({
  type: "default",
});

const targetElement = document.querySelector(".app")
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/ProductSupermarket" />} />
        <Route path="/ProductSupermarket/" component={App} />
      </Switch>
    </Router>
  </Provider>,
  targetElement
);
