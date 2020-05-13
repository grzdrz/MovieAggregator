const dateFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit", };

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
	async getMoviesInfoPage(pageNumber) {
		let url = 'https://localhost:44373/Home/GetMoviesInfoByPageNumber?pageNumber=' + pageNumber.toString();
		let response = await fetch(url);

		let moviesInfoArray = await response.json();

		this.setState({ moviesInfoArray: moviesInfoArray });
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

class Pagination extends React.Component {
	constructor(props) {
		super(props);
		this.state = { pageCount: 1 };

		this.getPageCount = this.getPageCount.bind(this);
	}

	componentWillMount() {
		this.getPageCount();
	}

	async getPageCount() {
		let url = 'https://localhost:44373/Movies/GetMoviesInfoPageCount';
		let response = await fetch(url);

		let pageCount = await response.text();
		pageCount = parseInt(pageCount);

		this.setState({ pageCount: pageCount});
	}

	render() {
		let tempArr = [];
		for (let i = 0; i < this.state.pageCount; i++) {
			tempArr.push("");
        }

		if (tempArr.length !== 0) {
			return (
				<div id="pagination">
					<ul>
						{
							tempArr.map((e, i) => {
								return (
									<li key={"Pagination" + i}>
										<NavLink key={"PaginationNavLink" + i} to={`/${i + 1}`}>{i + 1}</NavLink>
									</li>
								);
							})
						}
					</ul>
				</div>
			);
		}
		else
			return <p style={{ textAlign: "center", color: "#d8b440" }}>Loading...</p>
	}
}

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

class ShowFullMovieBlockInfoButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<button><NavLink to={`/FullMovieInfoBlock/${this.props.id}`}><p>Show full info</p></NavLink></button>
		);
	}
}

class FullMovieInfoBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = { fullMovieInfo: null };

		this.getFullMovieInfo = this.getFullMovieInfo.bind(this);
	}

	componentWillMount() {
		this.getFullMovieInfo(this.props.curMovieBlockId);
	}

	async getFullMovieInfo(id) {
		let url = 'https://localhost:44373/Movies/Details?id=' + id.toString();
		let response = await fetch(url);
		let result = await response.json();

		if (result) {
			this.setState({ fullMovieInfo: result});
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