import React from "react";
import {
    HashRouter,
    Switch,
    Route,
    Link,
    NavLink,
    Redirect
} from "react-router-dom";

class CreateMovieBlockForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,

            //дефолтные поля формы
            ImgSrc: "",
            Name: "Movie name",
            Director: "Director name",
            Writer: "Writer name",
            ReleaseDate: Date.now(),
            Description: "blablabla",

            cast: [],
            producers: [],
            isCastSelectorVisible: false,
            isProducersSelectorVisible: false,
        };
        this.submitButtonRef = React.createRef();
        this.imageInputRef = React.createRef();
        this.formRef = React.createRef();
        //this.castSelectorRef = React.createRef();
        //this.producersSelectorRef = React.createRef();

        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeImageInput = this.onChangeImageInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClickSelector = this.onClickSelector.bind(this);
        this.getDependentModels = this.getDependentModels.bind(this);
    }

    componentWillMount() {
        this.getDependentModels();
    }

    onClickSelector(event) {
        if (event.target.id === "castSelector") {
            if (this.state.isCastSelectorVisible) this.setState({ isCastSelectorVisible: false });
            else this.setState({ isCastSelectorVisible: true });
        }
        else if (event.target.id === "producersSelector") {
            if (this.state.isProducersSelectorVisible) this.setState({ isProducersSelectorVisible: false });
            else this.setState({ isProducersSelectorVisible: true });
        }
    }

    onChangeInput(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onChangeImageInput(event) {
        this.imageInputRef.current.value = event.target.files[0].name;
    }

    /* async  */onSubmit(event) {
        event.preventDefault();
        this.submitButtonRef.current.style.display = "none";

        /* let url = 'https://localhost:44373/Movies/Create';
        let formBody = new FormData(this.formRef.current);
        let response = await fetch(url, {
            method: 'POST',
            body: formBody,
        });

        let result = await response.json();
 */
        if (/* result.isDataReceivedSuccessfully ==  */true) {
            this.setState({ redirect: true });
        }
        else {
            this.submitButtonRef.current.style.display = "inline-block";
            this.setState({ submitError: "error" });
        }
    }

    /* async  */getDependentModels() {
        /* let url = 'https://localhost:44373/Movies/DependentDetails';
        let response = await fetch(url);
        let result = await response.json(); */
        const result = { cast: "cast1", producers: "producers1" };

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
                    <label>Постер:</label>
                    <input type="file" name="image" onChange={this.onChangeImageInput} />
                    <input type="hidden" name="ImgSrc" ref={this.imageInputRef} />

                    <label>Название фильма:</label>
                    <input type="text" name="Name" value={this.state.Name} onChange={this.onChangeInput} />

                    <label>Режисер:</label>
                    <input type="text" name="Director" value={this.state.Director} onChange={this.onChangeInput} />

                    <label>Сценаристы:</label>
                    <input type="text" name="Writer" value={this.state.Writer} onChange={this.onChangeInput} />

                    <label>Дата выхода:</label>
                    <input type="date" name="ReleaseDate" value={this.state.ReleaseDate} onChange={this.onChangeInput} />

                    <label>Описание:</label>
                    <textarea name="Description" value={this.state.Description} onChange={this.onChangeInput}>
                    </textarea>

                    <p id="castSelector" onClick={this.onClickSelector}>Актеры</p>
                    <ul
                        //ref={this.castSelectorRef}
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

                    <p id="producersSelector" onClick={this.onClickSelector}>Продюсеры</p>
                    <ul
                        //ref={this.producersSelectorRef}
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

                    <input id="submit" type="submit" value="Отправить" ref={this.submitButtonRef} />

                    {this.state.submitError == "error" ? <p>{"Ошибка, введите данные еще раз"}</p> : null}
                </form>
            );
    }
}

export default CreateMovieBlockForm;