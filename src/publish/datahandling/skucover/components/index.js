import React from 'react';
import {
    Form,
    Tabs,
} from 'antd';
import HasSkuCovered from './hascovered/index';
import NotSkucovered from './notcovered/index';

const TabPane = Tabs.TabPane;

import Functions from '@/components/functions';
/**
 *作者: huangjianfeng
 *功能描述: 跟单管理
 *时间: 2018/10/11 15:55
 */
class App extends React.Component {
    state = {
        activeKey: '0',
    };

    render() {
        const { activeKey } = this.state;
        return (
            <div className='yks-erp-tabs'>
                <Tabs
                    defaultActiveKey={activeKey}
                    type="card"
                >
                    <TabPane tab="已覆盖" key="0">
                        <Functions
                            isPage
                            {...this.props}
                            functionkey="008-000006-000003-002"
                        >
                            <HasSkuCovered {...this.props}/>
                        </Functions>
                    </TabPane>
                    <TabPane tab="未覆盖" key="1">
                        <Functions
                            isPage
                            {...this.props}
                            functionkey="008-000006-000003-003"
                        >
                            <NotSkucovered {...this.props}/>
                        </Functions>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
export default Form.create()(App);
