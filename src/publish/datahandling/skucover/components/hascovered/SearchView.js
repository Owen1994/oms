/**
 * 作者: 郑学宁
 * 描述: SKU覆盖列表 SearchView
 * 时间: 2019年04月22日11:01:58
 **/
import React, { Component } from 'react';
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    InputNumber,
} from 'antd';

import CSelect from '../../../../../components/cselect';
const FormItem = Form.Item;
const SearchButton = Input.Search;

import { Site_List_Api } from '../../constants/Api';

import { Platform_List, Site_Code_Dic } from '../../constants/index';

class Condition extends Component {

    /**
     * 清除表单数据
     */
    resetFields = () => {
        this.props.form.resetFields();
    };

    handleChange = () => {
        this.props.form.setFieldsValue({'siteCodes': undefined});
    };

    coverLeftStyle = {
        borderTop: '1px solid #d9d9d9',
        borderBottom: '1px solid #d9d9d9',
        borderLeft: '1px solid #d9d9d9',
        borderRight: '0px',
        borderTopLeftRadius: '4px',
        borderBottomLeftRadius: '4px',
        borderTopRightRadius: '0px',
        borderBottomRightRadius: '0px',
        width: '119px',
    };

    coverRightStyle = {
        borderTop: '1px solid #d9d9d9',
        borderBottom: '1px solid #d9d9d9',
        borderLeft: '0px',
        borderRight: '1px solid #d9d9d9',
        borderTopLeftRadius: '0px',
        borderBottomLeftRadius: '0px',
        borderTopRightRadius: '4px',
        borderBottomRightRadius: '4px',
        width: '119px',
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const searchView = (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="平台"
                        >
                            {getFieldDecorator('platform')(
                                <CSelect
                                    code='code'
                                    name='name'
                                    list={Platform_List}
                                    apiListType={0}
                                    placeholder={'请选择'}
                                    onChange={this.handleChange}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="站点"
                        >
                            {getFieldDecorator('siteCodes')(
                                <CSelect
                                    disabled={this.props.form.getFieldValue('platform') === undefined}
                                    url={Site_List_Api}
                                    code="code"
                                    name="code"
                                    params={{
                                        data: {
                                            platformCode: Site_Code_Dic[this.props.form.getFieldValue('platform')],
                                            modelName: 'siteList',
                                        }
                                    }}
                                    placeholder={'请选择'}
                                    mode='multiple'
                                    localSearch={1}
                                    apiListType={0}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="覆盖次数"
                        >
                            {getFieldDecorator('coverNumOne')(
                                <InputNumber
                                    min={1}
                                    precision={0}
                                    placeholder="请输入"
                                    style={this.coverLeftStyle}
                                />
                            )}
                            <span className="cover_middle">~</span>
                            {getFieldDecorator('coverNumTwo')(
                                <InputNumber
                                    min={1}
                                    precision={0}
                                    placeholder="请输入"
                                    style={this.coverRightStyle}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="SKU"
                            className="content_right"
                        >
                            {getFieldDecorator('skuCodes')(
                                <SearchButton
                                    placeholder="双击可批量查询"
                                    enterButton="搜索"
                                    onDoubleClick={() => this.props.showModal()}
                                    onSearch={() => this.props.onSearch(1, 20)}
                                    allowClear
                                />
                            )}
                            <Button
                                type="default"
                                onClick={this.resetFields}
                            >
                                重置
                            </Button>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        return (
            <div className="erp-search">
                <Form>
                    {searchView}
                </Form>
            </div>
        );
    }
}

export default Form.create()(Condition)
