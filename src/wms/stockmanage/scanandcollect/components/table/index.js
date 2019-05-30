import React, { Component } from 'react';
import { Tabs } from 'antd';
import ScanReceiptTable from './ScanReceiptTable';
import ReceivedTable from './ReceivedTable';
import { RECEIVED_TABLE, SCANRECEIPT_TABLE } from '../../constants/TableList';
import { TYPE_2_RECEIPT_PACKAGING } from '../../constants';
import '../../../../common/css/index.css';

const TabPane = Tabs.TabPane;

class TableList extends Component {
    onTabChange = (activeKey) => {
        this.props.onTabChangeListener(activeKey);
    };

    render() {
        const {
            pageNumber, pageData, activeKey, onCardSearch, receivingType,
        } = this.props;
        return (
            <div className="breadcrumb margin-ss-top wms-tabs">
                <Tabs
                    type="card"
                    activeKey={activeKey}
                    defaultActiveKey={SCANRECEIPT_TABLE}
                    onChange={this.onTabChange}
                >
                    <TabPane key={SCANRECEIPT_TABLE} tab="扫描收货">
                        <ScanReceiptTable
                            {...this.props}
                        />
                    </TabPane>
                    {receivingType !== TYPE_2_RECEIPT_PACKAGING ? (
                        <TabPane key={RECEIVED_TABLE} tab="已收货列表">
                            <ReceivedTable
                                pageNumber={pageNumber}
                                pageData={pageData}
                                onChangeListener={onCardSearch}
                                {...this.props}
                            />
                        </TabPane>
                    ) : null}
                </Tabs>
            </div>
        );
    }
}

export default TableList;
