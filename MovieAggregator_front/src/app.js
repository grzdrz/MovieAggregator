import ReactDOM from "react-dom";
import React from "react";

import Header from "./components/header/header.js";
import RoomInfo from "./components/room-info/room-info.js";
import Pagination from "./components/pagination/pagination.js";
import Footer from "./components/footer/footer.js";

import "./app.scss";

require.context("./", true, /\.(ttf|eot|woff|woff2|svg|png|jpg)$/);

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Header appState={this.state} />
                <div className="app__room-list">
                    <RoomInfo
                        url="#"
                        blockNumber={0}
                        photos={["test11", "test22", "test33", "test44"]}
                        numberOfCheckedStar={4}
                        reviewsCount={11}
                        roomNumber={789}
                        roomStatus="люкс"
                        roomPrice={12345}
                        currencyType="$"
                    />
                </div>
                <div className="app__pagination">
                    <Pagination
                        title="Pagination"
                        curPageNumber={1}
                        pagesCount={15}
                        itemsCount={180}
                    />
                </div>
                <Footer appState={this.state} />
            </React.Fragment>
        );
    }
}

const targetElement = document.querySelector(".app")
ReactDOM.render(
    <App />,
    targetElement
);