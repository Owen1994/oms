import React from 'react'
import moment from 'moment';
import {
    Modal,
    Form,
    Input,
    Select,
    Radio,
    DatePicker,
} from 'antd'
import CSelect from '../../../../../components/cselect';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

class SynchronizeData extends React.Component {
    state = {
        loading: false,
        selected: 1,
    };
    formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 },
    };
    //表单提交
    handleSubmit = () => {
        const {getParams,ids,synchronizeDataPost} = this.props;
        const {selected} = this.state;
        let params = {selected}
        if(selected === 1){
            params.ids = ids
        }else if(selected === 2){
            let value = getParams();
            params.params = value
        }
        this.setState({ loading: true });
        synchronizeDataPost(params)
        .then(result => {
            if (result.state === '000001') {
                this.handleCancel();
                this.props.getList();
            }
        })
        .fianlly(()=>{
            this.setState({ loading: false })
        })
    };
    //取消
    handleCancel = () => {
        this.setState({
            loading: false,
            selected: 1,
        });
        this.props.form.resetFields();
        this.props.closeModal();
    };
    onChange = (value) => {
        let v = value.target.value
        this.setState({
            selected: v
        });

    }
    render() {
        const { visible } = this.props;
        const { selected,loading } = this.state
        return (
            <div className="shopee-order-modal">
                <Modal
                    visible={visible}
                    title={'同步平台数据'}
                    destroyOnClose={true}
                    width={500}
                    onCancel={this.handleCancel}
                    onOk={this.handleSubmit}
                    confirmLoading={loading}
                >
                    <Form>
                        <div className="shopee-order-modal-form">
                            <FormItem
                                {...this.formItemLayout}
                                label="应用范围"
                            >
                                <RadioGroup size="small" value={selected} onChange={this.onChange}>
                                    <Radio value={1}>当前搜索条件下数据</Radio>
                                    <Radio value={2}>选中数据</Radio>
                                </RadioGroup>
                                <p className="red">每次最多处理2000条数据</p>
                            </FormItem>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default SynchronizeData
