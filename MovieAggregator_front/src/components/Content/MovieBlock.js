import React from "react";

import EditMovieBlockButton from "../AdminComponents/EditMovieBlockButton";
import RemoveMovieBlockButton from "../AdminComponents/RemoveMovieBlockButton";
import ShowFullMovieBlockInfoButton from "../Content/ShowFullMovieBlockInfoButton";

const dateFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit", };

class MovieBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let parsedDateTimeStamp = this.props.movieInfo.ReleaseDate.match(/[0-9]+/i)[0];
        let formattedDate = new Intl.DateTimeFormat(dateFormatOptions).format(new Date(parseInt(parsedDateTimeStamp)));

        return (
            <div className="movieBlock">
                {
                    this.props.appState.role === "admin" ?
                        <EditMovieBlockButton
                            key={"EditMovieBlock" + this.props.movieInfo.Id}
                            id={this.props.movieInfo.Id}
                            appState={this.props.appState} />
                        : null
                }
                {
                    this.props.appState.role === "admin" ?
                        <RemoveMovieBlockButton
                            key={"RemoveMovieBlock" + this.props.movieInfo.Id}
                            id={this.props.movieInfo.Id}
                            appState={this.props.appState} />
                        : null
                }

                <div className="mainInformationBlock clearfix">
                    {this.props.movieInfo.ImgSrc ? <img src={"../Content/Images/" + this.props.movieInfo.ImgSrc}></img> : null}
                    <h1>{this.props.movieInfo.Name}</h1>
                    <p>Director: {this.props.movieInfo.Director}</p>
                    <p>Writer: {this.props.movieInfo.Writer}</p>
                    <p>Release date: {formattedDate}</p>
                    <p>{this.props.movieInfo.Description}</p>
                </div>

                <ShowFullMovieBlockInfoButton
                    key={"ShowMovieBlockFullInfoButton" + this.props.movieInfo.Id}
                    id={this.props.movieInfo.Id}
                    appState={this.props.appState} />
            </div>
        );
    }
}

export default MovieBlock;