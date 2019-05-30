import React from 'react';
import { Form } from 'antd';
import OrderInfo from './OrderInfo';
import BuyersInfo from './BuyersInfo';
import MoneyInfo from './MoneyInfo';
import AddressInfo from './AddressInfo';
import BuyersMessage from './BuyersMessage';
import GoodsInfo from './GoodsInfo';
import TimeInfo from './TimeInfo';
import LogInfo from './LogInfo';
import { getUrlParams } from 'util/baseTool';


/**
 *作者: zhengxuening
 *功能描述: amazon订单详情
 *时间: 2018/12/14 10:00
 */
class App extends React.Component {
    componentDidMount() {
        const dic = getUrlParams('');
        const parameter = { platformOrderNumber: dic.orderNumber };
        const params = {
            pageNumber: 1,
            pageData: 20,
            ...parameter,
        };
        this.props.queryAmazonDetail(parameter);
        this.props.queryAmazonDetailLog({ data: params });
    }

    render() {
        return (
            <div>
                <OrderInfo
                    { ...this.props }
                />
                <BuyersInfo
                    { ...this.props }
                />
                <MoneyInfo
                    { ...this.props }
                />
                <AddressInfo
                    { ...this.props }
                />
                <BuyersMessage
                    { ...this.props }
                />
                <GoodsInfo
                    { ...this.props }
                />
                <TimeInfo
                    { ...this.props }
                />
                <LogInfo
                    {...this.props}
                />
            </div>
        );
    }
}
export default Form.create()(App);
