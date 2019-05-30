import React from 'react';
import { Form, Input, Row, Col, Button, message } from 'antd';
import CSelect from '@/components/cselect';

import { COMMON_QUERY } from '../constants';

const FormItem = Form.Item;

class Search extends React.Component {
    state = {
        siteDisabled: true
    }

    platformChange = (value) => {
        this.setState({
            platformCode: value,
            siteDisabled: false,
        });
    }

    onReset = () => {
        this.setState({ siteDisabled: true });
        this.props.onReset();
    }

    render() {
        const { platformCode, siteDisabled } = this.state;
        const { getFieldDecorator } = this.props.form;
        const searchForm = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="平台"
                        >
                            {getFieldDecorator('platform')(
                                <CSelect
                                    // handleFilter={this.completeCallback}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={COMMON_QUERY}
                                    params={{ 
                                        data: {
                                            modelName: 'platformList',
                                            searchColumn: "name"
                                        }
                                    }} // 搜索参数
                                    apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    onChange={this.platformChange}
                                    placeholder="请选择平台"
                                    localSearch={1}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="站点"
                        >
                            {getFieldDecorator('site')(
                                <CSelect
                                    disabled={siteDisabled}
                                    // handleFilter={this.completeCallback}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={COMMON_QUERY}
                                    params={{ 
                                        data: {
                                            platformCode,
                                            modelName: 'siteList',
                                            searchColumn: "name"
                                        }
                                    }} // 搜索参数
                                    apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder="请选择站点"
                                    localSearch={1}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} className='computed-rule-name'>
                        <FormItem
                            label="规则名称"
                        >
                            {getFieldDecorator('ruleName')(
                                <Input placeholder='请输入规则名称' className='submit-btn-pd' />,
                            )}
                        </FormItem>
                        <div className="customer-submit-btns">
                            <Button type='primary' onClick={() => this.props.listFetch()}>搜索</Button>
                            <Button onClick={this.onReset} className='customer-reset-btn'>重置</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
        return (
            <div className="search breadcrumb overflow-hidden">
                <div className="yks-erp-search_order">
                    <Form layout="inline">
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
