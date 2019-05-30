import React from 'react';
import {
    Form,
    Radio,
    Input,
    Button,
    DatePicker,
    Row,
    Col,
} from 'antd';
import moment from "moment";
import '../css/css.css';
import { ROLE_TYPE, STATUS_LABEL } from '../constants/Search';
import CSelect from "../../../../components/cselect";

const FormItem = Form.Item;
const SearchInput = Input.Search;
const RadioGroup = Radio.Group;
/**
 * 列表头部搜索
 */
const RangePicker = DatePicker.RangePicker;
export default class ReceiveSearch extends React.Component {

    /**
     * 全局搜索
     * @param event
     */
    onSubmit = () => {
        this.props.onSearchListener();
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const searchSelect = (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="角色类型:"
                        >
                            {getFieldDecorator('messageTypeReceive', {
                                initialValue: -1,
                            })(
                                <CSelect
                                    placeholder="请选择"
                                    list={ROLE_TYPE}
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="状态:"
                        >
                            {getFieldDecorator('processStateReceive', {
                                initialValue: -1,
                                rules: [
                                    { required: false, message: 'Please select your categories!' },
                                ],
                            })(
                                <CSelect
                                    list={STATUS_LABEL}
                                    handleChange={this.onSubmit}
                                    placeholder="请选择"
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="发送时间:"
                        >
                            {getFieldDecorator('sendTimesReceive', {
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
                <FormItem
                    label="搜索类型"
                >
                    {getFieldDecorator('searchTypeReceive', {
                        initialValue: 1,
                    })(
                        <RadioGroup size="small">
                            <Radio value={1}>
                                发送人
                            </Radio>
                            <Radio value={2}>
                                内容
                            </Radio>
                        </RadioGroup>,
                    )}
                </FormItem>
                <div className="content_right">
                    {getFieldDecorator('searchContentReceive', {})(
                        <SearchInput
                            placeholder="请输入内容"
                            enterButton="搜索"
                            onSearch={this.onSubmit}
                        />,
                    )}
                    <Button type="default" onClick={this.reset}>
                        重置
                    </Button>
                </div>
            </div>
        );

        return (
            <div className="erp-search">
                {searchSelect}
                {typeSearch}
            </div>
        );
    }
}
