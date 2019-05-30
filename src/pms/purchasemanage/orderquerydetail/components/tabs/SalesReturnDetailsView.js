import React, { Component } from 'react';
import { getUrlParams } from '../../../../../util/baseTool';
import {
    Spin,
    Row,
    Col,
    Form,
} from 'antd';
import {fetchPost} from "../../../../../util/fetch";

import { Get_Return_Detail_Api } from "../../constants/Api";

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};

/**
 * 退货明细
 */
class SalesReturnDetailsView extends Component {
    state = {
        dicData: {},
        loading: false,
    };

    componentDidMount() {
        const parameter = { data: { purchaseNumber: getUrlParams('').orderNumber + '' } };
        this.setState({loading: true});
        fetchPost(Get_Return_Detail_Api, parameter, 2).then((result) => {
            this.setState({loading: false});
            if (result.state === '000001') {
                this.setState({
                    dicData: result.data,
                });
            }
        });
    }

    render() {
        const { dicData, loading } = this.state;
        return (
            <div className="padding-sm white pms-order-query_LogTable_bottom">
                <Spin spinning={loading} delay={500} tip="Loading...">

                    <Row>
                        <Col span={24}>
                            <FormItem
                                {...formItemLayout}
                                className="sales_return_details"
                                label="退货金额"
                            >
                            <span style={{fontSize: '12px'}}>
                                {dicData.returnsMoney ? dicData.returnsMoney : '无'}
                            </span>
                            </FormItem>
                        </Col>

                        <Col span={24}>
                            <FormItem
                                {...formItemLayout}
                                className="sales_return_details"
                                label="退货备注"
                            >
                            <span style={{fontSize: '12px'}}>
                                {dicData.returnsDetail ? dicData.returnsDetail : '无'}
                            </span>
                            </FormItem>
                        </Col>
                    </Row>

                </Spin>
            </div>
        );
    }
}

export default SalesReturnDetailsView;
