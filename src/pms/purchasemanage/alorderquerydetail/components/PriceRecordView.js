import React, { Component } from 'react';
import { Steps } from 'antd';

import { fetchPost } from "../../../../util/fetch";
import { Price_Modify_List_Api } from "../constants/Api";
import { parsePrice } from '../selectors/index';
import { getUrlParams } from "../../../../util/baseTool";

const Step = Steps.Step;

/**
 * 价格修改记录
 */
class PriceRecordView extends Component {
    state = {
        data: {},
        loading: false,
    };

    componentDidMount() {
        const parameter = { data: { key: getUrlParams('').alKey } };
        fetchPost(Price_Modify_List_Api, parameter, 2).then((result) => {
            this.setState({loading: false});
            if (result.state === '000001') {
                this.setState({
                    data: parsePrice(result.data),
                });
            }
        });
    }

    render() {
        const { data } = this.state;

        return (
            <div className="padding-ss white margin-ms-bottom">
                <Steps
                    className="al-info-list"
                    style={{margin: '20px'}}
                    progressDot
                    current={0}
                    size="small"
                    direction="vertical"
                >
                    {
                        data.list ? (
                            data.list.map((item, index) =>
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

export default PriceRecordView;
