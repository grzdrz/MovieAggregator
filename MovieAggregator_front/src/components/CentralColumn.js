import React from "react";
import {
	HashRouter,
	Switch,
	Route,
	Link,
	NavLink,
	Redirect
} from "react-router-dom";

import CreateMovieBlockButton from "./AdminComponents/CreateMovieBlockButton";
import MoviesListContainer from "./Content/MoviesListContainer";
import Pagination from "./Content/Pagination";
import CreateMovieBlockForm from "./AdminComponents/CreateMovieBlockForm";
import EditMovieBlockForm from "./AdminComponents/EditMovieBlockForm";
import FullMovieInfoBlock from "./Content/FullMovieInfoBlock";

class CentralColumn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Switch>
				<Route
					exact path="/:pageNumber(\d+)?"
					render={(props) => {
						return (
							<div id="column2">
								{
									this.props.appState.role === "admin" ?
										<CreateMovieBlockButton key={"AddMovieBlock0"} appState={this.props.appState} /> : null
								}
								<MoviesListContainer key={"MContainer1"} appState={this.props.appState}
									curPageNumber={props.match.params.pageNumber ? props.match.params.pageNumber : 1} />
								<Pagination key={"Pagination2"} appState={this.props.appState} />
							</div>
						);
					}}
				/>
				<Route
					exact path="/CreateMovieBlockForm"
					render={() => {
						return (
							<div id="column2">
								<CreateMovieBlockForm appState={this.props.appState} />
							</div>
						);
					}}
				/>
				<Route
					exact path="/EditMovieBlockForm/:id"
					render={(props) => {
						return (
							<div id="column2">
								<EditMovieBlockForm appState={this.props.appState} curMovieBlockId={props.match.params.id} />
							</div>
						);
					}}
				/>
				<Route
					exact path="/FullMovieInfoBlock/:id"
					render={(props) => {
						return (
							<div id="column2">
								<FullMovieInfoBlock appState={this.props.appState} curMovieBlockId={props.match.params.id} />
							</div>
						);
					}}
				/>
				<Route render={() => {
					return (<p>Error, page not found</p>);
				}} />
			</Switch>
		);
	}
}

export default CentralColumn;