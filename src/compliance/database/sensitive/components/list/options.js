import React, { Component } from 'react';
import { Menu, Dropdown, Icon, message } from 'antd';

import Modal from '../../../../components/Modal';
import Modal2 from '../../../../components/Modal2';
import Detail from '../detail';
import AddEdit from '../addEdit';
import { path } from "../../../../configs";
import { post } from "../../../../../util/axios";
import { showConfirm, filterRequest, notempty, getArrKey } from '../../../../utils';
import Functions from '../../../../../components/functions';

class Options extends Component {
    state = {
        checkVisible: false,
        addVisible: false
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

    // 修改敏感词
    handleOkEdit = () => {
        const { item } = this.props;
        const { disableinfoRef } = this.state;
        this.refs.form.validateFields((err, values) => {
            if (!err) {
                const data = disableinfoRef.getData()
                let params = {
                    ...values,
                    ...data
                }
                params.id = item.id;
                // values.country = getArrKey(values.country);
                // values.salePlatform = getArrKey(values.salePlatform);
                // values.trademarkType = getArrKey(values.trademarkType);
                post(path.irp + 'sensitive/AddOrEdit/addOrEdit', filterRequest(params)).then(data => {
                    if (data && data.state === "000001") {
                        message.success('操作成功.');
                        this.props.listFetch();
                        this.setState({ addVisible: false })
                    }
                })
            }
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
            () => this.commonRequest('sensitive/BatchOptions/batchOptions', {
                type: type,
                id: sensitiveId,
            })
        )
    }
    // 删除
    deleteSensitive = () => {
        const { item } = this.props;
        const sensitiveId = [item.id];
        showConfirm(
            '提示！',
            `确定要删除该项？`,
            () => this.commonRequest('sensitive/BatchDelete/batchDelete', {
                ids: sensitiveId,
            })
        )
    }

    // 请求
    commonRequest = (url, value) => {
        const { current, pageSize } = this.props.paginationReducer;
        post(path.irp + url, value).then(data => {
            if (data && data.state === "000001") {
                message.success('操作成功.');
                this.props.listFetch(current, pageSize);
            }
        })
    }

    // 用于获取 Disableinfo 组件
    getRef = (a) => this.setState({ disableinfoRef: a })

    render() {
        const { item } = this.props;
        const { checkVisible, addVisible } = this.state;
        const menu = (
            <Menu>
                <Menu.Item key="1">
                    <Functions {...this.props} functionkey="007-000001-000001-002">
                        <span className="btn-name" onClick={() => this.showModal('addVisible')}>编辑</span>
                    </Functions>
                </Menu.Item>

                <Menu.Item key="2">
                    <Functions {...this.props} functionkey="007-000001-000001-004">
                        <span className="btn-name" onClick={() => this.sensitiveDeleteOrReduction(1, '停用')}>停用</span>
                    </Functions>
                </Menu.Item>
            </Menu>
        );
        const menu1 = (
            <Menu>
                <Menu.Item key="1">
                    <Functions {...this.props} functionkey="007-000001-000001-003">
                        <div className="inline-block" style={{ paddingRight: '14px' }}>
                            <span className="btn-name" onClick={() => this.sensitiveDeleteOrReduction(2, '启用')}>启用</span>
                        </div>
                    </Functions>
                </Menu.Item>
                <Menu.Item key="3">
                    <Functions {...this.props} functionkey="007-000001-000001-007">
                        <span className="btn-name" onClick={this.deleteSensitive}>删除</span>
                    </Functions>
                </Menu.Item>
            </Menu>
        );
        // 停用
        const delteOption = (
            <div className="options-style">
                <Functions {...this.props} functionkey="007-000001-000001-001">
                    <div className="inline-block">
                        <Modal
                            component={(<Detail item={item} />)}
                            width='900px'
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
                <div className="inline-block">
                    <Dropdown
                        overlay={menu1}
                        trigger={['click']}
                    >
                        <span>
                            更多 <Icon type="down" />
                        </span>
                    </Dropdown>
                </div>
            </div>
        );

        // 在用
        const useOption = (
            <div className="options-style">
                <Functions {...this.props} functionkey="007-000001-000001-001">
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
                <Functions {...this.props} functionkey={["007-000001-000001-002", "007-000001-000001-004"]}>
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
                // 在用
                case 1:
                    return (
                        <div>
                            {useOption}
                        </div>
                    )
                    break;
                // 停用
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
                    component={(<AddEdit item={item} getRef={this.getRef} ref="form" />)}
                    width='700px'
                    title="编辑词库"
                    visible={addVisible}
                    handleOk={this.handleOkEdit}
                    handleCancel={() => this.handleCancel('addVisible')}
                />
            </div>
        );
    }
}

export default Options;