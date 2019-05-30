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

    componentDidMount() {
        const { activeKey } = this.props;
        this.setState({
            activeKey: `${activeKey}` || '0',
            previousKey: `${activeKey}` || '0',
        });
    }

    componentWillReceiveProps(nextProps) {
        const nextPlatform = nextProps.platform;
        const thisPlatform = this.props.platform;
        if (nextPlatform !== thisPlatform && nextPlatform.length > 0) {
            this.setState({
                activeKey: `${nextPlatform[0].key}` || '0',
                previousKey: `${nextPlatform[0].key}` || '0',
            });
            this.props.form.setFieldsValue({ platformId: nextPlatform[0].key });
        }
    }

    onChange = (key) => {
        const { setFieldsValue } = this.props.form;
        const { loading } = this.props.loading;
        const { previousKey } = this.state;
        setFieldsValue({ platformId: key });
        if (loading) {
            this.setState({ activeKey: previousKey });
            return;
        }
        if (this.props.taglistFetch) {
            this.props.taglistFetch(key);
        }
        this.setState({ activeKey: key, previousKey: key });
    }

    render() {
        const { platform } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="breadcrumb customer-service-tab-platform">
                <Tabs
                    // tabBarStyle={this.state.tabBar}
                    activeKey={this.state.activeKey}
                    onChange={(key) => {
                        if (this.props.handleTabChange) {
                            this.props.handleTabChange(key);
                        }
                        this.onChange(key);
                    }}
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
