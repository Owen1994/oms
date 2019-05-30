import React from 'react';
import { Form, Select, Input, Row, Col, Button } from 'antd';
import Screen from './Screen';

const FormItem = Form.Item;
const Option = Select.Option;

export default class Search extends React.Component {
    state = {
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loading } = this.props.listReducer;
        let { platformList } = this.props.platformlistReducer;
        if (platformList) {
            platformList = [{ key: 'all', label: '全部' }, ...this.props.platformlistReducer.platformList];
        } else {
            platformList = [];
        }
        const textSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="平台"
                        >
                            {getFieldDecorator('platformId')(
                                <Select placeholder="请选择平台">
                                    {platformList.map(item => <Option key={item.key} value={item.key}>{item.label}</Option>)}
                                </Select>,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="标签名称"
                        >
                            {getFieldDecorator('tagName')(
                                <Input placeholder='请输入标签名称' className='submit-btn-pd' />,
                            )}
                        </FormItem>
                        <div className="customer-submit-btns">
                            <Button loading={loading} type='primary' onClick={() => this.props.listFetch()}>搜索</Button>
                            <Button onClick={this.props.onReset} className='customer-reset-btn'>重置</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
        return (
            <div className="search breadcrumb overflow-hidden">
                <div className="yks-erp-search_order">
                    <Form layout="inline" onSubmit={this.props.onSubmit}>
                        <div className="select-type pdt-none">
                            {textSearch}
                        </div>
                        <Screen {...this.props} />
                    </Form>
                </div>
            </div>
        );
    }
}
