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
} from '../../../../../util/fetch';
import { IMPORT_SP_CAPACITY } from '../../constants/Api';
import { downloadUrl } from '@/util/baseTool';

const FormItem = Form.Item;

class ImportModal extends React.Component {
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
        const file = this.state.fileUrls.map(v => (
            { fileUrl: v.path, size: v.size }
        ));
        fetchPost(IMPORT_SP_CAPACITY, { data: { file } }, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.handleCancel();
                    this.props.handleSubmit();
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
        // 判断格式
        if (file.type !== 'application/vnd.ms-excel') {
            message.error('只允许上传.csv格式文件，请重新上传！');
            return false;
        }
        fetchUpload('/yks/file/server/', fileList).then((data) => {
            if (data.state === '000001') {
                this.setState((prevState) => {
                    const prevFileList = [...prevState.fileList];
                    const prevUrls = [...prevState.fileUrls];
                    prevFileList.push(fileList);
                    prevUrls.push({ uid: fileList[0].uid, path: data.data[0].path, size: fileList[0].size });
                    return {
                        fileList: prevFileList,
                        fileUrls: prevUrls,
                        loading: false,
                    };
                });
            }
        });
        return false;
    }

    // 文件移除
    removeUpload = (file) => {
        const {
            fileList,
            fileUrls,
        } = this.state;
        const newFileList = fileList.filter(v => v[0].uid !== file.uid);
        const newFileUrls = fileUrls.filter(v => v.uid !== file.uid);
        this.setState({
            fileList: newFileList,
            fileUrls: newFileUrls,
            loading: false,
        });
    }

    // 下载
    downLoadFile = () => {
        downlodFile(downloadUrl('/download/wms/stock_template.csv'));
    }

    render() {
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="wms-modal">
                <Modal
                    visible={visible}
                    title="批量导入"
                    destroyOnClose
                    width={500}
                    onCancel={this.handleCancel}
                    onOk={this.handleSubmit}
                    confirmLoading={this.state.loading}
                >
                    <Form>
                        <div className="wms-modal-form">
                            <FormItem
                                {...this.formItemLayout}
                                label="上传文件"
                            >
                                {
                                    getFieldDecorator('warehouseCode', {
                                        rules: [{ required: true, message: '请上传文件' }],
                                    })(
                                        <Upload
                                            beforeUpload={(file, fileList2) => this.beforeUpload(file, fileList2)}
                                            onRemove={file => this.removeUpload(file)}
                                        // accept="application/vnd.ms-excel"
                                        >
                                            <Button>
                                                <Icon type="upload" />
                                                Upload
                                            </Button>
                                        </Upload>,
                                    )
                                }
                            </FormItem>
                            <Row>
                                <Col offset={4}>
                                    <p>文件中一次上传的数量最好不要超过1000，大小最好不要超过500K。</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={4}>
                                    <Button onClick={this.downLoadFile}>
                                        <Icon type="download" />
                                        下载模板文件
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(ImportModal);
