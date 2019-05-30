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
} from 'antd';

import CSelect from '../../../../../components/cselect';
const FormItem = Form.Item;
const SearchButton = Input.Search;

import { Site_List_Api } from '../../constants/Api';

import { Platform_List, Site_Code_Dic } from '../../constants/index';

import { Today_State_List } from '../../constants/index';

class Condition extends Component {

    /**
     * 清除表单数据
     */
    resetFields = () => {
        this.props.form.resetFields();
    };

    handleChange = () => {
        this.props.form.setFieldsValue({'siteCodesNot': undefined});
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const searchView = (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="未覆盖平台"
                        >
                            {getFieldDecorator('platformNot')(
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
                            label="未覆盖站点	"
                        >
                            {getFieldDecorator('siteCodesNot')(
                                <CSelect
                                    disabled={this.props.form.getFieldValue('platformNot') === undefined}
                                    url={Site_List_Api}
                                    code="code"
                                    name="code"
                                    params={{
                                        data:{
                                            platformCode: Site_Code_Dic[this.props.form.getFieldValue('platformNot')],
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
                            label="SKU状态"
                        >
                            {getFieldDecorator('todayStates')(
                                <CSelect
                                    code="code"
                                    name="name"
                                    placeholder={'请选择'}
                                    apiListType={0}
                                    list={Today_State_List}
                                    mode='multiple'
                                    localSearch={1}
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
                            {getFieldDecorator('skuCodesNot')(
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
