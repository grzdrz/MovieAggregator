class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    signIn(event) {
        let b = document.querySelector("#signIn");
        b.style.display = "flex";
    }
    signOut(event) {

    }

    render() {
        return (
            <div id="header">
                <div id="menu">
                    <button id="mainPage"><a href='https://localhost:44373/'><p>Главная</p></a></button>
                    <ul>
                        <li><button><p>тест</p></button></li>
                        <li><button><p>тест</p></button></li>
                        {
                            this.props.appState.isAuthorized == true ?
                                <li><button onClick={this.signOut}><p>Выйти</p></button></li> :
                                <li><button onClick={this.signIn}><p>Войти</p></button></li>
                        }
                    </ul>
                </div>
                <div id="signIn" style={{display: "none"}}>
                    <SignIn appState={this.props.appState} />
                </div>
            </div>
        );
    }
}

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.buttonRef = React.createRef();

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
        this.buttonRef.current.style.display = "none";

        let url = 'https://localhost:44373/Account/Login';//добавить роль в ответе
        let formBody = new FormData(document.querySelector("#signIn form"));
        let response = await fetch(url, {
            method: 'POST',
            body: formBody,
        });

        let result = await response.json();

        if (result.isDataReceivedSuccessfully == true) {
            let signin = document.querySelector("#signIn");
            signin.style.display = "none";

            this.props.appState.updateClientRoleAndStatus();
        }
        else {
            this.buttonRef.current.style.display = "inline-block";
            this.setState({ submitError: "error" });
        }
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <lable>Логин</lable>
                <input type="text" name="Name" value={this.state.Name} onChange={this.onChange} />

                <lable>Пароль</lable>
                <input type="password" name="Password" value={this.state.Password} onChange={this.onChange} />

                <input type="submit" value="Отправить" ref={this.buttonRef} />

                {this.state.submitError == "error" ? <p>{"Ошибка, введите данные еще раз"}</p> : null}
            </form>
        );
    }
}