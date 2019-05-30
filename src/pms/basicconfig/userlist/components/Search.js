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
import CSelect from '../../../../components/cselect';
import { ROLETYPE } from '../constants/index';

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
                        <FormItem label="角色类型">
                            {getFieldDecorator('roleType')(
                                <CSelect
                                    list={ROLETYPE} // 默认值列
                                    code='code' // 列表编码字段
                                    name='name' // 列表名称字段
                                    params={{ searchColumn: 'name', pageData: 20, pageNumber: 1 }}
                                    apiListType={0}
                                    placeholder={'请选择'}
                                />
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
                                        <Radio value={1}>人员名称</Radio>
                                        <Radio value={2}>账号</Radio>
                                    </RadioGroup>,
                                )}
                            </FormItem>
                            <div>
                                {getFieldDecorator('searchContents', {
                                    rules: [{
                                        required: false,
                                        message: '请输入',
                                    }],
                                })(
                                    <Input
                                        placeholder="双击可批量查询"
                                        size="large"
                                        style={{ width: 280 }}
                                        onDoubleClick={this.props.toggleModal}
                                    />,
                                )}
                                <Button type="primary" onClick={() => this.props.onSearch()}>
                                    搜索
                                </Button>
                                <Button type="default" onClick={this.props.onReset}>
                                    重置
                                </Button>
                            </div>
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
