import React from "react";

import MovieBlock from "./MovieBlock";

class MoviesBlockList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (this.props.moviesInfoArray.length !== 0) {
            return (
                this.props.moviesInfoArray.map((movieInfo) => {
                    return (
                        <MovieBlock
                            key={movieInfo.Id}
                            movieInfo={movieInfo}
                            appState={this.props.appState} />
                    );
                })
            );
        }
        else return null;
    }
}

export default MoviesBlockList;