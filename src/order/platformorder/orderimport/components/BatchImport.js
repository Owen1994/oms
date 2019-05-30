/**
 * 作者: 陈文春
 * 描述: 订单导入页面 - 批量导入组件
 * 时间: 2019年2月13日10:12:28
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
    Select,
} from 'antd';

import axios from "util/axios";
import { downlodFile } from 'util/fetch';
import { downloadUrl } from 'util/baseTool';

const Option = Select.Option;

export default class BatchImport extends Component {
    state = {
        visible: false,
        fileList: [],
        uploading: false,
        templateType: 1,    // 1通用模板  2亚马逊定制模板
    }

    // 打开弹窗
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    // 确定
    handleOk = () => {
        this.handleUpload();
        this.setState({
            visible: true,
        })
    }

    // 取消
    handleCancel = () => {
        this.setState({
            visible: false,
            fileList: [],
            uploading: false,
        })
    }

    // 文件上传
    handleUpload = () => {
        const {fileList, templateType} = this.state;
        const url = templateType === 2 ? '/oms/order/manage/motan/service/api/IOrderManageService/batchImportAmazonOrder'
            : '/oms/order/manage/motan/service/api/IOrderManageService/batchImportPlatformOrder';
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
                                    message.success('批量导入成功！');
                                    this.setState({
                                        fileList: [],
                                        uploading: false,
                                        visible: false,
                                    });
                                    location.href = '/order/basicdata/importexportrecords/';
                                }
                            }).catch(e => {
                            console.log(e);
                        })
                    }
                })
        } else {
            message.error(`请先上传批量导入模板文件！`);
        }
        return;
    }

    // 模板下载
    downloadTemplate = (e) => {
        const { templateType } = this.state;
        const link = templateType === 2 ? '/download/oms/amazon-batchImport-template.xlsx' : '/download/oms/import_template.xls';
        e.preventDefault();
        message.info("请求已发出，请等待下载！");
        downlodFile(downloadUrl(link));
    }

    render() {
        const {uploading, visible, fileList, templateType} = this.state;
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
                if (reg.test(file.name) && file.size <= 2097152) {
                    this.setState(({fileList}) => ({
                        fileList: [file],
                    }))
                } else {
                    message.error("请上传不大于2M的Excel文件！")
                }

                return false;
            },
            fileList: fileList,
            onChange: () => {
                this.setState({ uploading: false });
            },
        };
        return (
            <div className="newCluenk">
                <h1 style={{borderBottom: '1px solid #EAE9E9', fontSize: 16, padding: '10px 20px'}}>
                    批量导入
                </h1>
                <Button onClick={()=>this.showModal()} style={{margin: '10px 40px'}}>订单导入</Button>
                <Modal
                    title="批量导入"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText={uploading ? '上传中' : '确定'}
                    confirmLoading={uploading}
                >
                    <div>
                        <Row>
                            <Col span={6} className="text-right download-word">模板下载：</Col>
                            <Col span={8}>
                                <Select
                                    defaultValue={templateType}
                                    onChange={(val) => {this.setState({ templateType: val })}}
                                    className="download-select"
                                >
                                    <Option key={1} value={1}>通用模板</Option>
                                    <Option key={2} value={2}>亚马逊定制模板</Option>
                                </Select>
                            </Col>
                            <Col span={6}>
                                <Button onClick={this.downloadTemplate} className="download-btn">下载</Button>
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
                                    <p className="margin-ss-top">只能上传Excel格式文件，最多支持2000条数据</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>
        );
    }
}
