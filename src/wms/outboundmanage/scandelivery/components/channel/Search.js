import React from 'react';
import {
    Col, Row, Form, Button,
} from 'antd';
import CSelect from '../../../../../components/cselect';
import { FREIGHT_FORWARDING, LOGISTICS_CHANNEL } from '../../../../common/constants/Api';
import { IS_AGGREGATION } from '../../constants/Table';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const initialState = [{ code: '', name: '全部' }];
export default class Search extends React.Component {
    /**
     * 搜索
     */
    onSubmit = () => {
        this.props.onSearchListener();
    };

    /**
     * 重置表单
     */
    reset = () => {
        this.props.form.resetFields();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const typeSearch = (
            <div className="padding-sm-top">
                <Row type="flex">
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="货代名称:"
                        >
                            {getFieldDecorator('wardingName', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={initialState}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={FREIGHT_FORWARDING}
                                    placeholder="请选择"
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="物流渠道:"
                        >
                            {getFieldDecorator('logisticsChannel', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={initialState}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={LOGISTICS_CHANNEL}
                                    placeholder="请选择"
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col>
                        <FormItem
                            label="是否合并:"
                        >
                            {getFieldDecorator('isAggregation', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={IS_AGGREGATION}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    placeholder="请选择"
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <div className="ant-form-item-control margin-sm-left">
                        <Button type="primary" onClick={this.onSubmit}>查询</Button>
                    </div>
                </Row>
            </div>
        );
        return (
            <div className="white padding-md wms-search">
                {typeSearch}
            </div>
        );
    }
}
