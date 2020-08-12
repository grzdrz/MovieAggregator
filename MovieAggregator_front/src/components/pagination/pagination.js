import React from "react";
import "./pagination.scss";

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    writeBottomText = () => {
        const { totalItemsCount, pagesCount, pageNumber } = this.props;
        const firstItemCountNumber = Math.round(totalItemsCount / pagesCount) * (pageNumber - 1) + 1;
        let lastItemCountNumber = Math.round(totalItemsCount / pagesCount) * pageNumber;
        if (lastItemCountNumber > totalItemsCount) lastItemCountNumber = totalItemsCount;
        const totalItemsCountText = totalItemsCount > 100 ? "100+" : `${totalItemsCount}`;

        return `${firstItemCountNumber} - ${lastItemCountNumber} из ${totalItemsCountText} вариантов аренды`;
    }

    handlerSelectPage = (event) => {
        event.preventDefault();

        let { pageNumber } = this.props;

        const selectedPageNumber = event.currentTarget.dataset.pageNumber;
        if (selectedPageNumber === "leftArrow") {
            pageNumber -= 1;
        } else if (selectedPageNumber === "rightArrow") {
            pageNumber += 1;
        } else {
            pageNumber = Number.parseInt(selectedPageNumber, 10);
        }

        /* this.setState({
            pageNumber,
        }); */
        this.props.handlerChangePage(pageNumber);
    }

    render() {
        const {
            title,
            pageNumber,
            pagesCount,
            totalItemsCount
        } = this.props;

        return (
            <div className="pagination" data-pages-count={pagesCount} data-items-count={totalItemsCount} data-cur-page={pageNumber}>
                {title ? <p className="pagination__title">{title}</p> : null}
                <div className="pagination__list">
                    {pageNumber !== 1 ?
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
                    {pageNumber - 3 > 1 ?
                        <a className="pagination__link" href="#" data-page-number="...">
                            <span className="pagination__link-text">...</span>
                        </a>
                        : null
                    }
                    {pageNumber - 2 > 1 ?
                        <a className="pagination__link js-pagination__link" href="#" data-page-number={pageNumber - 2}
                            onClick={this.handlerSelectPage}>
                            <span className="pagination__link-text">{pageNumber - 2}</span>
                        </a>
                        : null
                    }
                    {pageNumber - 1 > 1 ?
                        <a className="pagination__link js-pagination__link" href="#" data-page-number={pageNumber - 1}
                            onClick={this.handlerSelectPage}>
                            <span className="pagination__link-text">{pageNumber - 1}</span>
                        </a>
                        : null
                    }
                    <a className="pagination__link js-pagination__link pagination__link_target" href="#" data-page-number={pageNumber}
                        onClick={this.handlerSelectPage}>
                        <span className="pagination__link-text">{pageNumber}</span>
                    </a>
                    {pageNumber + 1 < pagesCount ?
                        <a className="pagination__link js-pagination__link" href="#" data-page-number={pageNumber + 1}
                            onClick={this.handlerSelectPage}>
                            <span className="pagination__link-text">{pageNumber + 1}</span>
                        </a>
                        : null
                    }
                    {pageNumber + 2 < pagesCount ?
                        <a className="pagination__link js-pagination__link" href="#" data-page-number={pageNumber + 2}
                            onClick={this.handlerSelectPage}>
                            <span className="pagination__link-text">{pageNumber + 2}</span>
                        </a>
                        : null
                    }
                    {pageNumber + 3 < pagesCount ?
                        <a className="pagination__link" href="#" data-page-number="...">
                            <span className="pagination__link-text">...</span>
                        </a>
                        : null
                    }
                    {pageNumber !== pagesCount ?
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
