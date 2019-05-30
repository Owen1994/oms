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
    state = {
        loading: false,
    }
    
    // 弹窗提交
    handleOk = () => {
        const {getList,getParams,onCancel,visible} = this.props
        if (visible) {
            this.setState({
                loading: true,
            });
            setTimeout(() =>{
                let value = getParams()
                getList(value)
                onCancel()
            },1000);
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
        const { loading } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Modal
                    {...this.props}
                    title="批量查询"
                    visible={visible}
                    footer={[
                        <Button key="cancel" onClick={onCancel}>取消</Button>,
                        <Button
                            key="save"
                            type="primary"
                            onClick={ this.handleOk}
                            loading={loading}
                        >确认
                        </Button>,
                    ]}
                    className="pms-purchaseroleset-modal"
                >
                   <FormItem>
                        {getFieldDecorator('searchContent', {rules: [{required: false, message: `请输入`}],
                        })(
                            <Input.TextArea  rows={3} placeholder="每行一个模板编号(支持excel复制粘贴)" autosize={{ minRows: 10, maxRows: 15 }}/>
                        )}
                    </FormItem>
                </Modal>
            </div>
        );
    }
}
export default modal;
