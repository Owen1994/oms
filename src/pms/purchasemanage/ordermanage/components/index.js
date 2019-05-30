import React from 'react';
import {
    Form,
    Tabs,
} from 'antd';
import UnorderedPurchase from './unorderedPurchase';
import AbnormalOrder from './abnormalOrder';
import OrderException from './orderException';
import Functions from '../../../../components/functions';

const TabPane = Tabs.TabPane;

/**
 *作者: huangjianfeng
 *功能描述: 跟单管理
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
        this.props.form.resetFields();
    }

    render() {
        const { activeKey } = this.state;
        return (
            <div className={`${(activeKey === "0" || activeKey === "2") ? "yks-erp-search-llg_tab" : "yks-erp-search-md_tab"} ordermanage tweb-tab yks-erp-search_order yks-erp-search_tab `} >
                <Tabs defaultActiveKey={activeKey} type="card" onChange={this.handleTabChange}>
                    <TabPane tab="未订货采购" key="0">
                        <Functions
                            isPage
                            {...this.props}
                            functionkey="010-000003-000001-001"
                        >
                            <UnorderedPurchase {...this.props} />
                        </Functions>
                    </TabPane>
                    <TabPane tab="异常订货" key="1">
                        <Functions
                            isPage
                            {...this.props}
                            functionkey="010-000003-000001-004"
                        >
                            <AbnormalOrder {...this.props} />
                        </Functions>
                    </TabPane>
                    <TabPane tab="下单异常" key="2">
                        {/* <Functions
                            isPage
                            {...this.props}
                            functionkey="010-000003-000001-004"
                        > */}
                            <OrderException {...this.props} />
                        {/* </Functions> */}
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
export default Form.create()(App);
