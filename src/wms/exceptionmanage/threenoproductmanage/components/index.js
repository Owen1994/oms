import React from 'react';
import {
    Form, Input, message,
} from 'antd';
import '../css/index.css';
import PhotoUpload from '../../../../compliance/common/components/PhotoUpload';
import { UPLOAD_URL } from '../../../../constants';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

/**
 * 三无产品登记
 */
class App extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const upload = (
            <div className="upload">
                <FormItem
                    style={{ display: 'flex' }}
                    wrapperCol={{ span: 6 }}
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
                            wrapperCol={{ span: 8 }}
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
        );
        return (
            <div className="wms-threenoproductmanage white padding-ss">
                {upload}
            </div>
        );
    }
}

export default Form.create()(App);
