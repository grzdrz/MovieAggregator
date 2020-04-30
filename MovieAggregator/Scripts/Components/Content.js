class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="content">
                <LeftColumn key={"LColumn0"} appState={this.props.appState} />
                <CentralColumn key={"CColumn1"} appState={this.props.appState} />
                <RightColumn key={"RColumn2"} appState={this.props.appState} />
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
