import React from "react";
import { connect } from "react-redux";
import changeItemsCountOnPage from "../../store/actions/changeItemsCountOnPage";

import RoomInfo from "../../components/room-info/room-info.js";
import Pagination from "../../components/pagination/pagination.js";

import "./room-info-list.scss";

class RoomInfoList extends React.Component {
  constructor(props) {
    super(props);
  }

  getInfoBlocks() {
    const { pagination, pageNumber } = this.props;
    const { itemsCountOnPage } = pagination;
    const blocks = require("./data.json").roomsInfo;

    const t1 = pageNumber * itemsCountOnPage;
    const result = blocks.filter((block, index) =>
      (index >= t1 - itemsCountOnPage && index < t1)
    );
    return result;
  }

  getPageCount() {
    const { pagination, pageNumber } = this.props;
    const { itemsCountOnPage } = pagination;
    const totalItemsCount = require("./data.json").roomsInfo.length;

    const test = totalItemsCount / itemsCountOnPage;
    const test2 = `${test}`;
    const test3 = test2.split(/\.|\,/);
    if (test3.length === 0) return test;

    const n1 = Number.parseInt(test3[0]);
    const n2 = Number.parseInt(test3[1]);
    if (n2 === 0) return n1;
    return n1 + 1;
  }

  /* handlerChangePage = (pageNumber) => {
      this.props.changePage(pageNumber);
  } */

  render() {
    const { pagination, pageNumber } = this.props;
    const { itemsCountOnPage } = pagination;
    const totalItemsCount = require("./data.json").roomsInfo.length;

    return (
      <div className="room-info-list">
        <div className="room-info-list__room-list">
          {this.getInfoBlocks().map((block, index) => {
            return (
              <div className="room-info-list__list-item" key={`room-info-list__list-item-${pageNumber}-${index}`}>
                <RoomInfo
                  url={block.url}
                  blockNumber={block.blockNumber}
                  photosCount={block.photosCount}
                  checkedStarIndex={block.checkedStarIndex}
                  reviewsCount={block.reviewsCount}
                  roomNumber={block.roomNumber}
                  roomStatus={block.roomStatus}
                  roomPrice={block.roomPrice}
                  currencyType={block.currencyType}
                />
              </div>
            );
          })}
        </div>
        <div className="room-info-list__pagination">
          <Pagination
            title="Pagination"
            pageNumber={pageNumber}
            pagesCount={this.getPageCount()}
            totalItemsCount={totalItemsCount}
          /* handlerChangePage={this.handlerChangePage} */
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return state;
}

const actions = {
  changeItemsCountOnPage,
};

export default connect(mapStateToProps, actions)(RoomInfoList);
