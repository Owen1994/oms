import React from 'react';
import {
    Form,
    Tabs,
} from 'antd';
import WaitingReviewTaskApp from '../containers/WaitingReviewTask';
import WaitingReviewOrderApp from '../containers/WaitingReviewOrder';
import '../css.css';
import { fetchPost } from '../../../../util/fetch';
import { REVIEW_TASK_AND_ORDER_NUMBER_API } from '../constants/Api';

const TabPane = Tabs.TabPane;

/**
 *作者: huangjianfeng
 *功能描述: 我的待办
 *时间: 2018/10/11 15:55
 */
class App extends React.Component {
    state = {
        iTaskNumber: 0,
        iOrderNumber: 0,
    };

    componentDidMount() {
        this.handleMyUpcomingNumber();
    }

    /**
     * HTTP请求 我的代办数量
     */
    handleMyUpcomingNumber = () => {
        fetchPost(REVIEW_TASK_AND_ORDER_NUMBER_API, {}, 2)
            .then((result) => {
                if (result.state === '000001') {
                    let iOrderNumber = 0;
                    let iTaskNumber = 0;
                    for (let i = 0; i < 2; i++) {
                        const obj = result.data[i];
                        if (obj.id	=== 1) {
                            iOrderNumber = result.data[i].number;
                        }
                        if (obj.id	=== 2) {
                            iTaskNumber = result.data[i].number;
                        }
                    }
                    this.setState({
                        iOrderNumber: iOrderNumber,
                        iTaskNumber: iTaskNumber,
                    });
                }
            });
    };

    render() {
        return (
            <div className="myupcoming_container">
                <div className="yks-erp-tabs">
                    <Tabs type="card">
                        <TabPane tab={`待审批的订单(${this.state.iOrderNumber})`} key="1" className="WaitingReviewOrder-tab">
                            <WaitingReviewOrderApp
                                {...this.props}
                                changeMyUpcomingNumber={this.handleMyUpcomingNumber}
                            />
                        </TabPane>
                        <TabPane tab={`待核查的任务(${this.state.iTaskNumber})`} key="2" className="WaitingReviewTask-tab">
                            <WaitingReviewTaskApp
                                {...this.props}
                                changeMyUpcomingNumber={this.handleMyUpcomingNumber}
                            />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default Form.create()(App);
