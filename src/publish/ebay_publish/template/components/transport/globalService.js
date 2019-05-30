/**
 * 全球运输-选择服务组件
 */
import React from 'react'
import { AutoComplete, Select } from "antd";
import { Form } from "antd/lib/index";
import GlobalFlatContainer from '../../containers/globalFlat'
import GlobalCalculatedContainer from '../../containers/globalCalculated'
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
class globalService extends React.Component {
    state = {
        loading: false,
    }
    handleChangeGlobalService = (value) => {
        this.props.resetServiveItem({ key: 'intlShippingPolicyInfoServiceArr' })
        this.props.resetRetSite({ key: "intlShippingType", value })
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const intlShippingType = this.props.intlShippingType;
        const { formDataList } = this.props;
        let globalServiceText;
        if (intlShippingType === "0") {
            globalServiceText = null;
        } else if (intlShippingType === "Flat") {
            globalServiceText = <GlobalFlatContainer {...this.props} />
        } else if (intlShippingType === "Calculated") {
            globalServiceText = <GlobalCalculatedContainer  {...this.props} />
        }

        const initialValue = formDataList.intlShippingType ? formDataList.intlShippingType : "0";
        const dataListglobalService = (
            <div className="list-filter-item margin-sm-top">
                <div className="list-filter-item-title">全球运输:</div>
                <div className="list-filter-input">
                    <FormItem>
                        {getFieldDecorator("intlShippingType", {
                            initialValue,
                            rules: [{
                                required: true,
                                whitespace: true,
                            }],
                        })(
                            <Select style={{ width: 330 }} onChange={this.handleChangeGlobalService}>
                                <Option value="0">没有国家运输</Option>
                                <Option value="Flat">Flat:Same cost to all buyers</Option>
                                <Option value="Calculated">Calculated:Cost varies by buyer location</Option>
                            </Select>
                        )}
                    </FormItem>
                </div>
            </div>);


        return (
            <div>
                {dataListglobalService}
                {globalServiceText}
            </div>
        )
    }
}
export default globalService