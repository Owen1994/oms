import React, { Component } from 'react';
import {
    Form,
    Button,
    Col, Row,
} from 'antd';
import ItemSelect from '../../../../../common/components/itemSelect';
import * as types from '../../../../common/constants/actionTypes';
import '../css/newSearch.css';

const FormItem = Form.Item;

class Search extends Component {
    // 条件筛选
    handleFormSubmit = (param, name) => {
        this.props.form.setFieldsValue({
            [name]: param,
        });
    }

    // 全局搜索
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSearch();
    }

    // 重置
    onReset = () => {
        this.props.form.resetFields();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const selectSearch = (
            <div className="selectSearch ">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="站点"
                        >
                            <ItemSelect
                                getFieldDecorator={getFieldDecorator}
                                formName="siteId"
                                name="name"
                                code="id"
                                searchColumn="siteId"
                                params={{ pageData: 20, pageNumber: 1 }}
                                url={types.PUBLISH_EBAYSITE}
                                apiListType={2}
                            />
                        </FormItem>
                    </Col>
                    <Col>
                        <div style={{ display: 'flex' }}>
                            <FormItem
                                style={{ marginRight: 0 }}
                                label="销售账号:"
                                className="search_adjustment"
                            >
                                <ItemSelect
                                    getFieldDecorator={getFieldDecorator}
                                    formName='sellerIdArr'
                                    name="id"
                                    code="id"
                                    searchColumn="sellerIdArr"
                                    params={{ 'pageData': 20, 'pageNumber': 1 }}
                                    url={types.PUBLISH_EBAYACCOUNT}
                                    mode='multiple' // 是否支持多选
                                    maxCount={10}  // 最大可选数  配合  multiple使用
                                    apiListType={2}
                                />
                            </FormItem>
                            <div style={{ paddingTop: 5 }}>
                                <Button
                                    className="search_adjustment_button"
                                    type="primary"
                                    htmlType="submit"
                                >搜索
                                </Button>
                                <Button
                                    className="search_adjustment_button margin-ss-left"
                                    onClick={this.onReset}
                                >重置
                                </Button>
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>
        );
        // const heightSearch =  (
        //     <div className="height-search">
        //         <div className="list-filter-item margin-ss-top">
        //             <div className="list-filter-item-title">站点:</div>
        //             <div className="list-filter-input">
        //                 <FormItem>
        //                     <ItemSelect
        //                         getFieldDecorator={getFieldDecorator}
        //                         formName='siteId'
        //                         name="name"
        //                         code="id"
        //                         searchColumn="siteId"
        //                         params={{'pageData': 20, 'pageNumber': 1}}
        //                         url={types.PUBLISH_EBAYSITE}
        //                         apiListType={2}
        //                     />
        //                 </FormItem>
        //             </div>
        //         </div>
        //         <div className="list-filter-item margin-sm-top">
        //             <div className="list-filter-item-title">销售账号:</div>
        //             <div className="list-filter-input">
        //                 <FormItem>
        //                     <ItemSelect
        //                         getFieldDecorator={getFieldDecorator}
        //                         formName='sellerIdArr'
        //                         name="id"
        //                         code="id"
        //                         searchColumn="sellerIdArr"
        //                         params={{'pageData': 20, 'pageNumber': 1}}
        //                         url={types.PUBLISH_EBAYACCOUNT}
        //                         mode='multiple' // 是否支持多选
        //                         maxCount={10}  // 最大可选数  配合  multiple使用
        //                         apiListType={2}
        //                     />
        //                 </FormItem>
        //             </div>
        //         </div>
        //     </div>
        // )
        // const btnSearch =  (
        //     <div className="btn-search padding-sm-bottom publish-ebay-tem-match">
        //         <Button type="primary" htmlType="submit">搜索</Button>
        //         <Button onClick={this.onReset}>重置</Button>
        //     </div>
        // )

        return (
            <div className="search  overflow-hidden ">
                <Form layout="inline" onSubmit={this.onSubmit}>
                    <div className="select-type">
                        {selectSearch}
                    </div>
                </Form>
            </div>
        );
    }
}

export default Search;
