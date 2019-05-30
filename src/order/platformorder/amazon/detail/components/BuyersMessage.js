import React, { Component } from 'react';
const imgVerticalLine = require('../img/VerticalLine.png');

/**
 * 订单信息
 */
class BuyersMessage extends Component {
    render() {
        const { amazonListData } = this.props;
        const buyerMessageData = amazonListData.buyerMessage ? amazonListData.buyerMessage : {};
        return (
            <div className="amazon-detail-buyers-info">
                <img
                    className="amazon-detail-head-img"
                    src={imgVerticalLine}
                    alt=""
                    width="3px"
                    height="12px"
                />
                <span className="amazon-detail-head-label">买家留言</span>

                <div className="amazon-detail-buyers-message-div">
                    {buyerMessageData.buyerMessage ? buyerMessageData.buyerMessage : '无'}
                </div>
            </div>
        );
    }
}

export default BuyersMessage;
