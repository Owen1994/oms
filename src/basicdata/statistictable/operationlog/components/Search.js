import React from 'react';
import moment from 'moment';
import {
    Form,
    Col,
    Row,
    DatePicker,
    Radio,
    Button,
    Input,
} from 'antd';
import CTags from '../../../../components/ctags';
import OPERATION_TYPE from '../constants';


const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;


/**
 * @author huangjianfeng
 * @description 搜索
 */
export default class SearchComponent extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;

        const selectSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem label="操作时间">
                            {getFieldDecorator('operationTime')(
                                <RangePicker
                                    showTime={{
                                        hideDisabledOptions: true,
                                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                    }}
                                    format="YYYY-MM-DD HH:mm"
                                    placeholder={['开始日期', '结束日期']}
                                    style={{ width: 270 }}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );


        const typeSearch = (
            <div className="typeSearch">
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <div className="typeSearch-l">
                            <FormItem label="搜索类型">
                                {getFieldDecorator('searchType', {
                                    initialValue: 1,
                                })(
                                    <RadioGroup size="small">
                                        <Radio value={1}>操作人</Radio>
                                    </RadioGroup>,
                                )}
                            </FormItem>
                            <div className="typeSearch-r" style={{ left: 165 }}>
                                {getFieldDecorator('searchContent', {
                                    rules: [{
                                        required: false,
                                        message: '请输入',
                                    }],
                                })(
                                    <Input
                                        placeholder="请输入"
                                        // enterButton="搜索"
                                        size="large"
                                        style={{ width: 280 }}
                                    />,
                                )}
                                <Button type="primary" onClick={() => this.props.onSearch()}>
                                    搜索
                                </Button>
                                <Button type="default" onClick={() => this.props.onReset()}>
                                    重置
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );

        const ctageSearch = (
            <div className="ctageSearch">
                <Row>
                    <Col span={8}>
                        <FormItem
                            label="操作类型"
                        >
                            {getFieldDecorator('operationType', {
                                initialValue: [-1],
                            })(
                                <CTags
                                    list={OPERATION_TYPE}
                                    handleChange={() => this.props.onSearch()}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        return (
            <div className="breadcrumb">
                <Form>
                    <div className="select-type">
                        {selectSearch}
                        {typeSearch}
                    </div>
                    {ctageSearch}
                </Form>
            </div>
        );
    }
}
