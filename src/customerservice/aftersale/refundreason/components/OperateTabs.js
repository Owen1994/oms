import React from 'react';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

class OperateTabs extends React.Component {
    state = {
        functionsTab: [],
    }

    componentDidMount() {
        // 权限过滤
        const pathname = window.location.pathname;
        const { menuInfos } = this.props;
        const { functionsTab } = this.state;
        const keys = menuInfos.functions[pathname] || [];
        if (keys.includes('009-000004-000001-001')) {
            functionsTab.push(<TabPane tab="退款原因分类" key="1" />);
        }
        if (keys.includes('009-000004-000001-005')) {
            functionsTab.push(<TabPane tab="退款原因自定义表单项" key="2" />);
        }
        this.setState({ functionsTab });
    }

    render() {
        return (
            <div>
                <div className="refund-tabs">
                    <Tabs
                        defaultActiveKey="1"
                        type="card"
                        onChange={this.props.handleOperateChange}
                    >
                        {this.state.functionsTab}
                    </Tabs>
                </div>
            </div>

        );
    }
}

export default OperateTabs;
