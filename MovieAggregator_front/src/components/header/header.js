import React from "react";

import HeaderComponent from "./header.jsx";

import "./header.scss";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <HeaderComponent isAuthorized={false} userFullName="" />
        );
    }
}

export default Header;
