import ReactDOM from "react-dom";
import React from "react";

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
                <Header appState={this.state} />
                <RoomInfoList appState={this.state} />
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