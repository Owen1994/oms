import React from 'react';
import {
    Form, Tabs,
} from 'antd';
import { TAB_TITLES } from '../constants';
import Inventory from '../containers/Inventory';
import OutStock from '../containers/OutStock';
import OutStockDetail from '../containers/OutStockDetails';
import Stock from '../containers/Stock';
import StockDetail from '../containers/StockDetails';

/**
 * 库存维护报表
 */
const TabPane = Tabs.TabPane;

class App extends React.Component {
    render() {
        return (
            <div className="wms-tabs">
                <Tabs defaultActiveKey="1" type="card" onChange={this.tabChange}>
                    <TabPane tab={TAB_TITLES[0]} key="1">
                        <Stock menuInfos={this.props.menuInfos} />
                    </TabPane>
                    <TabPane tab={TAB_TITLES[1]} key="2">
                        <StockDetail menuInfos={this.props.menuInfos} />
                    </TabPane>
                    <TabPane tab={TAB_TITLES[2]} key="3">
                        <OutStock menuInfos={this.props.menuInfos} />
                    </TabPane>
                    <TabPane tab={TAB_TITLES[3]} key="4">
                        <OutStockDetail menuInfos={this.props.menuInfos} />
                    </TabPane>
                    <TabPane tab={TAB_TITLES[4]} key="5">
                        <Inventory menuInfos={this.props.menuInfos} />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Form.create()(App);
