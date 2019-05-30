import React from 'react';
import {
    Form, Tabs,
} from 'antd';
import QualityTest from '../containers/QualityTest';
import QualityTestDetail from '../containers/QualityTestDetail';
import ReceiveGoods from '../containers/ReceivieGoods';
import ReceivieGoodsDetail from '../containers/ReceivieGoodsDetail';
import Compare from '../containers/Compare';
import CompareDetail from '../containers/CompareDetail';
import Functions from '../../../../components/functions';
import { TAB_TITLES } from '../constants';
import '../css/index.css';

/**
 * 入库报表
 */
const TabPane = Tabs.TabPane;

class App extends React.Component {
    render() {
        return (
            <div className="wms-tabs stockforms">
                <Tabs defaultActiveKey="1" type="card" onChange={this.tabChange}>
                    <TabPane tab={TAB_TITLES[0]} key="1">
                        <Functions
                            isPage
                            {...this.props}
                            functionkey="012-000010-000001-001"
                        >
                            <ReceiveGoods menuInfos={this.props.menuInfos} />
                        </Functions>
                    </TabPane>
                    <TabPane tab={TAB_TITLES[1]} key="2">
                        <Functions
                            isPage
                            {...this.props}
                            functionkey="012-000010-000001-003"
                        >
                            <ReceivieGoodsDetail menuInfos={this.props.menuInfos} />
                        </Functions>
                    </TabPane>
                    <TabPane tab={TAB_TITLES[2]} key="3">
                        <Functions
                            isPage
                            {...this.props}
                            functionkey="012-000010-000001-005"
                        >
                            <Compare menuInfos={this.props.menuInfos} />
                        </Functions>
                    </TabPane>
                    <TabPane tab={TAB_TITLES[3]} key="4">
                        <Functions
                            isPage
                            {...this.props}
                            functionkey="012-000010-000001-007"
                        >
                            <CompareDetail menuInfos={this.props.menuInfos} />
                        </Functions>
                    </TabPane>
                    <TabPane tab={TAB_TITLES[4]} key="5">
                        <Functions
                            isPage
                            {...this.props}
                            functionkey="012-000010-000001-009"
                        >
                            <QualityTest menuInfos={this.props.menuInfos} />
                        </Functions>
                    </TabPane>
                    <TabPane tab={TAB_TITLES[5]} key="6">
                        <Functions
                            isPage
                            {...this.props}
                            functionkey="012-000010-000001-011"
                        >
                            <QualityTestDetail menuInfos={this.props.menuInfos} />
                        </Functions>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Form.create()(App);
