/**
 *作者: chenlin
 *功能描述: 弹窗
 *时间: 2018/10/27 11:55
 */
import React from 'react';
import {
    Form,
    Modal,
    Button,
    Input,
} from 'antd';

const FormItem = Form.Item;
class modal extends React.Component {
    
    // 弹窗提交
    handleOk = () => {
        // let { setFieldsValue } = this.props.form;
        if (this.props.visible) {
            this.props.onSearch();
            this.props.onCancel();
        } 
    }

    componentWillReceiveProps(nextProps){
        const visible = this.props.visible;
        const nextvisible = nextProps.visible;
        if(visible !== nextvisible){
            this.setState({
                loading: false,
            });
        }
    }

    render() {
        const { visible, onCancel } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Modal
                    {...this.props}
                    title="批量查询"
                    visible={visible}
                    onOk={() => this.handleOk()}
                    onCancel={onCancel}
                    okText="确认"
                    cancelText="取消"
                    maskClosable={false}
                    className="pms-purchaseroleset-modal"
                >
                   <FormItem>
                        {getFieldDecorator('searchContents', {rules: [{required: false, message: `请输入`}],
                        })(
                            <Input.TextArea  rows={3} placeholder="每行一个模板编号(支持excel复制粘贴)" autosize={{ minRows: 10, maxRows: 15 }}/>
                        )}
                    </FormItem>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(modal);
