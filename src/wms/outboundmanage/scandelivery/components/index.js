import React from 'react';
import {
    Form, Tabs,
} from 'antd';
import '../css/index.css';
import '../../../common/css/index.css';
import { TAB_TITLES } from '../constants/Table';
import ScanDeliveryPage from '../containers/ScanDeliveryPage';
import WeighingPage from '../containers/WeighingPage';
import ChannelPage from '../containers/ChannelPage';
import CollectGoodsPage from '../containers/CollectGoodsPage';
import UpdateWeightPage from '../containers/UpdateWeightPage';
import Functions from '../../../../components/functions';

const TabPane = Tabs.TabPane;

/**
 * 扫描发运
 */
class App extends React.Component {
    state = {
        selectKey: '0',
    };

    tabChange = (selectKey) => {
        this.setState({
            selectKey,
        });
    };

    render() {
        const { selectKey } = this.state;
        return (
            <div className="wms-scandelivery wms-tabs">
                <Tabs defaultActiveKey={selectKey} type="card" onChange={this.tabChange}>
                    <TabPane tab={TAB_TITLES[0]} key="0">
                        <Functions
                            isPage
                            {...this.props}
                            functionkey="012-000006-000004-001"
                        >
                            <ScanDeliveryPage
                                menuInfos={this.props.menuInfos}
                            />
                        </Functions>
                    </TabPane>
                    <TabPane tab={TAB_TITLES[1]} key="1">
                        <Functions
                            isPage
                            {...this.props}
                            functionkey="012-000006-000004-004"
                        >
                            <WeighingPage
                                {...this.props}
                            />
                        </Functions>
                    </TabPane>
                    <TabPane tab={TAB_TITLES[2]} key="2">
                        <Functions
                            isPage
                            {...this.props}
                            functionkey="012-000006-000004-006"
                        >
                            <ChannelPage
                                menuInfos={this.props.menuInfos}
                            />
                        </Functions>
                    </TabPane>
                    <TabPane tab={TAB_TITLES[3]} key="3">
                        <Functions
                            isPage
                            {...this.props}
                            functionkey="012-000006-000004-008"
                        >
                            <CollectGoodsPage
                                menuInfos={this.props.menuInfos}
                            />
                        </Functions>
                    </TabPane>
                    <TabPane tab={TAB_TITLES[4]} key="4">
                        <Functions
                            isPage
                            {...this.props}
                            functionkey="012-000006-000004-011"
                        >
                            <UpdateWeightPage
                                menuInfos={this.props.menuInfos}
                            />
                        </Functions>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Form.create()(App);
