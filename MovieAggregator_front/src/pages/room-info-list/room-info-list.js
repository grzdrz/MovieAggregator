import React from "react";
import { connect } from "react-redux";
import changeItemsCountOnPage from "../../store/actions/changeItemsCountOnPage";
import createItem from "../../store/actions/roomsInfoActions/createItem";
import deleteItem from "../../store/actions/roomsInfoActions/deleteItem";
import updateItem from "../../store/actions/roomsInfoActions/updateItem";

import CreateButton from "../../components/create-button/create-button";
import RoomInfo from "../../components/room-info/room-info";
import Pagination from "../../components/pagination/pagination";

import "./room-info-list.scss";

class RoomInfoList extends React.Component {
  constructor(props) {
    super(props);
  }

  getInfoBlocks() {
    const { pagination, roomsInfo, pageNumber } = this.props;
    const { itemsCountOnPage } = pagination;
    const blocks = roomsInfo.roomsInfo;
    const totalItemsCount = roomsInfo.roomsInfo.length;

    const t1 = pageNumber * itemsCountOnPage;
    const result = blocks.filter((block, index) =>
      (index >= t1 - itemsCountOnPage && index < t1)
    );
    return result;
  }

  getPageCount() {
    const { pagination, roomsInfo, pageNumber } = this.props;
    const { itemsCountOnPage } = pagination;
    const totalItemsCount = roomsInfo.roomsInfo.length;

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
    const { pagination, roomsInfo, pageNumber } = this.props;
    const { itemsCountOnPage } = pagination;
    const totalItemsCount = roomsInfo.roomsInfo.length;


    return (
      <div className="room-info-list">
        <div className="room-info-list__room-list">
          <div className="room-info-list__create-button">
            <CreateButton createItem={this.props.createItem}/>
          </div>
          {this.getInfoBlocks().map((block, index) => {
            return (
              <div className="room-info-list__list-item" key={`room-info-list__list-item-${pageNumber}-${index}`}>
                <RoomInfo
                  id={block.id}
                  url={block.url}
                  photosCount={block.photosCount}
                  checkedStarIndex={block.checkedStarIndex}
                  reviewsCount={block.reviewsCount}
                  number={block.number}
                  status={block.status}
                  price={block.price}
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
  createItem,
  deleteItem,
  updateItem,
};

export default connect(mapStateToProps, actions)(RoomInfoList);
