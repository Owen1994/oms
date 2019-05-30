/**
 *作者: 任贸华
 *功能描述: 抓单转换配置字段配置和SKU解析配置组件
 *参数说明:
 *时间: 2018/4/16 11:32
 */
import React, { Component } from 'react';
import {
    Form,
    Input,
    Button,
    Row,
    Col,
} from 'antd'

const FormItem = Form.Item;
import { fetchPost } from '../../../util/fetch';
import CSelect from '@/components/cselect';
const Search = Input.Search;

var platformList = [];

const RULE_STATE = [
    { 'code': '', 'name': '全部' },
    { 'code': 0, 'name': '启用' },
    { 'code': 1, 'name': '禁用' }
];  //授权状态，空-全部，0-启用，1-停用

class Condition extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        platformVisible: false,
    }

    handleSubmit = () => {
        let values = this.props.form.getFieldsValue();
        if(values.state === ''){
            delete values.state;
        }
        values.pageData = this.props.Paginationmodel.pageSize;
        values.pageNumber = this.props.Paginationmodel.current;
        this.props.fetchPosts({key: 'data', value: values});
    }


    //重置
    resetFields = () => {
        this.props.form.resetFields();
    };

    componentDidMount() {
        fetchPost(`/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform`, {}, 2)
            .then(result => {
                platformList.push({ 'code': 0, 'name': '全部' });
                if (result.state === '000001') {
                    result.data.map(it => {
                        platformList.push({ 'code': it.id, 'name': it.name });
                    })
                }
            })
    }

    componentWillUnmount() {
        platformList = [];
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const defaultSearch = (
            <div className="search_select">

                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem label="平台">
                            {getFieldDecorator('platformCode', {
                                initialValue: 0
                            })(
                                <CSelect
                                    code="code"
                                    name="name"
                                    list={platformList}
                                />
                            )}
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem
                            label="规则状态"
                        >
                            {getFieldDecorator('state', {
                                initialValue: ''
                            })(
                                <CSelect
                                    code="code"
                                    name="name"
                                    list={RULE_STATE}
                                />
                            )}
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem
                            label="规则名称"
                            className= "content_right"
                        >
                            {getFieldDecorator('configRuleName')(
                                <Search
                                    enterButton="搜索"
                                    onSearch={() => this.handleSubmit()}
                                    allowClear
                                />
                            )}
                            <Button type="default" onClick={this.resetFields}>
                                重置
                            </Button>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        return (
            <div className="erp-search margin-sm-bottom">
                <Form>
                    {defaultSearch}
                </Form>
            </div>
        );
    }
}

export default Condition
