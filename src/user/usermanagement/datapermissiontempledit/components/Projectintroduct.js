// 方案简介模块
import React, { Component } from 'react';
import {
    Form,
    Row,
    Col,
    Input,
} from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

class Projectintroduct extends Component {

    state={
        organitag: 'templName',
        switch: true,
    }

    formItemLayout2 = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }

    formItemLayout3 = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    }


    // 搜索类型切换
    handleChangeSKU(tag) {
        this.setState({ organitag: tag, switch: !this.state.switch });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="newCluenk">
                <Form layout="inline">
                    <div className="content shujufangan">
                        <Row className="pad-top-bottom8">
                            <Col span={10}>
                                <FormItem
                                    {...this.formItemLayout2}
                                    label="数据方案名称"
                                    className="ant-xs-row "
                                >
                                    {getFieldDecorator('templName', {
                                        rules: [{ required: true, message: '请填写方案名称' }], initialValue: '',
                                    })(
                                        <Input />,
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row className="pad-top-bottom8">
                            <Col span={10}>
                                <FormItem {...this.formItemLayout2} label="备注" className="ant-xs-row areaTop">
                                    {getFieldDecorator('remark', {
                                        rules: [{ required: false, message: '请填写备注' }], initialValue: '',
                                    })(
                                        <TextArea rows={2} maxLength="100" placeholder="请简要描述这个内容,最大100个字符" autosize={{ minRows: 2, maxRows: 15 }} />,
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Projectintroduct;
