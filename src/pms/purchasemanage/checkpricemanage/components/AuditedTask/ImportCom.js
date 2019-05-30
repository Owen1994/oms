import React from 'react';

import {
    Modal,
    Button,
    Form,
    Row,
    Col,
    message, Upload,
} from 'antd';

import { fetchUpload } from '../../../../../util/fetch';


class logisticsCom extends React.Component {
    state = {
        files: [],
        fileList: undefined,
    };

    removeUpload = (file) => {
        this.setState(({ files }) => {
            const index = files.indexOf(file);
            const newFiles = files.slice();
            newFiles.splice(index, 1);
            return {
                files: newFiles,
                fileList: undefined,
            };
        });
    };

    saveHandle = () => {
        const { fileList } = this.state;
        if (!fileList) return message.warning('请选选择文件');

        const { getpriceManagementImportTaskAsync } = this.props;
        fetchUpload('/yks/file/server/', fileList)
            .then((result) => {
                if (result) {
                    const data = result.data[0];
                    getpriceManagementImportTaskAsync({
                        data: {
                            name: data.filename,
                            url: data.path,
                        }
                    })
                        .then((res) => {
                            if (res) {
                                message.success(res.msg);
                                this.modalCancel();
                                window.open('/pms/importexportmanage/importexportlist/', '_blank');
                            }
                        });
                }
            });
    };


    beforeUpload = (file, fileList) => {
        const reg = /\.(xls|xlsx|csv)$/i;  // excel文件格式校验 && file.size <= 2097152
        if (reg.test(file.name)) {
            this.setState({
                files: [file],
                fileList: fileList
            });
            message.success('文件添加成功');
        } else {
            message.error("请上传Excel文件！")
        }
        return false;
    };

    modalCancel = () => {
        this.removeFile();
        this.props.onCancel();
    };

    removeFile = () => {
        this.setState({
            files: [],
            fileList: undefined,
        })
    };

    render() {
        const { visible } = this.props;
        const { files } = this.state;
        const content = (
            <div>
                <Row className="sides-wrap">
                    <Col className="left-sides ant-form-item-required" span={9}>文件上传：</Col>
                    <Col span={15}>
                        <div>
                            <Upload
                                beforeUpload={this.beforeUpload}
                                onRemove={this.removeUpload}
                                fileList={files}
                                listType="text"
                            >
                                <Button type="primary" icon="plus">添加文件</Button>
                            </Upload>
                        </div>
                    </Col>
                </Row>
                <div className='download-template'>
                    <a href="http://dev.ykspms.kokoerp.com/attachment/import_pricecheck.csv">下载导入模板</a>
                </div>
            </div>
        );

        return (
            <Modal
                title="导入核价任务"
                width={400}
                destroyOnClose
                visible={visible}
                maskClosable={false}
                onCancel={this.modalCancel}
                onOk={this.saveHandle}
            >
                {content}
            </Modal>
        );
    }
}

export default Form.create()(logisticsCom);
