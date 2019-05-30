import React from 'react';
import {
    Tabs,
    Form,
} from 'antd';
import '../css/tabs.css';
import ProcurementIndex from '../containers/Procurements';
import SupplierIndex from '../containers/Suppliers';

const TabPane = Tabs.TabPane;
/**
 *作者: huangjianfeng
 *功能描述: 采购角色配置
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
            <div className={`${activeKey === "0" ? "yks-erp-search-lg_tab" : "yks-erp-search-md_tab"} tweb-tab yks-erp-search_order yks-erp-search_tab`}>
                <Tabs defaultActiveKey="0" animated={false} onChange={this.handleTabChange}>
                    <TabPane tab="采购角色配置" key={0}>
                        <ProcurementIndex {...this.props} />
                    </TabPane>
                    <TabPane tab="供应商跟单员配置" key={1}>
                        <SupplierIndex {...this.props} />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Form.create()(App);
