import ReactDOM from "react-dom";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

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
            <React.Fragment>
                <Header />
                <RoomInfoList />
                <Footer />
            </React.Fragment>
        );
    }
}

const initialState = {
    pagination: {
        pageNumber: 2,
        itemsCount: 3,
        totalItemsCount: require("../room-info-list/data.json").roomsInfo.length,
    },
};

const store = createStore((state = initialState, action) => {
    switch (action.type) {
        case "INIT_STATE": {
            return state;
            break;
        }
        case "CHANGE_PAGE": {
            const updatedState = {
                pagination: {
                    pageNumber: action.pageNumber,
                    itemsCount: state.pagination.itemsCount,
                    totalItemsCount: state.pagination.totalItemsCount,
                },
            };
            return updatedState;
            break;
        }
        default:
            return state;
            break;
    }
});

store.dispatch({
    type: "INIT_STATE",
    state: initialState,
});

const targetElement = document.querySelector(".app")
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    targetElement
);