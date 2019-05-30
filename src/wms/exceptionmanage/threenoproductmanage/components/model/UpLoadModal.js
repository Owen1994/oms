import React, { Component } from 'react';
import {
    Form, Input, message, Modal,
} from 'antd';
import PhotoUpload from '../../../../../compliance/common/components/PhotoUpload';
import { UPLOAD_URL } from '../../../../../constants';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class UpLoadModal extends Component {
    render() {
        const {
            visible, ok, cancel,
        } = this.props;
        const {
            getFieldDecorator,
        } = this.props.form;
        return (
            <Modal
                title="上传"
                width={670}
                visible={visible}
                onOk={ok}
                onCancel={cancel}
                maskClosable={false}
            >
                <div className="upload">
                    <FormItem
                        style={{ display: 'flex' }}
                        wrapperCol={{ span: 12 }}
                        label="扫描容器"
                    >
                        {getFieldDecorator('trackingNumber')(
                            <Input
                                placeholder="请扫描或输入运单编号"
                            />,
                        )}
                    </FormItem>
                    <div style={{ paddingLeft: 60 }} className="margin-sm-top">
                        <div style={{ display: 'flex' }}>
                            {getFieldDecorator('imageList', {
                                initialValue: [],
                            })(
                                <PhotoUpload
                                    action={UPLOAD_URL}
                                    maxLength={5}
                                    onChange={this.onChange}
                                    beforeUpload={(file) => {
                                        const isRightType = file.type === 'image/jpeg' || file.type === 'image/jpg';
                                        if (!isRightType) {
                                            message.error('文件格式必须为Jpg/Jpeg格式');
                                            return false;
                                        }
                                        const isSizeOk = file.size / 1024 / 1024 < 1;
                                        if (!isSizeOk) {
                                            message.error('上传文件不能大于1M');
                                            return false;
                                        }
                                        return true;
                                    }}
                                />,
                            )}
                        </div>
                        <div className="red">注：最多只能上传5张图片，仅限JPG/JPEG,在800*800以内，单张大小不能超过1M</div>
                        <div
                            className="margin-ms-top margin-ts-bottom"
                        >
                            备注
                            <FormItem
                                className="margin-ts-top"
                                wrapperCol={{ span: 22 }}
                            >
                                {getFieldDecorator('remark')(
                                    <TextArea
                                        placeholder="如无送货单，请在此写明原因"
                                        autosize={{ minRows: 2, maxRows: 5 }}
                                    />,
                                )}
                            </FormItem>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default UpLoadModal;
