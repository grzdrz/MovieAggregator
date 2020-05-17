class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.signInButtonWindow = React.createRef();
    }

    signIn(event) {
        event.preventDefault();

        //let b = document.querySelector("#signIn");
        //b.style.display = "flex";
        this.signInButtonWindow.current.style.display = "flex";
    }
    async signOut(event) {
        event.preventDefault();

        let url = 'https://localhost:44373/Account/Logout';
        let response = await fetch(url);
        let result = await response.json();

        if (result.isDataReceivedSuccessfully == true) {
            this.props.appState.updateClientRoleAndStatus();
        }    
    }

    render() {
        return (
            <div id="header">
                <div id="menu">
                    <a href='https://localhost:44373/' id="mainPage"><p>Главная</p></a>
                    <ul>
                        <li><a href="#"><p>тест</p></a></li>
                        <li><a href="#"><p>тест</p></a></li>
                        {
                            this.props.appState.isAuthorized == true ?
                                <li><a onClick={this.signOut}><p>Выйти</p></a></li> :
                                <li><a onClick={this.signIn}><p>Войти</p></a></li>
                        }
                    </ul>
                </div>
                <div ref={this.signInButtonWindow} id="signIn" style={{display: "none"}}>
                    <SignIn appState={this.props.appState} signInButtonWindow={this.signInButtonWindow} />
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
            this.buttonRef.current.style.display = "inline-block";
            this.props.signInButtonWindow.current.style.display = "none";

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
                <button onClick={(event) => {
                    event.preventDefault();
                    this.props.signInButtonWindow.current.style.display = 'none';
                }}>Cancel</button>

                {this.state.submitError == "error" ? <p>{"Ошибка, введите данные еще раз"}</p> : null}
            </form>
        );
    }
}