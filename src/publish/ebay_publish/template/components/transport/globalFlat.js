/**
 * 全球运输-flat服务组件
 */
import React from 'react'
import { AutoComplete, Form, Select, Modal, Input, Icon, InputNumber, message, Checkbox } from "antd";
import ItemSelect from '../../../../../common/components/itemSelect'
import * as types from "../../constants/TransportApi";
import TransportAddress from './transportAddress'
import { parseListData } from "../../selector/transportAddress";
import { GET_SHIP_TO_LOCATION_LIST } from "../../constants/TransportApi";
import { fetchPost } from "../../../../../util/fetch";
const confirm = Modal.confirm
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;
const CheckboxGroup = Checkbox.Group;
class localFlat extends React.Component {
    state = {
        internationalPackagingHandlingCosts: "0",
        ifShowCheckbox: false,         //是否显示checkbox
        radioDate: [],                   //收货地址为常用地址时，显示常用地址checkBox
        ifOtherAddressEditable: true,   //其他运输地址是否可选
        cost: 0,
    };

    serviceMap = new Map();

    remove = (index) => {
        if (this.props.globalserviceList.length < 2) {
            return;
        }
        const item = this.props.globalserviceList[index];
        this.serviceMap.delete(item.key);
        this.props.deleteService({ key: 'intlShippingPolicyInfoServiceArr', index })
        this.handleIfShowCheckbox();
        this.handleIfEditable();
    }
    add = () => {
        this.props.addService({
            key: 'intlShippingPolicyInfoServiceArr',
            value: { key: Date.now(), shippingService: "", shippingServiceCost: "", shippingServiceAdditionalCost: "" }
        })
    }
    handleFocus = (e, index, key) => {
        let serviceArr = this.props.serviceData['intlShippingPolicyInfoServiceArr'][index];
        this.setState({ cost: serviceArr[key] })
    }
    handleChangeGlobalService = (value, index, key) => {
        if(key === 'shippingService'){
            this.serviceMap.set(this.props.globalserviceList[index].key, value);
        }
        this.props.modifyServiveItem({
            key: 'intlShippingPolicyInfoServiceArr', index, name: key, value
        });
        if(key === 'shipToLocationType'){
            this.handleIfShowCheckbox();
            this.handleIfEditable();
        }
    };
    handleBlur = (e, index, key) => {
        let serviceArr = this.props.serviceData['intlShippingPolicyInfoServiceArr'][index];
        let a = serviceArr['shippingServiceCost'],
            b = serviceArr['shippingServiceAdditionalCost'];
        if (a < b) {
            message.warning('后者不能大于前者');
            this.props.modifyServiveItem({
                key: 'intlShippingPolicyInfoServiceArr', index, name: key, value: this.state.cost
            })
            this.setState({})
            return;
        }
    }
    handleGlobalServiceFilters = (list) => {
        return list.filter(item => {
            let flag = true
            for (const value of this.serviceMap.values()) {
                if (value === item.code) {
                    flag = false
                    break;
                }
            }
            return flag
        })
    }
    handleIfEditable = () => {
        //有收获地点为全球则禁用其他运输地址
        const ifHavingEarch = this.props.globalserviceList.some(it => it['shipToLocationType'] === '0');    //是否有收获地点为： 全球
        if(ifHavingEarch){
            this.setState({ifOtherAddressEditable: false})
        }else{
            this.setState({ifOtherAddressEditable: true})
        }
    }
    handleIfShowCheckbox = () => {
        //有收货地点为全球或每项都是请选择不显示其他运输地点的常用地址checkbox cwc
        const ifHavingEarch = this.props.globalserviceList.some(it => it['shipToLocationType'] === '0');    //是否有收获地点为： 全球
        if (ifHavingEarch || this.props.globalserviceList.every(it => !it['shipToLocationType'])) {  
            this.setState({ ifShowCheckbox: false });
        } else {
            this.setState({ ifShowCheckbox: true });
        }
    }

