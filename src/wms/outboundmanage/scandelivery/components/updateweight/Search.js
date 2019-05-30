import React from 'react';
import {
    Form, Input, Button, Radio, Row, Col, DatePicker,
} from 'antd';
import moment from 'moment';

import '../../../../common/css/index.css';
import CSelect from '../../../../../components/cselect';
import { LOGISTICS_CHANNEL, GET_MAIN_PERMISSION_WAREHOUSE } from '../../../../common/constants/Api';

const RadioGroup = Radio.Group;
const SearchInput = Input.Search;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const formItemLayout = {
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
        const searchSelect = (
            <div className="padding-ss-left padding-md-right">
                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="仓库名称:"
                        >
                            {getFieldDecorator('warehouseCode', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={initialState}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={GET_MAIN_PERMISSION_WAREHOUSE}
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
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="扫描时间:"
                        >
                            {getFieldDecorator('scanTime', {
                                initialValue: [moment().startOf('day'), moment().endOf('day')],
                            })(
                                <RangePicker onChange={this.onSubmit} />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        const typeSearch = (
            <div className="padding-sm padding-ss-left">
                <Row type="flex">
                    <FormItem
                        label="搜索类型"
                    >
                        {getFieldDecorator('searchType', {
                            initialValue: 1,
                        })(
                            <RadioGroup size="small">
                                <Radio value={1}>运单号</Radio>
                                <Radio value={2}>扫描人</Radio>
                            </RadioGroup>,
                        )}
                    </FormItem>
                    <div>
                        {getFieldDecorator('searchContent', {
                            rules: [{
                                required: false,
                                message: '请输入',
                            }],
                        })(
                            <SearchInput
                                placeholder="请输入内容"
                                enterButton="搜索"
                                style={{ width: 280 }}
                                onSearch={this.onSubmit}
                            />,
                        )}
                        <Button type="default" onClick={this.reset}>
                            重置
                        </Button>
                    </div>
                </Row>
            </div>
        );
        return (
            <div className="wms-search  white padding-sm-top">
                <Form layout="horizontal">
                    {searchSelect}
                    {typeSearch}
                </Form>
            </div>
        );
    }
}
