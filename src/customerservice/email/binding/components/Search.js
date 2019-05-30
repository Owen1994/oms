import React from 'react';
import { Form, Select, Input, Button, Row, Col } from 'antd';
import { getPlatformList } from '../../../common/request';
import Screen from './Screen';

const FormItem = Form.Item;
const Option = Select.Option;

/**
 *作者: xupeiwen
 *功能描述:  邮箱绑定搜索
 *时间: 2018/8/31
 */
export default class Search extends React.Component {
    state = {
        platform: [],
    }

    componentDidMount() {
        getPlatformList({ commonStatus: -1 }).then((result) => {
            result.unshift({ key: '', label: '全部' });
            this.setState({ platform: result });
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loading } = this.props.listReducer;
        const { platform } = this.state;
        const textSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem label="平台">
                            {getFieldDecorator('platformId')(
                                <Select placeholder="请选择平台">
                                    {platform.map(item => <Option key={item.key} value={item.key}>{item.label}</Option>)}
                                </Select>,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="卖家账号">
                            {getFieldDecorator('searchContent')(
                                <Input placeholder='请输入卖家账号' className='submit-btn-pd' />,
                            )}
                        </FormItem>
                        <div className="customer-submit-btns">
                            <Button loading={loading} type='primary' onClick={() => this.props.listFetch()}>搜索</Button>
                            <Button onClick={this.props.onReset} className='customer-reset-btn'>重置</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
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
