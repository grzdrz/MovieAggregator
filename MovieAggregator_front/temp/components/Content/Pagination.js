import React from "react";
import {
    HashRouter,
    Switch,
    Route,
    Link,
    NavLink,
    Redirect
} from "react-router-dom";

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pageCount: 1 };

        this.getPageCount = this.getPageCount.bind(this);
    }

    componentWillMount() {
        this.getPageCount();
    }

    /* async  */getPageCount() {
        /* let url = 'https://localhost:44373/Movies/GetMoviesInfoPageCount';
        let response = await fetch(url);

        let pageCount = await response.text();
        pageCount = parseInt(pageCount); */
        const pageCount = 20;

        this.setState({ pageCount: pageCount });
    }

    render() {
        let tempArr = [];
        for (let i = 0; i < this.state.pageCount; i++) {
            tempArr.push("");
        }

        if (tempArr.length !== 0) {
            return (
                <div id="pagination">
                    <ul>
                        {
                            tempArr.map((e, i) => {
                                return (
                                    <li key={"Pagination" + i}>
                                        <NavLink key={"PaginationNavLink" + i} to={`/${i + 1}`}><p>{i + 1}</p></NavLink>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            );
        }
        else
            return <p style={{ textAlign: "center", color: "#d8b440" }}>Loading...</p>
    }
}

export default Pagination;
