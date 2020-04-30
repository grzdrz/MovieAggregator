class Wrap extends React.Component {
    constructor(props) {
        super(props);

        this.updateClientRoleAndStatus = this.updateClientRoleAndStatus.bind(this);
        this.getCurPage = this.getCurPage.bind(this);
        this.setCurPageAndMoviesInfoArray = this.setCurPageAndMoviesInfoArray.bind(this);

        this.state = {
            curPage: 1,
            moviesInfoArray: [],

            updateClientRoleAndStatus: this.updateClientRoleAndStatus,
            getCurPage: this.getCurPage,
            setCurPageAndMoviesInfoArray: this.setCurPageAndMoviesInfoArray,
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
    getCurPage() {
        return this.state.curPage;
    }
    setCurPageAndMoviesInfoArray(curPage, moviesInfoArray) {
        this.setState({
            curPage: curPage,
            moviesInfoArray: moviesInfoArray
        });
    }

    render() {
        let elem = [];
        elem.push(<Header key={"Header0"} appState={this.state}/>);
        elem.push(<Content key={"Content1"} appState={this.state} />);
        elem.push(<Footer key={"Footer2"} appState={this.state}/>);

        return elem.map(e => e);
    }
}

let targetElement = document.querySelector("#wrap");
ReactDOM.render(<Wrap />, targetElement);