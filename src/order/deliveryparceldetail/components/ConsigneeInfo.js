/**
 * 收货人信息组件
 **/
import React from 'react'
import {
    Form,
    Input,
    Row,
    Col,
    Button,
    message,
    Tooltip,
} from 'antd'
import axios from "util/axios";
import * as config from "util/connectConfig";
import CSelect from '@/components/cselect';

const FormItem = Form.Item

class ConsigneeInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isEdit:false,
        countryName: '',
    }

    formItemLayout3 = {
        labelCol: {span: 10},
        wrapperCol: {span: 14}
    }

    handleEdit = ()=>{
        this.setState({
            isEdit:!this.state.isEdit
        })
    }

    /**
     * 作者：陈文春
     * 描述：保存收货人信息
     * 时间：2019年1月8日16:47:49
     */
    handleEditSave = ()=>{
        var values = this.props.form.getFieldsValue([
            "consignee",
            "email",
            "tel",
            "mobilephone",
            "country",
            "countryAdd",
            "province",
            "city",
            "userName",
            "zip",
            "street1",
            "street2",
            "warehouseOrderNumber",
        ])
        // cselect组件在这里返回的格式是{id：X， name：X}，要控制country的取值
        const cty = this.state.countryName ? this.state.countryName : values.country;
        var params = {
            ...values,
            packageCode: values.warehouseOrderNumber,
            country: cty,
        }
        axios.post(`${config.api_url}/oms/order/manage/motan/IPackageApi/updatePackageReceiverInfo`,{ data: params})
        .then(response => {
            const state = response.data.state
            if (state == '000001') {
                this.setState({
                    isEdit:!this.state.isEdit
                })
                this.props.form.setFieldsValue({'country': cty});
                message.success(`${response.data.msg}`);
            } else {
                message.error(`${response.data.msg}`);
            }
        }).catch(e => {
            console.log(e);
        })
    }

    // 国家全称选择事件
    handleChange = (valObj) => {
        this.setState({ countryName: valObj[0].name });
        this.props.form.setFieldsValue({'countryAdd': valObj[0].id});
    }
    
    // 复制
    // handleCopy = () => {
    //     const { street1 = '', city = '', province = '', zip = '', countryAdd = '' } = this.props.form.getFieldsValue(['street1', 'city', 'province', 'zip', 'countryAdd']);
    //     const val = `${street1} ${city} ${province} ${zip} ${countryAdd}`;
    //     let oInput = document.createElement('input');
    //     oInput.value = val;
    //     document.body.appendChild(oInput);
    //     oInput.select(); // 选择对象
    //     document.execCommand("copy"); // 执行浏览器复制命令
    //     message.info('已复制到剪切板!');
    //     // oInput.style.display='none';
    //     document.body.removeChild(oInput);
    // }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { isEdit } = this.state;
        const { ifConsigneeInfoEditable } = this.props;
        const content = (
            <div className={isEdit?"content editableInput":"content deliveryParcel"}>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="收货人"  {...this.formItemLayout3} className="widthAll"
                            >
                                <Tooltip title={getFieldValue('consignee')} placement="topLeft">
                                    {getFieldDecorator('consignee')(
                                        <Input disabled={isEdit ? false : true} maxLength={100}/>
                                    )}
                                </Tooltip>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="邮箱地址"  {...this.formItemLayout3} className="widthAll"
                            >
                                {getFieldDecorator('email')(
                                    <Input disabled={isEdit ? false : true} maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="固定电话"  {...this.formItemLayout3} className="widthAll"
                            >
                                {getFieldDecorator('tel')(
                                    <Input disabled={isEdit ? false : true} maxLength="50"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="移动电话"  {...this.formItemLayout3} className="widthAll"
                            >
                                {getFieldDecorator('mobilephone')(
                                    <Input disabled={isEdit ? false : true} maxLength="50"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="国家全称"  {...this.formItemLayout3} className="widthAll"
                            >
                                {getFieldDecorator('country')(
                                    isEdit ? (
                                        <CSelect
                                            // list={selectInitVal} // 默认值列
                                            code='id' // 列表编码字段
                                            name='name' // 列表名称字段
                                            url="/oms/order/manage/motan/CommonBasicsDataApi/queryCountrlData"
                                            // mode='multiple' // 是否多选
                                            // maxCount={3} // 最多选择项数量
                                            formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                            params={{ searchColumn: 'name', pageData: 20, pageNumber: 1 }} // 搜索参数
                                            apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                            // placeholder={'请选择'}
                                            handleChange={this.handleChange} // 触发下拉事件
                                            // onSelect={this.handleSelect}
                                        />
                                    ) : (
                                        <Input disabled maxLength="30"/>
                                    )
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="国家简称"  {...this.formItemLayout3} className="widthAll"
                            >
                                {getFieldDecorator('countryAdd')(
                                    <Input disabled maxLength="2" alt="根据国家全称变化"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="省/州"  {...this.formItemLayout3} className="widthAll"
                            >
                                {getFieldDecorator('province')(
                                    <Input disabled={isEdit ? false : true} maxLength="80"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="城市"  {...this.formItemLayout3} className="widthAll"
                            >
                                {getFieldDecorator('city')(
                                    <Input disabled={isEdit ? false : true} maxLength="150"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="社交账号"  {...this.formItemLayout3} className="widthAll"
                            >
                                {getFieldDecorator('userName')(
                                    <Input disabled={isEdit ? false : true} maxLength="80"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="邮编"  {...this.formItemLayout3} className="widthAll"
                            >
                                {getFieldDecorator('zip')(
                                    <Input disabled={isEdit ? false : true} maxLength="50"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="街道1"  {...this.formItemLayout3} className="widthAll"
                            >
                                <Tooltip title={getFieldValue('street1')} placement="topLeft">
                                    {getFieldDecorator('street1')(
                                        <Input disabled={isEdit ? false : true} maxLength="2000"/>
                                    )}
                                </Tooltip>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="街道2"  {...this.formItemLayout3} className="widthAll"
                            >
                                <Tooltip title={getFieldValue('street2')} placement="topLeft">
                                    {getFieldDecorator('street2')(
                                        <Input disabled={isEdit ? false : true} maxLength="2000"/>
                                    )}
                                </Tooltip>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
        );
        return (
            <div className="newCluenk cl-warehouse">
                <div className="title pr">
                    收货人信息
                    {/* <Button size="small" className="margin-sm-left" onClick={this.handleCopy}>复制</Button> */}
                    {
                        ifConsigneeInfoEditable ? (
                            isEdit ?
                            <Button className="editable-add-btn" onClick={this.handleEditSave}>{"保存"}</Button>
                            :<Button className="editable-add-btn" onClick={this.handleEdit}>{"修改"}</Button>
                        
                        ) : null
                    }
                </div>
                {content}
            </div>
        );
    }
}

export default ConsigneeInfo
