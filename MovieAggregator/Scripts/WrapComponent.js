class Wrap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="wrap">
                <Header />
                <Content />
                <Footer />
            </div>
        );
    }
}

let targetElement = document.querySelector("#targetWrap");
ReactDOM.render(React.createElement(Wrap), targetElement);