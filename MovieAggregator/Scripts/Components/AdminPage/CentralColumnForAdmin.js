class CentralColumnForAdmin extends React.Component {
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
				<AddMovieBlockButton columnState={this.state}/>
				<MoviesContainer columnState={this.state}/>
				<Pagination curPage={1} columnState={this.state}/>
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
			columnState={this.props.columnState}/>, container);
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
						columnState={this.props.columnState}/>
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

				<EditMovieBlock id={this.props.moviesInfo.Id} columnState={this.props.columnState}/>
				<RemoveMovieBlock id={this.props.moviesInfo.Id} columnState={this.props.columnState}/>
			</div>
		);
	}
}



class AddMovieBlockButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.createNewMovieBlockPage = this.createNewMovieBlockPage.bind(this);
	}

	createNewMovieBlockPage() {
		let targetElem = document.querySelector("#column2");
		ReactDOM.unmountComponentAtNode(targetElem);
		ReactDOM.render(<MovieBlockCreator columnState={this.props.columnState}/>, targetElem);
    }

	render() {
		return (
			<div id="createMovieBlockButton">
				<button onClick={this.createNewMovieBlockPage}><p>Add movie block</p></button>
			</div>
			);
    }
}

class MovieBlockCreator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Name: "Name1",
			Director: "Director1",
			Writer: "Writer1",
			ReleaseDate: Date.now(),
			Description: "blablabla",
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	async onSubmit(event) {
		event.preventDefault();

		let url = 'https://localhost:44373/Movies/Create';
		let formBody = new FormData(document.querySelector("#createMovieBlockForm"));
		let response = await fetch(url, {
			method: 'POST',
			body: formBody,
		});

		let result = await response.json();

		if (result.isDataReceivedSuccessfully == true) {
			let column2 = document.querySelector("#column2");

			let elems = [];
			elems.push(<AddMovieBlockButton columnState={this.props.columnState}/>);
			elems.push(<MoviesContainer columnState={this.props.columnState}/>);
			elems.push(<Pagination columnState={this.props.columnState}/>);

			ReactDOM.unmountComponentAtNode(column2);
			ReactDOM.render(elems.map(e => e), column2);
		}
		else {
			this.setState({sumitError: "error"});/////////////
		}
    }

	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	render() {
		let error = "";
		if (this.state.submitError)
			if (this.state.submitError === "error") error = "Ошибка, введите данные еще раз";

		return (
			<form id="createMovieBlockForm" onSubmit={this.onSubmit}>
				<lable>Название фильма:</lable>
				<input type="text" name="Name" value={this.state.Name} onChange={this.onChange}/>

				<lable>Режисер:</lable>
				<input type="text" name="Director" value={this.state.Director} onChange={this.onChange}/>

				<lable>Сценаристы:</lable>
				<input type="text" name="Writer" value={this.state.Writer} onChange={this.onChange}/>

				<lable>Дата выхода:</lable>
				<input type="date" name="ReleaseDate" value={this.state.ReleaseDate} onChange={this.onChange}/>

				<lable>Описание:</lable>
				<textarea name="Description" value={this.state.Description} onChange={this.onChange}>
				</textarea>

				<input id="submit" type="submit" value="Отправить" />

			{error === "error" ? <p>{error}</p> : null}
			</form>
			);
    }
}


class EditMovieBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.editMovieBlockPage = this.editMovieBlockPage.bind(this);
	}

	async editMovieBlockPage() {
		let url = 'https://localhost:44373/Movies/Details?id=' + this.props.id.toString();
		let response = await fetch(url);

		let moviesInfo = await response.json();

		let targetElem = document.querySelector("#column2");
		ReactDOM.unmountComponentAtNode(targetElem);
		ReactDOM.render(<MovieBlockEditor columnState={this.props.columnState} moviesInfo={moviesInfo}/>, targetElem);
	}

	render() {
		return (
			<button onClick={this.editMovieBlockPage}><p>Edit</p></button>
		);
	}
}

class MovieBlockEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Id: props.moviesInfo.Id,
			Name: props.moviesInfo.Name,
			Director: props.moviesInfo.Director,
			Writer: props.moviesInfo.Writer,
			ReleaseDate: props.moviesInfo.ReleaseDate,
			Description: props.moviesInfo.Description,
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	async onSubmit(event) {
		event.preventDefault();

		let url = 'https://localhost:44373/Movies/Edit';
		let formBody = new FormData(document.querySelector("#editMovieBlockForm"));
		let response = await fetch(url, {
			method: 'POST',
			body: formBody,
		});

		let result = await response.json();

		if (result.isDataReceivedSuccessfully == true) {
			let column2 = document.querySelector("#column2");

			let elems = [];
			elems.push(<AddMovieBlockButton columnState={this.props.columnState} />);
			elems.push(<MoviesContainer columnState={this.props.columnState} />);
			elems.push(<Pagination curPage={this.props.columnState.getCurPage()} columnState={this.props.columnState} />);

			ReactDOM.unmountComponentAtNode(column2);
			ReactDOM.render(elems.map(e => e), column2);
		}
		else {
			this.setState({ sumitError: "error" });/////////////
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	render() {
		let error = "";
		if (this.state.submitError)
			if (this.state.submitError === "error") error = "Ошибка, введите данные еще раз";

		return (
			<form id="editMovieBlockForm" onSubmit={this.onSubmit}>
				<input type="hidden" name="Id" value={this.state.Id} />

				<lable>Название фильма:</lable>
				<input type="text" name="Name" value={this.state.Name} onChange={this.onChange} />

				<lable>Режисер:</lable>
				<input type="text" name="Director" value={this.state.Director} onChange={this.onChange} />

				<lable>Сценаристы:</lable>
				<input type="text" name="Writer" value={this.state.Writer} onChange={this.onChange} />

				<lable>Дата выхода:</lable>
				<input type="date" name="ReleaseDate" value={this.state.ReleaseDate} onChange={this.onChange} />

				<lable>Описание:</lable>
				<textarea name="Description" value={this.state.Description} onChange={this.onChange}>
				</textarea>

				<input id="submit" type="submit" value="Отправить" />

				{error === "error" ? <p>{error}</p> : null}
			</form>
		);
	}
}

class RemoveMovieBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.deleteMovie = this.deleteMovie.bind(this);
	}

	async deleteMovie() {
		let url = 'https://localhost:44373/Movies/Delete/?id=' + this.props.id;

		let response = await fetch(url, {
			method: 'POST',
		});

		let result = await response.json();

		let column2 = document.querySelector("#column2");
		let elems = [];
		elems.push(<AddMovieBlockButton columnState={this.props.columnState}/>);
		elems.push(<MoviesContainer columnState={this.props.columnState}/>);
		elems.push(<Pagination curPage={this.props.columnState.getCurPage()} columnState={this.props.columnState}/>);

		ReactDOM.unmountComponentAtNode(column2);
		ReactDOM.render(elems.map(e => e), column2);
	}

	render() {
		return (
			<button onClick={this.deleteMovie}><p>Remove</p></button>
			);
	}
}