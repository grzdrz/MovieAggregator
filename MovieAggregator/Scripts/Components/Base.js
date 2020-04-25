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
    }

    render() {
        return (
            <div id="header">
                <p>HEADER</p>
                <p><a href='https://localhost:44373/'>Main page</a></p>
            </div>
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

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="content">
                <LeftColumn />
                <CentralColumnForAdmin />
                <RightColumn />
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