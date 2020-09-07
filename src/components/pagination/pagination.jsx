/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { NavLink } from 'react-router-dom';
import './pagination.scss';

class Pagination extends React.Component {
  writeBottomText = () => {
    const { totalItemsCount, pagesCount, pageNumber } = this.props;
    const firstItemCountNumber = Math.round(totalItemsCount / pagesCount) * (pageNumber - 1) + 1;
    let lastItemCountNumber = Math.round(totalItemsCount / pagesCount) * pageNumber;
    if (lastItemCountNumber > totalItemsCount) lastItemCountNumber = totalItemsCount;
    const totalItemsCountText = totalItemsCount > 100 ? '100+' : `${totalItemsCount}`;

    return `${firstItemCountNumber} - ${lastItemCountNumber} из ${totalItemsCountText} продуктов`;
  }

  calculateArrowNumber(isLeft) {
    const { pagesCount, pageNumber } = this.props;

    if (isLeft) {
      return Math.max(pageNumber - 1, 1);
    }
    return Math.min(pageNumber + 1, pagesCount);
  }

  setPageNumber(number) {
    const { changeCurrentPage } = this.props;
    changeCurrentPage(number);
  }

  render() {
    const {
      title,
      pageNumber,
      pagesCount,
      totalItemsCount,
      changeCurrentPage,
    } = this.props;

    return (
      <div className='pagination'>
        {title ? <p className='pagination__title'>{title}</p> : null}
        <div className='pagination__list'>
          {pageNumber !== 1
            ? (
              <>
                <NavLink
                  className='pagination__left-arrow'
                  to={`/ProductSupermarket/productList/${this.calculateArrowNumber(true)}`}
                  onClick={this.setPageNumber.bind(this, this.calculateArrowNumber(true))}
                >
                  <span className='pagination__left-arrow-text'>arrow_forward</span>
                </NavLink>
                <NavLink
                  className='pagination__link'
                  to='/ProductSupermarket/productList/1'
                  onClick={this.setPageNumber.bind(this, 1)}
                >
                  <span className='pagination__link-text'>1</span>
                </NavLink>
              </>
            )
            : null}
          {pageNumber - 3 > 1
            ? (
              <p className='pagination__link' data-page-number='...'>
                <span className='pagination__link-text'>...</span>
              </p>
            )
            : null}
          {pageNumber - 2 > 1
            ? (
              <NavLink
                className='pagination__link'
                to={`/ProductSupermarket/productList/${pageNumber - 2}`}
                onClick={this.setPageNumber.bind(this, pageNumber - 2)}
              >
                <span className='pagination__link-text'>{pageNumber - 2}</span>
              </NavLink>
            )
            : null}
          {pageNumber - 1 > 1
            ? (
              <NavLink
                className='pagination__link'
                to={`/ProductSupermarket/productList/${pageNumber - 1}`}
                onClick={this.setPageNumber.bind(this, pageNumber - 1)}
              >
                <span className='pagination__link-text'>{pageNumber - 1}</span>
              </NavLink>
            )
            : null}
          <NavLink
            className='pagination__link pagination__link_target'
            to={`/ProductSupermarket/productList/${pageNumber}`}
            onClick={this.setPageNumber.bind(this, pageNumber)}
          >
            <span className='pagination__link-text'>{pageNumber}</span>
          </NavLink>
          {pageNumber + 1 < pagesCount
            ? (
              <NavLink
                className='pagination__link'
                to={`/ProductSupermarket/productList/${pageNumber + 1}`}
                onClick={this.setPageNumber.bind(this, pageNumber + 1)}
              >
                <span className='pagination__link-text'>{pageNumber + 1}</span>
              </NavLink>
            ) : null}
          {pageNumber + 2 < pagesCount
            ? (
              <NavLink
                className='pagination__link'
                to={`/ProductSupermarket/productList/${pageNumber + 2}`}
                onClick={this.setPageNumber.bind(this, pageNumber + 2)}
              >
                <span className='pagination__link-text'>{pageNumber + 2}</span>
              </NavLink>
            ) : null}
          {pageNumber + 3 < pagesCount
            ? (
              <p className='pagination__link' data-page-number='...'>
                <span className='pagination__link-text'>...</span>
              </p>
            ) : null}
          {pageNumber !== pagesCount
            ? (
              <>
                <NavLink
                  className='pagination__link'
                  to={`/ProductSupermarket/productList/${pagesCount}`}
                  onClick={this.setPageNumber.bind(this, pagesCount)}
                >
                  <span className='pagination__link-text'>{pagesCount}</span>
                </NavLink>
                <NavLink
                  className='pagination__right-arrow'
                  to={`/ProductSupermarket/productList/${this.calculateArrowNumber(false)}`}
                  onClick={this.setPageNumber.bind(this, this.calculateArrowNumber(false))}
                >
                  <span className='pagination__right-arrow-text'>arrow_forward</span>
                </NavLink>
              </>
            ) : null}
        </div>
        <p className='pagination__bottom-text'>{this.writeBottomText()}</p>
      </div>
    );
  }
}

export default Pagination;
