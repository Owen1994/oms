import React from 'react';
import {
    Tabs,
} from 'antd';
import AuditedTask from './AuditedTask';
import HistoryPricing from './HistoryPricing';

const TabPane = Tabs.TabPane;

/**
 *作者: huangjianfeng
 *功能描述: 核价管理
 *时间: 2018/10/11 15:55
 */
class App extends React.Component {
    state = {
        activeKey: '0',
    }

    handleTabChange = (activeKey) => {
        this.setState({
            activeKey,
        });
        // this.props.setPageCacheAction({ path: location.pathname, data: { activeKey } });
    }

    render() {
        const { activeKey } = this.state;
        return (
            <div className="audited-task tweb-tab">
                <Tabs defaultActiveKey={activeKey} type="card" onChange={this.handleTabChange}>
                    <TabPane tab="待核价任务" key="0">
                        <AuditedTask {...this.props} />
                    </TabPane>
                    <TabPane tab="历史核价" key="1">
                        <HistoryPricing {...this.props} />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
export default App;
