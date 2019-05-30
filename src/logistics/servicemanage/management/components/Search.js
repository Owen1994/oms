import React from 'react';
import moment from 'moment';
import {
    Form,
    Col,
    Row,
    DatePicker,
    Button,
    Input,
} from 'antd';
import { CHANNEL_SEARCH } from '../constants/Api';
import CSelect from '../../../../components/cselect';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;


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
                        <FormItem label="平台订单号">
                            {getFieldDecorator('platformOrderNumber')(
                                <Input placeholder="请输入" />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="生成时间">
                            {getFieldDecorator('generationTime')(
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
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <div>
                            <FormItem label="渠道名称">
                                {getFieldDecorator('channelCode', {
                                })(
                                    <CSelect
                                        placeholder="请选择"
                                        code="key"
                                        name="label"
                                        url={CHANNEL_SEARCH}
                                        apiListType={2}
                                        localSearch={1}
                                        handleChange={this.handleChange}
                                        params={{searchColumn: 'name'}} // 搜索参数
                                    />,
                                )}
                            </FormItem>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="trackingCode-class">
                            <FormItem label="追踪码">
                                {getFieldDecorator('trackingCode', {
                                })(
                                    <Input placeholder="请输入" style={{ width: '140px' }}/>,
                                )}
                            </FormItem>
                            <Button type="primary" onClick={()=>this.props.onSearch()}>搜索</Button>
                            <Button className="margin-ss-left" onClick={this.props.onReset}>重置</Button>
                        </div>
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
                </Form>
            </div>
        );
    }
}
