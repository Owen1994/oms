import React from 'react';
import {
    Form, Input, Button, Radio, Row, Col, DatePicker,
} from 'antd';
import moment from 'moment';

import CTags from '../../../../../../components/ctags/index';
import { reviewStatus } from '../../../constants/search';
import '../../../../../common/css/index.css';
import CSelect from '../../../../components/cselect';
import { GET_WAREHOUSE, INVENTORY_TYPE } from '../../../common/constants/Api';
import { getCommonData } from '../../../common/action';

const RadioGroup = Radio.Group;
const SearchInput = Input.Search;
const InputGroup = Input.Group;
const FormItem = Form.Item;
const formItemLayout = {
    wrapperCol: { span: 16 },
};
const RangePicker = DatePicker.RangePicker;
const initialState = [{ code: '', name: '全部' }];
export default class Search extends React.Component {
    state = {
        /**
         * 是否显示搜索
         */
        wareHouse: [
            {
                code: '',
                name: '全部',
            },
        ],
    };

    componentDidMount() {
        getCommonData(GET_WAREHOUSE, ((list) => {
            this.setState((state) => {
                state.wareHouse = state.wareHouse.concat(list);
                return state;
            });
        }));
    }

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
            <Row className="padding-md-left ">
                <Col span={8}>
                    <FormItem
                        {...formItemLayout}
                        label="盘点类型:"
                    >
                        {getFieldDecorator('inventoryType', {
                            initialValue: '',
                        })(
                            <CSelect
                                list={initialState}
                                code="code" // 列表编码字段
                                name="name" // 列表名称字段
                                url={INVENTORY_TYPE}
                                placeholder="请选择"
                                handleChange={this.onSubmit}
                            />,
                        )}
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem
                        {...formItemLayout}
                        label="盘点时间:"
                    >
                        {getFieldDecorator('inventoryTime', {
                            initialValue: [moment().startOf('day'), moment().endOf('day')],
                        })(
                            <RangePicker
                                placeholder={['开始日期', '结束日期']}
                                format="YYYY-MM-DD"
                            />,
                        )}
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem
                        {...formItemLayout}
                        label="差异值:"
                    >
                        <InputGroup compact>
                            {getFieldDecorator('difference[0]', {
                                initialValue: '',
                            })(
                                <Input style={{ width: '40%' }} placeholder="最小值" />,
                            )}
                            <Input
                                style={{
                                    width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff',
                                }}
                                placeholder="~"
                                disabled
                            />
                            {getFieldDecorator('difference[1]', {
                                initialValue: '',
                            })(
                                <Input style={{ width: '40%', borderLeft: 0 }} placeholder="最大值" />,
                            )}
                        </InputGroup>
                    </FormItem>
                </Col>
            </Row>
        );

        const typeSearch = (
            <Row type="flex" className="padding-sm border-bottom-line padding-md-left ant-form-item-control">
                <FormItem
                    label="搜索类型"
                >
                    {getFieldDecorator('searchType', {
                        initialValue: 1,
                    })(
                        <RadioGroup size="small">
                            <Radio value={1}>盘点人</Radio>
                            <Radio value={2}>盘点单号</Radio>
                            <Radio value={3}>SKU</Radio>
                            {/* <Radio value={4}>来源单号</Radio> */}
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
        );
        const searchTags = (
            <Row type="flex" className="padding-md-left padding-sm-top">
                <Col span={8}>
                    <FormItem
                        label="发货仓库:"
                    >
                        {getFieldDecorator('warehouseCode', {
                            initialValue: [''],
                        })(
                            <CTags
                                list={this.state.wareHouse}
                                handleChange={this.onSubmit}
                            />,
                        )}
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem
                        label="审核状态:"
                    >
                        {getFieldDecorator('reviewStatus', {
                            initialValue: '',
                        })(
                            <CTags
                                list={reviewStatus}
                                handleChange={this.onSubmit}
                            />,
                        )}
                    </FormItem>
                </Col>
            </Row>
        );
        return (
            <div className="wms-search overflow-hidden padding-sm-top padding-sm-bottom margin-ss-bottom">
                <Form layout="horizontal">
                    {searchSelect}
                    {typeSearch}
                    {searchTags}
                </Form>
            </div>
        );
    }
}
