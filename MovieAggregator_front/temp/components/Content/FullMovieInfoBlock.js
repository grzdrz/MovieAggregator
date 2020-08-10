import React from "react";

import EditMovieBlockButton from "../AdminComponents/EditMovieBlockButton";
import RemoveMovieBlockButton from "../AdminComponents/RemoveMovieBlockButton";

const dateFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit", };

class FullMovieInfoBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { fullMovieInfo: null };

        this.getFullMovieInfo = this.getFullMovieInfo.bind(this);
    }

    componentWillMount() {
        this.getFullMovieInfo(this.props.curMovieBlockId);
    }

    /* async  */getFullMovieInfo(id) {
        /* let url = 'https://localhost:44373/Movies/Details?id=' + id.toString();
        let response = await fetch(url);
        let result = await response.json(); */

        const result = require("../../data/movieData.json");
        if (result) {
            this.setState({ fullMovieInfo: result });
        }
    }

    render() {
        if (this.state.fullMovieInfo) {
            let parsedDateTimeStamp = this.state.fullMovieInfo.ReleaseDate.match(/[0-9]+/i)[0];
            let formattedDate = new Intl.DateTimeFormat(dateFormatOptions).format(new Date(parseInt(parsedDateTimeStamp)));

            return (
                <div className="movieBlock">
                    {
                        this.props.appState.role === "admin" ?
                            <EditMovieBlockButton
                                key={"EditMovieBlock" + this.state.fullMovieInfo.Id}
                                id={this.state.fullMovieInfo.Id}
                                appState={this.props.appState} />
                            : null
                    }
                    {
                        this.props.appState.role === "admin" ?
                            <RemoveMovieBlockButton
                                key={"RemoveMovieBlock" + this.state.fullMovieInfo.Id}
                                id={this.state.fullMovieInfo.Id}
                                appState={this.props.appState} />
                            : null
                    }

                    <div className="mainInformationBlock clearfix">
                        {this.state.fullMovieInfo.ImgSrc ? <img src={"../Content/Images/" + this.state.fullMovieInfo.ImgSrc}></img> : null}
                        <h1>{this.state.fullMovieInfo.Name}</h1>
                        <p>Director: {this.state.fullMovieInfo.Director}</p>
                        <p>Writer: {this.state.fullMovieInfo.Writer}</p>
                        <p>Release date: {formattedDate}</p>
                        <p>{this.state.fullMovieInfo.Description}</p>
                    </div>

                    <div className="additionalInformationBlock">
                        <h1>Cast</h1>
                        {
                            this.state.fullMovieInfo.Cast.map(a => {
                                return (
                                    <p key={"FullMovieInfo" + a.FirstName + a.SecondName + a.Id}>
                                        {a.FirstName} {a.SecondName}
                                    </p>);
                            })
                        }
                    </div>

                    <div className="additionalInformationBlock">
                        <h1>Producers</h1>
                        {
                            this.state.fullMovieInfo.Producers.map(p => {
                                return (
                                    <p key={"FullMovieInfo" + p.FirstName + p.SecondName + p.Id}>
                                        {p.FirstName} {p.SecondName}
                                    </p>);
                            })
                        }
                    </div>
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

export default FullMovieInfoBlock; 