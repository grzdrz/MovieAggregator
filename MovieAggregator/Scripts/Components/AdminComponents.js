﻿class AddMovieBlockButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div id="createMovieBlockButton">
				<button><NavLink to='/createMovieBlockForm'><p>Add movie block</p></NavLink></button>
			</div>
			);
    }
}

class MovieBlockCreator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,

			//дефолтные поля формы
			ImgSrc: "",
			Name: "Name1",
			Director: "Director1",
			Writer: "Writer1",
			ReleaseDate: Date.now(),
			Description: "blablabla",

			cast: [],
			producers: [],
			isCastSelectorVisible: false,
			isProducersSelectorVisible: false,
		};
		this.buttonRef = React.createRef();
		this.inputImageRef = React.createRef();
		this.formRef = React.createRef();
		this.castSelectorRef = React.createRef();
		this.producersSelectorRef = React.createRef();

		this.onChange = this.onChange.bind(this);
		this.onChangeImage = this.onChangeImage.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onSelectorClick = this.onSelectorClick.bind(this);
		this.getDependentModels = this.getDependentModels.bind(this);
	}

	componentWillMount() {
		this.getDependentModels();
    }

	onSelectorClick(event) {
		if (event.target.id === "castSelector") {
			if (this.state.isCastSelectorVisible) this.setState({ isCastSelectorVisible: false });
			else this.setState({ isCastSelectorVisible: true });
		}
		else if (event.target.id === "producersSelector") {
			if (this.state.isProducersSelectorVisible) this.setState({ isProducersSelectorVisible: false });
			else this.setState({ isProducersSelectorVisible: true });
		}
    }
	onChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	onChangeImage(event) {
		this.inputImageRef.current.value = event.target.files[0].name;
    }

	async onSubmit(event) {
		event.preventDefault();
		this.buttonRef.current.style.display = "none";

		let url = 'https://localhost:44373/Movies/Create';
		let formBody = new FormData(this.formRef.current);
		let response = await fetch(url, {
			method: 'POST',
			body: formBody,
		});

		let result = await response.json();

		if (result.isDataReceivedSuccessfully == true) {
			//this.props.appState.switchCColumnContainer("moviesContainer");//возвращаем контейнер на отображение фильмов
			this.setState({redirect: true});
		}
		else {
			this.buttonRef.current.style.display = "inline-block";
			this.setState({ submitError: "error"});
		}
	}
	async getDependentModels() {
		let url = 'https://localhost:44373/Movies/DependentDetails';
		let response = await fetch(url);
		let result = await response.json();

		if (result.cast && result.producers)
			this.setState({
				cast: result.cast,
				producers: result.producers,
			});
    }

	render() {
		if (this.state.redirect == true)
			return <Redirect to='/' />;
		else
			return (
				<form id="createMovieBlockForm" onSubmit={this.onSubmit} ref={this.formRef}>
					<lable>Постер:</lable>
					<input type="file" name="image" onChange={this.onChangeImage} />
					<input type="hidden" name="ImgSrc" ref={this.inputImageRef} />

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

					<p id="castSelector" onClick={this.onSelectorClick}>Актеры</p>
					<ul
						ref={this.castSelectorRef}
						style={this.state.isCastSelectorVisible ?
							{ display: "inline-block" } : { display: "none" }}>
						{
							this.state.cast ?
								this.state.cast.map((a, aIndex) => {
									return (
										<li key={"actorToSelectCreate" + aIndex}>
											<input type="checkbox" name="selectedActors" value={a.Id} />
											<p>{a.FirstName} {a.SecondName}</p>
										</li>);
								}) : null
						}
					</ul>

					<p id="producersSelector" onClick={this.onSelectorClick}>Продюсеры</p>
					<ul
						ref={this.producersSelectorRef}
						style={this.state.isProducersSelectorVisible ?
							{ display: "inline-block" } : { display: "none" }}>
						{
							this.state.producers ?
								this.state.producers.map((p, pIndex) => {
									return (
										<li key={"producerToSelectCreate" + pIndex}>
											<input type="checkbox" name="selectedProducers" value={p.Id} />
											<p>{p.FirstName} {p.SecondName}</p>
										</li>);
								}) : null
						}
					</ul>

					<input id="submit" type="submit" value="Отправить" ref={this.buttonRef} />

					{this.state.submitError == "error" ? <p>{"Ошибка, введите данные еще раз"}</p> : null}
				</form>
			);
	}
}


class EditMovieBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<button><NavLink to={`/editMovieBlockForm/${this.props.id}`}><p>Edit</p></NavLink></button>
		);
	}
}

class MovieBlockEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,

			dataIsLoaded: false,

			fullCast: [],
			fullProducers: [],
			isCastSelectorVisible: false,
			isProducersSelectorVisible: false,
		};
		this.buttonRef = React.createRef();
		this.inputImageRef = React.createRef();
		this.formRef = React.createRef();
		this.castSelectorRef = React.createRef();
		this.producersSelectorRef = React.createRef();

		this.onChange = this.onChange.bind(this);
		this.onChangeImage = this.onChangeImage.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.getCurrentMovieBlockInfoAndDependentModels = this.getCurrentMovieBlockInfoAndDependentModels.bind(this);
		this.onSelectorClick = this.onSelectorClick.bind(this);
	}

	componentDidMount() {
		this.getCurrentMovieBlockInfoAndDependentModels();
	}

	onSelectorClick(event) {
		if (event.target.id === "castSelector") {
			if (this.state.isCastSelectorVisible) this.setState({ isCastSelectorVisible: false });
			else this.setState({ isCastSelectorVisible: true });
		}
		else if (event.target.id === "producersSelector") {
			if (this.state.isProducersSelectorVisible) this.setState({ isProducersSelectorVisible: false });
			else this.setState({ isProducersSelectorVisible: true });
		}
	}
	async getCurrentMovieBlockInfoAndDependentModels() {
		let url = 'https://localhost:44373/Movies/Details?id=' + this.props.curMovieBlockId.toString();
		let response = await fetch(url);
		let moviesInfo = await response.json();

		url = 'https://localhost:44373/Movies/DependentDetails';
		response = await fetch(url);
		let fullDependentModels = await response.json();

		if (fullDependentModels.cast && fullDependentModels.producers && moviesInfo)
			this.setState({
				dataIsLoaded: true,

				Id: moviesInfo.Id,
				Name: moviesInfo.Name,
				Director: moviesInfo.Director,
				Writer: moviesInfo.Writer,
				ReleaseDate: moviesInfo.ReleaseDate,
				Description: moviesInfo.Description,

				fullCast: fullDependentModels.cast,
				fullProducers: fullDependentModels.producers,
				Cast: moviesInfo.Cast,
				Producers: moviesInfo.Producers,
			});
	}

	onChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	onChangeImage(event) {
		this.inputImageRef.current.value = event.target.files[0].name;
	}
	async onSubmit(event) {
		event.preventDefault();
		this.buttonRef.current.style.display = "none";

		let url = 'https://localhost:44373/Movies/Edit';
		let formBody = new FormData(this.formRef.current);
		let response = await fetch(url, {
			method: 'POST',
			body: formBody,
		});

		let result = await response.json();

		if (result.isDataReceivedSuccessfully == true) {
			//this.props.appState.switchCColumnContainer("moviesContainer");//возвращаем контейнер на отображение фильмов
			this.setState({ redirect: true });
		}
		else {
			this.buttonRef.current.style.display = "inline-block";
			this.setState({ submitError: "error" });
		}
	}

	render() {
		if (this.state.redirect == true)
			return <Redirect to='/' />;
		else if (this.state.dataIsLoaded) {
			let actualCastIdArr = this.state.Cast.map(a => a.Id);
			let actualProducersIdArr = this.state.Producers.map(p => p.Id);

			return (
				<form id="editMovieBlockForm" onSubmit={this.onSubmit} ref={this.formRef}>
					<input type="hidden" name="Id" value={this.state.Id} />

					<lable>Постер:</lable>
					<input type="file" name="image" onChange={this.onChangeImage} />
					<input type="hidden" name="ImgSrc" ref={this.inputImageRef} />

					<lable>Название фильма:</lable>
					<input type="text" name="Name" value={this.state.Name} onChange={this.onChange} />

					<lable>Режисер:</lable>
					<input type="text" name="Director" value={this.state.Director} onChange={this.onChange} />

					<lable>Сценаристы:</lable>
					<input type="text" name="Writer" value={this.state.Writer} onChange={this.onChange} />

					<lable>Дата выхода:</lable>
					<input type="date" name="ReleaseDate" defaultValue={this.state.ReleaseDate/*???*/} />

					<lable>Описание:</lable>
					<textarea name="Description" value={this.state.Description} onChange={this.onChange}>
					</textarea>

					<p id="castSelector" onClick={this.onSelectorClick}>Актеры</p>
					<ul
						ref={this.castSelectorRef}
						style={this.state.isCastSelectorVisible ?
							{ display: "inline-block" } : { display: "none" }}>
						{
							this.state.fullCast ?
								this.state.fullCast.map((a, aIndex) => {
									return (
										<li key={"actorToSelectEdit" + aIndex}>
											<input
												type="checkbox"
												name="selectedActors"
												value={a.Id}
												defaultChecked={actualCastIdArr.includes(a.Id, 0) ? true : false} />
											<p>{a.FirstName} {a.SecondName}</p>
										</li>);
								}) : null
						}
					</ul>

					<p id="producersSelector" onClick={this.onSelectorClick}>Продюсеры</p>
					<ul
						ref={this.producersSelectorRef}
						style={this.state.isProducersSelectorVisible ?
							{ display: "inline-block" } : { display: "none" }}>
						{
							this.state.fullProducers ?
								this.state.fullProducers.map((p, pIndex) => {
									return (
										<li key={"producerToSelectEdit" + pIndex}>
											<input
												type="checkbox"
												name="selectedProducers"
												value={p.Id}
												defaultChecked={actualProducersIdArr.includes(p.Id, 0) ? true : false} />
											<p>{p.FirstName} {p.SecondName}</p>
										</li>);
								}) : null
						}
					</ul>

					<input id="submit" type="submit" value="Отправить" ref={this.buttonRef} />

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
		this.state = { redirect: false,};
		this.buttonRef = React.createRef();

		this.deleteMovie = this.deleteMovie.bind(this);
	}

	async deleteMovie() {
		this.buttonRef.current.style.display = "none";

		let url = 'https://localhost:44373/Movies/Delete/?id=' + this.props.id;

		let response = await fetch(url, {
			method: 'POST',
		});

		let result = await response.json();

		if (result.isDataReceivedSuccessfully == true) {
			this.setState({ redirect: true });
		}
		else {
			this.buttonRef.current.style.display = "inline-block";
		}
	}

	render() {
		if (this.state.redirect == true)
			return <Redirect to='/' />;
		else
			return (
				<button
					ref={this.buttonRef}
					className="deleteButton"
					onClick={this.deleteMovie}>
					<p>Remove</p>
				</button>
			);
	}
}