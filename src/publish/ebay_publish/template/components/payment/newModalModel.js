/**
 * 作者: 陈林
 * 描述: 付款弹窗
 * 时间: 2018/8/3 0003 下午 7:07
 * @param
 **/
import React from 'react'
import {AutoComplete, Radio, Form, Select,Modal,Input,Button,message} from "antd";
import ItemSelect from '../../../../../common/components/itemSelect'
import * as types from "../../../../common/constants/actionTypes";
import {ADD_ORUPDATE_PAYMENT_TEMPLATE, GET_PAYMENT_TEMPLATE_DETAIL} from '../../constants/PaymentApi'
import { fetchPost } from 'util/fetch'
import CSelect from '@/components/cselect';

const confirm = Modal.confirm
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;
let email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
const RadioGroup = Radio.Group;


class modal extends React.Component{

    state = {
        loading: false,
        site:"",
        saleAccount:"",
        paypalEmailAddress:[],
        profileName:"",
        paymentInstructions:'',
        immediatePayment: 1
    }

    handleSiteChange = (value) => {
        this.setState({
            site: value
        })
    }

    componentDidUpdate(prevProps){
        if(this.props.visible && !prevProps.visible){
                      this.props.form.resetFields();
                      const { setFieldsValue } = this.props.form;
                      this.setState({
                          site:"",
                          saleAccount:"",
                          paypalEmailAddress:[],
                          profileName:"",
                          paymentInstructions:'',
                          immediatePayment: 1,
                      });
            if( this.props.item.plsProfileId ) {
                fetchPost(GET_PAYMENT_TEMPLATE_DETAIL, {
                    plsProfileId: this.props.item.plsProfileId,
                    profileId: this.props.item.profileId,
                    site:this.props.item.site,
                    sellerId: this.props.item.sellerId
                },).then(res => {
                    if (res && res.state === "000001") {
                        this.setState({
                            site: res.data.site,
                            siteCode:res.data.siteCode,
                            saleAccount: res.data.saleAccount,
                            plsProfileId: res.data.plsProfileId,
                            paypalEmailAddress: [{name: res.data.paypalEmailAddress, value: res.data.paypalEmailAddress}],
                            profileName:res.data.profileName,
                            paymentInstructions: res.data.paymentInstructions,
                            immediatePayment: res.data.immediatePayment === 0 ? 0 : 1,
                        }, () => {
                            setFieldsValue({
                                paypalEmailAddress: res.data.paypalEmailAddress
                            });
                        });
                    }
                });
            }
        }
    }


    //弹窗提交
    handleOk = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            // if(err){
            //     try {
            //         var arr = Object.keys(err)
            //         var errMessage = err[arr[0]].errors[0].message
            //         return message.warning(errMessage)
            //     }catch(error){
            //         message.warning("请核实必填字段是否填写")
            //     }
            //     return
            // }
            if (!err) {
                this.setState({
                    loading:true
                })
                  if(email.test(values.paypalEmailAddress)){
                      values.paypalEmailAddress = values.paypalEmailAddress;
                  }else{
                      message.warning("Paypal账号需是邮箱格式");
                      this.setState({
                          loading:false
                      })
                      return false
                  }
                  if(this.props.item){
                        // values.plsProfileId = this.props.item.plsProfileId;
                        if(this.props.item.type === 'edit'){
                            values.plsProfileId = this.state.plsProfileId;
                        }else{
                            values.plsProfileId = this.props.item.plsProfileId;
                        }
                        values.site = this.state.site;
                  }

                fetchPost(ADD_ORUPDATE_PAYMENT_TEMPLATE, values,1).then(res=>{
                    if(res && res.state === "000001"){
                        this.props.onCancel();
                        this.props.form.resetFields();
                        if(this.props.onSearch){
                            this.props.onSearch()
                        }
                        this.setState({
                            loading:false
                        })
                    }else{
                        this.setState({
                            loading:false
                        })
                    }
                });
            }
        });
    }

    handleBeforeFocus = (currentSaleAccount) => {
        if (!currentSaleAccount) {
            message.info("请先选择销售账号!");
            return false;
        }
        return true;
    }

    render(){
        const {visible,onCancel} = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const {  site,siteCode,saleAccount,paypalEmailAddress, profileName,paymentInstructions, immediatePayment} = this.state;
        const loading = this.state.loading;
        const item = this.props.item.plsProfileId;
        const currentSaleAccount = getFieldValue('saleAccount');
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
                       destroyOnClose={true}
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
                                                dValue={site}
                                                dName={siteCode}
                                                disabled={item ? true :false}
                                                placeholder={"请选择站点"}
                                                rules={{
                                                    initialValue:item ? siteCode : undefined,
                                                    rules: [{
                                                        required: true, message: '请选择站点',
                                                    }],
                                                }}
                                                apiListType={2}
                                                onChange={this.handleSiteChange}
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
                                                    rules: [{ required: true, message: '请填写模板名称！' }],
                                                })(
                                                    <Input
                                                        placeholder="模板名称"
                                                        style={{ width: 360,height:30 }}
                                                        maxLength="80"
                                                    />
                                                )}
                                            </FormItem>
                                         </div>
                            </div>
                            <div className="list-filter-item margin-sm-top">
                                <div className="list-filter-item-title list-filter-item-title_required">PayPal账号:</div>
                                <div className="list-filter-input">
                                    <FormItem>
                                        {getFieldDecorator('paypalEmailAddress', {
                                            rules: [{ required: true, message: '请填写PayPal账号!' }],
                                        })(
                                            <CSelect
                                                list={paypalEmailAddress}
                                                style={{ width: 360 }}
                                                params={{
                                                    data: {
                                                        accounts: [currentSaleAccount],
                                                    }
                                                }}
                                                onBeforeFocus={() => this.handleBeforeFocus(currentSaleAccount)}
                                                code="name"
                                                placeholder="PayPal账号"
                                                localSearch={1}
                                                url='/pls/ebay/motan/service/api/IEbayService/getPayPalAccounts'
                                            />
                                            // <TextArea
                                            //     placeholder="PayPal账号"
                                            //     style={{ width: 360,height:30 }}
                                            //     maxLength="120"
                                            // />
                                        )}
                                    </FormItem>
                                </div>
                            </div>
                            <div className="list-filter-item margin-sm-top">
                                <div className="list-filter-item-title list-filter-item-title_required">即时付款:</div>
                                <div className="list-filter-input">
                                    <FormItem>
                                        {getFieldDecorator('immediatePayment', {
                                            initialValue:immediatePayment,
                                            rules: [{ required: true, message: '请选择是否即时付款!' }],
                                        })(
                                            <RadioGroup>
                                                <Radio value={0}>否</Radio>
                                                <Radio value={1}>是</Radio>
                                            </RadioGroup>
                                            )}
                                    </FormItem>
                                </div>
                            </div>
                            <div className="list-filter-item margin-sm-top">
                                <div className="list-filter-item-title list-filter-item-title_required">额外付款说明:</div>
                                <div className="list-filter-input">
                                    <FormItem>
                                        {getFieldDecorator('paymentInstructions', {
                                            initialValue:paymentInstructions,
                                            rules: [{ required: true, message: '请填写额外付款说明!' }],
                                        })(
                                            <TextArea
                                                placeholder="额外付款说明"
                                                style={{ width: 360,height:30 }}
                                                maxLength="500"
                                            />
                                        )}
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
