
import React from 'react';
import { Button, Upload, message } from 'antd';
import { fetchUpload } from '../../../../util/fetch';
import { popUpImage, angentPicUrl } from '@/util/baseTool';

class UploadEvidenceModal extends React.Component {
    // 图片后缀名
    extensionsImg = ['JPG', 'JPEG', 'PNG', 'BMP', 'GIF']

    //  PDF
    extensionsPdf = ['PDF']

    state = {
        uploadFileList: [],
    }

    beforeUpload = (file, fileList) => {
        const reg = /\.(jpg|jpeg|png)$/i;
        if (reg.test(file.name)) {
            const { uploadFileList } = this.state;
            if (uploadFileList.length >= 1) {
                message.error('文件不能超过1个');
                return false;
            }
            if (file.size > 2097152) {
                message.error('文件大小不得超过2MB！');
                return false;
            }
            message.info('文件正在上传，请稍候');
            fetchUpload('/yks/file/server/', fileList).then((data) => {
                if (data.state === '000001') {
                    const fileUrl = data.data[0] && data.data[0].path;
                    const params = {};
                    const arr = fileUrl.split('/');
                    const str = arr[arr.length - 1].split('.')[0];
                    const extension = arr[arr.length - 1].split('.')[1];
                    params.url = fileUrl;
                    params.thumbUrl = fileUrl;
                    params.name = str.slice(0, str.length - 14);
                    params.uid = file.uid;
                    params.extension = extension;
                    this.setState({
                        uploadFileList: [...params],
                    });
                    message.success('文件上传成功');
                }
            });
        } else {
            message.error('请上传JPG、JPEG、PNG格式文件！');
            return false;
        }
    }

    // 文件移除
    removeUpload = (file) => {
        this.setState(({ uploadFileList }) => {
            const index = uploadFileList.indexOf(file);
            const newFileList = uploadFileList.slice();
            newFileList.splice(index, 1);
            return {
                uploadFileList: newFileList,
            };
        });
    };

    // 文件预览
    preview = (v) => {
        const { extension, url } = v;
        const e = extension.toUpperCase();
        if (this.extensionsImg.includes(e)) {
            popUpImage(url, true);
        } else if (this.extensionsPdf.includes(e)) {
            window.open(url, '_blank');
        }
    }

    render() {
        const { uploadFileList } = this.state;
        return (
            <div className="upload-evidenve-modal">
                <div className="ant-row">
                    <div className="ant-col-4 ant-form-item-label">
                        <div className="ant-form-item-required">上传证据：</div>
                    </div>
                    <div className="ant-col-18">
                        <Upload
                            beforeUpload={this.beforeUpload}
                            onRemove={this.removeUpload}
                            fileList={[]}
                            // listType="picture"
                        >
                            <Button>选择文件上传</Button>
                        </Upload>
                        <div className="margin-sm-top">
                            {
                                uploadFileList.map((v) => {
                                    const {
                                        name, extension,
                                    } = v;
                                    return (
                                        <div className="chat-selected-file" key={v.uid}>
                                            {name}.{extension}
                                            <span className="margin-sm-left" onClick={() => this.removeUpload(v)}> 删除</span>
                                            <i className="margin-sm">|</i>
                                            <span onClick={() => this.preview(angentPicUrl(v))}>预览</span>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                <p style={{ color: 'red', padding: '10px 0 0 95px' }}>注：只能上传1个文件，大小不能超过2MB，支持JPG、JPEG、PNG格式</p>
            </div>
        );
    }
}
export default UploadEvidenceModal;
