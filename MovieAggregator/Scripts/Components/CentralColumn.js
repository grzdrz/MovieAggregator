class CentralColumn extends React.Component {
	constructor(props) {
		super(props);
		this.state = { contentToRender: "moviesContainer" };//по умолчанию рендерит контейнер с фильмами   

		this.switchCColumnContainer = this.switchCColumnContainer.bind(this);
	}

	switchCColumnContainer(containerName, movieBlockId) {
		this.setState({
			contentToRender: containerName,
			curMovieBlockId: movieBlockId//для контейнера на удаление/изменение
		});
	}

	render() {
		////подмешиваем в глобальное состояние местный метод
		//let extendedAppState = { switchCColumnContainer: this.switchCColumnContainer };
		//for (let ePropName of Object.keys(this.props.appState)) {
		//	extendedAppState[ePropName] = this.props.appState[ePropName];
		//}

		return (
			<Switch>
				<Route
					exact path="/"
					render={() => {
						return (
							<div id="column2">
								{
									this.props.appState.role === "admin" ?
										<AddMovieBlockButton key={"AddMovieBlock0"} appState={this.props.appState} /> : null
								}
								<MoviesContainer key={"MContainer1"} appState={this.props.appState} />
								<Pagination key={"Pagination2"} appState={this.props.appState} />
							</div>
						);
					}}
				/>
				<Route
					exact path="/createMovieBlockForm"
					render={() => {
						return (
							<div id="column2">
								<MovieBlockCreator appState={this.props.appState} />
							</div>
						);
					}}
				/>
				<Route
					exact path="/editMovieBlockForm/:id"
					render={(props) => {
						return (
							<div id="column2">
								<MovieBlockEditor appState={this.props.appState} curMovieBlockId={props.match.params.id} />
							</div>
						);
					}}
				/>
				<Route
					exact path="/movieFullInfoBlock"
					render={() => {
						return (
							<div id="column2">
								<MovieFullInfoBlock appState={this.props.appState} curMovieBlockId={this.state.curMovieBlockId} />
							</div>
						);
					}}
				/>
				<Route render={() => {
					return (<p>Error, page not found</p>);
				}} />
			</Switch>
		);
		//switch (this.state.contentToRender) {
		//	case "moviesContainer": {
		//		return (
		//			<div id="column2">
		//				{
		//					this.props.appState.role === "admin" ?
		//						<AddMovieBlockButton key={"AddMovieBlock0"} appState={extendedAppState} /> : null
		//				}
		//				<MoviesContainer key={"MContainer1"} appState={extendedAppState} />
		//				<Pagination key={"Pagination2"} appState={extendedAppState} />
		//			</div>
		//		);
		//	}
		//	case "createMovieBlockForm": {
		//		return (
		//			<div id="column2">
		//				<MovieBlockCreator appState={extendedAppState}/>
		//			</div>
		//		);
		//	}
		//	case "editMovieBlockForm": {
		//		return (
		//			<div id="column2">
		//				<MovieBlockEditor appState={extendedAppState} curMovieBlockId={this.state.curMovieBlockId} />
		//			</div>
		//		);
		//	}
		//	case "movieFullInfoBlock": {
		//		return (
		//			<div id="column2">
		//				<MovieFullInfoBlock appState={extendedAppState} curMovieBlockId={this.state.curMovieBlockId} />
		//			</div>
		//		);
		//	}
		//	default: return null;
		//}
	}
}

class MoviesContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	render() {
		if (this.props.appState.moviesInfoArray) {
			return (
				<div id="moviesContainer">
					<MoviesBlockList
						key={"MoviesBlockList0"}
						moviesInfoArray={this.props.appState.moviesInfoArray}
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

		this.getPageCount = this.getPageCount.bind(this);
		this.getMoviesInfo = this.getMoviesInfo.bind(this);
		this.state = { pageCount: 1};
	}

	componentWillMount() {
		this.getPageCount();//число кнопок пагинации
		this.getMoviesInfo(this.props.appState.curPage);//заполняет контейнер 4мя фильмами(по умолчанию для первой страницы)
	}

	async getPageCount() {
		let url = 'https://localhost:44373/Home/GetMoviesCount';
		let response = await fetch(url);

		let moviesCount = await response.text();

		moviesCount = parseInt(moviesCount);
		let pageCount = Math.ceil(moviesCount / 4);

		this.setState({ pageCount: pageCount });
	}

	//обработчик кликов по номерам страниц, подгружающий определенное количество данных и вставляющий их в разметку
	async getMoviesInfo(pageNumber) {
		let url = 'https://localhost:44373/Home/GetMoviesInfoByPageNumber?pageNumber=' + pageNumber.toString();
		let response = await fetch(url);

		let moviesInfoArray = await response.json();

		this.props.appState.setCurPageAndMoviesInfoArray(pageNumber, moviesInfoArray);
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
									<li key={i} onClick={this.getMoviesInfo.bind(this, i + 1)}>
										<a href="#">{i + 1}</a>
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
		if (this.props.appState.moviesInfoArray.length !== 0) {
			return (
				this.props.appState.moviesInfoArray.map((arrElem) => {
					return (
						<MovieBlock
							key={arrElem.Id}
							moviesInfo={arrElem}
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
		let parsedDateTimeStamp = this.props.moviesInfo.ReleaseDate.match(/[0-9]+/i)[0];
		let date = new Date(parseInt(parsedDateTimeStamp));
		let formattedDate = date.getDay().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString();

		return (
			<div className="movieBlock">
				{
					this.props.appState.role === "admin" ?
						<EditMovieBlock
							key={"EditMovieBlock" + this.props.moviesInfo.Id}
							id={this.props.moviesInfo.Id}
							appState={this.props.appState} />
						: null
				}
				{
					this.props.appState.role === "admin" ?
						<RemoveMovieBlock
							key={"RemoveMovieBlock" + this.props.moviesInfo.Id}
							id={this.props.moviesInfo.Id}
							appState={this.props.appState} />
						: null
				}

				<div className="mainInformationBlock clearfix">
					{this.props.moviesInfo.ImgSrc ? <img src={"../Content/Images/" + this.props.moviesInfo.ImgSrc}></img> : null}
					<h1>{this.props.moviesInfo.Name}</h1>
					<p>Director: {this.props.moviesInfo.Director}</p>
					<p>Writer: {this.props.moviesInfo.Writer}</p>
					<p>Release date: {formattedDate}</p>
					<p>{this.props.moviesInfo.Description}</p>
				</div>

				<ShowMovieBlockFullInfoButton
					key={"ShowMovieBlockFullInfoButton" + this.props.moviesInfo.Id}
					id={this.props.moviesInfo.Id}
					appState={this.props.appState} />
			</div>
		);
	}
}

class ShowMovieBlockFullInfoButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.setArgsToEventHandler = this.setArgsToEventHandler.bind(this);
	}

	setArgsToEventHandler() {//для вызова протянутого метода из ивента с аргументом
		this.props.appState.switchCColumnContainer("movieFullInfoBlock", this.props.id);
	}

	render() {
		return (
			<button onClick={this.setArgsToEventHandler}><p>Show full info</p></button>
		);
	}
}

class MovieFullInfoBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = { movieFullInfo: null };

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
			this.setState({ movieFullInfo: result});
		}
	}

	render() {
		if (this.state.movieFullInfo) {
			let parsedDateTimeStamp = this.state.movieFullInfo.ReleaseDate.match(/[0-9]+/i)[0];
			let date = new Date(parseInt(parsedDateTimeStamp));
			let formattedDate = date.getDay().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString();

			return (
				<div className="movieBlock">
					{
						this.props.appState.role === "admin" ?
							<EditMovieBlock
								key={"EditMovieBlock" + this.state.movieFullInfo.Id}
								id={this.state.movieFullInfo.Id}
								appState={this.props.appState} />
							: null
					}
					{
						this.props.appState.role === "admin" ?
							<RemoveMovieBlock
								key={"RemoveMovieBlock" + this.state.movieFullInfo.Id}
								id={this.state.movieFullInfo.Id}
								appState={this.props.appState} />
							: null
					}

					<div className="mainInformationBlock clearfix">
						{this.state.movieFullInfo.ImgSrc ? <img src={"../Content/Images/" + this.state.movieFullInfo.ImgSrc}></img> : null}
					    <h1>{this.state.movieFullInfo.Name}</h1>
						<p>Director: {this.state.movieFullInfo.Director}</p>
						<p>Writer: {this.state.movieFullInfo.Writer}</p>
						<p>Release date: {formattedDate}</p>
						<p>{this.state.movieFullInfo.Description}</p>
					</div>

					<div className="additionalInformationBlock">
						<h1>Cast</h1>
						{
							this.state.movieFullInfo.Cast.map(a => {
								return (
									<p key={a.FirstName + a.SecondName + a.Id}>
										{a.FirstName} {a.SecondName}
									</p>);
							})
						}
					</div>

					<div className="additionalInformationBlock">
						<h1>Producers</h1>
						{
							this.state.movieFullInfo.Producers.map(p => {
								return (
									<p key={p.FirstName + p.SecondName + p.Id}>
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