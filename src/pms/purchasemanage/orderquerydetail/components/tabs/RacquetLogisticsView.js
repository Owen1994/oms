import React, { Component } from 'react';
import { Steps } from 'antd';
import { getUrlParams } from '../../../../../util/baseTool';
import { fetchPost } from "../../../../../util/fetch";
import { Racquet_Logistics_List_Api } from "../../constants/Api";
import { parseRacquetLogistics } from '../../selectors/index';

const Step = Steps.Step;

/**
 * 网拍物流信息
 */
class RacquetLogisticsView extends Component {
    state = {
        data: {},
        loading: false,
    };

    componentDidMount() {
        const { access } = this.props;
        let alOrderNumber = '';
        if (access) {
            if (access.basicInfo) {
                if (access.basicInfo.alOrderNumber) {
                    alOrderNumber = access.basicInfo.alOrderNumber;
                }
            }
        }

        const parameter = { data: { key: alOrderNumber } };
        fetchPost(Racquet_Logistics_List_Api, parameter, 2).then((result) => {
            this.setState({loading: false});
            if (result.state === '000001') {
                this.setState({
                    data: parseRacquetLogistics(result.data),
                });
            }
        });
    }

    render() {
        const { data } = this.state;
        return (
            <div className="padding-sm white pms-order-query_LogTable_bottom">
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

export default RacquetLogisticsView;
