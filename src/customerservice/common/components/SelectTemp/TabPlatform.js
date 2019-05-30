import React from 'react';
import { Form, Tabs, Input } from 'antd';
import './index.css';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

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

    onChange = (key) => {
        const { setFieldsValue } = this.props.form;
        const { loading } = this.props;
        const { previousKey } = this.state;
        setFieldsValue({'platformId': key});
        if (loading) {
            this.setState({ activeKey: previousKey });
            return;
        }
        this.props.listFetch();
        this.setState({ activeKey: key, previousKey: key });
    }

    render() {
        const { platform, platformId } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="common-tab-platform">
                <Tabs
                    // tabBarStyle={this.state.tabBar}
                    type="card"
                    activeKey={this.state.activeKey}
                    onChange={(key) => {
                        this.onChange(key);
                        if (this.props.handleTabChange) {
                            this.props.handleTabChange(key);
                        }
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
                        initialValue: platformId,
                    })(
                        <Input type='hidden' />
                    )}
                </FormItem>
            </div>
        );
    }
}

export default App;
