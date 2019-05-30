import React, { Component } from 'react';
import { Menu, Dropdown, Icon, message } from 'antd';

import Modal from '../../../../components/Modal';
import Modal2 from '../../../../components/Modal2';
import Detail from '../detail';
import AddEdit from '../addEdit';
import LogDetail from '../logDetail';
import { filterRequest, notempty, showConfirm } from "../../../../utils";
import { post } from "../../../../../util/axios";
import { path } from "../../../../configs";

import Functions from '../../../../../components/functions';

class Options extends Component {
    state = {
        checkVisible: false,
        addVisible: false,
        logVisible: false
    }

    // 打开弹窗
    showModal = (name) => {
        this.setState({
            [name]: true,
        });
    };

    // 取消弹框
    handleCancel = (name) => {
        this.setState({
            [name]: false,
        });
    }

    // 停用 启用
    sensitiveDeleteOrReduction = (type, info) => {
        const { item } = this.props;
        const sensitiveId = [];
        sensitiveId.push(item.id);
        showConfirm(
            '提示！',
            `确定要${info}该项敏感词？`,
            () => this.commonRequest('sku/BatchOptions/batchOptions', {
                type: type,
                id: sensitiveId,
            })
        )
    }

    // 请求
    commonRequest = (url, value) => {
        post(path.irp + url, value).then(data => {
            if (data && data.state === "000001") {
                message.success('操作成功.');
                this.props.listFetch();
            }
        })
    }

    // 修改敏感sku库
    handleOkEdit = () => {
        const { item } = this.props;
        this.refs.form.validateFields((err, values) => {
            if (!err) {
                let data = {};
                if (values.isSensitive === 1) {
                    const { disableinfoRef,getReason } = this.state;
                    data = disableinfoRef.getData();
                    let reason = [];
                    if(getReason){
                        reason = getReason()
                    }
                    if (!reason || !reason.length) return message.warning("请填写敏感信息");

                    values.reason = reason;
                    values.reason.forEach((v, index) => {
                        if (v && v.reasonId) {
                            reason.push({
                                id: index,
                                remarks: v.remarks
                            })
                        }
                    })

                }
                let params = {
                    ...values,
                    ...data
                }
                params.sku = values.sku.split(','),
                    params.id = item.id
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

    
    // 用于获取 Disableinfo 组件
    getRef = (a) => this.setState({ disableinfoRef: a })    
    // 用于获取 getReason
    getReason = (a) => this.setState({ getReason: a })


    render() {
        const { item } = this.props;
        const { checkVisible, addVisible, logVisible } = this.state;

        const menu = (
            <Menu>
                <Menu.Item key="1">
                    <Functions {...this.props} functionkey="007-000001-000002-002">
                        <span className="btn-name" onClick={() => this.showModal('addVisible')}>编辑</span>
                    </Functions>
                </Menu.Item>
                <Menu.Item key="2">
                    <Functions {...this.props} functionkey="007-000001-000002-004">
                        <span className="btn-name" onClick={() => this.sensitiveDeleteOrReduction(1, '停用')}>停用</span>
                    </Functions>
                </Menu.Item>
                <Menu.Item key="3">
                    <Functions {...this.props} functionkey="007-000001-000002-007">
                        <span className="btn-name" onClick={() => this.showModal('logVisible')}>日志</span>
                    </Functions>
                </Menu.Item>
            </Menu>
        );
        const menu2 = (
            <Menu>
                <Menu.Item key="1">
                    <Functions {...this.props} functionkey="007-000001-000002-003">
                        <span className="btn-name" onClick={() => this.sensitiveDeleteOrReduction(2, '启用')}>启用</span>
                    </Functions>
                </Menu.Item>
                <Menu.Item key="2">
                    <Functions {...this.props} functionkey="007-000001-000002-007">
                        <span className="btn-name" onClick={() => this.showModal('logVisible')}>日志</span>
                    </Functions>
                </Menu.Item>
            </Menu>
        );

        // 停用
        const delteOption = (
            <div className="options-style">
                <Functions {...this.props} functionkey="007-000001-000002-001">
                    <div className="inline-block">
                        <Modal
                            component={(<Detail item={item} />)}
                            width={'900px'}
                            btnName="查看"
                            title="查看详情"
                            btnType="font"
                            visible={checkVisible}
                            showModal={() => this.showModal('checkVisible')}
                            handleCancel={() => this.handleCancel('checkVisible')}
                            footer={true}
                        />
                    </div>
                </Functions>
                <Functions {...this.props} functionkey={["007-000001-000002-003", "007-000001-000002-007"]}>
                    <div className="inline-block">
                        <Dropdown
                            overlay={menu2}
                            trigger={['click']}
                        >
                            <span>
                                更多 <Icon type="down" />
                            </span>
                        </Dropdown>
                    </div>
                </Functions>
            </div>
        );



        // 在用
        const useOption = (
            <div className="options-style">
                <Functions {...this.props} functionkey="007-000001-000002-001">
                    <div className="inline-block">
                        <Modal
                            component={(<Detail item={item} />)}
                            width={'900px'}
                            btnName="查看"
                            title="查看详情"
                            btnType="font"
                            visible={checkVisible}
                            showModal={() => this.showModal('checkVisible')}
                            handleCancel={() => this.handleCancel('checkVisible')}
                            footer={true}
                        />
                    </div>
                </Functions>
                <Functions {...this.props} functionkey={["007-000001-000002-002", "007-000001-000002-004", "007-000001-000002-007"]}>
                    <div className="inline-block">
                        <Dropdown
                            overlay={menu}
                            trigger={['click']}
                        >
                            <span>
                                更多 <Icon type="down" />
                            </span>
                        </Dropdown>
                    </div>
                </Functions>
            </div>
        );

        const optionsSelect = () => {
            switch (item.useState) {
                case 1:
                    return (
                        <div>
                            {useOption}
                        </div>
                    )
                    break;
                case 2:
                    return (
                        <div>
                            {delteOption}
                        </div>
                    )
                    break;
                default:
                    return null
            }
        }

        return (
            <div>
                {optionsSelect()}
                <Modal2
                    component={(<AddEdit getReason={this.getReason} getRef={this.getRef} item={item} ref="form" />)}
                    title="编辑已审SKU库"
                    visible={addVisible}
                    handleOk={this.handleOkEdit}
                    handleCancel={() => this.handleCancel('addVisible')}
                    width={700}
                />
                <Modal2
                    component={(<LogDetail item={item} />)}
                    title="操作日志"
                    visible={logVisible}
                    handleCancel={() => this.handleCancel('logVisible')}
                    width={600}
                    footer={null}
                />
            </div>
        );
    }
}

export default Options;