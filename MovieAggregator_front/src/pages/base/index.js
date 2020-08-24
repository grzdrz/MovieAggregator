import ReactDOM from "react-dom";
import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";

/* import initialState from "../../store/initialState"; */
import paginationReducer from "../../store/reduers/paginationReducer";

import Header from "../../components/header/header.js";
import RoomInfoList from "../room-info-list/room-info-list.js";
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
        <Route
          exact path="/page/:pageNumber(\d+)?"
          render={(props) => {
            let pageNumber = props.match.params.pageNumber;
            if (pageNumber !== undefined) pageNumber = Number.parseInt(pageNumber);
            return (
              <React.Fragment>
                <Header />
                <RoomInfoList pageNumber={pageNumber !== undefined ? pageNumber : 1} />
                <Footer />
              </React.Fragment>
            );
          }}
        />
      </Switch>
    );
  }
}

const reducer = combineReducers({
  pagination: paginationReducer,
  /* counterState: counterReducer */
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
        <Route path="/page" component={App} />
      </Switch>
    </Router>
  </Provider>,
  targetElement
);