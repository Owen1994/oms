import React from 'react'

import {
    Tabs
} from 'antd';
import User from './user';
import Platform from './platform';
import UserGroup from './usergroup';
const TabPane = Tabs.TabPane;

export default class App extends React.Component {

    render() {
        return (
            <div>
                <div className="tweb-tabs">
                    <Tabs type="card">
                        <TabPane tab="用户列表" key="1" className="npd-tab">
                            <User {...this.props}/>
                        </TabPane>
                        <TabPane tab="平台列表" key="2" className="npd-tab">
                            <Platform  {...this.props}/>
                        </TabPane>
                        <TabPane tab="用户组列表" key="3">
                            <UserGroup  {...this.props}/>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}


