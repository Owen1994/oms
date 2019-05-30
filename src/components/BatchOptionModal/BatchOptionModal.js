/**
 * 作者: 陈文春
 * 描述: OMS - 批量弹窗组件
 * 时间: 2019年3月6日16:39:31
 * 参数: title      标题  
 *      visible       可见性
 *      closeModal      关闭弹窗函数
 *      url             请求url
 *      templateUrl    模板下载url
 *      fileSize        最大size
 *      maxCount        最大数量
 *      (具体可参考joom订单批量标记)
 **/
import React, {Component} from 'react';
import {
    Button,
    Row,
    Col,
    Upload,
    Icon,
    message,
    Modal,
} from 'antd';

import axios from "util/axios";
import { downlodFile } from 'util/fetch';

export default class BatchOptionModal extends Component {
    state = {
        fileList: [],
        uploading: false,
    }

    // 取消
    handleCancel = () => {
        this.setState({
            fileList: [],
            uploading: false,
        });
        this.props.closeModal();
    }

    // 文件上传
    handleUpload = () => {
        const { fileList } = this.state;
        const { url } = this.props;
        const headers = {'Content-Type': 'multipart/form-data'};
        if (fileList.length > 0) {
            const formData = new FormData();
            fileList.forEach((file) => {
                formData.append('file', file);
            });
            this.setState({
                uploading: true,
            });
            axios.post('/yks/file/server/', formData, {
                headers,
            })
                .then(response => {
                    if(response && response.data.state === '000001'){
                        axios.post(url, {...response.data})
                            .then(res => {
                                if (res && res.data.state === '000001') {
                                    message.success('批量标记成功！');
                                    this.setState({
                                        fileList: [],
                                        uploading: false,
                                    });
                                    this.props.closeModal();
                                    location.href = '/order/basicdata/importexportrecords/';
                                }
                            }).catch(e => {
                            console.log(e);
                        })
                    }
                })
        } else {
            message.error(`请先上传文件！`);
        }
        return;
    }

    // 模板下载
    downloadTemplate = (e) => {
        const { templateUrl } = this.props;
        e.preventDefault();
        message.info("请求已发出，请等待下载！");
        downlodFile(templateUrl);
    }

    render() {
        const { uploading, fileList } = this.state;
        const { title = '批量标记', visible = false, fileSize = 2, maxCount = 2000 } = this.props;
        const props1 = {
            action: '/yks/file/server/',
            onRemove: (file) => {
                this.setState(({fileList}) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                const reg = /\.(xls|xlsx)$/i;
                if(!reg.test(file.name)){
                    message.error(`请上传后缀为.xls或xlsx的Excel文件！`);
                } else if (file.size > parseInt(fileSize, 10) * 1024 * 1024) {
                    message.error(`请上传不大于${fileSize}M的Excel文件！`);
                } else {
                    this.setState(({fileList}) => ({
                        fileList: [file],
                    }))
                }
                return false;
            },
            fileList: fileList,
            onChange: () => {
                this.setState({ uploading: false });
            },
        };
        return (
            <Modal
                title={title}
                visible={visible}
                onOk={this.handleUpload}
                onCancel={this.handleCancel}
                okText={uploading ? '上传中' : '确定'}
                confirmLoading={uploading}
            >
                <div>
                    <Row>
                        <Col span={6} className="text-right">模板下载：</Col>
                        <Col span={18}>
                            <a onClick={this.downloadTemplate}>template.xlsx</a>
                        </Col>
                    </Row>
                    <Row className="margin-ms-top">
                        <Col span={6} className="text-right">上传选择：</Col>
                        <Col span={18}>
                            <div>
                                <Upload {...props1} fileList={fileList}>
                                    <Button
                                    >
                                        <Icon type="upload"/>选择上传文件
                                    </Button>
                                </Upload>
                                <p className="margin-ss-top">{`只能上传Excel格式文件，最多支持${maxCount}条数据`}</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Modal>
        );
    }
}
