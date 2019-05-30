import React from 'react';
import {
    Form,
    Input,
    Button,
    Row,
    Col,
} from 'antd';
import CSelect from '../../../../components/cselect';
import {
    STAFFINQUIRY,
    PROCUREMENT_ROLE_SUPPLIER_MODIFY,
} from '../constants';
import { fetchPost } from '../../../../util/fetch';
import Functions from '../../../../components/functions';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
};

/**
 *作者: chennlin
 *功能描述: 其它设置搜索
 *时间: 2018/10/11 15:55
 */
export default class Search extends React.Component {
    state = {
        hide: true,
        loading: false,
    }

    // 修改
    handleModify = () => {
        this.setState({
            hide: false,
        });
    };

    // 保存
    hanleSave = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({
                    loading: true,
                });
                const params = {};
                const data = {};
                data.nationalDeveloper = values.nationalDeveloper[0].key;
                data.nationalSeller = values.nationalSeller[0].key;
                data.amount = values.amount;
                params.data = data;
                fetchPost(PROCUREMENT_ROLE_SUPPLIER_MODIFY, params, 1).then((res) => {
                    if (res && res.state === '000001') {
                        this.props.onSearch();
                        this.setState({
                            hide: true,
                            loading: false,
                        });
                    } else {
                        this.setState({
                            loading: false,
                        });
                    }
                });
            }
        });
    };

    // 取消
    hanleCancel = () => {
        this.setState({
            hide: true,
        });
        this.props.form.resetFields();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const loading = this.state.loading;
        const btnTest = this.state.hide ? (
            <Row type="flex" align="middle">
                <Col className="text-right" span={3} />
                <Col span={21}>
                <Functions
                {...this.props}
                functionkey="010-000004-000002-002"
            >
                    <div className="btn-modify padding-md-bottom">
                        <Button onClick={this.handleModify}>修改</Button>
                    </div>
                </Functions>    
                </Col>
            </Row>
        ) : (
            <Row type="flex" align="middle">
                <Col className="text-right" span={3} />
                <Col span={21}>
                    <div className="btn-save padding-md-bottom">
                        <Button onClick={this.hanleSave} loading={loading}>保存</Button>
                        <Button onClick={this.hanleCancel}>取消</Button>
                    </div>
                </Col>
            </Row>
        );

        return (
            <div className="breadcrumb">
                <Form>
                    <Row>
                        <Col span={24}>
                            <div className="padding-md-top">
                                <FormItem
                                    {...formItemLayout}
                                    label="金额阈值"
                                >
                                    {getFieldDecorator('amount', {
                                        initialValue: 1000,
                                        rules: [
                                            { required: true, message: '请选择' },
                                        ],
                                    })(
                                        <Input
                                            style={{ width: 330 }}
                                            autosize={{ minRows: 2, maxRows: 6 }}
                                            disabled={this.state.hide}
                                        />,
                                    )}
                                </FormItem>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className="margin-ms-top">
                                <FormItem
                                    {...formItemLayout}
                                    label="国内仓开发代表"
                                >
                                    {getFieldDecorator('nationalDeveloper', {
                                        rules: [
                                            { required: true, message: '请选择' },
                                        ],
                                    })(
                                        <CSelect
                                            code="key"
                                            name="label"
                                            url={STAFFINQUIRY}
                                            params={{
                                                data: {
                                                    searchColumn: 'name',
                                                    pageData: 20,
                                                    pageNumber: 1,
                                                },
                                            }} // 搜索参
                                            apiListType={0}
                                            placeholder="请选择"
                                            formType={1}
                                            disabled={this.state.hide}
                                        />,
                                    )}
                                </FormItem>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={28}>
                            <div className="margin-ms-top">
                                <FormItem
                                    {...formItemLayout}
                                    label="国内仓销售代表"
                                >
                                    {getFieldDecorator('nationalSeller', {
                                        rules: [
                                            { required: true, message: '请选择' },
                                        ],
                                    })(
                                        <CSelect
                                            code="key"
                                            name="label"
                                            url={STAFFINQUIRY}
                                            apiListType={0}
                                            placeholder="请选择"
                                            formType={1}
                                            params={{
                                                data: {
                                                    searchColumn: 'name',
                                                    pageData: 20,
                                                    pageNumber: 1,
                                                },
                                            }} // 搜索参
                                            disabled={this.state.hide}
                                        />,
                                    )}
                                </FormItem>
                            </div>
                        </Col>
                    </Row>
                    {btnTest}
                </Form>
            </div>
        );
    }
}
