import React, { Component } from 'react';
import {
    Form,
    // Radio,
    Input,
    Button,
    // Select,
    Row, Col,
} from 'antd';
// import StandardFormRow from '../../../../common/components/advancedSearchModel/StandardFormRow';
import CSelect from '../../../../../components/cselect';
import * as API from '../../../../common/constants/Api';

const FormItem = Form.Item;
const InputSearch = Input.Search;

class Search extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         isSearch: true, // 是否切换搜索
    //         isHightSearch: false, // 是否切换高级搜索
    //     };
    // }

    // // 筛选、搜索切换
    // onChangeSearch = (event) => {
    //     if (event.target.value === 'search') {
    //         this.setState({ isSearch: true });
    //         this.setState({ isHightSearch: false });
    //     } else {
    //         this.setState({
    //             isSearch: false,
    //             isHightSearch: false,
    //         });
    //     }
    // }

    // // 高级搜索
    // onChangeHightSearch = () => {
    //     if (this.state.isHightSearch === false) {
    //         this.setState({ isHightSearch: true });
    //     } else {
    //         this.setState({ isHightSearch: false });
    //     }
    // }

    // 条件筛选
    handleFormSubmit = (param, name) => {
        this.props.form.setFieldsValue({
            [name]: param,
        });
    };

    // 全局搜索
    onSubmit = () => {
        this.props.onSearch();
    };

    // 重置
    onReset = () => {
        this.props.form.resetFields();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const selectSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="站点"
                        >
                            {getFieldDecorator('site')(
                                <CSelect
                                    placeholder="请选择"
                                    url={API.GET_EBAY_SITE}
                                    params={{ searchColumn: 'site', pageData: 20, pageNumber: 1 }}
                                    code="id"
                                    name="name"
                                    apiListType={2}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="销售账号"
                            className="search_adjustment"
                        >
                            {getFieldDecorator('saleAccount')(
                                <CSelect
                                    placeholder="请选择"
                                    url={API.GET_EBAY_ACCOUNT}
                                    code="id"
                                    name="id"
                                    mode="multiple"
                                    maxCount={10}
                                    apiListType={2}
                                    params={{ searchColumn: 'searchContent' }}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="模板名称"
                        >
                            <div>
                                {getFieldDecorator('templateName', {
                                    rules: [{
                                        required: false,
                                        message: '请输入',
                                    }],
                                })(
                                    <InputSearch
                                        placeholder="请输入"
                                        enterButton="搜索"
                                        style={{ width: 180 }}
                                        onSearch={this.onSubmit}
                                    />,
                                )}
                                <Button
                                    type="default"
                                    onClick={() => this.onReset()}
                                    className="search_adjustment_button"
                                >
                                    重置
                                </Button>
                            </div>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        // const textSearch = this.state.isSearch ? (
        //     <div className="list-filter-item-templateName" style={{ margin: '10px 0' }}>
        //         <div className="list-filter-item">
        //             <div className="list-filter-item-title list-filter-item-title-width">模板名称：</div>
        //             <div className="list-filter-input">
        //                 <FormItem>
        //                     {getFieldDecorator('templateName')(
        //                         <Input placeholder="支持模糊搜索" style={{ width: 330 }} />,
        //                     )}
        //                 </FormItem>
        //             </div>
        //         </div>
        //     </div>
        // ) : null;
        //
        // const heightSearch = this.state.isHightSearch ? (
        //     <div className="height-search margin-ss-top margin-ss-left">
        //         <div className="list-filter-item">
        //             <div className="list-filter-item-title list-filter-item-title-width">站点：</div>
        //             <div className="list-filter-input">
        //                 <FormItem>
        //                     <ItemSelect
        //                         getFieldDecorator={getFieldDecorator}
        //                         formName="site"
        //                         name="name"
        //                         code="id"
        //                         searchColumn="site"
        //                         params={{ pageData: 20, pageNumber: 1 }}
        //                         url={types.PUBLISH_EBAYSITE}
        //                         mode="multiple" // 是否支持多选
        //                         apiListType={2}
        //                     />
        //                 </FormItem>
        //             </div>
        //         </div>
        //         <div className="list-filter-item margin-sm-top">
        //             <div className="list-filter-item-title list-filter-item-title-width">销售账号：</div>
        //             <div className="list-filter-input">
        //                 <FormItem>
        //                     <ItemSelect
        //                         getFieldDecorator={getFieldDecorator}
        //                         formName="saleAccount"
        //                         name="id"
        //                         code="id"
        //                         searchColumn="saleAccount"
        //                         params={{ pageData: 20, pageNumber: 1 }}
        //                         url={types.PUBLISH_EBAYACCOUNT}
        //                         mode="multiple" // 是否支持多选
        //                         maxCount={10} // 最大可选数  配合  multiple使用
        //                         apiListType={2}
        //                     />
        //                 </FormItem>
        //             </div>
        //         </div>
        //     </div>
        // ) : null;
        // const btnSearch = this.state.isSearch ? (
        //     <div className="btn-search padding-sm-bottom margin-ss-left">
        //         <Button type="primary" htmlType="submit">搜索</Button>
        //         <Button onClick={this.onReset}>重置</Button>
        //         <Button type="default" onClick={this.onChangeHightSearch}>
        //             {
        //                 this.state.isHightSearch ? '取消高级搜索' : '高级搜索'
        //             }
        //         </Button>
        //     </div>
        // ) : null;

        return (
            <div className="search overflow-hidden publish-ebay-temp">
                <Form layout="inline">
                    <div className="select-type">
                        {selectSearch}
                    </div>
                </Form>
            </div>
        );
    }
}

export default Search;
