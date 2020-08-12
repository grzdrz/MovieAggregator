import React from "react";
import RoomInfo from "../../components/room-info/room-info.js";
import Pagination from "../../components/pagination/pagination.js";
import "./room-info-list.scss";

class RoomInfoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 2,
            itemsCount: 3,
            totalItemsCount: require("./data.json").roomsInfo.length,
        };
    }

    getInfoBlocks() {
        const {
            pageNumber,
            itemsCount,
            totalItemsCount,
        } = this.state;

        const blocks = require("./data.json").roomsInfo;

        const t1 = pageNumber * itemsCount;
        const result = blocks.filter((block, index) =>
            (index >= t1 - itemsCount && index < t1)
        );
        return result;
    }

    getPageCount() {
        const {
            pageNumber,
            itemsCount,
            totalItemsCount,
        } = this.state;

        const test = totalItemsCount / itemsCount;
        const test2 = `${test}`.split(".", ",");
        if (test2.length === 0) return test;

        const n1 = Number.parseInt(test2[0]);
        const n2 = Number.parseInt(test2[1]);
        if (n2 === 0) return n1;
        return n1 + 1;
    }

    handlerChangePage = (pageNumber) => {
        this.setState({
            pageNumber,
        });
    }

    render() {
        return (
            <div className="room-info-list">
                <div className="room-info-list__room-list">
                    {this.getInfoBlocks().map((block, index) => {
                        return (
                            <div className="room-info-list__list-item" key={`room-info-list__list-item-${this.state.pageCount}-${index}`}>
                                <RoomInfo
                                    url={block.url}
                                    blockNumber={block.blockNumber}
                                    photos={block.photos}
                                    numberOfCheckedStar={block.numberOfCheckedStar}
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
                        pageNumber={this.state.pageNumber}
                        pagesCount={this.getPageCount()}
                        totalItemsCount={this.state.totalItemsCount}
                        handlerChangePage={this.handlerChangePage}
                    />
                </div>
            </div>
        );
    }
}

export default RoomInfoList;
