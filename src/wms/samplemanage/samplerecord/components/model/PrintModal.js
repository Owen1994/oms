import React from 'react';
import {
    Col,
    Form,
    Modal, Row,
} from 'antd';

/**
 *  打印
 */
const FormItem = Form.Item;
const formItemLayout = {
    wrapperCol: { span: 20 },
};

export default class PrintModal extends React.Component {
    onCancel = () => {
        const cancel = this.props.cancel;
        if (cancel) {
            cancel();
        }
    };

    onOk = () => {
        this.onCancel();
    };

    render() {
        const {
            visible,
        } = this.props;
        const {
            url, sampleNumber, addressee, address, printer, printTime,
        } = this.props.printInfo;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="样品寄出信息"
                width={500}
                visible={visible}
                onCancel={this.onCancel}
                onOk={this.onOk}
                maskClosable={false}
            >
                <div className="wms-search">
                    <div>
                        {url ? (
                            <img
                                src={url}
                                height={30}
                                width={200}
                                alt=""
                            />
                        ) : null}
                    </div>
                    <div>{sampleNumber}</div>
                    <FormItem
                        {...formItemLayout}
                        label="收件人:"
                    >
                        {getFieldDecorator('principal', {})(
                            <div>{addressee}</div>,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="收件地址:"
                    >
                        {getFieldDecorator('principal', {})(
                            <div>{address}</div>,
                        )}
                    </FormItem>
                    <Row type="flex">
                        <Col span={12}>
                            <FormItem
                                label="打印人"
                            >
                                {getFieldDecorator('principal', {})(
                                    <div>{printer}</div>,
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                label="打印日期"
                            >
                                {getFieldDecorator('principal', {})(
                                    <div>{printTime}</div>,
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </Modal>
        );
    }
}
