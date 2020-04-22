class Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.getMovies();
	}

	async getMovies() {
		let url = 'https://localhost:44373/Home/GetMoviesInfo';
		let response = await fetch(url);

		let moviesInfoArray = await response.json(); // читаем ответ в формате JSON

		this.setState({ moviesInfoArray: moviesInfoArray });
	}

	shouldComponentUpdate(nextProps, nextState) {
		return true;
    }

	render() {
		if (this.state.moviesInfoArray) {
			return (
				<div id="content">
					<div id="column1">
						<h1>Что такое Lorem Ipsum?</h1>
						<p>
							Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной
							"рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию
							размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без
							заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время
			        </p>
					</div>
					<div id="column2">
						{
							this.state.moviesInfoArray.map((arrElem, index) => {
								return (
									<MovieBlock
										key={arrElem.Id}
										moviesInfo={arrElem} />
								);
							})
						}
					</div>
					<div id="column3">
						<h1>Что такое Lorem Ipsum?</h1>
						<p>
							Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной
							"рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию
							размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без
							заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время
			</p>
					</div>
				</div>
			);
		}
		else {
			return (
				<p style={{ textAlign: "center" }}>"wait, loading in process..."</p>
			);
		}
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
