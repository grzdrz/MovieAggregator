import React from "react";
import { NavLink } from "react-router-dom";
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

  calculateArrowNumber(isLeft) {
    const { pagesCount, pageNumber } = this.props;

    if (isLeft) {
      return Math.max(pageNumber - 1, 1);
    }
    return Math.min(pageNumber + 1, pagesCount);
  }

  render() {
    const {
      title,
      pageNumber,
      pagesCount,
      totalItemsCount,
    } = this.props;

    return (
      <div className="pagination">
        {title ? <p className="pagination__title">{title}</p> : null}
        <div className="pagination__list">
          {pageNumber !== 1 ?
            <React.Fragment>
              <NavLink className="pagination__left-arrow" key={"pagination-arrow-back"} to={`/${this.calculateArrowNumber(true)}`}>
                <span className="pagination__left-arrow-text">arrow_forward</span>
              </NavLink>
              <NavLink className="pagination__link" key={"pagination-first"} to={"/1"}>
                <span className="pagination__link-text">1</span>
              </NavLink>
            </React.Fragment>
            : null
          }
          {pageNumber - 3 > 1 ?
            <p className="pagination__link" data-page-number="...">
              <span className="pagination__link-text">...</span>
            </p>
            : null
          }
          {pageNumber - 2 > 1 ?
            <NavLink exact className="pagination__link" key={"pagination--2"} to={`/${pageNumber - 2}`}>
              <span className="pagination__link-text">{pageNumber - 2}</span>
            </NavLink>
            : null
          }
          {pageNumber - 1 > 1 ?
            <NavLink className="pagination__link" key={"pagination--1"} to={`/${pageNumber - 1}`}>
              <span className="pagination__link-text">{pageNumber - 1}</span>
            </NavLink>
            : null
          }
          <NavLink className="pagination__link pagination__link_target" key={"pagination-0"} to={`/${pageNumber}`}>
            <span className="pagination__link-text">{pageNumber}</span>
          </NavLink>
          {pageNumber + 1 < pagesCount ?
            <NavLink className="pagination__link" key={"pagination-1"} to={`/${pageNumber + 1}`}>
              <span className="pagination__link-text">{pageNumber + 1}</span>
            </NavLink>
            : null
          }
          {pageNumber + 2 < pagesCount ?
            <NavLink className="pagination__link" key={"pagination-2"} to={`/${pageNumber + 2}`}>
              <span className="pagination__link-text">{pageNumber + 2}</span>
            </NavLink>
            : null
          }
          {pageNumber + 3 < pagesCount ?
            <p className="pagination__link" data-page-number="...">
              <span className="pagination__link-text">...</span>
            </p>
            : null
          }
          {pageNumber !== pagesCount ?
            <React.Fragment>
              <NavLink className="pagination__link" key={"pagination-last"} to={`/${pagesCount}`}>
                <span className="pagination__link-text">{pagesCount}</span>
              </NavLink>
              <NavLink className="pagination__right-arrow" key={"pagination-arrow-forward"} to={`/${this.calculateArrowNumber(false)}`}>
                <span className="pagination__right-arrow-text">arrow_forward</span>
              </NavLink>
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
