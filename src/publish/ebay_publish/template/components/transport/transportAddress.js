/**
 * 运输模板-新增修改弹窗选择地址公共组件
 */
import React from 'react'
import { AutoComplete, Select, Form, Checkbox, } from "antd";
import { GET_SHIP_TO_LOCATION_LIST } from "../../constants/TransportApi";
import { fetchPost } from "../../../../../util/fetch";
import { DELETE_RETURN_TEMPLATE } from "../../constants/ReturnApi";
import OutTransportAddress from '../../containers/OutTransportAddress'
import { parseListData, shipparseListData, shipparseList } from '../../selector/transportAddress'
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const CheckboxGroup = Checkbox.Group;
class transportAddress extends React.Component {
    state = {
        loading: false,
        shipToLocationsType: "0",
        radioDate: [],
        site: ''
    };
    componentDidMount() {
        if (this.props.site) {
            this.setState({ site: this.props.site });
            fetchPost(GET_SHIP_TO_LOCATION_LIST, { site: this.props.site })
                .then(result => {
                    if (result.state === '000001') {
                        this.setState({
                            radioDate: parseListData(result.data.list)
                        })
                    }
                })
        }
        this.props.form.setFieldsValue({
            'shipToLocationsType': this.props.formDataList.shipToLocationsType
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.site && this.props.site !== nextProps.site) {
            this.setState({ site: nextProps.site });
            fetchPost(GET_SHIP_TO_LOCATION_LIST, { site: this.props.site })
                .then(result => {
                    if (result.state === '000001') {
                        this.setState({
                            radioDate: parseListData(result.data.list)
                        })
                    }
                })
        }
        //判断收货地点是否含有全球项或者全部为请选择项，若成立，将其他运输地点的值设置为''，若不成立，设置为0
        if(nextProps.ifShowCheckbox&&this.props.ifShowCheckbox!==nextProps.ifShowCheckbox){
            this.props.form.setFieldsValue({
                'shipToLocationsType': 0
            })
        }
        // else if(!nextProps.ifShowCheckbox&&this.props.ifShowCheckbox!==nextProps.ifShowCheckbox){
        //     this.props.form.setFieldsValue({
        //         'shipToLocationsType': ''
        //     })
        // }
        if(!nextProps.ifOtherAddressEditable&&this.props.ifOtherAddressEditable!==nextProps.ifOtherAddressEditable){
            this.props.form.setFieldsValue({
                'shipToLocationsType': '' 
            })
        }
    }

    handleChangeTransportAddress = (value) => {
        this.props.resetRetSite({ key: "shipToLocationsType", value })
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { radioDate } = this.state;
        const { formDataList, ifShowCheckbox } = this.props;
        const dataList = formDataList.shipToLocationsArrVO;
        const shipToLocationsType = this.props.form.getFieldValue('shipToLocationsType');
        let clCountry;
        if (shipToLocationsType === 0) {
            clCountry = <div>
                {getFieldDecorator('shipToLocationsArr', {
                    initialValue: dataList,
                    rules: [{
                        required: true,
                        message: '请至少选择一项【其他运输地址】',
                    }],
                })(
                    <CheckboxGroup
                        options={radioDate}
                    />
                )}
            </div>
        } else if (shipToLocationsType === 1) {
            clCountry = null;
        }
        return (
            <div >
                <div className="list-filter-item margin-sm-top shipToLocationsType-margin-left">
                    <div className="list-filter-item-title">其他运输地点:</div>
                    <div className="list-filter-input">
                        <FormItem>
                            {getFieldDecorator('shipToLocationsType', {
                                initialValue: formDataList.shipToLocationsType,
                            })(
                                <Select style={{ width: 340 }} onChange={this.handleChangeTransportAddress} disabled={!this.props.ifOtherAddressEditable} >
                                    <Option value={0}>will ship to the United Status and the following</Option>
                                    <Option value={1}>will ship worldwide</Option>
                                </Select>
                            )}
                        </FormItem>
                    </div>
                </div>
                <div className="margin-sm-top shipToLocationsArr">
                    {clCountry}
                </div>
                <OutTransportAddress {...this.props} />
            </div>
        )
    }
}
export default transportAddress