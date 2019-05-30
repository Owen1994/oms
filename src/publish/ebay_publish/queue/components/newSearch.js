/**
 * 作者: 陈林
 * 描述:库存价格队列搜索组件
 * 时间: 2018/7/30 0030 上午 11:21
 * @param
 **/
import React,{ Component } from 'react'
import { Form, Radio, Input, Button, message, Select, DatePicker,Row,Col } from 'antd';
import StandardFormRow from '../../../../common/components/advancedSearchModel/StandardFormRow'
import TagSelect from '../../../../common/components/advancedSearchModel/TagSelect'
import {STATUS_EDITTYPE,STATUS_SYNCSTATE} from "../constants/index";
import '../css/newSearch.css'
import moment from 'moment';
import {getrangetime} from 'util/baseTool';
// import Ctags from '../../../../components/ctags';
import CSelect from '../../../../components/cselect';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const Search = Input.Search;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class newSearch extends Component{

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         isSearch: false,        // 是否切换搜索
    //         isHightSearch: false,    // 是否切换高级搜索
    //     };
    // }

    componentDidMount () {
        this.setDefaultTime();
    }

    // 设置默认时间
    setDefaultTime = () => {
        const { setFieldsValue } = this.props.form;
        const times = getrangetime(5);
        const momentData = [moment(times.start),moment(times.end)]
        setFieldsValue({ "syncTime": momentData });
    }

    // 筛选、搜索切换
    // onChangeSearch = (event) => {
    //     if (event.target.value === 'select') {
    //         this.setState({ isSearch: false });
    //         this.setState({ isHightSearch: false });
    //     } else {
    //         this.setState({ isSearch: true });
    //     }
    // }

    // 高级搜索
    // onChangeHightSearch = () => {
    //     if (this.state.isHightSearch === false) {
    //         this.setState({ isHightSearch: true }, () => {
    //             this.setDefaultTime();
    //         });
    //     } else {
    //         this.setState({ isHightSearch: false })
    //     }
    // }

    // 条件筛选
    // handleFormSubmit = (param, name) => {
    //     this.props.form.setFieldsValue({
    //         [name]: param
    //     })
    //     this.props.listFetch()
    // }


    // 全局搜索
    // onSubmit = (event) => {
    //     event.preventDefault()
    //     this.props.listFetch()
    // }

    // handleSelect = (value, type)=>{
    //     if(type === "saleAccount"){
    //         if(value.length > 10){
    //             message.warning("最多只能选择10个销售账号！");
    //             delete value[value.length-1];
    //         }
    //     }
    // }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { resetFields,tagSelectParams,ebayAccountData,ebaySiteData} = this.props;
        const ebaySiteDataList = ebaySiteData || [];
        const ebayAccountDataList = ebayAccountData || [];
        // const defaultSearch = (
        //     <div className="default-search">
        //         <StandardFormRow title="修改类型：">
        //             <FormItem>
        //                 {getFieldDecorator('editType', {
        //                     initialValue: [0]
        //                 })(
        //                     <TagSelect
        //                         isMulti={false}
        //                         onChange={this.handleFormSubmit}
        //                         values = {tagSelectParams.editType}
        //                         datas={STATUS_EDITTYPE}
        //                         name='editType'
        //                     />
        //                 )}
        //             </FormItem>
        //         </StandardFormRow>
        //         <StandardFormRow title="同步状态：">
        //             <FormItem>
        //                 {getFieldDecorator('syncState', {
        //                     initialValue: [0]
        //                 })(
        //                     <TagSelect
        //                         isMulti={false}
        //                         onChange={this.handleFormSubmit}
        //                         values = {tagSelectParams.syncState}
        //                         datas={STATUS_SYNCSTATE}
        //                         name='syncState'
        //                     />
        //                 )}
        //             </FormItem>
        //         </StandardFormRow>
        //     </div>
        // );
        // const textSearch = this.state.isSearch ? (
        //     <div className="text-search cwc-queue-text-search">
        //         <StandardFormRow title="搜索类型：">
        //             <FormItem>
        //                 {getFieldDecorator('searchType', {
        //                     rules: [{ required: false, message: '请选择' }],
        //                     initialValue: '1',
        //                 })(
        //                     <RadioGroup size="small">
        //                         <RadioButton value="1">Item ID</RadioButton>
        //                         <RadioButton value="2">Seller SKU</RadioButton>
        //                         <RadioButton value="3">同步人员</RadioButton>
        //                     </RadioGroup>
        //                 )}
        //             </FormItem>
        //         </StandardFormRow>
        //         <StandardFormRow title="搜索内容：">
        //             <FormItem>
        //                 {getFieldDecorator('searchContent')(
        //                     <TextArea placeholder="支持多个换行精确搜索" style={{ width: 344 }} autosize={{ minRows: 2, maxRows: 6 }} />
        //                 )}
        //             </FormItem>
        //         </StandardFormRow>
        //     </div>
        // ) : null;

        // const heightSearch = this.state.isHightSearch ? (
        //     <div className="height-search">
        //         <StandardFormRow title="站点：">
        //             <FormItem>
        //                 {getFieldDecorator('site')(
        //                     <Select
        //                         showSearch
        //                         mode="multiple"
        //                         onChange={(value)=>this.handleSelect(value, "siteAccount")}
        //                         style={{ width: 344 }}
        //                         placeholder="请选择"
        //                         optionFilterProp="children"
        //                         filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        //                     >
        //                         {ebaySiteDataList.map((v,i)=>{
        //                             return <Option value={v.id} key={i} >{v.name}</Option>
        //                         })}
        //                     </Select>
        //                 )}
        //             </FormItem>
        //         </StandardFormRow>
        //         <StandardFormRow title="销售账号：">
        //             <FormItem>
        //                 {getFieldDecorator('saleAccount')(
        //                     <Select
        //                         showSearch
        //                         mode="multiple"
        //                         onChange={(value)=>this.handleSelect(value, "saleAccount")}
        //                         style={{ width: 344 }}
        //                         placeholder="请选择"
        //                         optionFilterProp="children"
        //                         filterOption={(input, option) => {
        //                             if(!option.props.children) return false
        //                             return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        //                         }}
        //                     >
        //                         {ebayAccountDataList.map((v,i)=>{
        //                             return <Option value={v.id} key={i} >{v.id}</Option>
        //                         })}
        //                     </Select>
        //                 )}
        //             </FormItem>
        //         </StandardFormRow>
        //         <StandardFormRow title="同步时间：">
        //             <FormItem>
        //                 {getFieldDecorator('syncTime')(
        //                     <RangePicker
        //                         showTime={{
        //                             hideDisabledOptions: true,
        //                             defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
        //                         }}
        //                         format="YYYY/MM/DD HH:mm:ss"
        //                         placeholder={['开始日期', '结束日期']}
        //                         style={{ width: 344 }}
        //                     />
        //                 )}
        //             </FormItem>
        //         </StandardFormRow>
        //     </div>
        // ) : null;
        // const btnSearch = this.state.isSearch ? (
        //     <div className="btn-search">
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
                            label="修改类型"
                        >
                            {getFieldDecorator('editType',
                            {
                                initialValue: 0
                            })(
                                <CSelect
                                    list={STATUS_EDITTYPE} // 默认值列
                                    code='id' // 列表编码字段
                                    name='name' // 列表名称字段
                                    // url={API.GET_EBAY_SITE}
                                    // mode='multiple' // 是否多选
                                    // maxCount={3} // 最多选择项数量
                                    // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                    params={{ searchColumn: 'name', pageData: 50, pageNumber: 1 }} // 搜索参数
                                    apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder={'请选择'}
                                    handleChange={this.handleSiteChange} // 触发下拉事件
                                    localSearch={1}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="站点"
                            className="search_adjustment"
                        >
                            {getFieldDecorator('site')(
                                <CSelect
                                    // list={LOGISTICS_BUSINESS} // 默认值列
                                    code='id' // 列表编码字段
                                    name='name' // 列表名称字段
                                    url='/pls/ebay/motan/service/api/IEbayService/ebaySite'
                                    params={{ searchColumn: 'name', pageData: 20, pageNumber: 1, }} // 搜索参数
                                    // formType={1}
                                    localSearch={1}
                                    apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder={'请选择(多选)'}
                                    mode='multiple' // 是否多选
                                    // handleChange={this.handleChange} // 触发下拉事件
                                />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="同步时间"
                        >
                           {getFieldDecorator('syncTime')(
                                <RangePicker
                                    showTime={{
                                        hideDisabledOptions: true,
                                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                    }}
                                    format="YYYY/MM/DD HH:mm:ss"
                                    placeholder={['开始日期', '结束日期']}
                                    style={{ width: '100%' }}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem label="同步状态"
                        >
                            {getFieldDecorator('syncState',
                            {
                                initialValue: 0
                            })(
                                <CSelect
                                    list={STATUS_SYNCSTATE} // 默认值列
                                    code='id' // 列表编码字段
                                    name='name' // 列表名称字段
                                    // url={API.GET_EBAY_SITE}
                                    // mode='multiple' // 是否多选
                                    // maxCount={3} // 最多选择项数量
                                    // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                    params={{ searchColumn: 'name', pageData: 50, pageNumber: 1 }} // 搜索参数
                                    apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder={'请选择'}
                                    handleChange={this.handleSiteChange} // 触发下拉事件
                                    localSearch={1}
                                />
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
                                    // list={LOGISTICS_BUSINESS} // 默认值列
                                    code='id' // 列表编码字段
                                    name='id' // 列表名称字段
                                    url='/pls/ebay/motan/service/api/IEbayService/ebayAccount'
                                    params={{ searchColumn: 'name', pageData: 20, pageNumber: 1, }} // 搜索参数
                                    // formType={1}
                                    maxCount={10} // 最多选择项数量
                                    localSearch={1}
                                    apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder={'请选择(多选)'}
                                    mode='multiple' // 是否多选
                                    // handleChange={this.handleChange} // 触发下拉事件
                                />
                                )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        const typeSearch = (
            <div className="typeSearch">
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <div className="typeSearch-l">
                            <FormItem label="搜索内容"
                            >
                                {getFieldDecorator('searchType', {
                                    initialValue: 1,
                                })(
                                    <RadioGroup size="small">
                                        <Radio value={1}>Item ID</Radio>
                                        <Radio value={2}>Seller SKU</Radio>
                                        <Radio value={3}>同步人员</Radio>
                                    </RadioGroup>
                                    )}
                            </FormItem>
                            <div className="typeSearch-r" style={{left: "365px"}}>
                                {getFieldDecorator('searchContent', {
                                        rules: [{
                                            required: false,
                                            message: `请输入`
                                        }],
                                    })(
                                        <Search
                                            placeholder="双击可批量查询"
                                            enterButton="搜索"
                                            size="large"
                                            style={{ width: 280 }}
                                            onDoubleClick={() => this.props.toggleModal()}
                                            onSearch={() => this.props.listFetch()}
                                        />
                                    )}
                                     <Button
                                         onClick={() =>this.props.resetFields()}
                                         className="search_adjustment_button margin-ss-left"
                                     >
                                        重置
                                    </Button>
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>
        );


        return (
            <div className="search breadcrumb overflow-hidden">
                {/* <div className="search-tab">
                    <RadioGroup
                        defaultValue="select"
                        onChange={this.onChangeSearch}
                    >
                        <RadioButton value="select">筛选</RadioButton>
                        <RadioButton value="search">搜索</RadioButton>
                    </RadioGroup>
                </div> */}
                <Form>
                    <div className="select-type">
                        {selectSearch}
                        {/* {defaultSearch} */}
                        {typeSearch}
                        {/* {textSearch} */}
                        {/* {heightSearch} */}
                        {/* {btnSearch} */}
                    </div>
                </Form>
            </div>
        );
    }
}

export default   newSearch
