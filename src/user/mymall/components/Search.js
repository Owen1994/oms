import React from 'react'
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    Select,
} from 'antd';
import { AUTH_STATE } from '../constants/index'
const FormItem = Form.Item;
const Option = Select.Option;

export default class Search extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const { handleSubmit } = this.props;
        return (
            <div className="authorization-search breadcrumb">
                <Form>
                    <div className="select-type">
                        <div className="typeSearch">
                            <Row type="flex" align="middle">
                                <Col span={24}>
                                    <div className="typeSearch-l">
                                        <FormItem label="授权状态"
                                        >
                                            {getFieldDecorator('authState', {
                                                initialValue: '',
                                            })(
                                                <Select
                                                    style={{width: 270}}
                                                >
                                                    {
                                                        AUTH_STATE.map(v => <Option value={v.code}>{v.name}</Option>)
                                                    }
                                                </Select>
                                            )}
                                        </FormItem>
                                        <div className="typeSearch-r" style={{ left: "360px" }}>
                                            <FormItem
                                                label="销售账号"
                                            >
                                                {getFieldDecorator('sellerId')(
                                                    <Input
                                                        placeholder="请输入"
                                                        enterButton="搜索"
                                                        // size="large"
                                                        style={{ width: 280 }}
                                                    />
                                                )}
                                                <Button type="primary" onClick={() => handleSubmit()}>
                                                    搜索
                                                </Button>
                                                <Button
                                                    type="default"
                                                    onClick={() => this.props.form.resetFields()}
                                                >
                                                    重置
                                                </Button>
                                            </FormItem>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}