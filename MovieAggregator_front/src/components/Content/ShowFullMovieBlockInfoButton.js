import React from "react";
import {
    HashRouter,
    Switch,
    Route,
    Link,
    NavLink,
    Redirect
} from "react-router-dom";

class ShowFullMovieBlockInfoButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <NavLink to={`/FullMovieInfoBlock/${this.props.id}`}><p>Show full info</p></NavLink>
        );
    }
}

export default ShowFullMovieBlockInfoButton;