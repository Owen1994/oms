import React from 'react';
import {
    Modal,
    Spin,
    Button,
    Icon,
    message,
} from 'antd';
import { IMPORT } from '../constants/Api';
import { fetchUpload, fetchPost } from '@/util/fetch';


export default class ImportModal extends React.Component {
    state = {
        current: 0,
        loading: false,
        file: null,
        uploading: false,
    }

    limitImport = true;

    getFile = (e) => {
        const files = e.target.files;
        const file = files[0];
        const { name, size } = file;
        const reg = /\.(xls|xlsx|csv)$/i;
        if (!reg.test(name) && !size <= 2097152) {
            return message.warning('文件格式只支持 XLSX, XLS,CSV');
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
                        fileURL: data.path,
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
        const warehouseType = this.props.warehouseType;
        const { fileName,fileURL, size } = this.state;
        if (!fileURL) return message.warning('先上传完文件');
        this.limitImport = false;
        this.setState({ uploading: true });
        fetchPost(IMPORT, {
            data: {
                fileName,
                fileURL,
                size,
                warehouseType,
            },
        })
            .then((result) => {
                this.setState({ uploading: false });
                this.limitImport = true;
                if (result.state === '000001') {
                    window.location.href = '/pms/importexportmanage/importexportlist/';
                    // this.setState({ current: 1 });
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
            fileURL: '',
            size: '',
        });
    }

    resetCom = () => {
        this.setState({
            current: 0,
            loading: false,
            file: null,
            fileName: '',
            fileURL: '',
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
                    <div className="publish-batch-upload-com" style={{display: "flex"}}>
                        <div style={{lineHeight: "30px"}}>
                            <p><span className="red">*</span>文件上传：</p>
                        </div>
                        <div className="publish-batch-upload-com-btn padding-ss-left">
                            <span><Icon type="plus" />选择文件</span>
                            <input onChange={this.getFile} type="file" />
                        </div>
                        {
                            file ? <a href="" className="margin-ss-top breakwrod" style={{ display: 'inline-block' }}>{file.name}</a> : null
                        }
                         <div className="padding-ss-left" style={{lineHeight: "30px"}}>
                            <a href="http://dev.ykspms.kokoerp.com/api/Importexport/downloadUserListTemplate" download="下载导入模板">下载导入模板</a>
                        </div>
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
        // const completedElement = (
        //     <div>
        //         <div className="publish-batch-import-result">
        //             <Icon type="check-circle" className="publish-batch-import-success" />
        //             <p>操作成功</p>
        //             <div className="text-center margin-ms-top">
        //                 <Button type="primary" size="small" onClick={this.resetCom} className="margin-sm-right">
        //                     <span>再次导入</span>
        //                 </Button>
        //                 <Button size="small" onClick={this.handleCancel}>
        //                     <span>关闭</span>
        //                 </Button>
        //             </div>
        //         </div>
        //     </div>);
        return (
            <Modal
                title="订单导入"
                width={600}
                visible={visible}
                footer={null}
                destroyOnClose
                onCancel={this.handleCancel}
            >
                <Spin spinning={loading} delay={500} tip="Loading...">
                    <div>
                        {
                            current === 0 ? importElement : null
                                // : completedElement
                        }
                    </div>
                </Spin>
            </Modal>
        );
    }
}
