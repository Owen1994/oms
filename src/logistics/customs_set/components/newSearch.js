import React, { Component } from 'react';
import { Form, Radio, Input, Button, DatePicker, Row, Col } from 'antd';
import '../css/newSearch.css'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const SearchButton = Input.Search;
const { RangePicker } = DatePicker;

class Search extends Component {

    // 全局搜索
    onSubmit = () => {
        this.props.customSetListFetch()
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
                            <Radio value={'1'}>SKU</Radio>
                            <Radio value={'2'}>报关品名</Radio>
                            <Radio value={'3'}>海关编码</Radio>
                            <Radio value={'4'}>创建人</Radio>
                            <Radio value={'5'}>修改人</Radio>
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


        return (
            <div className="erp-search">
                <Form>
                    {searchSelect}
                    {searchContent}
                </Form>
            </div>
        );
    }
}

export default Search;
