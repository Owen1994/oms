import React, { Component } from 'react';
import {
    Form,
    Radio,
    Input,
    Button,
    Select, Row, Col,
} from 'antd';
import StandardFormRow from '../../../../common/components/advancedSearchModel/StandardFormRow'
import ItemSelect from '../../../../common/components/itemSelect'
import TagSelect from '../../../../common/components/advancedSearchModel/TagSelect'
import '../../template/css/newSearch.css'
import * as types from "../../../common/constants/actionTypes";
import { STATUS_DEFAULT } from "../../template/constants/PublishApi";
import CSelect from "../../../../components/cselect";

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
const InputSearch = Input.Search;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: [],            // 申报主体
            isSearch: false,        // 是否切换搜索
            isHightSearch: false,    // 是否切换高级搜索
        };
    }

    // // 筛选、搜索切换
    // onChangeSearch = (event) => {
    //     if (event.target.value === 'search') {
    //         this.setState({
    //             isSearch: true,
    //             isHightSearch: false,
    //         });
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
    //         this.setState({ isHightSearch: true })
    //     } else {
    //         this.setState({ isHightSearch: false })
    //     }
    // }

    // 条件筛选
    handleFormSubmit = (param, name) => {
        this.props.form.setFieldsValue({
            [name]: param
        })
        this.props.onSearch()
    }

    // 全局搜索
    onSubmit = () => {
        this.props.getStateChange({
            selectedRowKeys: []
        })
        this.props.onSearch()
    }

    componentDidMount() {

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { tagSelectParams, resetFields } = this.props;

        // const defaultSearch = (
        //     <div className="default-search margin-ss-top margin-ss-bottom cl-list-filter-input">
        //         <div className="list-filter-item" style={{marginRight:"130px"}}>
        //             <div className="list-filter-item-title list-filter-item-title-width">是否默认：</div>
        //             <div className="list-filter-input">
        //                 <FormItem>
        //                     {getFieldDecorator('isDefault')(
        //                         <TagSelect
        //                             isMulti={false}
        //                             onChange={this.handleFormSubmit}
        //                             values = {tagSelectParams.isDefault}
        //                             datas={STATUS_DEFAULT}
        //                             name='isDefault'
        //                         />
        //                     )}
        //                 </FormItem>
        //             </div>
        //         </div>
        //     </div>
        // );
        // const textSearch = this.state.isSearch ? (
        //     <div className="list-filter-item-templateName" style={{margin: '10px 0'}}>
        //         <div className="list-filter-item margin-template-left">
        //             <div className="list-filter-item-title list-filter-item-title-width">模板名称：</div>
        //             <div className="list-filter-input">
        //                 <FormItem>
        //                     {getFieldDecorator('templateName')(
        //                         <Input placeholder="支持模糊搜索" style={{ width: 330 }} />
        //                     )}
        //                 </FormItem>
        //             </div>
        //         </div>
        //     </div>
        // ) : null;

        // const heightSearch = this.state.isHightSearch ? (
        //     <div className="height-search margin-ss-top margin-ss-left">
        //         <div className="list-filter-item margin-template-left">
        //             <div className="list-filter-item-title list-filter-item-title-width">站点：</div>
        //                 <div className="list-filter-input">
        //                     <FormItem>
        //                         <ItemSelect
        //                             getFieldDecorator={getFieldDecorator}
        //                             formName='site'
        //                             name="name"
        //                             code="id"
        //                             searchColumn="site"
        //                             params={{'pageData': 20, 'pageNumber': 1}}
        //                             url={types.PUBLISH_EBAYSITE}
        //                             apiListType={2}
        //                         />
        //                     </FormItem>
        //                 </div>
        //         </div>
        //         <div className="list-filter-item  margin-sm-top margin-template-left">
        //             <div className="list-filter-item-title list-filter-item-title-width">销售账号：</div>
        //                  <div className="list-filter-input">
        //                     <FormItem>
        //                         <ItemSelect
        //                             getFieldDecorator={getFieldDecorator}
        //                             formName='saleAccount'
        //                             name="id"
        //                             code="id"
        //                             searchColumn="saleAccount"
        //                             params={{'pageData': 20, 'pageNumber': 1}}
        //                             url={types.PUBLISH_EBAYACCOUNT}
        //                             mode='multiple' // 是否支持多选
        //                             maxCount={10}  // 最大可选数  配合  multiple使用
        //                             apiListType={2}
        //                         />
        //                     </FormItem>
        //                  </div>
        //         </div>
        //     </div>
        // ) : null;
        // const btnSearch = this.state.isSearch ? (
        //     <div className="btn-search padding-sm-bottom margin-ss-left publish-isHightSearch">
        //         <Button type="primary" htmlType="submit">搜索</Button>
        //         <Button onClick={resetFields}>重置</Button>
        //         <Button type="default" onClick={this.onChangeHightSearch}>
        //             {
        //                 this.state.isHightSearch ? '取消高级搜索' : '高级搜索'
        //             }
        //         </Button>
        //     </div>
        // ) : null;
        const selectSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="是否默认"
                        >
                            {getFieldDecorator('isDefault', {
                                initialValue: -1
                            })(
                                <CSelect
                                    code="id"
                                    name="name"
                                    list={STATUS_DEFAULT}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="站点"
                        >
                            <ItemSelect
                                getFieldDecorator={getFieldDecorator}
                                formName='site'
                                name="name"
                                code="id"
                                searchColumn="site"
                                params={{ 'pageData': 20, 'pageNumber': 1 }}
                                url={types.PUBLISH_EBAYSITE}
                                apiListType={2}
                            />
                        </FormItem>
                    </Col>

                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="销售账号"
                            className="search_adjustment"
                        >
                            <ItemSelect
                                getFieldDecorator={getFieldDecorator}
                                formName='saleAccount'
                                name="id"
                                code="id"
                                searchColumn="saleAccount"
                                params={{ 'pageData': 20, 'pageNumber': 1 }}
                                url={types.PUBLISH_EBAYACCOUNT}
                                mode='multiple' // 是否支持多选
                                maxCount={10}  // 最大可选数  配合  multiple使用
                                apiListType={2}
                            />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="模板名称"
                            className="search_adjustment"
                        >
                            <div style={{ display: 'flex' }}>
                                {getFieldDecorator('templateName', {
                                    rules: [{
                                        required: false,
                                        message: '请输入',
                                    }],
                                })(
                                    <InputSearch
                                        placeholder="请输入"
                                        enterButton="搜索"
                                        onSearch={this.onSubmit}
                                    />,
                                )}
                                <Button
                                    onClick={resetFields}
                                    className="search_adjustment_button margin-ss-left"
                                >
                                    重置
                                </Button>
                            </div>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        return (
            <div className="search  overflow-hidden publish-ebay-temp white">
                {/*<div className="search-tab">*/}
                {/*<RadioGroup*/}
                {/*defaultValue="select"*/}
                {/*onChange={this.onChangeSearch}*/}
                {/*>*/}
                {/*<RadioButton value="select">筛选</RadioButton>*/}
                {/*<RadioButton value="search">搜索</RadioButton>*/}
                {/*</RadioGroup>*/}
                {/*</div>*/}
                <Form layout="inline">
                    <div className="select-type">
                        {selectSearch}
                    </div>
                    {/*{defaultSearch}*/}
                    {/*{textSearch}*/}
                    {/*{heightSearch}*/}
                    {/*{btnSearch}*/}
                </Form>
            </div>
        );
    }
}

export default Search;