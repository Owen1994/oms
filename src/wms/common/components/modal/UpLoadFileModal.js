import React from 'react';
import {
    Modal,
    Form,
    Upload,
    Button,
    Icon,
    message,
    Row,
    Col,
} from 'antd';
import {
    fetchPost,
    fetchUpload,
    downlodFile,
} from '../../../../util/fetch';

const FormItem = Form.Item;

/**
 * @hint 上传文件文案提示
 * @submitUrl 确认提交地址
 * @downLoadUrl 模板下载地址
 */
class UpLoadFileModal extends React.Component {
    state = {
        loading: false,
        fileList: [],
        fileUrls: [],
    };

    formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };

    // 表单提交
    handleSubmit = () => {
        const { mapParams } = this.props;
        let file;
        if (mapParams) {
            file = mapParams(this.state.fileUrls, this.state.fileList);
        } else {
            file = this.state.fileUrls;
        }
        if (!file.length) {
            message.warn('请上传文件');
            return;
        }
        const submitUrl = this.props.submitUrl;
        const params = this.props.params || {};
        const requestParams = {
            data: {
                file,
                ...params,
            },
        };
        fetchPost(submitUrl, requestParams, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.handleCancel();
                    this.props.sumbitSuccess(result);
                }
            });
    };

    // 取消
    handleCancel = () => {
        this.setState({
            loading: false,
            fileList: [],
            fileUrls: [],
        });
        this.props.form.resetFields();
        this.props.closeModal('2');
    };

    // 文件上传
    beforeUpload = (file, fileList) => {
        const { type = 'application/vnd.ms-excel' } = this.props;
        // 判断格式
        if (file.type !== type) {
            message.error('文件格式不对，请重新上传！');
            return false;
        }
        fetchUpload('/yks/file/server/', fileList).then((data) => {
            if (data.state === '000001') {
                this.setState((prevState) => {
                    const prevFileList = [...prevState.fileList];
                    const prevUrls = [...prevState.fileUrls];
                    prevFileList.push(fileList[0]);
                    prevUrls.push({
                        uid: fileList[0].uid,
                        fileUrl: data.data[0].path,
                        path: data.data[0].path,
                        size: fileList[0].size,
                        name: fileList[0].name,
                    });
                    return {
                        fileList: prevFileList,
                        fileUrls: prevUrls,
                    };
                });
            }
        });
        return false;
    };

    // 文件移除
    removeUpload = (file) => {
        const {
            fileList,
            fileUrls,
        } = this.state;
        const newFileList = fileList.filter(v => v.uid !== file.uid);
        const newFileUrls = fileUrls.filter(v => v.uid !== file.uid);
        this.setState({
            fileList: newFileList,
            fileUrls: newFileUrls,
        });
    }

    // 下载
    downLoad = () => {
        downlodFile(this.props.downLoadUrl);
    };

    render() {
        const {
            visible, hint, title, width = 500, downLoadUrl,
        } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="wms-modal">
                <Modal
                    maskClosable={false}
                    visible={visible}
                    title={title}
                    destroyOnClose
                    width={width}
                    onCancel={this.handleCancel}
                    onOk={this.handleSubmit}
                    confirmLoading={this.state.loading}
                >
                    <div>
                        <FormItem
                            {...this.formItemLayout}
                            label="上传文件"
                        >
                            <div>
                                {
                                    getFieldDecorator('uploadFile', {
                                        rules: [{ required: true, message: '请上传文件' }],
                                    })(
                                        <Upload
                                            fileList={this.state.fileList}
                                            beforeUpload={(file, fileList2) => this.beforeUpload(file, fileList2)}
                                            onRemove={file => this.removeUpload(file)}
                                        >
                                            <Button style={{ width: 260 }}>
                                                <Icon type="upload" />
                                                Upload
                                            </Button>
                                        </Upload>,
                                    )
                                }

                            </div>
                        </FormItem>
                        <div className="margin-ms-bottom">
                            <Row>
                                <Col offset={4}>
                                    <p>
                                        {hint}
                                    </p>
                                </Col>
                            </Row>
                        </div>
                        {downLoadUrl ? (
                            <Row>
                                <Col offset={4}>
                                    <Button onClick={this.downLoad}>
                                        <Icon type="download" />
                                        下载模板文件
                                    </Button>
                                </Col>
                            </Row>
                        ) : null}
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(UpLoadFileModal);
