import React from 'react';
import { Tabs, message } from 'antd';

const TabPane = Tabs.TabPane;

class OperateTabs extends React.Component {
    state = {
        activeKey: '1',
        functionsTab: [],
    }

    componentDidMount() {
        // 权限过滤
        const pathname = window.location.pathname;
        const { menuInfos } = this.props;
        const { functionsTab } = this.state;
        const keys = menuInfos.functions[pathname] || [];
        if (keys.includes('009-000002-000004-002')) {
            this.setState({ activeKey: '1' });
            functionsTab.push(<TabPane tab="站内信" key="1" />);
        }
        if (keys.includes('009-000002-000004-008')) {
            functionsTab.push(<TabPane tab="买家邮件" key="2" />);
            if (!keys.includes('009-000002-000004-002')) {
                this.setState({ activeKey: '2' });
            }
        }
        this.setState({ functionsTab });
    }

    onChange = (key) => {
        // to do:取消无平台时不可切换的动作
        // const { platformLoading } = this.props;
        // if (platformLoading) {
        //     message.warning('正在获取平台数据,请稍后...');
        //     return;
        // }
        this.setState({ activeKey: key });
        this.props.handleOperateTabs(key);
    }

    render() {
        const { activeKey } = this.state;
        return (
            <div className="customer-service-operate-tabs">
                <Tabs
                    // defaultActiveKey="1"
                    activeKey={activeKey}
                    type="card"
                    onChange={this.onChange}
                >
                    {this.state.functionsTab}
                </Tabs>
            </div>
        );
    }
}

export default OperateTabs;
