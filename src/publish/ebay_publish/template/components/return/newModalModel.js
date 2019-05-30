/**
 * 作者: 陈林
 * 描述: 付款弹窗
 * 时间: 2018/8/3 0003 下午 7:07
 * @param
 **/
import React from 'react'
import {AutoComplete, Form, Select,Modal,Input,Button,message} from "antd";
import ItemSelect from '../../../../../common/components/itemSelect'
import * as types from "../../../../common/constants/actionTypes";
import {ADD_ORUPDATE_RETURN_TEMPLATE, GET_RETURN_TEMPLATE_DETAIL} from '../../constants/ReturnApi'
import { fetchPost } from '../../../../../util/fetch'
const confirm = Modal.confirm
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;
class modal extends React.Component{

    state = {
        loading: false,
        returnsAcceptedOption:'ReturnsAccepted',
        refundOption:'MoneyBack',
        shippingCostPaidByOption:"Buyer",
        site:"",
        siteCode:"",
        description:"",
        profileName:"",
        returnsWithinOptionId:"",
        returnsWithinOptionName:"",
        shippingCostPaidByOption:""
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.visible&&!this.props.visible){
            this.props.form.resetFields();
            this.setState({
                siteCode:"",
                site:null,
                saleAccount:"",
                profileName:"",
                refundOption:"",
                returnsAcceptedOption:'ReturnsAccepted',
                returnsWithinOptionId:null,
                returnsWithinOptionName:"",
                refundOption:'MoneyBack',
                shippingCostPaidByOption:"Buyer",
                description:""
            })
            if(nextProps.item.plsProfileId){
                fetchPost(GET_RETURN_TEMPLATE_DETAIL, {
                    plsProfileId:nextProps.item.plsProfileId,
                    profileId: nextProps.item.profileId,
                    site: nextProps.item.site,
                    sellerId: nextProps.item.sellerId
                }).then(res=>{
                    if(res && res.state === "000001"){
                        this.props.form.setFieldsValue({
                            'templName': res.data.templName,
                            'site': res.data.site,
                            "saleAccount":res.data.saleAccount,
                            "returnsWithinOptionId":res.data.returnsWithinOptionId,
                        })
                        this.setState({
                            plsProfileId:res.data.plsProfileId,
                            description:res.data.description,
                            profileName:res.data.profileName,
                            refundOption:res.data.refundOption,
                            returnsAcceptedOption:res.data.returnsAcceptedOption,
                            returnsWithinOptionName:res.data.returnsWithinOptionName,
                            siteCode:res.data.siteCode,
                            site:res.data.site,
                            shippingCostPaidByOption:res.data.shippingCostPaidByOption,
                        })
                    }
                });
            }
        }
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
                params.returnsAcceptedOption = this.state.returnsAcceptedOption;

                if (this.state.returnsAcceptedOption === "ReturnsNotAccepted") {
                } else {
                    params.refundOption = this.state.refundOption;
                    params.shippingCostPaidByOption = this.state.shippingCostPaidByOption;
                }
                if (this.props.item.plsProfileId) {
                    // params.plsProfileId = this.props.item.plsProfileId;
                    params.plsProfileId = this.state.plsProfileId;
                }

