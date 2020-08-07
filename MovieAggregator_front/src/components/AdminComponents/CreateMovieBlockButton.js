import React from "react";
import {
    HashRouter,
    Switch,
    Route,
    Link,
    NavLink,
    Redirect
} from "react-router-dom";

class CreateMovieBlockButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="createMovieBlockButton">
                <NavLink to='/CreateMovieBlockForm'><p>Add movie block</p></NavLink>
            </div>
        );
    }
}

export default CreateMovieBlockButton;