import React, { Component } from 'react';
import { Form, Radio, Button, DatePicker, Row, Col, Input } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const SearchButton = Input.Search;

const { RangePicker } = DatePicker;

import {
    STATUS_CUSTOMS,
    STATUS_LOGISTICS,
    STATUS_WAREHOUSE,
} from '../../../common/advancedSearchModel/constants';
import {post} from "../../../../util/axios";
import * as types from "../constants/ActionTypes"
import '../css/newSearch.css'
import Ctags from '../../../../components/ctags';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: [], // 申报主体
        };
    }

    componentDidMount(){
        post(types.DECLARE_LIST_API, {}).then(data=>{
            if(data && data.state === "000001"){
                this.state.company = [];
                this.state.company.push({code: 0, name: '全部'});

                for (let i = 0; i < data.data.length; i++) {
                    this.state.company.push({code: data.data[i].id, name: data.data[i].name})
                }

                this.setState({
                    company: company
                })
            }
        });
    }

    // 全局搜索
    onSubmit = () => {
        this.props.customsListFetch()
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { resetFields } = this.props;
        const { company } = this.state;

        const searchSelect = (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="创建时间"
                        >
                            {getFieldDecorator('createTime')(
                                <RangePicker
                                    format="YYYY-MM-DD"
                                    placeholder={['开始日期', '结束日期']}
                                    showTime={{format: 'HH:mm'}}
                                />
                            )}
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem
                            label="制单时间"
                        >
                            {getFieldDecorator('ordersTime')(
                                <RangePicker
                                    format="YYYY-MM-DD"
                                    placeholder={['开始日期', '结束日期']}
                                    showTime={{format: 'HH:mm'}}
                                />
                            )}
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem
                            label="审核时间"
                        >
                            {getFieldDecorator('auditTime')(
                                <RangePicker
                                    format="YYYY-MM-DD"
                                    placeholder={['开始日期', '结束日期']}
                                    showTime={{format: 'HH:mm'}}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        const searchContent = (
            <div className="search_content">
                <FormItem label="搜索内容">
                    {getFieldDecorator('searchType', {
                        initialValue: '1',
                    })(
                        <RadioGroup
                            size="small"
                        >
                            <Radio value={'1'}>合同号</Radio>
                            <Radio value={'2'}>物流计划单号</Radio>
                            <Radio value={'3'}>报关单号</Radio>
                            <Radio value={'4'}>制单人</Radio>
                            <Radio value={'5'}>审核人</Radio>

                        </RadioGroup>
                    )}
                </FormItem>
                <div className="content_right">
                    {getFieldDecorator('searchContent')(
                        <SearchButton
                            placeholder="请输入搜索条件"
                            enterButton="搜索"
                            onSearch={this.onSubmit}
                        />
                    )}
                    <Button
                        type="default"
                        onClick={resetFields}
                    >
                        重置
                    </Button>
                </div>
            </div>
        );

        const searchTag = (
            <div className="search_tag">

                <Row type="flex" align="middle">
                    <Col span={24}>
                        <FormItem
                            label="报关单状态"
                        >
                            {getFieldDecorator('declarationType', {
                                initialValue: [0]
                            })(
                                <Ctags
                                    list={STATUS_CUSTOMS}
                                    handleChange={this.onSubmit}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <Row type="flex" align="middle">
                    <Col span={10}>
                        <FormItem
                            label="物流状态"
                        >
                            {getFieldDecorator('logisticsStatus', {
                                initialValue: [0]
                            })(
                                <Ctags
                                    list={STATUS_LOGISTICS}
                                    handleChange={this.onSubmit}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="仓库类型"
                        >
                            {getFieldDecorator('depotType', {
                                initialValue: [0]
                            })(
                                <Ctags
                                    list={STATUS_WAREHOUSE}
                                    handleChange={this.onSubmit}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <Row type="flex" align="middle">
                    <Col span={24}>
                        <FormItem
                            label="申报主体"
                        >
                            {getFieldDecorator('companyId', {
                                initialValue: [0]
                            })(
                                <Ctags
                                    list={company}
                                    handleChange={this.onSubmit}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        return (
            <div className="erp-search">
                <Form>
                    {searchSelect}
                    {searchContent}
                    {searchTag}
                </Form>
            </div>
        );
    }
}

export default Search;
