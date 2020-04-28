class Wrap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let elem = [];
        elem.push(<Header />);
        elem.push(<Content />);
        elem.push(<Footer />);

        return elem.map(e => e);
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.signIn = this.signIn.bind(this);
        this.changeStatusOfAuthorize = this.changeStatusOfAuthorize.bind(this);
    }

    signIn() {
        let b = document.querySelector("#signIn");
        b.style.display = "flex";
        ReactDOM.render(<SignIn changeStatusOfAuthorize={this.changeStatusOfAuthorize}/>, b);
    }

    changeStatusOfAuthorize() {
        this.setState({ isAuthorized: true });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        return (
            <div id="header">
                <div id="menu">
                    <button id="mainPage"><p>Главная</p></button>
                    <ul>
                        <li><button><p>тест1</p></button></li>
                        <li><button><p>тест2</p></button></li>
                        {this.state.isAuthorized ?
                            <li><button onClick={this.signOut/**/}><p>Выйти</p></button></li> :
                            <li><button onClick={this.signIn}><p>Войти</p></button></li>}
                    </ul>
                </div>
            </div>
        );
    }
}
class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

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

        let url = 'https://localhost:44373/Account/Login';
        let formBody = new FormData(document.querySelector("#signIn form"));
        let response = await fetch(url, {
            method: 'POST',
            body: formBody,
        });

        let result = response.json();

        if (result.isDataReceivedSuccessfully == true) {
            let signin = document.querySelector("#signIn");
            signin.style.display = "none";
            ReactDOM.unmountComponentAtNode(signin);

            let content = document.querySelector("#content");
            ReactDOM.unmountComponentAtNode(content);

            props.changeStatusOfAuthorize();

            if (result.userRole === "admin") {
                ReactDOM.render(<ContentForAdmin />, content);
            }
            else {
                ReactDOM.render(<Content />, content);
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <lable>Логин</lable>
                <input type="text" name="Name" value={this.state.Name} onChange={this.onChange}/>

                <lable>Пароль</lable>
                <input type="password" name="Password" value={this.state.Password} onChange={this.onChange}/>

                <input type="submit" value="Отправить" />
            </form>
            );
    }
}



class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="footer">
                <p>FOOTER</p>
            </div>
        );
    }
}

class LeftColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="column1">
                <h1>Что такое Lorem Ipsum?</h1>
                <p>
                    Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной
                    "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию
                    размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без
                    заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время
			        </p>
            </div>
        );
    }
}

class RightColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="column3">
                <h1>Что такое Lorem Ipsum?</h1>
                <p>
                    Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной
                    "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию
                    размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без
                    заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время
			    </p>
            </div>
        );
    }
}

let targetElement = document.querySelector("#wrap");
ReactDOM.render(React.createElement(Wrap), targetElement);