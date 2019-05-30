import React, { Component } from 'react';
import { Form, Radio, Input, Button, DatePicker, Row, Col } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const SearchButton = Input.Search;
const { RangePicker } = DatePicker;

import {
    STATUS_OPERATIONTYPE,
} from '../../common/advancedSearchModel/constants';

import '../css/newSearch.css'

import Ctags from '../../../components/ctags';

class Search extends Component {

    // 全局搜索
    onSubmit = () => {
        this.props.customsListFetch()
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { resetFields } = this.props;

        const searchSelect = (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="时间"
                        >
                            {getFieldDecorator('createTime')(
                                <RangePicker
                                    format="YYYY-MM-DD"
                                    placeholder={['开始日期', '结束日期']}
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
                            <Radio value={'1'}>操作人</Radio>
                            <Radio value={'2'}>物流计划单号</Radio>
                            <Radio value={'3'}>合同号</Radio>
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
                <FormItem
                    label="操作类型"
                >
                    {getFieldDecorator('optionType', {
                        initialValue: [0]
                    })(
                        <Ctags
                            list={STATUS_OPERATIONTYPE}
                            handleChange={this.onSubmit}
                        />
                    )}
                </FormItem>
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
