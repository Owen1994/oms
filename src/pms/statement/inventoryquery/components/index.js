import React from 'react';
import { message } from 'antd';
import { fetchUpload, fetchPost } from '@/util/fetch';
import { UPLOAD } from '../constants/Api';
import Functions from '../../../../components/functions';

class Retrieval extends React.Component {
    state = {
        file: null,
        uploading: false,
    };

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
    };

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
                        name: data.filename,
                        url: data.path,
                        size: data.size,
                    });
                    return;
                }
                message.error(result.msg);
            });
    };

    // 下一步
    next = () => {
        if (!this.limitImport) return;
        const warehouseType = this.props.warehouseType;
        const { name, url, size } = this.state;
        if (!url) return message.warning('先上传完文件');
        this.limitImport = false;
        this.setState({ uploading: true });
        fetchPost(UPLOAD, {
            data: {
                name,
                url,
                size,
                warehouseType,
            },
        })
            .then((result) => {
                message.success(result.msg);
                this.setState({ uploading: false });
                this.limitImport = true;
                if (result.state !== '000001') {
                    message.error('导入文件失败');
                } else{
                    message.success('导入文件成功');
                    setTimeout(() => {
                        window.location.href = '/pms/importexportmanage/importexportlist/';
                    }, 1000);
                }
            })
            .catch(() => {
                this.limitImport = true;
            });
    };

    render() {
        const { file } = this.state;
        const importElement = (
            <div className="padding-md">
                <div>
                    <div
                        className="publish-batch-upload-com"
                        style={{ display: "flex", paddingLeft: "10px" }}
                    >
                        <div style={{ lineHeight: "30px" }}>
                            <p>
                                <span className="red">*&nbsp;</span>
                                文件上传：
                            </p>
                        </div>

                        <div
                            className="publish-batch-upload-com-btn"
                            style={{ marginLeft: '6px'}}
                        >
                            <span>选择文件</span>
                            <input onChange={this.getFile} type="file"/>
                        </div>

                        {
                            file ? (
                                <div>
                                    <a
                                        href=""
                                        className="margin-ss-top breakwrod"
                                        style={{ display: 'inline-block' }}
                                    >
                                        {file.name}
                                    </a>
                                </div>
                            ) : null
                        }

                        <div
                            style={{
                                borderRadius:"5px",
                                border: "1px #ddd solid",
                                lineHeight: "30px",
                                marginLeft: "15PX",
                                textAlign:"center",
                                width:"80px",
                                cursor:"pointer",
                                color: '#666666',
                            }}
                        >
                            <p onClick={this.next}>确认上传</p>
                        </div>

                        <div
                            className="padding-ss-left"
                            style={{ lineHeight: "30px",flex: "1", textAlign: "right"}}
                        >
                            <a
                                href="http://ykspms.kokoerp.com/public/template/inventoryInquiry.csv"
                                download="下载导入模板"
                            >
                                下载导入模板
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        );

        return (
            <div className="yks-erp-search_order breadcrumb">
                { importElement }
            </div>
        );
    }
}

export default Retrieval;

