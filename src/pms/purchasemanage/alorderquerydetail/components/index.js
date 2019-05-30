import React from 'react';
import {
    Form, Tabs,
} from 'antd';
import '../css/css.css';
import OrderInfoView from './OrderInfoView';
import ProductInfoView from './ProductInfoView';
import LogisticsInfoView from './LogisticsInfoView';
import PriceRecordView from './PriceRecordView';

import { getUrlParams } from "../../../../util/baseTool";

const TableItem = Tabs.TabPane;

/**
 *作者: huangjianfeng
 *功能描述: 采购单查询
 *时间: 2018/10/11 15:55
 */
class App extends React.Component {

    /**
     * 第一次初始化视图,加载数据
     */
    componentDidMount() {
        this.loadData();
    }

    /**
     * 加载数据
     */
    loadData = () => {
        const parameter = { data: { key: getUrlParams('').alKey } };
        this.props.getMainDataList(parameter);
    };

    render() {
        return (
            <div>
                <OrderInfoView
                    {...this.props}
                />

                <ProductInfoView
                    {...this.props}
                />

                <div className="yks-erp-tabs">
                    <Tabs type="card" className="margin-bottom-60">
                        <TableItem
                            tab={"物流信息"}
                            key={"0"}
                        >
                            <LogisticsInfoView {...this.props} />
                        </TableItem>
                        <TableItem
                            tab={"价格修改记录"}
                            key={"1"}
                        >
                            <PriceRecordView {...this.props} />
                        </TableItem>
                    </Tabs>
                </div>

            </div>
        );
    }
}

export default Form.create()(App);
