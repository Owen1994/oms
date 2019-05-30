import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import Screen from './Screen';

const FormItem = Form.Item;

/**
 * 作者: yangbo
 * 功能描述:  模板管理搜索
 * 时间: 2018/9/13
 */
export default class Search extends React.Component {
    render() {
        const { loading } = this.props.listReducer;
        const { getFieldDecorator } = this.props.form;
        const textSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={12}>
                        <FormItem label="模板名称">
                            {getFieldDecorator('tempName')(
                                <Input placeholder='请输入模板名称' className='submit-btn-pd' />,
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
            <div className="breadcrumb overflow-hidden position-relative">
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
