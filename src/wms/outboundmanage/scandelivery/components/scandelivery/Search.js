import React from 'react';
import {
    Col, Row, Form,
} from 'antd';
import CSelect from '../../../../../components/cselect/index';
import ScanInput from '../../../../common/components/ScanInput';
import { LOGISTICS_CHANNEL } from '../../../../common/constants/Api';
import { QUERY_CHANNEL_COUNTRY, SCAN_SHIPMENT } from '../../constants/Api';
import { fetchPost } from '../../../../../util/fetch';

const FormItem = Form.Item;
const initialState = [{ code: '', name: '全部' }];
export default class Search extends React.Component {
    /**
     * 查看列表
     */
    onSubmit = () => {
        this.props.onSearchListener();
    };

    /**
     * 扫描运单号
     */
    scanShipment = () => {
        const values = this.props.form.getFieldsValue();
        fetchPost(SCAN_SHIPMENT, {
            data: {
                ...values,
            },
        }, 2).then((result) => {
            if (result.state === '000001') {
                this.onSubmit();
            }
        });
    };

    /**
     * 重置表单
     */
    reset = () => {
        this.props.form.resetFields();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="white padding-md">
                <Row type="flex" align="middle">
                    <Col span={12} className="search-col">
                        <div className="search-step-div">
                            <div className="search-step-line-left" />
                            <div className="search-step-text">1</div>
                        </div>
                        <div className="margin-sm">选择物流渠道</div>
                        <Row tpye="flex" style={{ width: '50%', textAlign: 'left' }}>
                            <Col span={17}>
                                <FormItem>
                                    {getFieldDecorator('logisticsChannel', {})(
                                        <CSelect
                                            list={initialState}
                                            code="code" // 列表编码字段
                                            name="name" // 列表名称字段
                                            url={LOGISTICS_CHANNEL}
                                            placeholder="请选择物流渠道"
                                            handleChange={this.onSubmit}
                                        />,
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6} className="margin-ss-left">
                                <FormItem>
                                    {getFieldDecorator('countryCode', {
                                        initialValue: '',
                                    })(
                                        <CSelect
                                            list={initialState}
                                            code="code" // 列表编码字段
                                            name="name" // 列表名称字段
                                            params={{ logisticsChannel: this.props.form.getFieldValue('logisticsChannel') || '' }}
                                            url={QUERY_CHANNEL_COUNTRY}
                                            localSearch={1}
                                            placeholder="请选择国家"
                                        />,
                                    )}
                                </FormItem>

                            </Col>
                        </Row>
                    </Col>
                    <Col span={12} className="search-col">
                        <div className="search-step-div">
                            <div className="search-step-line-right" />
                            <div className="search-step-text">2</div>
                        </div>
                        <div className="margin-sm">扫描面单</div>
                        <div style={{ width: '50%', textAlign: 'left' }}>
                            <FormItem>
                                {getFieldDecorator('wayBill', {})(
                                    <ScanInput
                                        isReset
                                        onSearch={this.scanShipment}
                                        placeholder="请扫描或输入运单号"
                                    />,
                                )}
                            </FormItem>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
