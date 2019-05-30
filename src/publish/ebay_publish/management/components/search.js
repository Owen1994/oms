import React from 'react'
import {
    Form,
    Input,
    Button,
    Radio,
    Row,
    Col,
} from 'antd';
import * as API from '../../../common/constants/Api'
import CSelect from '../../../../components/cselect';
import Ctags from '../../../../components/ctags';
import { importStatus } from '../constants'
import { strTrim } from '../../../../util/baseTool';

const FormItem = Form.Item;

export default class Search extends React.Component {

    //规则名称失去焦点过滤前后空格
    handleBlur = (e) => {
        this.props.form.setFieldsValue({ 'autoPartsName': strTrim(e.target.value) });
    };
    //重置
    resetFields = () => {
        this.props.form.resetFields();
    };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const site = getFieldValue('siteId');
        const { handleSubmit } = this.props;
        const params = { 'pageData': 20, 'pageNumber': 1 };
        if (site) {
            params.site = site;
        }

        const selectSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem label="站点"
                        >
                            {getFieldDecorator('siteId')(
                                <CSelect
                                    // list={} // 默认值列
                                    code='id' // 列表编码字段
                                    name='name' // 列表名称字段
                                    url={API.GET_EBAY_SITE}
                                    // mode='multiple' // 是否多选
                                    // maxCount={3} // 最多选择项数量
                                    // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                    params={{ searchColumn: 'name', pageData: 50, pageNumber: 1 }} // 搜索参数
                                    apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder={'请选择'}
                                    localSearch={1}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="ebay分类">
                            {getFieldDecorator('categoryId')(
                                <CSelect
                                    // list={LOGISTICS_BUSINESS} // 默认值列
                                    disabled={site ? false : true}
                                    code='id' // 列表编码字段
                                    name='name' // 列表名称字段
                                    url={API.GET_EBAY_CLASS}
                                    params={{ searchColumn: 'name', pageData: 20, pageNumber: 1, site: site }} // 搜索参数
                                    // formType={1}
                                    localSearch={1}
                                    apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder={'请选择'}
                                    // handleChange={this.handleChange} // 触发下拉事件
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="档案名称:" className="autoPartsClass search_adjustment">
                            {getFieldDecorator('autoPartsName', {
                                rules: [{
                                    required: false,
                                    message: `请输入`
                                }],
                            })(
                                <Input
                                    onBlur={this.handleBlur}
                                    size="large"
                                    style={{ width: 280 }}
                                />
                            )}
                            <Button type="primary" onClick={() => handleSubmit()}>
                                搜索
                            </Button>
                            <Button className="margin-ss-left" onClick={this.resetFields}>
                                重置
                            </Button>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        const ctageSearch = (
            <div className="ctageSearch">
                <Row>
                    <Col span={8}>
                        <FormItem
                            label="处理状态"
                        >
                            {getFieldDecorator('importStatus', {
                                initialValue: [-1]
                            })(
                                <Ctags
                                    list={importStatus}
                                    handleChange={() => this.props.handleSubmit()}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        return (
            <div className="part-search">
                <Form>
                    <div className="select-type">
                        {selectSearch}
                        {/* {searchTab} */}
                        {/* {defaultSearch} */}
                        {/* {textSearch} */}
                        {/* {heightSearch} */}
                        {/* {searchBtn} */}
                    </div>
                    {ctageSearch}
                </Form>
            </div>
        )
    }
}