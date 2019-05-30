import React from 'react'
import {
    Modal,
    Form,
    Input,
} from 'antd'
import { fetchPost } from '../../../../../util/fetch';
import CSelect from '../../../../../components/cselect';
import * as API from '../constants/Api'
const FormItem = Form.Item;

class MarkModal extends React.Component {
    state = {
        loading: false,
    };

    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    // 表单提交
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            const { pageNumber, pageData } = this.props;
            this.setState({ loading: true });
            if (!err) {
                fetchPost(API.EBAY_MARK_ORDER, {data: values}, 1)
                    .then((result) => {
                        if (result.state === '000001') {
                            this.handleCancel();
                            this.props.handleSubmit(pageNumber, pageData);
                        }
                    })
            }
        })
    };

    //取消
    handleCancel = () => {
        this.setState({loading: false});
        this.props.form.resetFields();
        this.props.closeModal();
    };
    render() {
        const { visible, orderNumber } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="ebayorder-modal">
                <Modal
                    visible={visible}
                    title={'标记跟踪号'}
                    destroyOnClose={true}
                    width={500}
                    onCancel={this.handleCancel}
                    onOk={this.handleSubmit}
                    confirmLoading={this.state.loading}
                >
                    <Form>
                        <div className="ebayorder-modal-form">
                            <FormItem
                                {...this.formItemLayout}
                                label="关联平台单号"
                            >
                                {
                                    getFieldDecorator('platformOrderNumbers',{
                                        rules: [{ required: true, message: '平台单号不能为空' }],
                                        initialValue: orderNumber ? orderNumber : ''
                                      })(
                                        <Input
                                            style={{ width: 260 }}
                                            onChange={()=>{this.setState({loading: false});}}
                                            disabled={Boolean(orderNumber)}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="物流渠道名称"
                                className="ebayorder-modal-cselect"
                            >
                                {
                                    getFieldDecorator('logisticChannel',{
                                        rules: [{ required: true, message: '物流渠道不能为空' }]
                                      })(
                                        <CSelect
                                            // list={details ? [details.platform] : []} // 默认值列表
                                            // list={[]}
                                            code='key' // 列表编码字段
                                            name='label' // 列表名称字段
                                            url={API.GET_EBAY_SHIPPING_PROVIDER}
                                            // mode='multiple' // 是否多选
                                            // maxCount={3} // 最多选择项数量
                                            // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                            params={{ data: {searchColumn: 'shippingCarrier', pageNumber: 1, pageData: 30, platformOrderNumbers: orderNumber} }} // 搜索参数
                                            // apiListType={1}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                            placeholder={'请选择'}
                                            onChange={()=>{this.setState({loading: false});}}
                                        //其它字段同 Select组件配置
                                        />
                                    )
                                }
                            </FormItem>
                             <FormItem
                                {...this.formItemLayout}
                                label="跟踪号"
                            >
                                {
                                    getFieldDecorator('trackNumber',{
                                        rules: [{ required: true, message: '跟踪号不能为空' }],
                                      })(
                                        <Input
                                            type="text"
                                            style={{ width: 260 }} 
                                            // maxLength={12}
                                            onChange={()=>{this.setState({loading: false});}}
                                        />
                                    )
                                }
                            </FormItem>
                        </div>
                        {/*<div className="ebayorder-submitBtn">*/}
                            {/*<Button onClick={this.handleCancel}>取消</Button>*/}
                            {/*<Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}>确定</Button>*/}
                        {/*</div>*/}
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(MarkModal)