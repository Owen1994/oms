import React from 'react';
import { Tabs } from 'antd';
import Describe from '../containers/describe';
import Transport from '../containers/transport';
import Return from '../containers/return';
import Payment from '../containers/payment';
import Publish from '../containers/publish'
import "../../../../publish/common/components/Tab/index.css"
import { filterParams, strTrim } from "../../../../util/baseTool";

const TabPane = Tabs.TabPane;

class App extends React.Component {
    state = {
        list: []
    }

    componentDidMount() {
        this.props.getTemplateNum()
    }

    callback = (key) => {
        // console.log(key)
    }

    render() {
        const templateData = this.props.templateNumData;
        const tabDescribe = (<span>{templateData[0].tempName}({templateData[0].tempNum})</span>);
        const tabTransport = (<span>{templateData[1].tempName}({templateData[1].tempNum})</span>);
        const tabReturn = (<span>{templateData[2].tempName}({templateData[2].tempNum})</span>);
        const tabPayment = (<span>{templateData[3].tempName}({templateData[3].tempNum})</span>);
        const tabPublish = (<span>{templateData[4].tempName}({templateData[4].tempNum})</span>);
        return (
            <div className="pbh-tle-list_container">
                <div className="yks-erp-tabs yks-erp-search_order yks-erp-pub-tem-tab">
                    <Tabs defaultActiveKey="0" animated={false} onChange={this.callback}>
                        <TabPane tab={tabDescribe} key={templateData[0].tempId}>
                            <Describe
                                {...this.props}
                            />
                        </TabPane>
                        <TabPane tab={tabTransport} key={templateData[1].tempId}>
                            <Transport
                                {...this.props}
                            />
                        </TabPane>
                        <TabPane tab={tabReturn} key={templateData[2].tempId}>
                            <Return
                                {...this.props}
                            />
                        </TabPane>
                        <TabPane tab={tabPayment} key={templateData[3].tempId}>
                            <Payment
                                {...this.props}
                            />
                        </TabPane>
                        <TabPane tab={tabPublish} key={templateData[4].tempId}>
                            <Publish
                                {...this.props}
                            />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default App