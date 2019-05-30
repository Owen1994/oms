import React from 'react';
import {
    Button, Form, Input, message, Upload
} from 'antd';
import { fetchUpload, openDownloadFile } from '../../../../util/fetch';
import { downloadUrl } from '../../../../util/baseTool';

const FormItem = Form.Item;

class CalSaleModal extends React.Component {
    state = {
        uploadFileList: []
    }

    beforeUpload = (file, fileList) => {
        const reg = /\.(xls|xlsx)$/i;
        if (!reg.test(file.name)) {
            message.error('请上传xls、xlsx格式文件！');
            return false;
        }
        message.info('文件正在上传，请稍候');
        fetchUpload('/yks/file/server/', fileList).then((data) => {
            if (data.state === '000001') {
                const fileUrl = data.data[0] && data.data[0].path;
                const name = data.data[0] && data.data[0].filename;
                this.setState({
                    uploadFileList: [{
                        name,
                        uid: file.uid,
                        url: fileUrl
                    }],
                });
                this.props.form.setFieldsValue({
                    file: [{
                        fileName: name,
                        filePath: fileUrl
                    }]
                })
                message.success('文件上传成功');
            }
        });
    }

    // 文件移除
    removeUpload = () => {
        this.setState(({ uploadFileList }) => {
            const index = uploadFileList.indexOf(file);
            const newFileList = uploadFileList.slice();
            newFileList.splice(index, 1);
            return {
                uploadFileList: newFileList,
            };
        });
        this.props.form.setFieldsValue({file: []})
    };

    render() {
        const { uploadFileList } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form>
                    <div className="ant-row ant-form-item">
                        <div className="ant-col-8 ant-form-item-label">
                            <div className="ant-form-item-required">导入文件：</div>
                        </div>
                        <div className="ant-col-13 ant-form-item-control-wrapper" style={{ paddingTop: 3 }}>
                            <Upload
                                beforeUpload={this.beforeUpload}
                                onRemove={this.removeUpload}
                                fileList={uploadFileList}
                            >
                                <Button>选择文件上传</Button>
                            </Upload>
                            {/* TODO add downloadurl  */}
                            <div className='ref-theme download-import-temp' onClick={() => openDownloadFile(downloadUrl('/download/publish/ebay_computed_sale_template.xls'))}>下载导入模板</div>
                        </div>
                    </div>
                    <div className="ant-row">
                        <div className="ant-col-8"></div>
                        <div className="ant-col-13 text-danger" style={{ fontSize: 12, marginTop: 6 }}>注：文件仅支持xls、xlsx格式</div>
                    </div>
                    <FormItem>
                        {getFieldDecorator('file', {
                            initialValue: []
                        })(
                            <Input type='hidden' />,
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default Form.create()(CalSaleModal);