import React from 'react';
import moment from "moment";
import {
    Form,
    Radio,
    Input,
    Button,
    DatePicker,
    Row,
    Col,
    Select,
} from 'antd';
import { Amazon_Order_Create_Type, Amazon_Tag_Info_Type } from '../constants/index';
import CSelect from '@/components/cselect';
import { Review_Get_Shop_Name_Api } from '../constants/Api';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const Search = Input.Search;
const Option = Select.Option;

export default class SearchView extends React.Component {

    render() {
        const { onSearch } = this.props;
        const { getFieldDecorator, resetFields } = this.props.form;

        const selectSearch =  (
            <div className="search_select">
                <Row type="flex" align="middle">
                        <Col span={8}>
                            <FormItem
                                label="创建类型"
                            >
                                {getFieldDecorator('orderType', {
                                    initialValue: -1,
                                })(
                                    <Select>
                                        {
                                            Amazon_Order_Create_Type.map(v => (<Option key={v.code} value={v.code}>{v.name}</Option>))
                                        }
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="抓单时间"
                            >
                                {getFieldDecorator('grapTime')(
                                    <RangePicker
                                        format="YYYY-MM-DD"
                                        placeholder={['开始日期', '结束日期']}
                                        showTime={{defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}}
                                    />,
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="创建时间"
                            >
                                {getFieldDecorator('createTime')(
                                    <RangePicker
                                        format="YYYY-MM-DD"
                                        placeholder={['开始日期', '结束日期']}
                                        showTime={{defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}}
                                    />,
                                )}
                            </FormItem>
                        </Col>
                </Row>
                <Row type="flex" align="middle">
                        <Col span={8}>
                            <FormItem
                                label="标记信息"
                            >
                                {getFieldDecorator('markInfo', {
                                    initialValue: -1,
                                })(
                                    <Select>
                                        {
                                            Amazon_Tag_Info_Type.map(v => (<Option key={v.code} value={v.code}>{v.name}</Option>))
                                        }
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="销售店铺"
                            >
                                {getFieldDecorator('shopNames')(
                                    <CSelect
                                        code="key" // 列表编码字段
                                        name="lable" // 列表名称字段
                                        url={Review_Get_Shop_Name_Api}
                                        params={{
                                            data:{pageData: 20,
                                                pageNumber: 1,
                                                searchColumn: 'shopName'}
                                        }}
                                        placeholder="销售店铺名称"
                                        apiListType={0}
                                        mode="multiple"
                                    />,
                                )}
                            </FormItem>
                        </Col>
                </Row>
            </div>
        );

        const typeSearch = (
            <div className="search_content">
                <FormItem label="搜索类型"
                >
                    {getFieldDecorator('searchType', {
                        initialValue: '1',
                    })(
                        <RadioGroup size="small">
                            <Radio value="1">平台订单号</Radio>
                            <Radio value="2">跟踪号</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <div className="content_right">
                    {getFieldDecorator('searchContent')(
                        <Search
                            placeholder="双击可批量查询"
                            enterButton="搜索"
                            onDoubleClick={() => this.props.toggleModal()}
                            onSearch={() => onSearch()}
                            allowClear
                        />
                    )}
                    <Button type="default" onClick={() => {
                        resetFields();
                    }}>
                        重置
                    </Button>
                </div>
            </div>
        );

        return (
            <div className="erp-search margin-ms-bottom">
                <Form>
                    {selectSearch}
                    {typeSearch}
                </Form>
            </div>
        );
    }
}
