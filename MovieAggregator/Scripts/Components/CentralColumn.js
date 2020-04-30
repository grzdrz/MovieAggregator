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
		//подмешиваем в глобальное состояние местный метод
		let extendedAppState = { switchCColumnContainer: this.switchCColumnContainer };
		for (let ePropName of Object.keys(this.props.appState)) {
			extendedAppState[ePropName] = this.props.appState[ePropName];
        }

		switch (this.state.contentToRender) {
			case "moviesContainer": {
				return (
					<div id="column2">
						{
							this.props.appState.role === "admin" ?
								<AddMovieBlockButton key={"AddMovieBlock0"} appState={extendedAppState} /> : null
						}
						<MoviesContainer key={"MContainer1"} appState={extendedAppState} />
						<Pagination key={"Pagination2"} appState={extendedAppState} />
					</div>
				);
			}
			case "createMovieBlockForm": {
				return (
					<div id="column2">
						<MovieBlockCreator appState={extendedAppState}/>
					</div>
				);
			}
			case "editMovieBlockForm": {
				return (
					<div id="column2">
						<MovieBlockEditor appState={extendedAppState} curMovieBlockId={this.state.curMovieBlockId} />
					</div>
				);
			}
			default: return null;
		}
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
		return (
			<div className="movieBlock">
				<h1>{this.props.moviesInfo.Name}</h1>
				<p>{this.props.moviesInfo.Director}</p>
				<p>{this.props.moviesInfo.Writer}</p>
				<p>{this.props.moviesInfo.ReleaseDate}</p>
				<p>{this.props.moviesInfo.Description}</p>

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
			</div>
		);
	}
}



class AddMovieBlockButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.setArgsToEventHandler = this.setArgsToEventHandler.bind(this);
	}

	setArgsToEventHandler() {//для вызова протянутого метода из ивента с аргументом
		this.props.appState.switchCColumnContainer("createMovieBlockForm");
    }

	render() {
		return (
			<div id="createMovieBlockButton">
				<button onClick={this.setArgsToEventHandler}><p>Add movie block</p></button>
			</div>
			);
    }
}

class MovieBlockCreator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {//дефолтные поля формы
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
			this.props.appState.switchCColumnContainer("moviesContainer");//возвращаем контейнер на отображение фильмов
		}
		else {
			this.setState({ submitError: "error"});
		}
    }

	render() {
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

				{this.state.submitError == "error" ? <p>{"Ошибка, введите данные еще раз"}</p> : null}
			</form>
			);
    }
}


class EditMovieBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.setArgsToEventHandler = this.setArgsToEventHandler.bind(this);
	}

	setArgsToEventHandler() {//для вызова протянутого метода из ивента с аргументом
		this.props.appState.switchCColumnContainer("editMovieBlockForm", this.props.id);
	}

	render() {
		return (
			<button onClick={this.setArgsToEventHandler}><p>Edit</p></button>
		);
	}
}

class MovieBlockEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataIsLoaded: false,
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.getCurrentMovieBlockInfo = this.getCurrentMovieBlockInfo.bind(this);
	}

	componentDidMount() {
		this.getCurrentMovieBlockInfo();
    }

	async getCurrentMovieBlockInfo() {
		let url = 'https://localhost:44373/Movies/Details?id=' + this.props.curMovieBlockId.toString();
		let response = await fetch(url);

		let moviesInfo = await response.json();

		this.setState({
			dataIsLoaded: true,

			Id: moviesInfo.Id,
			Name: moviesInfo.Name,
			Director: moviesInfo.Director,
			Writer: moviesInfo.Writer,
			ReleaseDate: moviesInfo.ReleaseDate,
			Description: moviesInfo.Description,
		});
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
			this.props.appState.switchCColumnContainer("moviesContainer");//возвращаем контейнер на отображение фильмов
		}
		else {
			this.setState({ submitError: "error" });
		}
	}

	render() {
		if (this.state.dataIsLoaded) {
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

					{this.state.submitError == "error" ? <p>{"Ошибка, введите данные еще раз"}</p> : null}
				</form>
			);
		}
		else return (<p>Loading data...</p>);
	}
}

class RemoveMovieBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.deleteMovie = this.deleteMovie.bind(this);
	}

	///////////////////////дублируется
	//обработчик кликов по номерам страниц, подгружающий определенное количество данных и вставляющий их в разметку
	async getMoviesInfo(pageNumber) {
		let url = 'https://localhost:44373/Home/GetMoviesInfoByPageNumber?pageNumber=' + pageNumber.toString();
		let response = await fetch(url);

		let moviesInfoArray = await response.json();

		this.props.appState.setCurPageAndMoviesInfoArray(pageNumber, moviesInfoArray);
	}

	async deleteMovie() {
		let buttons = document.querySelectorAll(".deleteButton");
		for (let b of buttons) {
			b.disabled = true;
		}

		let url = 'https://localhost:44373/Movies/Delete/?id=' + this.props.id;

		let response = await fetch(url, {
			method: 'POST',
		});

		let result = await response.json();

		if (result.isDataReceivedSuccessfully == true) {
			//this.props.appState.switchCColumnContainer("moviesContainer");//ненужон, т.к. состояние при удалении не менялось
			this.getMoviesInfo(this.props.appState.curPage);
		}
		else {
			for (let b of buttons) {
				b.disabled = false;/////
			}
		}
	}

	render() {
		return (
			<button className="deleteButton" onClick={this.deleteMovie}><p>Remove</p></button>
			);
	}
}