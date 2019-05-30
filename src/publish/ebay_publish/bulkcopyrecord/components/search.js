/**
 * 作者: 陈文春
 * 描述: 批量复制搜索组件
 * 时间: 2018年9月3日08:33:16
 * */
import React from 'react';
import {
    Form,
    Input,
    Button,
    // Radio,
    Row, Col,
} from 'antd';
// import StandardFormRow from '../../../../components/StandardFormRow';
// import ItemSelect from '../../../../common/components/itemSelect';
// import RadioTags from '../../../../common/components/radiotags';
import { cpStatus } from '../constants';
import * as API from '../../../common/constants/Api';
import { strTrim } from '../../../../util/baseTool';
import ItemSelect from '../../../../common/components/itemSelect';
import CSelect from '../../../../components/cselect';

const FormItem = Form.Item;
// const RadioButton = Radio.Button;
// const RadioGroup = Radio.Group;

const InputSearch = Input.Search;

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // isHeightSearch: false,
            // isShowSearch: false,
        };
    }

    // // 高级搜索
    // showHeightSearch = () => {
    //     this.setState({ isHeightSearch: !this.state.isHeightSearch });
    // };

    // // 搜索筛选切换
    // onChangeSearch = (event) => {
    //     if (event.target.value === 'select') {
    //         this.setState({ isShowSearch: false });
    //         this.setState({ isHeightSearch: false });
    //     } else {
    //         this.setState({ isShowSearch: true });
    //     }
    // };

    // 操作人员失去焦点过滤前后空格
    handleBlur = (e) => {
        this.props.form.setFieldsValue({ creator: strTrim(e.target.value) });
    };

    // 重置
    resetFields = () => {
        this.props.form.resetFields();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { handleSubmit } = this.props;
        const selectSearch = (
            <div className="selectSearch ">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="处理状态"
                        >
                            {getFieldDecorator('cpStatus', {
                                initialValue: -1
                            })(
                                <CSelect
                                    list={cpStatus}
                                    code="id"
                                    name="name"
                                    placeholder="请选择"
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="站点"
                        >
                            <ItemSelect
                                getFieldDecorator={getFieldDecorator}
                                formName="siteId"
                                url={API.GET_EBAY_SITE}
                                code="id"
                                name="name"
                                apiListType={2}
                            />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="销售账号"
                            className="search_adjustment"
                        >
                            <ItemSelect
                                getFieldDecorator={getFieldDecorator}
                                formName="sellerIdArr"
                                url={API.GET_EBAY_ACCOUNT}
                                code="id"
                                name="id"
                                mode="multiple"
                                maxCount={10}
                                apiListType={2}
                                searchColumn="searchContent"
                            />
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        const typeSearch = (
            <div className="typeSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="操作人员"
                            className="search_adjustment"
                        >
                            <div style={{ display: 'flex' }}>
                                {getFieldDecorator('creator', {
                                    rules: [{
                                        required: false,
                                        message: '请输入',
                                    }],
                                })(
                                    <InputSearch
                                        placeholder="请输入"
                                        enterButton="搜索"
                                        onSearch={() => handleSubmit()}
                                        onBlur={this.handleBlur}
                                    />,
                                )}
                                <Button
                                    className="margin-ss-left"
                                    onClick={() => this.resetFields()}
                                >
                                    重置
                                </Button>
                            </div>
                        </FormItem>
                    </Col>

                </Row>
            </div>
        );
        // const defaultSearch = (
        //     <div className="record-defaultSearch">
        //         <StandardFormRow title="处理状态">
        //             <FormItem>
        //                 <RadioTags
        //                     getFieldDecorator={getFieldDecorator}
        //                     onChange={() => handleSubmit()}
        //                     list={cpStatus}
        //                     name='cpStatus'
        //                 />
        //             </FormItem>
        //         </StandardFormRow>
        //     </div>
        // );
        // const searchTab = (
        //     <div className="record-searchTab">
        //         <RadioGroup
        //             defaultValue="select"
        //             onChange={this.onChangeSearch}
        //         >
        //             <RadioButton value="select">筛选</RadioButton>
        //             <RadioButton value="search">搜索</RadioButton>
        //         </RadioGroup>
        //     </div>
        // );
        // const textSearch = this.state.isShowSearch ? (
        //     <div className="record-textSearch">
        //         <StandardFormRow title="操作人员">
        //             <FormItem>
        //                 {getFieldDecorator('creator')(
        //                     <Input style={{ width: 344 }} onBlur={this.handleBlur} />,
        //                 )}
        //             </FormItem>
        //         </StandardFormRow>
        //     </div>
        // ) : null;
        // const heightSearch = this.state.isHeightSearch ? (
        //     <div className="record-heightSearch">
        //         <StandardFormRow title="站点">
        //             <FormItem>
        //                 <div style={{ width: '344px' }}>
        //                     <ItemSelect
        //                         getFieldDecorator={getFieldDecorator}
        //                         formName="siteId"
        //                         url={API.GET_EBAY_SITE}
        //                         code="id"
        //                         name="name"
        //                         apiListType={2}
        //                     />
        //                 </div>
        //             </FormItem>
        //         </StandardFormRow>
        //         <StandardFormRow title="销售账号">
        //             <FormItem>
        //                 <div style={{ width: '344px' }}>
        //                     <ItemSelect
        //                         getFieldDecorator={getFieldDecorator}
        //                         formName="sellerIdArr"
        //                         url={API.GET_EBAY_ACCOUNT}
        //                         code="id"
        //                         name="id"
        //                         mode="multiple"
        //                         maxCount={10}
        //                         apiListType={2}
        //                         searchColumn="searchContent"
        //                     />
        //                 </div>
        //             </FormItem>
        //         </StandardFormRow>
        //     </div>
        // ) : null;
        // const searchBtn = this.state.isShowSearch ? (
        //     <div className="record-searchBtn">
        //         <Button type="primary" onClick={() => handleSubmit()}>搜索</Button>
        //         <Button onClick={this.resetFields}>重置</Button>
        //         <Button onClick={this.showHeightSearch}>
        //             {
        //                 this.state.isHeightSearch ? '取消高级搜索' : '高级搜索'
        //             }
        //         </Button>
        //     </div>
        // ) : null;
        return (
            <div className="record-search">
                <div className="select-type">
                    {selectSearch}
                    {typeSearch}
                    {/* {searchTab} */}
                    {/* {defaultSearch} */}
                    {/* {textSearch} */}
                    {/* {heightSearch} */}
                    {/* {searchBtn} */}
                </div>
            </div>
        );
    }
}
