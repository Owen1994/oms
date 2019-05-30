import React, {Component} from 'react' //在文件头部从 react 的包当中引入了 React 和 React.js 的组件父类 Component。写 React.js 组件，必须引入这两个东西。
import {render} from 'react-dom' //ReactDOM 可以帮助我们把 React 组件渲染到页面上去
import {connect} from 'react-redux'
import Modalmodel from '../components/Modalmodel'
import {
    Form,
    Input,
    Button,
    Select,
    Row,
    Col,
    Radio,
    DatePicker,
    Checkbox,
    Icon,
} from 'antd'
const FormItem = Form.Item
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { TextArea } = Input;
import {levelOptions} from '../../../util/options';
import {platformsearchaction} from "../actions";
import {closehandle, filterParams, selectValues} from '../../../util/baseTool';
import StandardFormRow from '../../common/searchModel/StandardFormRow';
import TagSelect from '../../common/searchModel/TagSelect';
import {
    DETAIL_CLAIMTYPE,
    DETAIL_STATUS,
    DETAIL_ISREIMOK,
    STATUS_WAREHOUSE,
} from '../../common/searchModel/constants';
class Condition extends Component {

    constructor(props) {
        super(props);
    }

    state={
        isSearch: false,        // 是否切换搜索
    }
    hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

    formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16}
    }
    // 条件筛选
    handleFormSubmit = (param, name) => {
        this.props.form.setFieldsValue({
            [name]: param
        })
        this.customsListFetch()
    }
    customsListFetch =() =>{
        this.props.form.validateFieldsAndScroll((err, values) => {
            const detailvalues={}

            //console.log(values.isReimOk);
            if(values.isReimOk){
                detailvalues.isReimOk=values.isReimOk.toString();
            }
            if(values.processStatus){
                detailvalues.processStatus=values.processStatus.toString();
            }
            if(values.reimType){
                detailvalues.reimType=values.reimType.toString();
            }
            if(this.state.isSearch==true)
            {
                if(values.searchType=="1"){
                    detailvalues.asin=values.searchContent || ""
                    detailvalues.sellerSku=""
                    detailvalues.fnsku=""
                    detailvalues.caseId=""
                }else if(values.searchType=="2")
                {
                    detailvalues.asin=""
                    detailvalues.sellerSku=values.searchContent || "";
                    detailvalues.fnsku=""
                    detailvalues.caseId=""
                }else if(values.searchType=="3")
                {
                    detailvalues.asin=""
                    detailvalues.sellerSku=""
                    detailvalues.fnsku=values.searchContent || "";
                    detailvalues.caseId=""
                }else if(values.searchType=="4")
                {
                    detailvalues.asin=""
                    detailvalues.sellerSku=""
                    detailvalues.fnsku=""
                    detailvalues.caseId=values.searchContent || "";
                }
            }

            detailvalues.reimReportId=this.props.Infos.reimReportId;
            //console.log(detailvalues);
            //var  params = filterParams(detailvalues);
            //console.log(params);
            const filters = { ...this.props.Infos.params, ...detailvalues}
            //console.log(filters);
            const newobj = {}
            newobj.pageData=20;
            newobj.pageNumber=1;
            newobj.searchKey=filters
            this.props.baseInfoForm({params:filters})
            this
                .props
                .fetchPosts({
                    key: 'data',
                    value: newobj
                });
        });
    }
    // 筛选、搜索切换
    onChangeSearch = (event) => {
        if (event.target.value === 'select') {
            const {params}=this.props.Infos

            let filters={
                isReimOk:params.isReimOk,
                processStatus:params.processStatus,
                reimType:params.reimType,
                asin:"",
                sellerSku:"",
                fnsku:"",
                caseId:"",
                reimReportId:params.reimReportId,
            }
            this.props.form.setFieldsValue({searchContent:"",searchType:'1'})
            this.props.baseInfoForm({params:filters});
            this.setState({ isSearch: false });
        } else {

            this.setState({ isSearch: true });
        }
    }

    resetFields= () => {
           let paramss= {
               asin:"",
               sellerSku:"",
               fnsku:"",
               caseId:"",
               isReimOk:"100",
               processStatus:"100",
               reimType:"100"
            }
            this.props.form.setFieldsValue({searchContent:"",searchType:'1',isReimOk:"100",processStatus:"100",reimType:'100'});
            this.props.baseInfoForm({params:paramss})
    }
    handleSubmit= (e) => {
        const or = typeof e == 'object' ? true : false
        or && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            const {params,reimReportId}=this.props.Infos
            const detailvalues={}
            console.log(values);

            if(values.searchType=="1"){
                detailvalues.asin=values.searchContent || ""
                detailvalues.sellerSku=""
                detailvalues.fnsku=""
                detailvalues.caseId=""
            }else if(values.searchType=="2")
            {
                detailvalues.asin=""
                detailvalues.sellerSku=values.searchContent || "";
                detailvalues.fnsku=""
                detailvalues.caseId=""
            }else if(values.searchType=="3")
            {
                detailvalues.asin=""
                detailvalues.sellerSku=""
                detailvalues.fnsku=values.searchContent || "";
                detailvalues.caseId=""
            }else if(values.searchType=="4")
            {
                detailvalues.asin=""
                detailvalues.sellerSku=""
                detailvalues.fnsku=""
                detailvalues.caseId=values.searchContent || "";
            }

            if(values.isReimOk){
                detailvalues.isReimOk=values.isReimOk.toString();
            }else{
                detailvalues.isReimOk="100"
            }
            if(values.processStatus){
                detailvalues.processStatus=values.processStatus.toString();
            }else{
                detailvalues.processStatus="100"
            }
            if(values.reimType){
                detailvalues.reimType=values.reimType.toString();
            }else{
                detailvalues.reimType="100"
            }

            detailvalues.reimReportId=reimReportId
            const newobj = {
                pageData:20,
                pageNumber:1,
                searchKey:detailvalues
            }
            this
                .props
                .fetchPosts({
                    key: 'data',
                    value: newobj
                });
        })


    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {params}=this.props.Infos;
        return (
            <div className="newCluenk claimreportdetailall">
                <div className="margin-ss-top"></div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                <StandardFormRow title="索赔类型 ：">
                    <FormItem>
                        {getFieldDecorator('reimType')(
                            <TagSelect
                                isMulti={false}
                                onChange={this.handleFormSubmit}
                                values = {[params.reimType]}
                                datas={DETAIL_CLAIMTYPE}
                                name='reimType'
                            />
                        )}
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow
                    title="处理状态 ："
                >
                    <FormItem>
                        {getFieldDecorator('processStatus')(
                            <TagSelect
                                isMulti={false}
                                onChange={this.handleFormSubmit}
                                values = {[params.processStatus]}
                                datas={DETAIL_STATUS}
                                name='processStatus'
                            />
                        )}
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow
                    title="赔偿状态 ："
                >
                    <FormItem>
                        {getFieldDecorator('isReimOk')(
                            <TagSelect
                                isMulti={false}
                                onChange={this.handleFormSubmit}
                                values = {[params.isReimOk]}
                                datas={DETAIL_ISREIMOK}
                                name='isReimOk'
                            />
                        )}
                    </FormItem>
                </StandardFormRow>
                <div className="margin-ss-top"></div>
                <div className="search-tab">
                    <RadioGroup
                        defaultValue="select"
                        onChange={this.onChangeSearch}
                    >
                        <RadioButton value="select">筛选</RadioButton>
                        <RadioButton value="search">搜索</RadioButton>
                    </RadioGroup>
                </div>
                {this.state.isSearch ?
                <div className="detail-search">
                    <StandardFormRow title="搜索类型：">
                        <FormItem>
                            {getFieldDecorator('searchType', {
                                rules: [{ required: false, message: '请选择' }],
                                initialValue: '1',
                            })(
                                <RadioGroup size="small">
                                    <RadioButton value="1">ASIN</RadioButton>
                                    <RadioButton value="2">Seller SKU</RadioButton>
                                    <RadioButton value="3">FNSKU</RadioButton>
                                    <RadioButton value="4">问题编号</RadioButton>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </StandardFormRow>
                    <div className="margin-ss-top"></div>
                    <StandardFormRow title="搜索内容：">
                        <FormItem>
                            {getFieldDecorator('searchContent')(
                                <TextArea placeholder="支持多个搜索条件换行精确搜索" style={{ width: 344 }} autosize={{ minRows: 2, maxRows: 6 }} />
                            )}
                        </FormItem>
                    </StandardFormRow>
                    <div className="margin-ms-top"></div>
                    <div className="detail-btn">
                        <Button type="primary" htmlType="submit">搜索</Button>
                        <Button onClick={this.resetFields} className="margin-md-left">重置</Button>
                    </div>
                </div>:null}
                </Form>
            </div>
        );
    }
}

export default Condition