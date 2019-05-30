import React from 'react';
import {
    Tabs,
} from 'antd';
import '../css/index.css';
import StoragePlace from './storageplace';
import Inventory from './inventory';
import Functions from '@/components/functions';

const TabPane = Tabs.TabPane;

export default class App extends React.Component {
    state = {
        activeKey: '0',
    }

    handleTabChange = (activeKey) => {
        this.setState({
            activeKey,
        });
    }

    render() {
        const { activeKey } = this.state;
        return (
            <div className="wms-tabs">
                <Tabs defaultActiveKey={activeKey} type="card" onChange={this.handleTabChange}>
                    <TabPane tab="储位管理" key="0">
                        <Functions {...this.props} isPage functionkey="012-000005-000001-001">
                            <StoragePlace
                                {...this.props}
                                tabId={0}
                            />
                        </Functions>
                    </TabPane>
                    <TabPane tab="储位库存设置" key="1">
                        <Functions {...this.props} isPage functionkey="012-000005-000001-005">
                            <Inventory
                                {...this.props}
                                tabId={1}
                            />
                        </Functions>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

// export default Form.create()(App);
