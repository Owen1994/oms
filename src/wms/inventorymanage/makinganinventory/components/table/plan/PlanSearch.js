import React from 'react';
import {
    Form, Input, Button, Radio, Row, Col, DatePicker,
} from 'antd';
import moment from 'moment';

import CTags from '../../../../../../components/ctags/index';
import { reviewStatus } from '../../../constants/search';
import '../../../../../common/css/index.css';
import CSelect from '../../../../../../components/cselect';
import { GET_MAIN_PERMISSION_WAREHOUSE, INVENTORY_TYPE } from '../../../../../common/constants/Api';
import { getCommonData } from '../../../../../common/action';

const RadioGroup = Radio.Group;
const SearchInput = Input.Search;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const initialState = [{ code: '', name: '全部' }];
export default class PlanSearch extends React.Component {
    state = {
        wareHouse: [
            {
                code: '',
                name: '全部',
            },
        ],
    };

    componentDidMount() {
        getCommonData(GET_MAIN_PERMISSION_WAREHOUSE, ((list) => {
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
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
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
                </Row>
            </div>
        );

        const typeSearch = (
            <div className="search_content">
                <FormItem
                    label="搜索类型"
                >
                    {getFieldDecorator('searchType', {
                        initialValue: 1,
                    })(
                        <RadioGroup size="small">
                            <Radio value={1}>盘点单号</Radio>
                            <Radio value={2}>SKU</Radio>
                            <Radio value={3}>储位</Radio>
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
            </div>
        );
        const searchTags = (
            <div className="search_tag">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="仓库名称:"
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
                            label="盘点状态"
                        >
                            {getFieldDecorator('inventoryStatus', {
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
            </div>
        );
        return (
            <div className="wms-search  overflow-hidden erp-search">
                {searchSelect}
                {typeSearch}
                {searchTags}
            </div>
        );
    }
}
