import React from 'react';
import {
    Col, Row, Form, DatePicker, Radio, Button, Input,
} from 'antd';
import moment from 'moment';

import ScanInput from '../../../../common/components/ScanInput';
import CSelect from '../../../../../components/cselect';
import { GET_MAIN_PERMISSION_WAREHOUSE, PLATFORMS } from '../../../../common/constants/Api';
import { fetchPost } from '../../../../../util/fetch';
import { COLLECTING_BAGWEIGHT } from '../../constants/Api';
import Functions from '../../../../../components/functions';

const SearchInput = Input.Search;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
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

    /**
     *称重
     */
    onWeight = () => {
        this.collectingBagRef.focus();
    };

    /**
     * 称重提交
     */
    onCollectingBagNumber = () => {
        this.props.form.validateFields(['weight', 'collectingBagNumber'], (err, values) => {
            if (!err) {
                const params = {
                    data: {
                        ...values,
                    },
                };
                fetchPost(COLLECTING_BAGWEIGHT, params, 1)
                    .then((result) => {
                        if (result.state === '000001') {
                            this.weightRef.focus();
                        }
                    });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const typeSearch = (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
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
                            label="渠道:"
                        >
                            {getFieldDecorator('channel', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={initialState}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={PLATFORMS}
                                    placeholder="请选择"
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="称重时间:"
                        >
                            {getFieldDecorator('weighingTime', {
                                initialValue: [moment().startOf('day'), moment().endOf('day')],
                            })(
                                <RangePicker />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        const searchContent = (
            <div className="search_content">
                <Row type="flex" align="middle">
                    <FormItem
                        label="搜索类型"
                    >
                        {
                            getFieldDecorator('searchType', {
                                initialValue: 1,
                            })(
                                <RadioGroup size="small">
                                    <Radio value={1}>集货袋号</Radio>
                                    <Radio value={2}>称重人</Radio>
                                </RadioGroup>,
                            )}
                    </FormItem>
                    <div className="content_right">
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
            <div className="white padding-md-top wms-search ">
                <Functions
                    {...this.props}
                    functionkey="012-000006-000004-005"
                >
                    <Row type="flex" align="middle" className="border-bottom-line padding-sm-bottom">
                        <Col span={12} className="search-col">
                            <div className="search-step-div">
                                <div className="search-step-line-left" />
                                <div className="search-step-text">1</div>
                            </div>
                            <div className="margin-sm">集货袋称重(g)</div>
                            <div style={{ width: '50%', textAlign: 'left' }}>
                                <FormItem
                                    style={{ display: 'block' }}
                                >
                                    {getFieldDecorator('weight', {
                                        rules: [{ required: true, message: '请称重' }],
                                    })(
                                        <ScanInput
                                            ref={(input) => {
                                                this.weightRef = input;
                                            }}
                                            placeholder="请称重"
                                            onSearch={this.onWeight}
                                        />,
                                    )}
                                </FormItem>
                            </div>
                        </Col>
                        <Col span={12} className="search-col">
                            <div className="search-step-div">
                                <div className="search-step-line-right" />
                                <div className="search-step-text">2</div>
                            </div>
                            <div className="margin-sm">扫描集货袋号</div>
                            <div style={{ width: '50%', textAlign: 'left' }}>
                                <FormItem
                                    style={{ display: 'block' }}
                                >
                                    {getFieldDecorator('collectingBagNumber', {
                                        rules: [{ required: true, message: '扫描' }],
                                    })(
                                        <ScanInput
                                            isReset
                                            ref={(input) => {
                                                this.collectingBagRef = input;
                                            }}
                                            onSearch={this.onCollectingBagNumber}
                                            placeholder="请扫描或输入集货袋号"
                                        />,
                                    )}
                                </FormItem>
                            </div>
                        </Col>
                    </Row>
                </Functions>
                <div className="erp-search">
                    {typeSearch}
                    {searchContent}
                </div>
            </div>
        );
    }
}
