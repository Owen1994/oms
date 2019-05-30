/**
 * 本地运输-calculated服务组件
 */
import React from 'react'
import {AutoComplete, Form, Select,Modal,Input,Icon,InputNumber,Checkbox,message} from "antd";
import ItemSelect from '../../../../../common/components/itemSelect'
import * as types from "../../constants/TransportApi";
import GlobalService from '../../containers/globalService'
const confirm = Modal.confirm
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;
let uuid = 1;
class localCalculated extends React.Component{
    serviceMap = new Map();
    remove = (index) => {
        if (this.props.localCalcullatedServiceList.length < 2) {
            return;
        }
        const item = this.props.localCalcullatedServiceList[index];
        this.serviceMap .delete(item.key);
        this.props.deleteService({key: 'domesticShippingPolicyInfoServiceArr', index})
    }
    add = () => {
        this.props.addService({
            key: 'domesticShippingPolicyInfoServiceArr',
            value: {key:Date.now(),shippingService:"",shippingServiceCost:"",shippingServiceAdditionalCost:""}
        })
    }
    handleChangeGlobalService = (value, index, key) =>{
        this.serviceMap.set(this.props.localCalcullatedServiceList[index].key,value);
        this.props.modifyServiveItem({
            key: 'domesticShippingPolicyInfoServiceArr', index, name: key, value
        })
    };
    handleGlobalServiceFilters = (list) =>{
        return list.filter(item => {
            let flag = true
            for(const value of this.serviceMap.values()) {
                if(value===item.code) {
                    flag = false
                    break;
                }
            }
            return flag
        })
    }
    handleCheckbox = (e) =>{
        // if(e.target.checked === true){
        //     this.handleChangeGlobalService(0, 0, 'shippingService');
        // }else{
        //     this.handleChangeGlobalService(null, 0, 'shippingService');
        // }
        this.setState({
            checkedDisabled: e.target.checked
        })
    }
    componentDidMount(){
        //初始化服务去重项
        setTimeout(()=>{
            this.props.localCalcullatedServiceList.map(it=>{
                this.serviceMap.set(it.key, it.shippingService.code);
            })
        },100)
    }


    render(){
        const { getFieldDecorator } = this.props.form;
        const {localCalcullatedServiceList,site,formDataList,domesticShippingType} = this.props;

        const formItemsFlat = localCalcullatedServiceList.map((item, index) => {
            return (
                <div key={item.key}>
                    <FormItem required={false}>
                        <div className="list-filter-flex">
                             <div className="list-filter-item margin-sm-top">
                                <div className="list-filter-item-title list-filter-item-title_required">服务:</div>
                                <div className="list-filter-input shippingService-width">
                                    <FormItem>
                                        <ItemSelect
                                            name="name"
                                            code="code"
                                            searchColumn="shippingService"
                                            params={{"site":site,"domServiceType":domesticShippingType}}
                                            url={types.GET_DOMESTIC_SHIPPING_SERVICE_LIST}
                                            onChange={(value) => this.handleChangeGlobalService(value, index, 'shippingService')}
                                            dValue={item.shippingService &&item.shippingService.code + ""}
                                            dName={item.shippingService &&item.shippingService.name +""}
                                            defaultValue={item.shippingService&&item.shippingService.code?item.shippingService.code:"请选择服务"}
                                            rules={{
                                                rules: [{
                                                    required: true, message: '请选择服务',
                                                }],
                                            }}
                                            apiListType={3}
                                            onFilters={this.handleGlobalServiceFilters}
                                        />
                                    </FormItem>
                                </div>
                             </div>
                            { index === 0 ? (
                                <div className="margin-ss-left margin-sm-top">
                                        <Checkbox
                                            onChange={(e) => this.handleChangeGlobalService(e.target.checked, index, 'freeShipping')}
                                            onClick={(e)=> this.handleCheckbox(e)}
                                            checked={item.freeShipping}
                                        >免运费</Checkbox>
                                </div>
                                ): null
                            }
                            { index === 0 ?
                                (
                                    <div onClick={this.add} className="margin-sm-top cursor">
                                        <Icon type="plus" /> Add
                                    </div>):
                                (<Icon
                                    className="dynamic-delete-button margin-sm-top"
                                    type="minus-circle-o"
                                    onClick={() => this.remove(index)}
                                />)
                            }
                        </div>
                    </FormItem>
                </div>
            );
        });
        return(
            <div>
                <div className="publish-template-transport-margin-left">
                    {formItemsFlat}
                    <div className="list-filter-item margin-sm-top publish-template-transport-dispatch-margin-left">
                        <div className="list-filter-item-title list-filter-item-title_required">处理/派发时间:</div>
                        <div className="list-filter-input">
                            <FormItem>
                                <ItemSelect
                                    getFieldDecorator={getFieldDecorator}
                                    formName='dispatchTimeMax'
                                    name="name"
                                    code="code"
                                    searchColumn="dispatchTimeMax"
                                    params={{"site":site}}
                                    url={types.GET_DISPATCH_TIME_MAX_LIST}
                                    dValue={formDataList.dispatchTimeMax&&formDataList.dispatchTimeMax.code}
                                    dName={formDataList.dispatchTimeMax&&formDataList.dispatchTimeMax.name}
                                    rules={{
                                        initialValue:formDataList.dispatchTimeMax&&formDataList.dispatchTimeMax.code,
                                        rules: [{
                                            required: true, message: '请选择处理/派发时间',
                                        }],
                                    }}
                                    apiListType={3}
                                />
                            </FormItem>
                        </div>
                    </div>
                    <div className="list-filter-item margin-sm-top packagingHandlingCosts">
                        <div className="list-filter-item-title">处理花费:</div>
                        <div className="list-filter-input" style={{display: 'inline-block'}}>
                            <FormItem>
                                {getFieldDecorator('packagingHandlingCosts',{
                                    initialValue:formDataList.packagingHandlingCosts,
                                })(
                                    <InputNumber
                                        placeholder="处理花费"
                                        style={{ width: 330 }}
                                        min={0} max={1000000}
                                    />
                                )}
                            </FormItem>
                        </div>
                        <div style={{display: 'inline-block', marginLeft: 10}} >USD</div>
                    </div>
                </div>
                <GlobalService {...this.props}/>
            </div>
        )
    }
}

export default localCalculated