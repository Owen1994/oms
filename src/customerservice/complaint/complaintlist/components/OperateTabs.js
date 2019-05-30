import React from 'react';
import { Tabs, message } from 'antd';
import PlatformTabs from '../../../common/components/RefundPlatformTabs';

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
        if (keys.includes('009-000003-000001-001')) {
            functionsTab.push(<TabPane tab="纠纷" key="1" />);
        }
        if (keys.includes('009-000003-000001-010')) {
            functionsTab.push(<TabPane tab="评价" key="2" />);
        }
        if (keys.includes('009-000003-000001-014')) {
            functionsTab.push(<TabPane tab="账号表现" key="3" />);
        }
        if (keys.includes('009-000003-000001-010') && !keys.includes('009-000003-000001-001')) {
            this.setState({
                activeKey: '2',
            });
        } else if (keys.includes('009-000003-000001-014') && !keys.includes('009-000003-000001-001') && !keys.includes('009-000003-000001-010')) {
            this.setState({
                activeKey: '3',
            });
        }
        this.setState({ functionsTab });
    }

    handleOperateChange = (key) => {
        // to do:取消无平台时不可切换的动作
        const { platform, getDisputelist, getCommentlist } = this.props;
        // if (platform.length <= 0) {
        //     message.warning('暂无平台数据');
        //     return;
        // }
        this.setState({
            activeKey: key,
        });
        if (key === '1' && platform.length) {
            getDisputelist();
        } else if (key === '2' && platform.length) {
            getCommentlist();
        }
        this.props.handleOperateChange(key);
    }

    render() {
        const { activeKey, functionsTab } = this.state;
        const {
            platform, operateType, getDisputelist, getCommentlist, disputeLoading, commentLoading, handlePlatformChange
        } = this.props;
        let listFetch;
        let loading;
        let noRequest = false;
        if (operateType === '1') {
            listFetch = getDisputelist;
            loading = disputeLoading;
        } else if (operateType === '2') {
            listFetch = getCommentlist;
            loading = commentLoading;
        } else {
            noRequest = true;
        }
        return (
            <div>
                <div className="complaint-tabs">
                    <Tabs
                        activeKey={activeKey}
                        type="card"
                        onChange={this.handleOperateChange}
                    >
                        {functionsTab}
                    </Tabs>
                </div>
                <div className="complaint-platform-tabs">
                    <PlatformTabs
                        {...this.props}
                        platform={platform}
                        listFetch={listFetch}
                        loading={loading}
                        noRequest={noRequest}
                        handlePlatformTabChange={(key) => handlePlatformChange(key)}
                    />
                </div>
            </div>

        );
    }
}

export default OperateTabs;
