import React from 'react';
import { Form, Modal, Input } from 'antd';
import { TRAJECTORY_STATESET } from '../constants/Api';
import { fetchPost } from '../../../../util/fetch';

const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
};

class EditModal extends React.Component {
    state = {
        submitState: false,
    };

    handleOk = () => {
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                this.setState({submitState: true});
                const item = this.props.item;
                const params = {...values};
                params.key = item.key;
                if (params.keyWords) {
                    params.keyWords = this.parseStrToArray(params.keyWords);
                }
                fetchPost(TRAJECTORY_STATESET, {data:params}, 1)
                .then((result) => {
                    this.setState({submitState: false});
                    if (result.state === '000001') {
                        this.props.onOk();
                    }
                });
            }
        });
    };

    parseStrToArray = (str) => {
        if (str && str.length > 0) {
            const array = str.split(/\n/g);
            return array.filter(item => item);
        }
        return [];
    };

    render(){
        const { onCancel, item, visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { submitState } = this.state;
        return (
            <Modal
                width={600}
                title="设置"
                visible={visible}
                onCancel={onCancel}
                onOk={this.handleOk}
                confirmLoading={submitState}
                destroyOnClose
            >
                <FormItem
                    {...formItemLayout}
                    label="轨迹状态"
                >
                    <p>{item.trajectoryState}</p>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="匹配关键词"
                >
                    {getFieldDecorator('keyWords', {
                        rules: [
                            {required: true, message: '匹配关键词为必填',},
                            {max: 5000, message: '字符最大字数不能超过5000',}
                        ],
                        initialValue: item.conversionKeyWord,
                    })(
                        <TextArea
                            rows={4}
                            placeholder="最多可输入5000个字符，支持换行输入多个关键词"
                        />
                    )}
                </FormItem>
            </Modal>
        )
    }
}

export default Form.create()(EditModal);
