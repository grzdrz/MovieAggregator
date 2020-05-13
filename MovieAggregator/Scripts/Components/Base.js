const {
    HashRouter,
    Switch,
    Route,
    Link,
    NavLink,
    Redirect
} = ReactRouterDOM;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.updateClientRoleAndStatus = this.updateClientRoleAndStatus.bind(this);
        this.state = {
            updateClientRoleAndStatus: this.updateClientRoleAndStatus,
        };
    }

    componentDidMount() {
        this.updateClientRoleAndStatus();
    }

    async updateClientRoleAndStatus() {
        let url = 'https://localhost:44373/Account/GetClientRole';
        let response = await fetch(url);

        let result = await response.json();

        if (result.role && result.role !== "NA")
            this.setState({
                role: result.role,
                isAuthorized: true
            });
        else {
            this.setState({
                role: "NA",
                isAuthorized: false
            });
        }
    }

    render() {
        let elem = [];
        elem.push(<Header key={"Header0"} appState={this.state}/>);
        elem.push(<Content key={"Content1"} appState={this.state} />);
        elem.push(<Footer key={"Footer2"} appState={this.state}/>);

        return elem.map(e => e);
    }
}

let targetElement = document.querySelector("#app");
ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,
    targetElement);