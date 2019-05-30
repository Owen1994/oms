
import React from 'react';
import {
    Tabs,
} from 'antd';
import Set from './autoreply-set';
import Detail from './autoreply-detail';

const TabPane = Tabs.TabPane;

class App extends React.Component {
    state = {
        activeKey: '0',
    }

    tabTitleData = [
        { id: 0, name: '自动回复设置' },
        { id: 1, name: '自动回复详情' },
    ]

    render() {
        const tabTitleData = this.tabTitleData;
        const { activeKey } = this.state;
        return (
            <div className="autoreply-container">
                <div className="tweb-tab">
                    <Tabs defaultActiveKey={activeKey} type="card">
                        <TabPane tab={tabTitleData[0].name} key={tabTitleData[0].id}>
                            <Set {...this.props} />
                        </TabPane>
                        <TabPane tab={tabTitleData[1].name} key={tabTitleData[1].id}>
                            <Detail {...this.props} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default App;
