import React from 'react';
import {
    Form,
    Input,
    Button,
    Row,
    Col,
} from 'antd';
import Ctags from '../../../../../components/ctags';
import CSelect from '../../../../../components/cselect';
import { ruleState } from '../constants/index';
import { all, allList } from '../../common/json';
import {
    GET_AUTOREPLAY_API,
    GET_SENDINFMODE_API,
    GET_PLATFORM_API,
} from '../constants/Api';

const FormItem = Form.Item;

export default class SearchComponent extends React.Component {
    state = {
        // isSearch: false,
    };

    // 重置
    resetFields = () => {
        this.props.form.resetFields();
        this.props.form.setFieldsValue({ orderTimes: [] });
    };

    completeCallback = (list) => {
        if (list && Array.isArray(list) && !list.includes(all)) {
            list.unshift(all);
        }
        return list;
    }

    render() {
        const { getFieldDecorator, getFieldsValue } = this.props.form;
        const { handleSubmit, autoreplySetList } = this.props;
        const loading = autoreplySetList && autoreplySetList.loading;
        let { platformId, plate } = getFieldsValue(['platformId', 'plate']);
        if (platformId === all.key) {
            platformId = undefined;
        }
        if (plate === all.key) {
            plate = undefined;
        }
        const ctageSearch = (
            <div className="ctageSearch ptb-5">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            // {...formItemLayout}
                            label="规则状态"
                        >
                            {getFieldDecorator('ruleState', {
                                initialValue: [1],
                            })(
                                <Ctags
                                    list={ruleState}
                                    handleChange={() => handleSubmit()}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        const selectSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="适用平台"
                        >
                            {getFieldDecorator('platformId', {
                                initialValue: all.key,
                            })(
                                <CSelect
                                    list={allList} // 默认值列表
                                    handleFilter={this.completeCallback}
                                    code="key" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url={GET_PLATFORM_API}
                                    params={plate ? { applicableTempId: plate } : { applicableTempId: 0 }} // 搜索参数
                                    apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder="请选择"
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="适用板块"
                        >
                            {getFieldDecorator('plate', {
                                initialValue: all.key,
                            })(
                                <CSelect
                                    list={allList} // 默认值列表
                                    handleFilter={this.completeCallback}
                                    code="key" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url={GET_AUTOREPLAY_API}
                                    params={platformId ? { platformId } : { platformId: 0 }} // 搜索参数
                                    apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder="请选择"
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="发送方式"
                        >
                            {getFieldDecorator('sendType', {
                                initialValue: all.key,
                            })(
                                <CSelect
                                    list={allList} // 默认值列表
                                    handleFilter={this.completeCallback}
                                    code="key" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url={GET_SENDINFMODE_API}
                                    params={{ platformId, applicableTempId: plate }} // 搜索参数
                                    apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder="请选择"
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="规则名称">
                            {getFieldDecorator('ruleName', {
                                rules: [{
                                    required: false,
                                    message: '请输入',
                                }],
                            })(
                                <Input placeholder="请输入规则名称" style={{ width: 270 }} className='submit-btn-pd' />
                            )}
                        </FormItem>
                        <div className="customer-submit-btns">
                            <Button loading={loading} type='primary' onClick={() => this.props.handleSubmit()}>搜索</Button>
                            <Button onClick={this.props.onReset} className='customer-reset-btn'>重置</Button>
                        </div>

                        {/* <FormItem
                            label="规则名称"
                            className="autoreply-set-sreach-wrap"
                        >
                            {getFieldDecorator('ruleName', {
                                rules: [{
                                    required: false,
                                    message: '请输入',
                                }],
                            })(
                                <Search
                                    className="autoreply-set-sreach-btn"
                                    placeholder="请输入规则名称"
                                    enterButton="搜索"
                                    size="large"
                                    style={{ width: 270 }}
                                    onDoubleClick={() => this.props.toggleModal()}
                                    onSearch={() => this.props.handleSubmit()}
                                />,
                            )}
                            <Button className="autoreply-set-sreach-reset" type="default" onClick={() => this.props.onReset()}>
                                重置
                            </Button>
                        </FormItem> */}
                    </Col>
                </Row>
            </div>
        );
        return (
            <div className="autoreply-set-search">
                <Form>
                    <div className="select-type">
                        {selectSearch}
                    </div>
                    {ctageSearch}
                </Form>
            </div>
        );
    }
}
