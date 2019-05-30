import React, { Component } from 'react';
import { Tabs } from 'antd';
import LogTable from './LogTable';
import InspectionView from './InspectionView';
import PutawayView from './PutawayView';
import ReceiveGoodsView from './ReceiveGoodsView';
import RefundOrPaymentView from './RefundOrPaymentView';
import RacquetLogisticsView from './RacquetLogisticsView';
import SalesReturnDetailsView from './SalesReturnDetailsView';

const TableItem = Tabs.TabPane;

/**
 * 采购订单详情,底部tab切换
 */
class DetailsTabs extends Component {
    render() {
        return (
            <div>
                <div className="yks-erp-tabs">
                    <Tabs type="card" className="margin-bottom-60">
                        <TableItem
                            tab={"日志信息"}
                            key={"0"}
                        >
                            <LogTable {...this.props} />,
                        </TableItem>
                        <TableItem
                            tab={"付/退款明细"}
                            key={"1"}
                        >
                            <RefundOrPaymentView {...this.props} />
                        </TableItem>
                        <TableItem
                            tab={"收货明细"}
                            key={"2"}
                        >
                            <ReceiveGoodsView {...this.props} />
                        </TableItem>
                        <TableItem
                            tab={"质检明细"}
                            key={"3"}
                        >
                            <InspectionView {...this.props} />
                        </TableItem>
                        <TableItem
                            tab={"入库明细"}
                            key={"4"}
                        >
                            <PutawayView {...this.props} />
                        </TableItem>
                        <TableItem
                            tab={"网拍物流信息"}
                            key={"5"}
                        >
                            <RacquetLogisticsView {...this.props} />
                        </TableItem>
                        <TableItem
                            tab={"退货明细"}
                            key={"6"}
                        >
                            <SalesReturnDetailsView {...this.props} />
                        </TableItem>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default DetailsTabs;
