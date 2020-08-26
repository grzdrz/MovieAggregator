import React from "react";
import {
    HashRouter,
    Switch,
    Route,
    Link,
    NavLink,
    Redirect
} from "react-router-dom";

const approveWindowStyle = {
    display: 'none',
    zIndex: '999',
    width: 'auto',
    background: '#221f2a',
    position: 'fixed',
    top: '40%',
    right: '30%',
    left: '30%',
    padding: '30px',
    border: '2px solid #dc9607',
    borderRadius: '5px',
    color: '#dc9607',
    flexDirection: 'row',
    justifyContent: 'space-around',
};

const approveWindowButtonsStyle = {
    margin: '0px 5px',
    padding: '5px',
    borderRadius: '5px',
    border: '2px solid #dc9607',
    background: '#d9c581',
};

class RemoveMovieBlockButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { redirect: false, };
        this.buttonRef = React.createRef();
        this.approveRef = React.createRef();

        this.deleteMovie = this.deleteMovie.bind(this);
    }

    /* async  */deleteMovie(event) {
        event.preventDefault();

        this.approveRef.current.style.display = "none";
        this.buttonRef.current.style.display = "none";

        /* let url = 'https://localhost:44373/Movies/Delete/?id=' + this.props.id;

        let response = await fetch(url, {
            method: 'POST',
        });

        let result = await response.json(); */

        if (/* result.isDataReceivedSuccessfully ==  */true) {
            this.setState({ redirect: true });
        }
        else {
            this.buttonRef.current.style.display = "inline-block";
        }
    }

    render() {
        if (this.state.redirect == true) {
            this.setState({ redirect: false });
            return <Redirect to='/' />;
        }
        else
            return (
                <React.Fragment>
                    <a
                        href="#"
                        ref={this.buttonRef}
                        className="deleteButton"
                        onClick={(event) => {
                            event.preventDefault();
                            this.approveRef.current.style.display = "flex";
                        }}>
                        <p>Remove</p>
                    </a>
                    <div ref={this.approveRef} style={approveWindowStyle}>
                        <button style={approveWindowButtonsStyle} onClick={this.deleteMovie}>
                            <p style={{ margin: '0px', }}>Approve</p>
                        </button>
                        <button style={approveWindowButtonsStyle} onClick={() => { this.approveRef.current.style.display = "none"; }}>
                            <p style={{ margin: '0px', }}>Cancel</p>
                        </button>
                    </div>
                </React.Fragment>
            );
    }
}

export default RemoveMovieBlockButton;