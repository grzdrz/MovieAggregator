class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="content">
                <LeftColumn />
                <CentralColumn />
                <RightColumn />
            </div>
        );
    }
}