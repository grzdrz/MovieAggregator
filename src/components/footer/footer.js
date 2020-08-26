import React from "react";

import FooterComponent from "./footer.jsx";

import "./footer.scss";

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            texts: [
                "Footer",
                "Footer",
                "Footer",
                "Footer",
                "Footer",
                "Footer",
            ],
        };
    }

    render() {
        return (
            <footer className="footer" >
                <FooterComponent texts={this.state.texts} />
            </footer>
        );
    }
}

export default Footer;