/**
 *作者: chenlin
 *功能描述: 弹窗
 *时间: 2018/10/27 11:55
 *参数：visible  可见性
        onCancel 取消
        onSearch 确定
        searchContent  搜索内容字段
        title   标题
        count   输入数量限制
 */
import React from 'react';
import {
    Form,
    Modal,
    Button,
    Input,
} from 'antd';

const FormItem = Form.Item;
export default class OrderCommonSearchModal extends React.Component {
    state = {
        loading: false,
    }
    
    // 弹窗提交
    handleOk = () => {
        const { onSearch, onCancel, visible } = this.props;
        if (visible) {
            this.setState({
                loading: true,
            });
            if(onSearch){
                setTimeout(() =>{
                    onSearch();
                    onCancel();
                },1000);
            }else{
                onCancel();
            }
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

    // 输入数量校验
    countHandle = (rule, value, callback) => {
        const { count } = this.props;
        if (value && value.split('\n').length > count) {
            callback(`最多支持${count}个输入!`);
        } else {
            callback();
        }
    }

    render() {
        const { visible, onCancel, searchContent = 'searchContent', title = '批量查询', count } = this.props;
        const { loading } = this.state;
        const { getFieldDecorator } = this.props.form;
        const rules = [{required: false, message: `请输入`}];
        if(count){
            rules.push({ validator: this.countHandle });
        }
        return (
            <div>
                <Modal
                    {...this.props}
                    title={title}
                    visible={visible}
                    footer={[
                        <Button key="cancel" onClick={onCancel}>取消</Button>,
                        <Button
                            key="save"
                            type="primary"
                            onClick={() => this.handleOk()}
                            loading={loading}
                        >确认
                        </Button>,
                    ]}
                    className="pms-purchaseroleset-modal"
                >
                   <FormItem>
                        {getFieldDecorator(searchContent, { rules })(
                            <Input.TextArea  rows={3} placeholder="每行一个模板编号(支持excel复制粘贴)" autosize={{ minRows: 10, maxRows: 15 }}/>
                        )}
                    </FormItem>
                </Modal>
            </div>
        );
    }
}
// export default Form.create()(OrderCommonSearchModal);
