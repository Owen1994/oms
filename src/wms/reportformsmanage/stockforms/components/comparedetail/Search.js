import React from 'react';
import {
    Form, Row, Col, DatePicker, Button, Radio, Input,
} from 'antd';
import moment from 'moment';
import '../../../../common/css/index.css';
import CSelect from '../../../../../components/cselect';
import {
    GET_ALL_PERMISSION_WAREHOUSE,
} from '../../../../common/constants/Api';

const RadioGroup = Radio.Group;
const SearchInput = Input.Search;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
// const initialState = [{ code: '', name: '全部' }];
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
        const { rangeTime } = this.props;
        const searchSelect = (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="仓库名称:"
                        >
                            {getFieldDecorator('warehouse', {
                                // initialValue: '',
                            })(
                                <CSelect
                                    // list={initialState}
                                    // code="code" // 列表编码字段
                                    // name="name" // 列表名称字段
                                    url={GET_ALL_PERMISSION_WAREHOUSE}
                                    placeholder="请选择"
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="对图日期:"
                        >
                            {getFieldDecorator('rangeTime', {
                                initialValue: rangeTime || [moment().startOf('day'), moment().endOf('day')],
                            })(
                                <RangePicker disabled={rangeTime && rangeTime.length !== 0} />,
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
                                <Radio value={1}>批次号</Radio>
                                <Radio value={2}>采购单号</Radio>
                                <Radio value={3}>卡板号</Radio>
                                <Radio value={4}>SKU</Radio>
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
            <div className="wms-search breadcrumb erp-search">
                {searchSelect}
                {typeSearch}
            </div>
        );
    }
}
