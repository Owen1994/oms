import React from 'react';
import { Tabs, Form, Input } from 'antd';
import './index.css';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class App extends React.Component {
    state = {
        // TODO: 切换平台处理请求问题时样式的置灰处理
        // tabBar: {
        //     color: '#ccc',
        // },
        activeKey: '',
        previousKey: '',
    }

    componentWillReceiveProps(nextProps) {
        const nextPlatform = nextProps.platform;
        const thisPlatform = this.props.platform;
        if (nextPlatform !== thisPlatform && nextPlatform.length > 0) {
            this.setState({
                activeKey: `${nextPlatform[0].key}` || '0',
                previousKey: `${nextPlatform[0].key}` || '0',
            });
        }
    }

    onChange = (key) => {
        const { loading, noRequest, ifResetFields, handlePlatformTabChange } = this.props;
        const { setFieldsValue, resetFields } = this.props.form;
        const { previousKey } = this.state;
        if (ifResetFields) resetFields();
        setFieldsValue({ platformId: key });
        if (noRequest) {
            if (handlePlatformTabChange) {
                handlePlatformTabChange(key);
            }
            this.setState({ activeKey: key, previousKey: key });
            return;
        }
        if (loading) {
            this.setState({ activeKey: previousKey });
            return;
        }
        if (handlePlatformTabChange) {
            handlePlatformTabChange(key);
        }
        this.setState({ activeKey: key, previousKey: key });
        this.props.listFetch();
    }

    render() {
        const { platform, type, isSelfSet } = this.props;
        const { getFieldDecorator } = this.props.form;
        // isSelfSet为退款原因->自定义表单的文档
        if (platform.length <= 0) {
            return (
                <div className="refund-no-data">{isSelfSet ? '您暂未开通平台权限，无法设置自定义表单，请联系管理员分配平台账号权限！' : '暂无数据'}</div>
            );
        }
        return (
            <div className="refund-tabs">
                <Tabs
                    // tabBarStyle={this.state.tabBar}
                    type={type}
                    activeKey={this.state.activeKey}
                    onChange={this.onChange}
                >
                    {
                        platform.map(item => (
                            <TabPane tab={item.label} key={item.key} />
                        ))
                    }
                </Tabs>
                <FormItem>
                    {getFieldDecorator('platformId', {
                        initialValue: platform.length > 0 ? platform[0].key : undefined,
                    })(
                        <Input type="hidden" />,
                    )}
                </FormItem>
            </div>
        );
    }
}

export default App;
