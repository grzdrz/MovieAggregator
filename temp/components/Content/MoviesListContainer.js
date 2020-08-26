import React from "react";

import MoviesBlockList from "./MoviesBlockList";

class MoviesListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.getMoviesInfoPage = this.getMoviesInfoPage.bind(this);
    }

    componentWillMount() {
        this.getMoviesInfoPage(this.props.curPageNumber);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.curPageNumber != this.props.curPageNumber)
            //this.setState({
            //	loaded: false
            //});
            this.getMoviesInfoPage(nextProps.curPageNumber);
    }

    //обработчик кликов по номерам страниц, подгружающий определенное количество данных
    /* async  */getMoviesInfoPage(pageNumber) {
        /* let url = 'https://localhost:44373/Home/GetMoviesInfoByPageNumber?pageNumber=' + pageNumber.toString();
        let response = await fetch(url);

        let moviesInfoArray = await response.json(); */

        const moviesInfoArray = require("../../data/movieData.json");
        this.setState({ moviesInfoArray: Array.from(moviesInfoArray) });
    }

    render() {
        if (this.state.moviesInfoArray) {
            return (
                <div id="moviesContainer">
                    <MoviesBlockList
                        key={"MoviesBlockList0"}
                        moviesInfoArray={this.state.moviesInfoArray}
                        appState={this.props.appState} />
                </div>
            );
        }
        else {
            return (
                <div id="moviesContainer">
                    <p style={{ textAlign: "center" }}>Wait, loading in process...</p>
                </div>
            );
        }
    }
}

export default MoviesListContainer;
