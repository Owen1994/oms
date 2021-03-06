import React from 'react';
import {
    Modal,
    Spin,
    Steps,
    Button,
    Icon,
    // Tooltip,
    message,
} from 'antd';
import { IMPORTSKU } from '../constants/Apis';
import { fetchUpload, fetchPost } from '../../../../util/fetch';
import { getLoginmsg, downloadUrl } from '../../../../util/baseTool';

const Step = Steps.Step;

export default class ImportModal extends React.Component {
    state = {
        current: 0,
        loading: false,
        file: null,
        uploading: false,
    }

    limitImport = true;

    steps = [{
        title: '数据准备',
    }, {
        title: '导入结果',
    }];

    getFile = (e) => {
        const files = e.target.files;
        const file = files[0];
        const { name, size } = file;
        const reg = /\.(xls|xlsx)$/i;
        if (!reg.test(name) && !size <= 2097152) {
            return message.warning('文件格式只支持 XLSX, XLS');
        }
        this.setState({
            file,
        }, () => {
            this.fileUpload();
        });
        e.target.value = '';
    }

    // 文件上传
    fileUpload = () => {
        const { file } = this.state;
        if (!file) {
            return message.warning('请选择文件');
        }
        this.setState({ uploading: true });
        return fetchUpload(undefined, [file])
            .then((result) => {
                this.setState({ uploading: false });
                if (result.state === '000001' && result.data && result.data.length) {
                    const data = result.data[0];
                    this.setState({
                        fileName: data.filename,
                        filePath: data.path,
                        size: data.size,
                    });
                    return;
                }
                message.error(result.msg);
            });
    }

    // 下一步
    next = () => {
        if (!this.limitImport) return;
        const warehouseType = 8;
        const importType = 4;
        const operator = getLoginmsg().userName;
        const { fileName, filePath, size } = this.state;
        if (!filePath) return message.warning('先上传完文件');
        this.limitImport = false;
        this.setState({ uploading: true });
        fetchPost(IMPORTSKU, {
            data: {
                fileName,
                filePath,
                size,
                warehouseType,
                operator,
                importType,
            },
        })
            .then((result) => {
                this.setState({ uploading: false });
                this.limitImport = true;
                if (result.state === '000001') {
                    // this.setState({ current: 1 });
                    message.success('导入文件成功');
                    setTimeout(() => {
                        window.location.href = '/basicdata/syncqueue/syncqueue/';
                    }, 2000);
                } else {
                    message.error('导入文件失败');
                }
            })
            .catch(() => {
                this.limitImport = true;
            });
    }

    handleCancel = () => {
        this.props.onCancel();
        this.setState({
            current: 0,
            loading: false,
            file: null,
            fileName: '',
            filePath: '',
            size: '',
        });
    }

    resetCom = () => {
        this.setState({
            current: 0,
            loading: false,
            file: null,
            fileName: '',
            filePath: '',
            size: '',
        });
    }

    render() {
        const {
            current,
            loading,
            file,
            uploading,
        } = this.state;
        const {
            visible,
        } = this.props;
        const importElement = (
            <div>
                <div>
                    <div className="tweb-choice-select tweb-list-filter-item" style={{ paddingLeft: '64px' }}>
                        1、准备数据 <a className="text-success" href={downloadUrl('/download/reportform/new-role.xlsx')}>下载导入模板</a>
                    </div>
                    <div className="publish-batch-upload-com" style={{ paddingLeft: '64px' }}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ lineHeight: '35px' }}>2、上传数据文件</div>
                            <div className="publish-batch-upload-com-btn margin-ss-left">
                                <span><Icon type="plus" />选择文件</span>
                                <input onChange={this.getFile} type="file" />
                            </div>
                        </div>
                        {
                            file ? <a href="" className="margin-ss-top breakwrod" style={{ display: 'inline-block' }}>{file.name}</a> : null
                        }
                        <p style={{ color: '#999999' }} className="margin-md-left">注：仅支持的文件类型xls,xlsx</p>
                    </div>
                </div>
                <div className="margin-ss-top padding-md-bottom">
                    <Button type="primary" onClick={this.next} className="pull-right" loading={uploading}>
                        <span>确认</span>
                    </Button>
                    <Button onClick={this.handleCancel} className="pull-right margin-sm-right">
                        <span>取消</span>
                    </Button>
                </div>
            </div>
        );
        const completedElement = (
            <div>
                <div className="publish-batch-import-result">
                    <Icon type="check-circle" className="publish-batch-import-success" />
                    <p>操作成功</p>
                    <div className="text-center margin-ms-top">
                        <Button type="primary" size="small" onClick={this.resetCom} className="margin-sm-right">
                            <span>再次导入</span>
                        </Button>
                        <Button size="small" onClick={this.handleCancel}>
                            <span>关闭</span>
                        </Button>
                    </div>
                </div>
            </div>
        );
        return (
            <Modal
                title="导入"
                width={600}
                visible={visible}
                footer={null}
                destroyOnClose
                maskClosable={false}
                onCancel={this.handleCancel}
            >
                <Spin spinning={loading} delay={500} tip="Loading...">
                    <div>
                        <Steps style={{ paddingLeft: '45px' }} current={current} labelPlacement="vertical">
                            {this.steps.map(item => <Step key={item.title} title={item.title} />)}
                        </Steps>
                        {
                            current === 0
                                ? importElement
                                : completedElement
                        }
                    </div>
                </Spin>
            </Modal>
        );
    }
}
