import React from 'react';

import {
    Modal,
    Select,
    Button,
    Form,
    Input,
    message,
    Checkbox,
} from 'antd';
import { fetchPost } from '../../../../util/fetch';
import { CHANGE_UNORDER } from '../constants';
import CSelect from '../../../../components/cselect';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class logisticsCom extends React.Component {

    state = {
        loading: false,
    }

    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }

  
    
    saveHandle = () => {
        const { data } = this.props;
        const params = {
            keys: data,
        };
       
        const abnormalReason = this.props.form.getFieldValue('abnormalReason');
        if (abnormalReason) {
            params.abnormalReason = abnormalReason;
        } else {
            message.warning("请填写异常原因！");
            return false;
        }
        this.setState({
             loading: true            
        })
        fetchPost(CHANGE_UNORDER, { data: params })
            .then((result) => {
                if (result.state === '000001') {
                    message.success(result.msg);
                    this.modalCancel(true);
                    this.setState({
                        loading: false            
                   });
                   this.props.paginatihandle();
                }
            });
    }

    modalCancel = (flag = false) => {
        this.props.onCancel(flag);
    }
    
    render() {
        const { visible } = this.props;
        const { loading } = this.state;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const content = (
            <Form>
                <FormItem
                            className="mt8"
                            label="异常原因"
                            {...this.formItemLayout}
                        >
                            {getFieldDecorator(
                                'abnormalReason',
                                {
                                    rules: [{ required: true, message: '请填写异常原因！' }],
                                },
                            )(
                                <TextArea
                                    style={{ width: '80%' }}
                                />,
                            )}
                        </FormItem>
            </Form>
        );

        const footer = (
            <div>
                <Button onClick={this.modalCancel}>取消</Button>
                <Button onClick={this.saveHandle} loading={loading}>确认</Button>
            </div>
        );

        return (
            <Modal
                title="推送异常"
                width={600}
                destroyOnClose
                visible={visible}
                footer={footer}
                maskClosable={false}
                onCancel={this.modalCancel}
            >
                {content}
            </Modal>
        );
    }
}

export default Form.create()(logisticsCom);
