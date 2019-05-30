import React from 'react';
import {
    Tabs,
    Form,
} from 'antd';
import '../css/tabs.css';
import '../css/css.css';
import ExportsyncqueueComponents from '../containers/Exportsyncqueue';
import ImportsyncqueueComponents from '../containers/Importsyncqueue';

const TabPane = Tabs.TabPane;
/**
 *作者: 陈林
 *功能描述: 异步队列
 *时间: 2018/10/11 15:55
 */
class App extends React.Component {
    // state = {
    //     tabKey: 0,
    // }


    // callback = (key) => {
    //     this.setState({
    //         tabKey: key,
    //     });
    // }

    render() {
        // const { tabKey } = this.state;
        return (
            <div className="tweb-tab syncqueue-position">
                {/* <Searchs
                    {...this.props}
                    tabKey={tabKey}
                    onSearch={this.handleSearch}
                /> */}
                <div>
                    <Tabs defaultActiveKey="0" animated={false} onChange={this.callback}>
                        <TabPane tab="导出" key={0}>
                            <ExportsyncqueueComponents
                                {...this.props}
                            />
                        </TabPane>
                        <TabPane tab="导入" key={1}>
                            <ImportsyncqueueComponents {...this.props} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default Form.create()(App);
