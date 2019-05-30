import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import './index.css'

class Tab extends Component {
    render() {
        const { tab, defaultActiveKey, activeKey } = this.props;
        const list = tab || [];
        return (
            <div className="tclould-tab">
                <Tabs
                    // defaultActiveKey={defaultActiveKey}
                    activeKey={activeKey}
                    animated={false}
                >
                    {
                        list.map((item, index) => {
                            var url = <Link to={item.url} >{item.tempName}({item.tempNum})</Link>
                            return (
                                <TabPane tab={url} key={item.tempId} />
                            )
                        })
                    }
                </Tabs>
            </div>
        );
    }
}

export default Tab;