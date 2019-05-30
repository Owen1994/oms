import React from 'react';
import { Tabs } from 'antd';
import OperateContainer from '../containers/operate';
import DataContainer from '../containers/data';
const TabPane = Tabs.TabPane;


export default class App extends React.Component {

    render() {
        return (
            <div className="yks-erp-tabs">
                <Tabs defaultActiveKey="1" type="card">
                    <TabPane tab="操作权限" key="1">
                        <OperateContainer
                            {...this.props}
                        />
                    </TabPane>
                    <TabPane tab="数据权限" key="2">
                        <DataContainer
                            {...this.props}
                        />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
