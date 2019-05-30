/**
 * 作者: 陈林
 * 描述: 付款弹窗
 * 时间: 2018/8/3 0003 下午 7:07
 * @param
 **/
import React from 'react'
import {AutoComplete, Form, Select,Modal,Input,Button,Radio,message} from "antd";
import ItemSelect from '../../../../../common/components/itemSelect'
import * as types from "../../../../common/constants/actionTypes";
import {ADD_ORUPDATE_PUBLISH_TEMPL, GET_PUBLISH_TEMPL_DETAIL} from '../../constants/PublishApi'
import { fetchPost } from '../../../../../util/fetch'
const confirm = Modal.confirm
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const AutoCompleteOption = AutoComplete.Option;
class modal extends React.Component{

    state = {
        loading: false,
        siteCode:"",
        site:"",
        saleAccount:"",
        descTemplId:"",
        descTemplName:"",
        shippingProfileId:"",
        shippingProfileName:"",
        returnProfileId:"",
        returnProfileName:"",
        paymentProfileId:"",
        paymentProfileName:""
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.visible&&!this.props.visible){
                        this.props.form.resetFields();
                        this.setState({
                            siteCode:"",
                            site:null,
                            saleAccount:"",
                            templateName:"",
                            isDefault:"",
                            descTemplId:"",
                            descTemplName:"",
                            shippingProfileId:"",
                            shippingProfileName:"",
                            returnProfileId:"",
                            returnProfileName:"",
                            paymentProfileId:"",
                            paymentProfileName:""
                        })
            if(nextProps.item){
                fetchPost(GET_PUBLISH_TEMPL_DETAIL, {publishTemplId:nextProps.item},).then(res=>{
                    if(res && res.state === "000001"){
                        this.props.form.setFieldsValue({
                            'templateName': res.data.templateName,
                            'isDefault': res.data.isDefault,
                            'site': res.data.site,
                            'saleAccount': res.data.saleAccount,
                            "descTemplId":res.data.descTemplId,
                            "shippingProfileId":res.data.shippingProfileId,
                            "returnProfileId":res.data.returnProfileId,
                            "paymentProfileId":res.data.paymentProfileId,
                        })
                        this.setState({
                            siteCode:res.data.siteCode,
                            site:res.data.site,
                            saleAccount:res.data.saleAccount,
                            descTemplId:res.data.descTemplId,
                            descTemplName:res.data.descTemplName,
                            shippingProfileId:res.data.shippingProfileId,
                            shippingProfileName:res.data.shippingProfileName,
                            returnProfileId:res.data.returnProfileId,
                            returnProfileName:res.data.returnProfileName,
                            paymentProfileId:res.data.paymentProfileId,
                            paymentProfileName:res.data.paymentProfileName,
                            publishTemplId:nextProps.item
                        })
                    }
                });
            }
        }
    }
    //站点
    handSite = () =>{
        this.props.form.setFieldsValue({"descTemplId": "","shippingProfileId":"","returnProfileId":"","paymentProfileId":""});
    }
    //销售账号
    handSaleAccount = () =>{
        this.props.form.setFieldsValue({"descTemplId": "","shippingProfileId":"","returnProfileId":"","paymentProfileId":""});
    }

    //弹窗提交
    handleOk = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err){
                try {
                    var arr = Object.keys(err)
                    var errMessage = err[arr[0]].errors[0].message
                    return message.warning(errMessage)
                }catch(error){
                    message.warning("请核实必填字段是否填写")
                }
                return
            }
            if (!err) {
                this.setState({
                    loading:true
                });
                const params = {...values};
                if(this.props.item){
                    params.publishTemplId = this.state.publishTemplId;
                }
                fetchPost(ADD_ORUPDATE_PUBLISH_TEMPL, params,1).then(res=>{
                    if(res && res.state === "000001"){
                        this.props.onCancel();
                        this.props.form.resetFields();
                        this.props.onSearch()
                        this.setState({
                            loading: false
                        })
                    }else{
                        this.setState({
                            loading: false
                        })
                    }
                });
            }
        });
    }

    filterDataHandle = (list)=>{
        const obj = {}
        const newList = []
        list.forEach(v=>{
            if(!obj[v.tempId]){
                obj[v.tempId] = true
                newList.push(v)
            }
        })
        return newList
    }

    render(){
        const {visible,onCancel,item} = this.props;
        const { getFieldDecorator, } = this.props.form;
        const {descTemplName,shippingProfileName,returnProfileName, paymentProfileName,descTemplId,shippingProfileId,returnProfileId,paymentProfileId} = this.state;
        const loading = this.state.loading;
        let title
        if(item){
            title = "编辑"
        }else{
            title = "新增"
        }
        const { site,saleAccount } = this.props.form.getFieldsValue(['site', 'saleAccount',]);
        return(
            <div>
                <Modal {...this.props}
                       title={title}
                       visible={visible}
                       footer={[
                           <Button key="cancel" onClick={onCancel}>取消</Button>,
                           <Button key="save" type="primary" onClick={() => this.handleOk()} loading={loading}>保存</Button>,
                       ]}
                >
                    <div className="product-description publich-modal">
                        <div className="list-filter-item">
                            <div className="list-filter-item-title list-filter-item-title_required">站点:</div>
                            <div className="list-filter-input">
                                <FormItem>
                                    <ItemSelect
                                        getFieldDecorator={getFieldDecorator}
                                        formName='site'
                                        name="name"
                                        code="id"
                                        searchColumn="site"
                                        params={{'pageData': 20, 'pageNumber': 1}}
                                        url={types.PUBLISH_EBAYSITE}
                                        dValue={this.state.site}
                                        dName={this.state.siteCode}
                                        placeholder={"请选择站点"}
                                        disabled={item ? true :false}
                                        onChange={(e)=>this.handSite(e)}
                                        rules={{
                                            initialValue:undefined,
                                            rules: [{
                                                required: true, message: '请选择站点',
                                            }],
                                        }}
                                        apiListType={2}
                                    />
                                </FormItem>
                            </div>
                        </div>
                        <div className="list-filter-item margin-sm-top">
                            <div className="list-filter-item-title list-filter-item-title_required">销售账号:</div>
                            <div className="list-filter-input">
                                <FormItem>
                                    <ItemSelect
                                        getFieldDecorator={getFieldDecorator}
                                        formName='saleAccount'
                                        name="id"
                                        code="id"
                                        searchColumn="saleAccount"
                                        params={{'pageData': 20, 'pageNumber': 1}}
                                        url={types.PUBLISH_EBAYACCOUNT}
                                        dValue={this.state.saleAccount}
                                        dName={this.state.saleAccount}
                                        placeholder={"请选择销售账号"}
                                        disabled={item ? true :false}
                                        onChange={(e)=>this.handSaleAccount(e)}
                                        rules={{
                                            initialValue: undefined,
                                            rules: [{
                                                required: true, message: '请选择销售账号',
                                            }],
                                        }}
                                        apiListType={2}
                                    />
                                </FormItem>
                            </div>
                        </div>
                        <div className="list-filter-item margin-sm-top">
                            <div className="list-filter-item-title list-filter-item-title_required">模板名称:</div>
                            <div className="list-filter-input">
                                <FormItem>
                                    {getFieldDecorator('templateName', {
                                         initialValue:'',
                                        rules: [{ required: true, message: '模板名称不能为空!' }],
                                    })(
                                        <TextArea
                                            placeholder="模糊搜索"
                                            style={{ width: 360,height:32 }}
                                            maxLength="80"
                                        />
                                    )}
                                </FormItem>
                            </div>
                        </div>
                        <div className="list-filter-item margin-ss-top">
                            <div className="list-filter-item-title list-filter-item-title_required">是否默认:</div>
                            <div className="list-filter-input">
                                <FormItem >
                                    {getFieldDecorator('isDefault', {
                                        initialValue:'',
                                    })(
                                        <RadioGroup>
                                            是<Radio value={1}></Radio>
                                            否<Radio value={0}></Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            </div>
                        </div>

                        <div className="list-filter-item margin-ss-top">
                            <div className="list-filter-item-title">描述模板:</div>
                            <div className="list-filter-input">
                                <FormItem>
                                    <ItemSelect
                                        getFieldDecorator={getFieldDecorator}
                                        disabled={site && saleAccount ? false : true}
                                        formName='descTemplId'
                                        name="name"
                                        code="tempId"
                                        searchColumn="descTemplId"
                                        params={{"site":[site],"saleAccount":[saleAccount],'pageData': 10000, 'pageNumber': 1}}
                                        url={types.GET_DESCRIPTION_TEMPLATE}
                                        dValue={[descTemplId]}
                                        dName={[descTemplName]}
                                        placeholder={"请选择描述模板"}
                                        rules={{
                                            initialValue:undefined,
                                        }}
                                        apiListType={1}
                                    />
                                </FormItem>
                            </div>
                        </div>
                        <div className="list-filter-item margin-sm-top">
                            <div className="list-filter-item-title list-filter-item-title_required">运输模板:</div>
                            <div className="list-filter-input">
                                <FormItem>
                                    <ItemSelect
                                        disabled={site && saleAccount ? false : true}
                                        getFieldDecorator={getFieldDecorator}
                                        formName='shippingProfileId'
                                        name="name"
                                        code="tempId"
                                        searchColumn="shippingProfileId"
                                        params={{"site":[site],"saleAccount":[saleAccount],'pageData': 10000, 'pageNumber': 1}}
                                        url={types.GET_TRANSPORT_TEMPLATE}
                                        dName={[shippingProfileName]}
                                        dValue={[shippingProfileId]}
                                        placeholder={"请选择运输模板"}
                                        rules={{
                                            initialValue:undefined,
                                            rules: [{
                                                required: true, message: '请选择运输模板',
                                            }],
                                        }}
                                        apiListType={1}
                                    />
                                </FormItem>
                            </div>
                        </div>
                        <div className="list-filter-item margin-sm-top">
                            <div className="list-filter-item-title list-filter-item-title_required">退货模板:</div>
                            <div className="list-filter-input">
                                <FormItem>
                                    <ItemSelect
                                        filterDataHandle={this.filterDataHandle}
                                        disabled={site && saleAccount ? false : true}
                                        getFieldDecorator={getFieldDecorator}
                                        formName='returnProfileId'
                                        name="name"
                                        code="tempId"
                                        searchColumn="returnProfileId"
                                        params={{"site":[site],"saleAccount":[saleAccount],'pageData': 10000, 'pageNumber': 1}}
                                        url={types.GET_RETURN_TEMPLATE}
                                        dValue={[returnProfileId]}
                                        dName={[returnProfileName]}
                                        placeholder={"请选择退货模板"}
                                        rules={{
                                            initialValue:undefined,
                                            rules: [{
                                                required: true, message: '请选择退货模板',
                                            }],
                                        }}
                                        apiListType={1}
                                    />
                                </FormItem>
                            </div>
                        </div>
                        <div className="list-filter-item margin-sm-top">
                            <div className="list-filter-item-title list-filter-item-title_required">付款模板:</div>
                            <div className="list-filter-input">
                                <FormItem>
                                    <ItemSelect
                                        disabled={site && saleAccount ? false : true}
                                        getFieldDecorator={getFieldDecorator}
                                        formName='paymentProfileId'
                                        name="name"
                                        code="tempId"
                                        searchColumn="paymentProfileId"
                                        params={{"site":[site],"saleAccount":[saleAccount],'pageData': 10000, 'pageNumber': 1}}
                                        url={types.GET_PAYMENT_TEMPLATE}
                                        dName={[paymentProfileName]}
                                        dValue={[paymentProfileId]}
                                        placeholder={"请选择付款模板"}
                                        rules={{
                                            initialValue:undefined,
                                            rules: [{
                                                required: true, message: '请选择付款模板',
                                            }],
                                        }}
                                        apiListType={1}
                                    />
                                </FormItem>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(modal)
