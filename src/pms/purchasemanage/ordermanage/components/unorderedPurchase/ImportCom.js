import React from 'react';

import {
    Modal,
    Button,
    Form,
    Row,
    Col,
    message,
    Upload,
} from 'antd';

class importModal extends React.Component {
    state = {
        fileList: [],
        httpFileList: undefined,
        loading: false,
    };

    removeFile = () => {
        this.setState({
            fileList: [],
            loading: false,
        });
    };

    modalCancel = () => {
        this.removeFile();
        this.props.onCancel();
    };

    modalOK = () => {
        this.setState({ loading: true });
        this.props.onOK(this.state.httpFileList);
        this.modalCancel
    };

    removeUpload = (file) => {
        this.setState(({ fileList }) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            return {
                fileList: newFileList,
                httpFileList: undefined,
            };
        });
    };

    beforeUpload = (file, fileList) => {
        const reg = /\.(xls|xlsx|csv)$/i;  // excel文件格式校验 && file.size <= 2097152
        if (reg.test(file.name)) {
            this.setState({
                fileList: [file],
                httpFileList: fileList,
            });
            message.success('文件添加成功');
        } else {
            message.error("请上传Excel文件！")
        }
        return false;
    };

    render() {
        const { fileList } = this.state;
        const { visible } = this.props;
        const content = (
            <div>
                <Row className="sides-wrap">
                    <Col className="left-sides ant-form-item-required" span={9}>文件上传：</Col>
                    <Col span={15}>
                        <div>
                            <Upload
                                beforeUpload={this.beforeUpload}
                                onRemove={this.removeUpload}
                                fileList={fileList}
                                listType="text"
                            >
                                <Button type="primary" icon="plus">添加文件</Button>
                            </Upload>
                        </div>
                    </Col>
                </Row>
                <div className='download-template'>
                    <a href="http://dev.ykspms.kokoerp.com/template/changeSupplier.csv">下载导入模板</a>
                </div>
            </div>
        );

        return (
            <Modal
                title="更换供应商"
                width={400}
                destroyOnClose
                visible={visible}
                maskClosable={false}
                onCancel={this.modalCancel}
                onOk={this.modalOK}
                okText={'导入'}
            >
                {content}
            </Modal>
        );
    }
}

export default Form.create()(importModal);
