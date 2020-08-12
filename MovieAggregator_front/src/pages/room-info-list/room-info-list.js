import React from "react";
import RoomInfo from "../../components/room-info/room-info.js";
import Pagination from "../../components/pagination/pagination.js";
import "./room-info-list.scss";

class RoomInfoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getInfoBlocks(pageNumber) {
        const blocks = require("./data.json").roomsInfo;
        return [blocks[0], blocks[1], blocks[2]];
    }

    render() {
        return (
            <div className="room-info-list">
                <div className="room-info-list__room-list">
                    {this.getInfoBlocks(1).map((block, index) => {
                        return (
                            <div className="room-info-list__list-item" key={`room-info-list__list-item-${index}`}>
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
                    {/* <RoomInfo
                        url="#"
                        blockNumber={0}
                        photos={["test11", "test22", "test33", "test44"]}
                        numberOfCheckedStar={4}
                        reviewsCount={11}
                        roomNumber={789}
                        roomStatus="люкс"
                        roomPrice={12345}
                        currencyType="$"
                    /> */}
                </div>
                <div className="room-info-list__pagination">
                    <Pagination
                        title="Pagination"
                        curPageNumber={1}
                        pagesCount={15}
                        itemsCount={180}
                    />
                </div>
            </div>
        );
    }
}

export default RoomInfoList;
