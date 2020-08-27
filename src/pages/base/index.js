import ReactDOM from "react-dom";
import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";

import paginationReducer from "../../store/reduers/paginationReducer";
import productsReducer from "../../store/reduers/productsReducer";

import Header from "../../components/header/header.js";
import ProductsList from "../products-list/products-list.js";
import ProductDetails from "../product-details/product-details";
import Footer from "../../components/footer/footer.js";

import "./base.scss";

require.context("../../", true, /\.(ttf|eot|woff|woff2|svg|png|jpg|json)$/);

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/page-details/:productId(\d+)?"
          render={(props) => {
            const productId = props.match.params.productId;
            const id = Number.parseInt(productId ? productId : 0, 10);
            return (
              <ProductDetails
                id={id}
              />
            );
          }} />
        <Route
          exact path="/:pageNumber(\d+)?"
          render={(props) => {
            let pageNumber = props.match.params.pageNumber;
            if (pageNumber !== undefined) pageNumber = Number.parseInt(pageNumber);
            return (
              <>
                <Header />
                <ProductsList pageNumber={pageNumber !== undefined ? pageNumber : 1} />
                <Footer />
              </>
            );
          }}
        />
      </Switch>
    );
  }
}

const reducer = combineReducers({
  pagination: paginationReducer,
  products: productsReducer,
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
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>,
  targetElement
);
