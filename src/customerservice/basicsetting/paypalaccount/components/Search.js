import React from 'react';
import { Form, Select, Input, Row, Col, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class Search extends React.Component {
    state = {
    }

    status = [
        {
            key: 0,
            label: '全部'
        }, {
            key: 1,
            label: '开启'
        }, {
            key: 2,
            label: '关闭'
        }
    ]

    onSubmit = (e) => {
        e.preventDefault();
        this.props.listFetch();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loading } = this.props;
        const searchForm = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="状态"
                        >
                            {getFieldDecorator('status', {
                                initialValue: 0
                            })(
                                <Select>
                                    {this.status.map(item => <Option key={item.key} value={item.key}>{item.label}</Option>)}
                                </Select>,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="账号"
                        >
                            {getFieldDecorator('account')(
                                <Input placeholder='请输入paypal账号' className='submit-btn-pd' />,
                            )}
                        </FormItem>
                        <div className="customer-submit-btns">
                            <Button loading={loading} type='primary' onClick={() => this.props.listFetch()}>搜索</Button>
                            <Button onClick={this.props.onReset} className='customer-reset-btn'>重置</Button>
                        </div>
                    </Col>
                    <Col span={0}>
                        <FormItem>
                            {getFieldDecorator('statusOrder')(
                                <Input type='hidden' />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
        return (
            <div className="search breadcrumb overflow-hidden">
                <div className="yks-erp-search_order">
                    <Form layout="inline" onSubmit={this.onSubmit}>
                        <div className="select-type pdt-none">
                            {searchForm}
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
export default Form.create()(Search);
