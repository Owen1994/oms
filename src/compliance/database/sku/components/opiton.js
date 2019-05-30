import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Menu, Icon, message } from 'antd';

import Modal from '../../../components/Modal';
import Detail from './addEdit';
import ExportModal from '../../../components/Import/export';
import Export from './export';
import { filterRequest, notempty, showConfirm } from "../../../utils";
import { path } from "../../../configs";
import { post } from "../../../../util/axios";
import { downloadUrl } from '@/util/baseTool';

import Functions from '../../../../components/functions';

class Option extends Component {
    state = {
        addVisible: false,
        exportVisible: false,
        isCancel: false,
        type: 1
    }

    // 保存敏感SKU库
    handleOkAdd = () => {
        this.refs.form.validateFields((err, values) => {
            // debugger;
            if (!err) {
                let data = {};
                if (values.isSensitive === 1) {
                    const { disableinfoRef,getReason } = this.state;
                    let reason = [];
                    if (getReason) {
                        reason = getReason()
                    }
                    if (!reason || !reason.length) return message.warning("请填写敏感信息");
                    values.reason = reason;
                    data = disableinfoRef.getData()
                }
                let params = {
                    ...values,
                    ...data
                }
                params.sku = values.sku && values.sku.split(',');
                // console.log(params)
                post(path.irp + 'sku/AddOrEdit/addOrEdit', filterRequest(params)).then(data => {
                    if (data && data.state === "000001") {
                        message.success('操作成功.');
                        this.props.listFetch();
                        this.setState({ addVisible: false })
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
        const { skuId, commonRequest } = this.props;
        var skuIdLenght = skuId.length;
        // key=1,批量停用; key=2,批量启用
        var key = parseInt(obj.key);
        if (skuIdLenght === 0) {
            message.warning('请选择处理项.');
        } else {
            if (key == 1) {
                showConfirm(
                    '提示！',
                    `确定要停用 ${skuIdLenght} 项敏感词？`,
                    () => commonRequest('sku/BatchOptions/batchOptions', {
                        type: key,
                        id: skuId,
                    })
                )
            } else if (key == 2) {
                showConfirm(
                    '提示！',
                    `确定要启用 ${skuIdLenght} 项敏感词？`,
                    () => commonRequest('sku/BatchOptions/batchOptions', {
                        type: key,
                        id: skuId,
                    })
                )
            }
        }
    }

    // 数据导出
    handleOkExport = () => {
        this.refs.form.validateFields((err, values) => {
            if (!err) {
                const searchData = this.props.form.getFieldsValue();
                searchData.useState = searchData.useState || [1];
                const { skuId } = this.props;
                const params = {
                    data: filterRequest(searchData),
                    field: values.field,
                    id: skuId,
                    type: values.type
                }
                post(path.irp + 'sku/Export/export', filterRequest(params)).then(data => {
                    if (data && data.state === "000001") {
                        message.success('操作成功.');
                        window.location.href = data.url;
                        this.setState({ exportVisible: false })
                    }
                })
            }
        });
    }

    // 导入敏感SKU配置
    uploadConfig = () => {
        const { type } = this.state;
        return {
            downloadUrl: downloadUrl('/download/compliance/sku-import_template.xlsx'),   // 模板下载地址
            uploadUrl: '/yks/file/server/',  // 文件导入网关接口
            uploadCheckUrl: path.irp + 'sku/Import/import',  // 文件校验接口
            confirmUrl: path.irp + 'sku/import/Confirm/confirm', // 文件数据入库接口
            params: {
                uploadType: type,  // 导入方式；1：全部；2：仅处理新的敏感词；3：仅更新
                stepInfo: ["数据准备", "数据验证", "导入结果"],
            },
            // 下载模板的请求参数
            onStepChange: () => {
                this.props.listFetch()
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
    // 用于获取 getReason
    getReason = (a) => this.setState({ getReason: a })

    render() {
        const { addVisible, isCancel, exportVisible } = this.state;
        const { useState } = this.props;
        const menu = () => {
            var state = useState[0];
            if (state === 1) {
                return (
                    <Functions {...this.props} functionkey="007-000001-000002-004">
                        <Menu onClick={this.onBatchDelete}>
                            <Menu.Item key="1">批量停用</Menu.Item>
                        </Menu>
                    </Functions>
                )
            } else if (state === 2) {
                return (
                    <Functions {...this.props} functionkey="007-000001-000002-003">
                        <Menu onClick={this.onBatchDelete}>
                            <Menu.Item key="2">批量启用</Menu.Item>
                        </Menu>
                    </Functions>
                )
            }
        };
        const dropdown = () => {
            var state = useState[0];
            if (state === 1 || state === 2) {
                return (
                    <Dropdown overlay={menu()}>
                        <Button>
                            批量操作 <Icon type="down" />
                        </Button>
                    </Dropdown>
                )
            }
        }
        return (
            <div className="margin-ss-bottom overflow-hidden">
                <div className="pull-left">
                    {dropdown()}
                </div>
                <div className="pull-right">
                    <Link className="ant-btn" to="/compliance/database/sku/conditionmenu/">
                        按条件获取
                    </Link>
                    <Functions {...this.props} functionkey="007-000001-000002-002">
                        <span className="margin-ss-left">
                            <Modal
                                component={(<Detail getReason={this.getReason} getRef={this.getRef} ref="form" />)}
                                btnName="新增已审SKU"
                                title="新增已审SKU"
                                iconType="plus"
                                btnType="button"
                                visible={addVisible}
                                showModal={() => this.showModal('addVisible')}
                                handleOk={this.handleOkAdd}
                                handleCancel={() => this.handleCancel('addVisible')}
                                width={700}
                            />
                        </span>
                    </Functions>
                    <Functions {...this.props} functionkey="007-000001-000002-005">
                        <span className="margin-ss-left">
                            <Button onClick={() => this.showModal('isCancel')}><Icon type="download" style={{ fontSize: 16 }} /> 数据导入</Button>
                            <ExportModal
                                title="导入已审SKU"
                                uploadConfig={this.uploadConfig()}
                                onCancel={() => this.handleCancel('isCancel')}
                                visible={isCancel}
                                onChangeRadioGroup={this.onChangeRadioGroup}
                                getSelectType={this.getSelectType}
                            />
                        </span>
                    </Functions>
                    <Functions {...this.props} functionkey="007-000001-000002-006">
                        <span className="margin-ss-left">
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
                        </span>
                    </Functions>
                </div>
            </div>
        );
    }
}

export default Option;