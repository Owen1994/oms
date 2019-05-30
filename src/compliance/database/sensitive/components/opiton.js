import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Menu, Icon, message } from 'antd';

import Modal from '../../../components/Modal';
import ExportModal from '../../../components/Import/export';
import Detail from './addEdit';
import Export from './export';
import Functions from '../../../../components/functions';
import {functions, downloadUrl} from '@/util/baseTool';
import { showConfirm, filterRequest, getArrKey } from '../../../utils';
import { path } from "../../../configs";
import { post } from "../../../../util/axios";

class Option extends Component {
    state = {
        addVisible: false,
        exportVisible: false,
        isCancel: false,
        type: 1
    }

    // 新增词库
    handleOkAdd = () => {
        const { disableinfoRef } = this.state;
        this.refs.form.validateFields((err, values) => {
            if (!err) {
                const data = disableinfoRef.getData()
                let params = {
                    ...values,
                    ...data
                }
                post(path.irp + 'sensitive/AddOrEdit/addOrEdit', params).then(data => {
                    if (data && data.state === "000001") {
                        message.success('操作成功.');
                        this.props.listFetch();
                        this.setState({ addVisible: false })
                    }
                })
            }
        });
    }

    // 数据导出
    handleOkExport = () => {
        this.refs.form.validateFields((err, values) => {
            if (!err) {
                const searchData = this.props.form.getFieldsValue();
                searchData.useState = searchData.useState || [1];
                const { sensitiveId } = this.props;
                const params = {
                    data: filterRequest(searchData),
                    field: values.field,
                    id: sensitiveId,
                    type: values.type
                }
                post(path.irp + 'sensitive/Export/export', filterRequest(params)).then(data => {
                    if (data && data.state === "000001") {
                        message.success('操作成功.');
                        window.location.href = data.url;
                        this.setState({ exportVisible: false })
                    }
                })
            }
        });
    }

    // 打开弹窗
    showModal = (name) => {
        this.setState({
            [name]: true,
        });
    };

    // 取消
    handleCancel = (name) => {
        this.setState({
            [name]: false,
        });
    }

    // 批量操作
    onBatchDelete = (obj) => {
        const { sensitiveId, commonRequest } = this.props;
        var senitiveIdLenght = sensitiveId.length;
        // key=1,批量停用; key=2,批量启用
        var key = parseInt(obj.key);
        if (senitiveIdLenght === 0) {
            message.warning('请选择处理项.');
        } else {
            if (key == 1) {
                showConfirm(
                    '提示！',
                    `确定要停用 ${senitiveIdLenght} 项敏感词？`,
                    () => commonRequest('sensitive/BatchOptions/batchOptions', {
                        type: key,
                        id: sensitiveId,
                    })
                )
            } else if (key == 2) {
                showConfirm(
                    '提示！',
                    `确定要启用 ${senitiveIdLenght} 项敏感词？`,
                    () => commonRequest('sensitive/BatchOptions/batchOptions', {
                        type: key,
                        id: sensitiveId,
                    })
                )
            } else if (key == 3) {
                showConfirm(
                    '提示！',
                    `确定要删除 ${senitiveIdLenght} 项敏感词？`,
                    () => commonRequest('sensitive/BatchDelete/batchDelete', {
                        ids: sensitiveId,
                    })
                )
            }
        }
    }

    // 导入敏感词配置
    uploadConfig = () => {
        const { type } = this.state;
        return {
            downloadUrl: downloadUrl('/download/compliance/compliance_sensitive1.xlsx'),   // 模板下载地址
            uploadUrl: '/yks/file/server/',  // 文件导入网关接口
            uploadCheckUrl: path.irp + 'sensitive/Import/import',  // 文件校验接口
            confirmUrl: path.irp + 'sensitive/import/Confirm/confirm', // 文件数据入库接口
            params: {
                uploadType: type,  // 导入方式；1：全部；2：仅处理新的敏感词；3：仅更新
                stepInfo: ["数据准备", "数据验证", "导入结果"],
            },
            // 下载模板的请求参数
            onStepChange: () => {
                this.props.listFetch()
                this.setState({
                    type: 1
                })
            }   // 文件导入操作完成以后的回调函数
        }
    }

    // 选择导入方式
    onChangeRadioGroup = (e) => {
        this.setState({
            type: e.target.value
        })
    }
    // 重置导入方式
    getSelectType = (type) => {
        this.setState({
            type: type
        })
    }

    // 用于获取 Disableinfo 组件
    getRef = (a) => this.setState({ disableinfoRef: a })


    getMenu = () => {
        const { useState } = this.props;
        var state = useState[0];
        let children = [];
        if (state === 1) {
            children.push(
                <Menu.Item key="1">
                    <Functions {...this.props} functionkey="007-000001-000001-004">
                        批量停用
                    </Functions>
                </Menu.Item>
            )
        } else if (state === 2) {
            if(functions(this, '007-000001-000001-003')){
                children.push(
                    <Menu.Item key="2">
                            批量启用
                    </Menu.Item>
                )
            }
            if(functions(this, '007-000001-000001-007')){
                children.push(
                    <Menu.Item key="3">
                        批量删除
                    </Menu.Item>
                )
            }
        }
        return (
            <Menu onClick={this.onBatchDelete}>
                {
                    children
                }
            </Menu>
        )
    };

    render() {
        const { addVisible, exportVisible, isCancel } = this.state;
        return (
            <div className="margin-ss-bottom overflow-hidden">
                <div className="pull-left">
                    <Dropdown overlay={this.getMenu()}>
                        <Button>
                            批量操作 <Icon type="down" />
                        </Button>
                    </Dropdown>
                </div>
                <div className="pull-right">
                    <span className="margin-ms-right">
                        <Functions {...this.props} functionkey="007-000001-000001-002">
                            <Modal
                                width='700px'
                                component={(<Detail ref="form" getRef={this.getRef} />)}
                                btnName="新增词库"
                                title="新增词库"
                                iconType="plus"
                                btnType="button"
                                visible={addVisible}
                                showModal={() => this.showModal('addVisible')}
                                handleOk={this.handleOkAdd}
                                handleCancel={() => this.handleCancel('addVisible')}
                            />
                        </Functions>
                    </span>
                    <span className="margin-ms-right">
                        <Functions {...this.props} functionkey="007-000001-000001-005">
                            <Button onClick={() => this.showModal('isCancel')}><Icon type="download" style={{ fontSize: 16 }} /> 数据导入</Button>
                            <ExportModal
                                title="导入敏感词"
                                uploadConfig={this.uploadConfig()}
                                onCancel={() => this.handleCancel('isCancel')}
                                visible={isCancel}
                                onChangeRadioGroup={this.onChangeRadioGroup}
                                getSelectType={this.getSelectType}
                            />
                        </Functions>
                    </span>
                    <span className="margin-ms-right">
                        <Functions {...this.props} functionkey="007-000001-000001-006">
                            <Modal
                                component={(<Export ref="form" />)}
                                btnName="数据导出"
                                title="数据导出"
                                iconType="export"
                                btnType="button"
                                visible={exportVisible}
                                showModal={() => this.showModal('exportVisible')}
                                handleOk={this.handleOkExport}
                                handleCancel={() => this.handleCancel('exportVisible')}
                            />
                        </Functions>
                    </span>
                    <Link className="ant-btn" to="/compliance/database/sensitive/reptilian/"><Icon type="api" style={{ fontSize: 16 }} /> 爬虫抓取</Link>
                </div>
            </div>
        );
    }
}

export default Option;