                fetchPost(ADD_ORUPDATE_RETURN_TEMPLATE, params,1).then(res=>{
                    if(res && res.state === "000001"){
                        this.props.onCancel();
                        this.props.form.resetFields();
                        if(this.props.onSearch){
                            this.props.onSearch()
                        }
                        this.setState({
                            loading:false
                        });
                    }else{
                        this.setState({
                            loading:false
                        });
                    }
                });
            }
        });
    }

    handleChangesite = (value) => {
        this.setState({
            site:value
        })
        this.props.form.setFieldsValue({"returnsWithinOptionId": ""});
    }
    //是否支持退货
    handleChangeIsDefault = (value) =>{
        this.setState({
            returnsAcceptedOption:value
        })
    }
    //退货方式
    handleChangeReturn = (value) =>{
        this.setState({
            refundOption:value
        })
    }

    handleChangeFreight = (value) =>{
        this.setState({
            shippingCostPaidByOption:value
        })
    }

    render(){
        const {visible,onCancel} = this.props;
        const { getFieldDecorator } = this.props.form;
        const loading = this.state.loading;
        const {description,profileName,refundOption,returnsAcceptedOption,returnsWithinOptionName,
            shippingCostPaidByOption} = this.state;
        const { site,saleAccount,returnsWithinOptionId} = this.props.form.getFieldsValue(['site', 'saleAccount',"returnsWithinOptionId"]);
        const item = this.props.item.plsProfileId;
        let content;
        // DE 站点字符长度为 8000 
        let max = site == 77 ? 8000 : 5000 ;
        if(returnsAcceptedOption === "ReturnsAccepted"){
            content = (<div>
                <div className="list-filter-item margin-sm-top">
                    <div className="list-filter-item-title list-filter-item-title_required">退货期限:</div>
                    <div className="list-filter-input">
                        <FormItem>
                            <ItemSelect
                                getFieldDecorator={getFieldDecorator}
                                formName='returnsWithinOptionId'
                                name="name"
                                code="code"
                                disabled={site ? false : true}
                                searchColumn="returnsWithinOptionId"
                                params={{'siteId':site}}
                                dName={this.state.returnsWithinOptionName}
                                dValue={this.state.returnsWithinOptionId}
                                url={types.GE_RETURNS_WITHIN_OPTION_lIST}
                                placeholder={"请选择退货期限"}
                                rules={{
                                    initialValue: undefined,
                                    rules: [{
                                        required: true, message: '请选择退货期限',
                                    }],
                                }}
                                apiListType={3}
                            />
                        </FormItem>
                    </div>
                </div>
                <div className="list-filter-item margin-sm-top">
                    <div className="list-filter-item-title list-filter-item-title_required">退货方式:</div>
                    <div className="list-filter-input">
                        <FormItem>
                            {getFieldDecorator("refundOption", {
                                initialValue: refundOption,
                                rules: [{
                                    required: true,
                                }],
                            })(
                                <Select  style={{ width: 330 }} onChange={this.handleChangeReturn}>
                                    <Option value="MoneyBack">Money Back</Option>
                                    <Option value="MoneyBackOrReplacement">Money BackOr Replacement</Option>
                                </Select>
                            )}
                        </FormItem>
                    </div>
                </div>
                <div className="list-filter-item margin-sm-top">
                    <div className="list-filter-item-title list-filter-item-title_required">运费承担者:</div>
                    <div className="list-filter-input">
                        <FormItem>
                            {getFieldDecorator("shippingCostPaidByOption", {
                                initialValue:shippingCostPaidByOption,
                                rules: [{
                                    required: true,
                                }],
                            })(
                                <Select style={{ width: 330 }} onChange={this.handleChangeFreight}>
                                    <Option value="Buyer">Buyer</Option>
                                    <Option value="Seller">Seller</Option>
                                </Select>
                            )}
                        </FormItem>
                    </div>
                </div>
                <div className="list-filter-item margin-sm-top">
                    <div className="list-filter-item-title">其他退货规则:</div>
                    <div className="list-filter-input">
                        <FormItem>
                            {getFieldDecorator('description',{
                                initialValue:description,
                                rules:[
                                    {max:max,message:`当前站点限制为${max}字符`}
                                ]
                            })(
                                <TextArea
                                    // placeholder="模糊搜索"
                                    style={{ width: 330,height:100 }}
                                    autosize={{ minRows: 2, maxRows: 6 }}
                                    // maxLength="250"
                                />
                            )}
                        </FormItem>
                    </div>
                </div>
            </div>)
        }else if(returnsAcceptedOption === "ReturnsNotAccepted"){
            content = null
        }

        let title
        if(item){
            title = "编辑"
        }else{
            title = "新增"
        }
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
                    <div className="product-description">
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
                                        onChange={this.handleChangesite}
                                        dValue={this.state.site}
                                        dName={this.state.siteCode}
                                        placeholder={"请选择站点"}
                                        disabled={item ? true :false}
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
                                        dValue={saleAccount}
                                        dName={saleAccount}
                                        placeholder={"请选择销售账号"}
                                        disabled={item ? true :false}
                                        rules={{
                                            initialValue:item ? saleAccount : undefined,
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
                                    {getFieldDecorator('profileName', {
                                        initialValue:profileName,
                                        rules: [{ required: true, message: '模板名称不能为空!' }],
                                    })(
                                        <Input
                                            // placeholder="模糊搜索"
                                            style={{ width: 330,height:32 }}
                                            maxLength="80"
                                        />
                                    )}
                                </FormItem>
                            </div>
                        </div>
                        <div className="list-filter-item margin-sm-top">
                            <div className="list-filter-item-title list-filter-item-title_required">是否支持退货:</div>
                            <div className="list-filter-input">
                                <FormItem>
                                    {getFieldDecorator("returnsAcceptedOption", {
                                        initialValue:returnsAcceptedOption,
                                    })(
                                        <Select  style={{ width: 330 }} onChange={this.handleChangeIsDefault}>
                                            <Option value="ReturnsAccepted">Returns Accepted</Option>
                                            <Option value="ReturnsNotAccepted">No Returns Accepted</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </div>
                        </div>
                        {content}
                    </div>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(modal)
