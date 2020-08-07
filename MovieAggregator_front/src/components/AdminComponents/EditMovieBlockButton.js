import React from "react";
import {
    HashRouter,
    Switch,
    Route,
    Link,
    NavLink,
    Redirect
} from "react-router-dom";

class EditMovieBlockButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <NavLink to={`/EditMovieBlockForm/${this.props.id}`}><p>Edit</p></NavLink>
        );
    }
}

export default EditMovieBlockButton;