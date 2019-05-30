/**
 * 本地运输-flat服务组件
 */
import React from 'react'
import { AutoComplete, Form, Select, Modal, InputNumber, Icon, Button, Checkbox, message } from "antd";
import ItemSelect from '../../../../../common/components/itemSelect'
import * as types from "../../constants/TransportApi";
import GlobalService from '../../containers/globalService'
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class localFlat extends React.Component {
    state = {
        internationalPackagingHandlingCosts: "0",
        checkedDisabled: false,
        cost: 0,
    };
    serviceMap = new Map();
    remove = (index) => {
        if (this.props.localserviceList.length < 2) {
            return;
        }
        const item = this.props.localserviceList[index];
        this.serviceMap.delete(item.key);
        this.props.deleteService({ key: 'domesticShippingPolicyInfoServiceArr', index })
    }
    add = () => {
        this.props.addService({
            key: 'domesticShippingPolicyInfoServiceArr',
            value: { key: Date.now(), shippingService: "", shippingServiceCost: "", shippingServiceAdditionalCost: "" }
        })
    }
    handleFocus = (e, index, key) => {
        let serviceArr = this.props.serviceData['domesticShippingPolicyInfoServiceArr'][index];
        this.setState({ cost: serviceArr[key] })
    }
    handleChangeGlobalService = (value, index, key) => {
        if(key === 'shippingService'){
            this.serviceMap.set(this.props.localserviceList[index].key, value);
        }
        this.props.modifyServiveItem({
            key: 'domesticShippingPolicyInfoServiceArr', index, name: key, value
        })
    };
    handleBlur = (e, index, key) => {
        let serviceArr = this.props.serviceData['domesticShippingPolicyInfoServiceArr'][index];
        let a = serviceArr['shippingServiceCost'],
            b = serviceArr['shippingServiceAdditionalCost'];
        if (a < b) {
            message.warning('后者不能大于前者');
            this.props.modifyServiveItem({
                key: 'domesticShippingPolicyInfoServiceArr', index, name: key, value: this.state.cost
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
    handleCheckbox = (e) => {
        if (e.target.checked === true) {
            this.handleChangeGlobalService(0, 0, 'shippingServiceAdditionalCost')
            this.handleChangeGlobalService(0, 0, 'shippingServiceCost');
        } else {
            this.handleChangeGlobalService(null, 0, 'shippingServiceAdditionalCost')
            this.handleChangeGlobalService(null, 0, 'shippingServiceCost');
        }
        this.setState({
            checkedDisabled: e.target.checked
        })
    }
    componentDidMount() {
        //初始化服务去重项
        setTimeout(() => {
            this.props.localserviceList.map(it => {
                this.serviceMap.set(it.key, it.shippingService.code);
            })
        }, 100)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { checkedDisabled } = this.state;
        const { formDataList, localserviceList, item, site, domesticShippingType } = this.props;
        const formItemsFlat = localserviceList.map((item, index) => {
            return (
                <div key={item.key}>
                    <FormItem required={false}>
                        <div className="list-filter-flex ">
                            <div className="list-filter-item margin-sm-top">
                                <div className="list-filter-item-title list-filter-item-title_required">服务:</div>
                                <div className="list-filter-input shippingService-width">
                                    <FormItem>
                                        <ItemSelect
                                            name="name"
                                            code="code"
                                            searchColumn="shippingService"
                                            params={{ "site": site, "domServiceType": domesticShippingType }}
                                            url={types.GET_DOMESTIC_SHIPPING_SERVICE_LIST}
                                            onChange={(value) => this.handleChangeGlobalService(value, index, 'shippingService')}
                                            dValue={item.shippingService && item.shippingService.code}
                                            dName={item.shippingService && item.shippingService.name}
                                            defaultValue={item.shippingService && item.shippingService.code ? item.shippingService.code : "请选择服务"}
                                            apiListType={3}
                                            onFilters={this.handleGlobalServiceFilters}
                                            rules={{
                                                rules: [{
                                                    required: true, message: '请选择服务',
                                                }],
                                            }}
                                        />
                                    </FormItem>
                                </div>
                            </div>
                            {
                                index === 0 ? (<div className="list-filter-item margin-sm-top list-filter-flex">
                                    <div className="list-filter-item-title shippingServiceCost-width">费用:</div>
                                    <div className="shippingServiceCost-margin-left">
                                        <FormItem>
                                            <InputNumber
                                                onFocus={(e) => this.handleFocus(e, index, 'shippingServiceCost')}
                                                onChange={(value) => this.handleChangeGlobalService(value, index, 'shippingServiceCost')}
                                                onBlur={(e) => this.handleBlur(e, index, 'shippingServiceCost')}
                                                disabled={checkedDisabled || item.freeShipping ? true : false}
                                                value={item.shippingServiceCost}
                                                // placeholder="费用"
                                                min={0}
                                                max={1000000}
                                                style={{ width: 80, height: 32 }}
                                            />
                                        </FormItem>
                                    </div>
                                    <div className="margin-ss-left">USD</div>
                                </div>)
                                    :
                                    <div className="list-filter-item margin-sm-top list-filter-flex">
                                        <div className="list-filter-item-title shippingServiceCost-width">费用:</div>
                                        <div className="shippingServiceCost-margin-left">
                                            <FormItem>
                                                <InputNumber
                                                    onFocus={(e) => this.handleFocus(e, index, 'shippingServiceCost')}
                                                    onChange={(value) => this.handleChangeGlobalService(value, index, 'shippingServiceCost')}
                                                    onBlur={(e) => this.handleBlur(e, index, 'shippingServiceCost')}
                                                    // placeholder="费用"
                                                    value={item.shippingServiceCost}
                                                    min={0}
                                                    max={1000000}
                                                    style={{ width: 80, height: 32 }}
                                                />
                                            </FormItem>
                                        </div>
                                        <div className="margin-ss-left">USD</div>
                                    </div>
                            }
                            {
                                index === 0 ? (
                                    <div className="list-filter-item margin-sm-top list-filter-flex">
                                        <div className="list-filter-item-title shippingServiceAdditionalCost-width">每加一件:</div>
                                        <div className="shippingServiceAdditionalCost-margin-left">
                                            <FormItem>
                                                <InputNumber
                                                    // placeholder="件数"
                                                    value={item.shippingServiceAdditionalCost}
                                                    onFocus={(e) => this.handleFocus(e, index, 'shippingServiceAdditionalCost')}
                                                    onChange={(value) => this.handleChangeGlobalService(value, index, 'shippingServiceAdditionalCost')}
                                                    onBlur={(e) => this.handleBlur(e, index, 'shippingServiceAdditionalCost')}
                                                    disabled={checkedDisabled || item.freeShipping ? true : false}
                                                    style={{ width: 80, height: 32 }}
                                                    min={0}
                                                    max={1000000}
                                                />
                                            </FormItem>
                                        </div>
                                        <div className="margin-ss-left">USD</div>
                                    </div>)
                                    :
                                    <div className="list-filter-item margin-sm-top list-filter-flex">
                                        <div className="list-filter-item-title shippingServiceAdditionalCost-width">每加一件:</div>
                                        <div className="shippingServiceAdditionalCost-margin-left">
                                            <FormItem>
                                                <InputNumber
                                                    onFocus={(e) => this.handleFocus(e, index, 'shippingServiceAdditionalCost')}
                                                    onChange={(value) => this.handleChangeGlobalService(value, index, 'shippingServiceAdditionalCost')}
                                                    onBlur={(e) => this.handleBlur(e, index, 'shippingServiceAdditionalCost')}
                                                    min={0}
                                                    max={100000}
                                                    // placeholder="件数"
                                                    value={item.shippingServiceAdditionalCost}
                                                    style={{ width: 80, height: 32 }}
                                                />
                                            </FormItem>
                                        </div>
                                        <div className="margin-ss-left">USD</div>
                                    </div>
                            }
                            {index === 0 ? (
                                <div className="margin-ss-left margin-sm-top">
                                    <FormItem>
                                        <Checkbox
                                            onChange={(e) => this.handleChangeGlobalService(e.target.checked, index, 'freeShipping')}
                                            checked={item.freeShipping}
                                            onClick={(e) => this.handleCheckbox(e)}
                                        >免运费</Checkbox>
                                    </FormItem>
                                </div>) : null
                            }
                            {index === 0 ?
                                (
                                    <div onClick={this.add} className="margin-sm-top cursor">
                                        <Icon type="plus" /> Add
                                    </div>) :
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
        return (
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
                                    params={{ "site": site }}
                                    url={types.GET_DISPATCH_TIME_MAX_LIST}
                                    onChange={this.handleChangesite}
                                    dValue={formDataList.dispatchTimeMax && formDataList.dispatchTimeMax.code}
                                    dName={formDataList.dispatchTimeMax && formDataList.dispatchTimeMax.name}
                                    rules={{
                                        initialValue: formDataList.dispatchTimeMax && formDataList.dispatchTimeMax.code,
                                        rules: [{
                                            required: true, message: '请选择处理/派发时间',
                                        }],
                                    }}
                                    apiListType={3}
                                />
                            </FormItem>
                        </div>
                    </div>
                </div>
                <GlobalService {...this.props} />
            </div>
        )
    }
}

export default localFlat