import React from "react";
import "./pagination.scss";

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        let options = {};
        Object.assign(options, props);
        this.state = options;
    }

    /* componentDidMount() {
        this.writeBottomText();
        this.setClickEventsToPagesLinks();
    }

    componentDidUpdate() {
        this.writeBottomText();
        this.setClickEventsToPagesLinks();
    } */

    /* setClickEventsToPagesLinks = () => {
        const links = this.outerContainerElement.querySelectorAll(".js-pagination__link");
        links.forEach((a) => {
            a.onclick = this.handlerSelectPage;
        });
    } */

    writeBottomText = () => {
        const { itemsCount, pagesCount, curPageNumber } = this.state;
        const firstItemCountNumber = Math.round(itemsCount / pagesCount) * (curPageNumber - 1) + 1;
        let lastItemCountNumber = Math.round(itemsCount / pagesCount) * curPageNumber;
        if (lastItemCountNumber > itemsCount) lastItemCountNumber = itemsCount;
        const itemsCountText = itemsCount > 100 ? "100+" : `${itemsCount}`;

        return `${firstItemCountNumber} - ${lastItemCountNumber} из ${itemsCountText} вариантов аренды`;
    }

    handlerSelectPage = (event) => {
        event.preventDefault();

        let { curPageNumber } = this.state;

        const selectedPageNumber = event.currentTarget.dataset.pageNumber;
        if (selectedPageNumber === "leftArrow") {
            curPageNumber -= 1;
        } else if (selectedPageNumber === "rightArrow") {
            curPageNumber += 1;
        } else {
            curPageNumber = Number.parseInt(selectedPageNumber, 10);
        }

        this.setState({
            curPageNumber,
        });
    }

    render() {
        const {
            title,
            curPageNumber,
            pagesCount,
            itemsCount
        } = this.state;

        return (
            <div className="pagination" data-pages-count={pagesCount} data-items-count={itemsCount} data-cur-page={curPageNumber}>
                {title ? <p className="pagination__title">{title}</p> : null}
                <div className="pagination__list">
                    {curPageNumber !== 1 ?
                        <React.Fragment>
                            <a className="pagination__left-arrow js-pagination__link" href="#" data-page-number="leftArrow"
                                onClick={this.handlerSelectPage}>
                                <span className="pagination__left-arrow-text">arrow_forward</span>
                            </a>
                            <a className="pagination__link js-pagination__link" href="#" data-page-number="1"
                                onClick={this.handlerSelectPage}>
                                <span className="pagination__link-text">1</span>
                            </a>
                        </React.Fragment>
                        : null
                    }
                    {curPageNumber - 3 > 1 ?
                        <a className="pagination__link" href="#" data-page-number="...">
                            <span className="pagination__link-text">...</span>
                        </a>
                        : null
                    }
                    {curPageNumber - 2 > 1 ?
                        <a className="pagination__link js-pagination__link" href="#" data-page-number={curPageNumber - 2}
                            onClick={this.handlerSelectPage}>
                            <span className="pagination__link-text">{curPageNumber - 2}</span>
                        </a>
                        : null
                    }
                    {curPageNumber - 1 > 1 ?
                        <a className="pagination__link js-pagination__link" href="#" data-page-number={curPageNumber - 1}
                            onClick={this.handlerSelectPage}>
                            <span className="pagination__link-text">{curPageNumber - 1}</span>
                        </a>
                        : null
                    }
                    <a className="pagination__link js-pagination__link pagination__link_target" href="#" data-page-number={curPageNumber}
                        onClick={this.handlerSelectPage}>
                        <span className="pagination__link-text">{curPageNumber}</span>
                    </a>
                    {curPageNumber + 1 < pagesCount ?
                        <a className="pagination__link js-pagination__link" href="#" data-page-number={curPageNumber + 1}
                            onClick={this.handlerSelectPage}>
                            <span className="pagination__link-text">{curPageNumber + 1}</span>
                        </a>
                        : null
                    }
                    {curPageNumber + 2 < pagesCount ?
                        <a className="pagination__link js-pagination__link" href="#" data-page-number={curPageNumber + 2}
                            onClick={this.handlerSelectPage}>
                            <span className="pagination__link-text">{curPageNumber + 2}</span>
                        </a>
                        : null
                    }
                    {curPageNumber + 3 < pagesCount ?
                        <a className="pagination__link" href="#" data-page-number="...">
                            <span className="pagination__link-text">...</span>
                        </a>
                        : null
                    }
                    {curPageNumber !== pagesCount ?
                        <React.Fragment>
                            <a className="pagination__link js-pagination__link" href="#" data-page-number={pagesCount}
                                onClick={this.handlerSelectPage}>
                                <span className="pagination__link-text">{pagesCount}</span>
                            </a>
                            <a className="pagination__right-arrow js-pagination__link" href="#" data-page-number="rightArrow"
                                onClick={this.handlerSelectPage}>
                                <span className="pagination__right-arrow-text">arrow_forward</span>
                            </a>
                        </React.Fragment>
                        : null
                    }
                </div>
                <p className="pagination__bottom-text">{this.writeBottomText()}</p>
            </div>
        );
    }
}

export default Pagination;
