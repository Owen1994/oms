import React from 'react';
import { Form,Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import ApportionCostContainer from '../containers/getapportioncost'
import ListingCostContainer from '../containers/getlistingcost'
import OperationCostContainer from '../containers/getoperationcost'
import TransportCostContainer from '../containers/gettranspotcost'
import '../css/css.css'
import Functions from '../../../../components/functions'

/**
 *作者: huangjianfeng
 *功能描述: 销售定价
 *时间: 2018/10/11 15:55
 */
class App extends React.Component {
    handleTabs=()=>{
        this.props.form.resetFields()
    }
    render(){
        return (
            <Functions {...this.props} isPage={true} functionkey={'008-000005-000002-022'}>
                <div className={"pricing-system_container"}>
                    <div className={"pricing-system_card-container"}>
                        <Tabs type="card" onChange={this.handleTabs}>
                            <TabPane tab="分摊费用" key="1">
                                <ApportionCostContainer
                                    {...this.props}
                                />
                            </TabPane>
                            <TabPane tab="运营费用" key="2">
                                <OperationCostContainer
                                    {...this.props}
                                />
                            </TabPane>
                            <TabPane tab="刊登费用" key="3">
                                <ListingCostContainer
                                    {...this.props}
                                />
                            </TabPane>
                            <TabPane tab="头程费用" key="4">
                                <TransportCostContainer
                                    {...this.props}
                                />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </Functions>
        )
    }
}
export default Form.create()(App)