    componentDidMount() {
        if (this.props.site) {
            fetchPost(GET_SHIP_TO_LOCATION_LIST, { site: this.props.site })
                .then(result => {
                    if (result.state === '000001') {
                        this.setState({
                            radioDate: parseListData(result.data.list)
                        })
                    }
                })
        }
        //初始化时只检查是否需要禁用其他运输地址，不需要检查其他运输地址是否显示常用地址，初始化时根据接口的数据渲染
        this.handleIfEditable();    
        //初始化收货地点的服务去重项
        setTimeout(()=>{
            this.props.globalserviceList.map(it=>{
                this.serviceMap.set(it.key, it.shippingService.code);
            })
        },100)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.site && this.props.site !== nextProps.site) {
            fetchPost(GET_SHIP_TO_LOCATION_LIST, { site: this.props.site })
                .then(result => {
                    if (result.state === '000001') {
                        this.setState({
                            radioDate: parseListData(result.data.list)
                        })
                    }
                })
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { site, intlShippingType, formDataList } = this.props;
        const { ifShowCheckbox, ifOtherAddressEditable } = this.state;
        const formItemsFlat = this.props.globalserviceList.map((item, index) => {
            let clCountry, shipToLocationType=this.props.globalserviceList[index]['shipToLocationType'];
            if (shipToLocationType && shipToLocationType === '1') {
                clCountry = <div className="margin-sm-top shipToLocationsArr">
                    {getFieldDecorator(`usualAddressArr${index}`, {
                        initialValue: item.shipToLocationsArr ? item.shipToLocationsArr.map(it=>it.locationCode) : [],
                        rules: [{
                            required: true,
                            message: '请至少选择一项【常用地址】',
                        }],
                    })(
                        <CheckboxGroup
                            options={this.state.radioDate}
                        />
                    )}
                </div>
            } else {
                clCountry = null;
            }
            return (
                <div key={item.key}>
                    <div>
                        <FormItem required={false}>
                            <div className="list-filter-flex shipToLocationType">
                                <div className="list-filter-item margin-sm-top">
                                    <div className="list-filter-item-title">收货地点:</div>
                                    <FormItem>
                                        <Select
                                            defaultValue={ item.shipToLocationType === '1' || item.shipToLocationType === '0' ? item.shipToLocationType : ""}
                                            style={{ width: 140 }}
                                            onChange={(value) => this.handleChangeGlobalService(value, index, 'shipToLocationType')}>
                                            <Option value="">请选择</Option>
                                            <Option value="0">全球</Option>
                                            <Option value="1">常用地址</Option>
                                        </Select>
                                    </FormItem>
                                </div>
                                <div className="list-filter-item list-filter-flex margin-sm-top">
                                    <div className="list-filter-item-title shippingService-sm-width">服务:</div>
                                    <div className="list-filter-input shippingService-width shippingService-sm-margin-left">
                                        <FormItem>
                                            <ItemSelect
                                                name="name"
                                                code="code"
                                                searchColumn="shippingService"
                                                params={{ "site": site, "intServiceType": intlShippingType }}
                                                url={types.GET_INTL_SHIPPING_SERVICE_LIST}
                                                onChange={(value) => this.handleChangeGlobalService(value, index, 'shippingService')}
                                                dName={item.shippingService && item.shippingService.name}
                                                dCode={item.shippingService && item.shippingService.code}
                                                defaultValue={item.shippingService && item.shippingService.code ? item.shippingService.code : "请选择服务"}
                                                apiListType={3}
                                                onFilters={this.handleGlobalServiceFilters}
                                            />
                                        </FormItem>
                                    </div>
                                    <div className="list-filter-item list-filter-flex">
                                        <div className="list-filter-item-title  shippingServiceCost-width">费用:</div>
                                        <div className="shippingServiceCost-margin-left">
                                            <InputNumber
                                                // onChange={(value) => this.handleChangeGlobalService(value, index, 'shippingServiceCost')}
                                                // placeholder="费用"
                                                onFocus={(e) => this.handleFocus(e, index, 'shippingServiceCost')}
                                                onChange={(value) => this.handleChangeGlobalService(value, index, 'shippingServiceCost')}
                                                onBlur={(e) => this.handleBlur(e, index, 'shippingServiceCost')}
                                                
                                                value={item.shippingServiceCost}
                                                min={0} max={1000000}
                                            />
                                        </div>
                                        <div className="margin-ss-left">USD</div>
                                    </div>
                                    <div className="list-filter-item list-filter-flex">
                                        <div className="list-filter-item-title shippingServiceAdditionalCost-width">每加一件:</div>
                                        <div className="shippingServiceAdditionalCost-margin-left">
                                            <InputNumber
                                                // onChange={(value) => this.handleChangeGlobalService(value, index, 'shippingServiceAdditionalCost')}
                                                // placeholder="件数"
                                                onFocus={(e) => this.handleFocus(e, index, 'shippingServiceAdditionalCost')}
                                                onChange={(value) => this.handleChangeGlobalService(value, index, 'shippingServiceAdditionalCost')}
                                                onBlur={(e) => this.handleBlur(e, index, 'shippingServiceAdditionalCost')}
                                                value={item.shippingServiceAdditionalCost}
                                                min={0} max={1000000}
                                            />
                                        </div>
                                        <div className="margin-ss-left">USD</div>
                                    </div>
                                    {index === 0 ?
                                        (
                                            <div onClick={this.add} className="cursor">
                                                <Icon type="plus" /> Add
                                        </div>) :
                                        (<Icon
                                            className="dynamic-delete-button"
                                            type="minus-circle-o"
                                            onClick={() => this.remove(index)}
                                        />)
                                    }
                                </div>
                            </div>
                        </FormItem>
                    </div>
                    {clCountry}
                </div>
            );
        });
        return (
            <div className="publish-template-transport-margin-left">
                {formItemsFlat}
                <TransportAddress {...this.props}
                                ifShowCheckbox={ifShowCheckbox} 
                                ifOtherAddressEditable={ifOtherAddressEditable}
                />
            </div>
        )
    }
}

export default localFlat