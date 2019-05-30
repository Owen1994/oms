import React, { Component } from 'react';
import { Steps } from 'antd';

import { fetchPost } from "../../../../util/fetch";
import { Logistics_Info_Api } from "../constants/Api";
import { parseLogistics } from '../selectors/index';
import { getUrlParams } from "../../../../util/baseTool";

const Step = Steps.Step;

/**
 * 物流信息
 */
class LogisticsInfoView extends Component {
    state = {
        data: {},
        loading: false,
    };

    componentDidMount() {
        const parameter = { data: { key: getUrlParams('').alOrderNumber } };
        fetchPost(Logistics_Info_Api, parameter, 2).then((result) => {
            this.setState({loading: false});
            if (result.state === '000001') {
                this.setState({
                    data: parseLogistics(result.data),
                });
            }
        });
    }

    render() {
        const { data } = this.state;
        return (
            <div className="padding-ss white margin-ms-bottom">
                <div>{`物流单号:${data.logisticsNumber || '无'}`}</div>
                <Steps
                    className="al-info-list"
                    style={{margin: '20px'}}
                    progressDot
                    current={0}
                    size="small"
                    direction="vertical"
                >
                    {
                        data.trajectoryList ? (
                            data.trajectoryList.map((item, index) =>
                                <Step
                                    title={item.time}
                                    description={item.event}
                                    key={index}
                                />
                            )
                        ) : null
                    }
                </Steps>
            </div>
        );
    }
}

export default LogisticsInfoView;
