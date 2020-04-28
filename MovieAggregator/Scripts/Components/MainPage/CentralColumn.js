class CentralColumn extends React.Component {
	constructor(props) {
		super(props);

		this.getCurPage = this.getCurPage.bind(this);
		this.setCurPage = this.setCurPage.bind(this);
		this.state = {
			getCurPage: this.getCurPage,
			setCurPage: this.setCurPage,
		};
	}

	getCurPage() {
		return this.state.curPage;
	}
	setCurPage(curPage) {
		this.setState({ curPage: curPage });
	}


	render() {
		return (
			<div id="column2">
				<MoviesContainer columnState={this.state} />
				<Pagination curPage={1} columnState={this.state} />
			</div>
		);
	}
}

class MoviesContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		if (this.props.moviesInfoArray) {
			return (
				<div id="moviesContainer">
					<MoviesBlockList
						moviesInfoArray={this.props.moviesInfoArray}
						columnState={this.props.columnState} />
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
		this.state = {};

		////////////////////////////
		this.getMoviesCount();
		if (props.curPage)
			this.getMovies(props.curPage);//при изменении текущего блока 
		else
			this.getMovies(1);//при вставке блока
	}

	async getMoviesCount() {
		let url = 'https://localhost:44373/Home/GetMoviesCount';
		let response = await fetch(url);

		let moviesCount = await response.text();

		moviesCount = parseInt(moviesCount);
		let pageCount = Math.ceil(moviesCount / 4);
		let movies = [];//нужен для генерации элементов пагинации через map
		for (let i = 0; i < pageCount; i++)
			movies.push("");

		this.setState({
			moviesCount: moviesCount,
			movies: movies
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	//обработчик кликов по номерам страниц, подгружающий определенное количество данных и вставляющий их в разметку
	async getMovies(pageNumber) {
		let url = 'https://localhost:44373/Home/GetMoviesInfoByPageNumber?pageNumber=' + pageNumber.toString();
		let response = await fetch(url);

		let moviesInfoArray = await response.json();

		this.props.columnState.setCurPage(pageNumber);

		let container = document.querySelector("#moviesContainer");
		ReactDOM.unmountComponentAtNode(container);
		ReactDOM.render(<MoviesBlockList
			moviesInfoArray={moviesInfoArray}
			columnState={this.props.columnState} />, container);
	}

	render() {
		if (this.state.movies) {
			return (
				<div id="pagination">
					<ul>
						{
							this.state.movies.map((e, i) => {
								return (
									<li key={i} onClick={this.getMovies.bind(this, i + 1)}>
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
		return (
			this.props.moviesInfoArray.map((arrElem, index) => {
				return (
					<MovieBlock
						key={arrElem.Id}
						moviesInfo={arrElem}
						columnState={this.props.columnState} />
				);
			})
		);
	}
}

class MovieBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="movieBlock">
				<h1>{this.props.moviesInfo.Name}</h1>
				<p>{this.props.moviesInfo.Director}</p>
				<p>{this.props.moviesInfo.Writer}</p>
				<p>{this.props.moviesInfo.ReleaseDate}</p>
				<p>{this.props.moviesInfo.Description}</p>
			</div>
		);
	}
}
