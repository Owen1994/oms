import React from 'react';
import Chat from './Chat';
import OrderDetail from './OrderDetail';
import GoodsInfo from './GoodsInfo';
import './css/index.css';

class RecordChatBox extends React.Component {
    render() {
        const { operateType, messageType, orderNumberArr } = this.props;
        let orderDetail;
        if (operateType === '1') {
            if (orderNumberArr.length > 0 && messageType === 1) {
                orderDetail = <OrderDetail {...this.props} />;
            } else if (messageType === 3) {
                orderDetail = <GoodsInfo {...this.props} />;
            } else {
                orderDetail = <div className="order-detail-nodata">无关联信息</div>;
            }
        } else {
            orderDetail = null;
        }
        return (
            <div className="chatbox-order-detail">
                <Chat {...this.props} />
                {orderDetail}
            </div>
        );
    }
}
export default RecordChatBox;
