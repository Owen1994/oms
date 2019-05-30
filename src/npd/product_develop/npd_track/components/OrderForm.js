import React from 'react';
import { Input, Row, Col, Form, Select } from 'antd';
import ItemSelect from '../../../../common/components/itemSelect'
import { WARE_HOUSE_LIST_API } from '../../../constants/Api'
import { PAY_TYPE } from '../../constants'
const Option = Select.Option;
const FormItem = Form.Item;

 class OrderForm extends React.Component {

    componentDidMount(){
        var data = this.props.data
        this.props.form.setFieldsValue({
            'supplierCode': data.formalSupplierCode,
            'supplierName':data.formalSupplierName
        })
    }
    
    render(){
        const { getFieldDecorator } = this.props.form;
        const payElements = PAY_TYPE.map(item => <Option key={item.key} value={item.key}>{item.name}</Option>)
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
         return (
            <div className="white padding-md">
                <div className="npd-track-title">申请明细</div>
                <Row gutter={16}>
                    <Col span={6}>
                        <FormItem
                            {...formItemLayout}
                            label="申请单号:"
                        >
                            {getFieldDecorator('firstOrderCode')(
                                <Input disabled placeholder="按规则自动生成"/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem
                            {...formItemLayout}
                            label="正式供应链编码:"
                        >
                            {getFieldDecorator('supplierCode')(
                                <Input disabled/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem
                            {...formItemLayout}
                            label="供应商名称:"
                        >
                            {getFieldDecorator('supplierName')(
                                <Input disabled/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem
                            {...formItemLayout}
                            label="仓库:"
                        >
                            <ItemSelect
                                formName="warehouseCode"
                                getFieldDecorator={getFieldDecorator}
                                url={WARE_HOUSE_LIST_API}
                                params={{'pageData': 20, 'pageNumber': 1}}
                            />
                        </FormItem>
                    </Col>
                </Row>
                <Row className="margin-ss-top" gutter={16}>
                    <Col span={6}>
                        <FormItem
                            {...formItemLayout}
                            label="付款方式:"
                        >
                            {getFieldDecorator('remittanceType',{
                                initialValue:1
                            })(
                                <Select 
                                    style={{width:"100%" }}>
                                    {payElements}
                                </Select>,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem
                            {...formItemLayout}
                            label="备注:"
                        >
                            {getFieldDecorator('remark')(
                                <Input />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Form.create()(OrderForm);