import "./app.scss";

import ReactDOM from "react-dom";
import React from "react";
/* import {
    HashRouter,
    Switch,
    Route,
    Link,
    NavLink,
    Redirect
} from "react-router-dom"; */

/* import Header from "./components/Header";
import Content from "./components/Content"; */
import Footer from "./components/footer.js";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.updateClientRoleAndStatus = this.updateClientRoleAndStatus.bind(this);
        this.state = {
            updateClientRoleAndStatus: this.updateClientRoleAndStatus,
        };
    }

    componentDidMount() {
        this.updateClientRoleAndStatus();
    }

    /* async  */updateClientRoleAndStatus() {
        /* let url = 'https://localhost:44373/Account/GetClientRole';
        let response = await fetch(url);

        let result = await response.json(); */

        const result = { role: "role1" };
        if (result.role && result.role !== "NA")
            this.setState({
                role: result.role,
                isAuthorized: true
            });
        else {
            this.setState({
                role: "NA",
                isAuthorized: false
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header key={"Header0"} appState={this.state} />
                <Content key={"Content1"} appState={this.state} />
                <Footer key={"Footer2"} appState={this.state} />
            </React.Fragment>
        );
    }
}

const targetElement = document.querySelector(".app")
ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,
    targetElement);