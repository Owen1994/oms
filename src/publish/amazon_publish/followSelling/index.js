import React from 'react';
import { Form, Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import Wentdutch from './wentdutch'
import Monitorsetting from './monitorsetting'
import { functions } from '@/util/baseTool'
import Functions from '@/components/functions'
import './css.css'

class App extends React.Component {
    render() {
        const hasList = functions(this, "008-000007-000002-001");
        const hasSet = functions(this, "008-000007-000002-004");
        return (
            <Functions {...this.props} isPage={true} functionkey={["008-000007-000002-001", "008-000007-000002-004"]}>
                <div className={"pricing-system_container"}>
                    <div className={"pricing-system_card-container"}>
                        <Tabs type="card" onChange={this.handleTabs}>
                            {
                                hasList ?

                                    <TabPane tab="监控列表" key="1">
                                        <Wentdutch {...this.props} />
                                    </TabPane>
                                    : null
                            }
                            {
                                hasSet ?
                                    <TabPane tab="监控设置" key="2">
                                        <Monitorsetting {...this.props} />
                                    </TabPane>
                                    : null
                            }
                        </Tabs>
                    </div>
                </div>
            </Functions>
        )
    }
}
export default App