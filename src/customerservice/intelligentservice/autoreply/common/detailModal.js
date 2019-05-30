import React from 'react';
import {
    Modal,
    Form,
    Input,
    Row,
    Col,
} from 'antd';
import Title from './title';
import Chunk from './chunk';
// import { logisticsPlate } from '../constants/index';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class GrabModal extends React.Component {
    state = {
        selectableList: [],
        selectData: {
            platformId: [],
        },
    };

    formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };

    componentWillReceiveProps(next) {
        const { visible, record, getDetailAsync } = next;
        if (visible && !this.props.visible && record && record.ruleId) {
            const { setFieldsValue } = this.props.form;
            getDetailAsync({ ruleId: record.ruleId })
                .then((result) => {
                    if (!result) return;
                    const { selectData } = this.state;
                    const condition = result.condition || [];
                    const data = this.parse(condition);
                    // debugger;
                    condition.forEach((v) => {
                        selectData[v.conditionCode] = v.conditionValue;
                    });
                    selectData.platformId = [result.platform];
                    this.setState({
                        selectableList: data,
                    }, () => {
                        setFieldsValue({
                            templateId: result.sendContent,
                        });
                    });
                });
        }
    }

    parse = data => data.map((v) => {
        const obj = {};
        const list = v.conditionValue;
        obj.key = v.conditionCode;
        obj.label = v.conditionName;
        obj.list = list;
        obj.isUsing = true;
        return obj;
    })

    // 取消
    handleCancel = () => {
        this.props.form.resetFields();
        this.props.closeModal();
    };

    render() {
        const {
            selectData,
            selectableList,
        } = this.state;
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Modal
                    visible={visible}
                    title="规则详情"
                    destroyOnClose
                    maskClosable={false}
                    width={1000}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <Row className="autoreply-set-add-modal">
                        <Col span={12} className="padding-sm-right">
                            <Title title="已选条件" isImportant>
                                <FormItem
                                    {...this.formItemLayout}
                                    label="平台"
                                >
                                    <Chunk showIcon={false} content={selectData.platformId} />
                                </FormItem>
                                {
                                    selectableList.map((val) => {
                                        const {
                                            key,
                                            label,
                                            isUsing,
                                        } = val;
                                        if (!isUsing) return null;
                                        return (
                                            <FormItem
                                                key={key}
                                                {...this.formItemLayout}
                                                label={label}
                                            >
                                                <Chunk isDelieverTime={key === 'shippingTimeRange'} showIcon={false} content={selectData[key]} type={key} />
                                            </FormItem>
                                        );
                                    })
                                }
                            </Title>
                        </Col>
                        <Col span={12} className="padding-sm-left">
                            <Title title="已选模板（预览）" isImportant>
                                <FormItem>
                                    {
                                        getFieldDecorator('templateId')(
                                            <TextArea readOnly autosize={{ minRows: 20, maxRows: 20 }} />,
                                        )
                                    }
                                </FormItem>
                            </Title>
                        </Col>
                    </Row>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(GrabModal);
