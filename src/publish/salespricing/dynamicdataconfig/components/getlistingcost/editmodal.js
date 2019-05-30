import React from 'react';
import {
    Modal,
    Row,
    Col,
    Input,
    InputNumber,
    Form,
    Table,
    message
} from 'antd';
import {GET_PLATFORM} from "../../constants/Api";
const FormItem = Form.Item;
import CSelect from '../../../../../components/cselect'

export default class EditModal extends React.Component{
    formItemLayout = {
        labelCol: {
            sm: { span: 5 },
        },
        wrapperCol: {
            sm: { span: 19 },
        },
    };
    columns = [{
        title: '站点',
        dataIndex: 'siteCode',
        key: 'siteCode',
        render: (text, record, index)=>{
            const {getFieldDecorator} = this.props.form;
            return (
                <div>
                    <span>{record.key}</span>
                    <FormItem>
                        {getFieldDecorator(`params[listingExpense][${index}][siteCode]`,{
                                initialValue: record.key,
                            })(
                            <Input type={'hidden'} />
                        )}
                    </FormItem>
                </div>
            )}
    },{
        title: 'listing刊登费（USD）',
        dataIndex: 'expense',
        key: 'expense',
        width: 130,
        render: (text, record, index)=>{
            const {getFieldDecorator} = this.props.form;
            return (
                <FormItem>
                    {getFieldDecorator(`params[listingExpense][${index}][expense]`,{
                        initialValue: text,
                    })(
                        <Input
                            onKeyUp={(e)=>this.handleInputEdit(e, `params[listingExpense][${index}][expense]`)}
                        />
                    )}
                </FormItem>
            )}
    },{
        title: 'listing刊登费率（%）',
        dataIndex: 'expenseRate',
        key: 'expenseRate',
        width: 130,
        render: (text, record, index)=>{
            const {getFieldDecorator} = this.props.form;
            return (
                <FormItem>
                    {getFieldDecorator(`params[listingExpense][${index}][expenseRate]`,{
                        initialValue: text,
                    })(
                        <Input
                            onKeyUp={(e)=>this.handleInputEdit(e, `params[listingExpense][${index}][expenseRate]`)}
                        />
                    )}
                </FormItem>
            )}
    }];
    handleInputEdit = (e, id)=>{
        const { setFieldsValue } = this.props.form;
        if(e.type === 'blur'){
            let val = e.target.value;
            let temp = '';
            const reg = /\d+\.\d{5,}/;
            const reg1 = /(\d+\.\d{4})\d*/;
            if(reg.test(val)){
                temp = Number(val.replace(reg1, "$1"))+ 0.0001;
                temp = temp.toString();
                // temp = temp.substring(0, temp.indexOf('.')+5);
                // console.log(temp)
                setFieldsValue({
                    [id]: temp
                });
            }
        }else{
            let val = e.target.value;
            const reg3 = /^\d+\.?(\d+)?/;
            val = reg3.exec(val);
            if(val && val.length > 0){
                setFieldsValue({
                    [id]: val[0]
                });
                if(val[0].length > 20){
                    setFieldsValue({
                        [id]: val[0].substring(0, 20)
                    });
                    message.info('不能超出20位字符！')
                }
            }else {
                setFieldsValue({
                    [id]: ''
                });
            }


        }
    };
    render(){
        const {
            visible,
            onCancel,
            onOk,
            listingExpenseData,
            getSite,
            editAbled,
            platForm,
        } = this.props;
        const {getFieldDecorator} = this.props.form;
        getFieldDecorator('params[listingId]');
        return (
                <Modal
                        title="修改"
                        visible={visible}
                        onOk={onOk}
                        onCancel={onCancel}
                        okText="保存"
                        cancelText="取消"
                    >
                        <div className={"edit-modal"}>
                            <Row>
                                <Col span={24}>
                                    <FormItem
                                        {...this.formItemLayout}
                                        label="平台"
                                    >
                                        {getFieldDecorator('editData[platformCode]')(
                                        <CSelect
                                            list={platForm} // 默认值列表
                                            code='key' // 列表编码字段
                                            name='label' // 列表名称字段
                                            url={GET_PLATFORM}
                                            params={{searchColumn: 'name'}} // 搜索参数
                                            placeholder={"请选择平台"}
                                            onChange={getSite}
                                            disabled={editAbled}
                                        />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row className={"margin-ss-top"}>
                                <Col span={24}>
                                    <FormItem
                                        {...this.formItemLayout}
                                        label="费用"
                                    >
                                        <Table
                                            columns={this.columns}
                                            dataSource={listingExpenseData}
                                            pagination={false}
                                            bordered={true}
                                            size={"small"}
                                        />
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row className={"margin-ss-top"}>
                                <Col span={24}>
                                    <FormItem
                                        {...this.formItemLayout}
                                        label="平台费率(%)"
                                    >
                                        {getFieldDecorator('params[platformExpenseRate]')(
                                            <Input
                                                onKeyUp={(e)=>this.handleInputEdit(e, 'params[platformExpenseRate]')}
                                                onBlur={(e)=>this.handleInputEdit(e, 'params[platformExpenseRate]')}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row className={"margin-ss-top"}>
                                <Col span={24}>
                                    <FormItem
                                        {...this.formItemLayout}
                                        label="PayPal费率(%)"
                                    >
                                        {getFieldDecorator('params[paypalRate]')(
                                            <Input
                                                onKeyUp={(e)=>this.handleInputEdit(e, 'params[paypalRate]')}
                                                onBlur={(e)=>this.handleInputEdit(e, 'params[paypalRate]')}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </div>
                    </Modal>
        )
    }
}