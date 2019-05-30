import React from 'react';
import {
    Form, Input, Button, Radio, Row, Col, DatePicker,
} from 'antd';

import moment from 'moment';
import CTags from '../../../../components/ctags/index';
import CSelect from '../../../../components/cselect';
import {
    GET_MAIN_PERMISSION_WAREHOUSE, MOVE_PLACE_STATUS, MOVE_PLACE_TYPE,
} from '../../../common/constants/Api';
import { getCommonData } from '../../../common/action';

const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const SearchInput = Input.Search;
const FormItem = Form.Item;
const initialState = [{ code: '', name: '全部' }];
export default class PlanSearch extends React.Component {
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
                            label="移位类型:"
                        >
                            {getFieldDecorator('shiftType', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={initialState}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={MOVE_PLACE_TYPE}
                                    placeholder="请选择"
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="移位状态:"
                        >
                            {getFieldDecorator('shiftStatus', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={initialState}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={MOVE_PLACE_STATUS}
                                    placeholder="请选择"
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="移位时间:"
                        >
                            {getFieldDecorator('shiftTime', {
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
            <div className="search_content">
                <Row type="flex" align="middle">
                    <FormItem
                        label="搜索类型"
                    >
                        {getFieldDecorator('searchType', {
                            initialValue: 1,
                        })(
                            <RadioGroup size="small">
                                <Radio value={1}>SKU</Radio>
                                <Radio value={2}>原始储位</Radio>
                                <Radio value={3}>目标储位</Radio>
                                <Radio value={4}>移位编码</Radio>
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
