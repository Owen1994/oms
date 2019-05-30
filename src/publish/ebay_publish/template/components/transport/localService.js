/**
 * 本地运输-选择服务组件
 */
import React from 'react'
import {AutoComplete,Select,Form} from "antd";
import LocalCalculatedContainer from '../../containers/localCalculated'
import LocalFlatContainer from '../../containers/localFlat'
const FormItem = Form.Item;
const Option = Select.Option;
class localService extends React.Component{
    state = {
        loading: false,
    }


    handleChangeLocalService = (value) =>{
       this.props.resetServiveItem({key: 'domesticShippingPolicyInfoServiceArr'});
       this.props.resetRetSite({key:"domesticShippingType",value})
        this.props.form.setFieldsValue({"dispatchTimeMax": ""});
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        const {formDataList,item,domesticShippingType,site} =this.props;
        let localServicerText;
            if(domesticShippingType === '0'){
                localServicerText = null
            }else if(domesticShippingType === "Flat"){
                localServicerText = <LocalFlatContainer {...this.props}/>
            }else if(domesticShippingType === "Calculated"){
                localServicerText = <LocalCalculatedContainer  {...this.props} />
            }

        const dataListLocalServicer =  (
                <div className="list-filter-item">
                    <div className="list-filter-item-title list-filter-item-title_required">本地运输:</div>
                    <div className="list-filter-input">
                        <FormItem>
                            {getFieldDecorator("domesticShippingType", {
                                initialValue: formDataList.domesticShippingType ? formDataList.domesticShippingType :undefined,
                                rules: [{
                                    required: true, message: '请选择本地运输',
                                }],
                            })(
                                <Select  style={{ width: 330 }} onChange={this.handleChangeLocalService} placeholder="请选择本地运输" disabled={site ? false : true}>
                                    <Option value="0">请选择</Option>
                                    <Option value="Flat">Flat:Same cost to all buyers</Option>
                                    <Option value="Calculated">Calculated:Cost varies by buyer location</Option>
                                </Select>
                            )}
                        </FormItem>
                    </div>
                </div>);



        return(
         <div>
             { dataListLocalServicer }
             { localServicerText }
         </div>
        )
    }
}
export default localService