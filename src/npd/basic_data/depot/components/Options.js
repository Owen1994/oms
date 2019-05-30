import React, { Component } from 'react';
import { message, Tooltip } from 'antd';
import Modal from '../../../../components/Modal';
import AddDetail from './AddDetail';
import { post } from '../../../../util/axios';
import * as API from '../../../constants/Api'     //导入仓库关系表新增修改、启用禁用接口
import PopConfirm from '../../../common/components/confirm';
import Functions from '../../../../components/functions';

class Options extends Component {
    state = {
        visible: false,
        update: true    //用于控制编辑数据-点击确定后，再次点击编辑时数据的同步
    }

    // 确定
    handleOk = (e) => {
        this.refs.form.validateFields((err, values) => {
            if (!err) {
                if (this.props.item) {
                    values["id"] = this.props.item.id;
                }
                values["type"] = 2;
                values["state"] = values.state === "启用" ? 1 : 0;
                post(API.WARE_HOUSE_ADDORUPDATE_API, values).then(data => {
                    if (data.state === "000001") {
                        message.success('修改成功.');
                        this.setState({
                            visible: false,
                        });
                        this.props.listFetch();
                    }else {
                        message.error('修改失败.');
                    }
                })
            } else {
                message.error('修改失败.');
            }

        });
    }

    // 打开弹窗
    showModal = () => {
        this.setState({
            visible: true,
            update: true
        });
    };

    // 取消弹框
    handleCancel = () => {
        this.setState({
            visible: false,
            update: false
        });
    }

    // 启用禁用
    onConfirm = (e) => {
        let newObj = {};
        newObj["id"] = this.props.item.id;
        newObj["state"] = this.props.item.state === 1 ? 0 : 1;
        post(API.WARE_HOUSE_SWITCHNPS_API, newObj).then(data => {
            if (data.state === "000001") {
                message.success('操作成功.');
                this.props.listFetch();         //禁用或启用后重新请求数据
            }
        })
    };

    render() {
        const { item } = this.props;
        const { visible } = this.state;
        return (
            item.state === 1 ? (
                <div className="npd-depot-option">
                    <Functions {...this.props} functionkey="005-000001-000001-002">
                        <Tooltip placement="bottom" title={"修改仓库属性"}>
                            <div className="npd-inline-block">
                                <Modal
                                    component={(<AddDetail ref="form"
                                        item={item}
                                        update={this.state.update}
                                        visible={visible}
                                    />)}
                                    btnName="编辑"
                                    title="修改仓库设置"
                                    btnType="font"
                                    visible={visible}
                                    showModal={this.showModal}
                                    handleOk={this.handleOk}
                                    handleCancel={this.handleCancel}
                                />
                            </div>
                        </Tooltip>
                    </Functions>
                    {/* <span className="npd-vertical-moulding">|</span> */}
                    <Functions {...this.props} functionkey="005-000001-000001-003">
                        <Tooltip placement="bottom" title={"禁用后当前数据不可用"}>
                            <div className="npd-inline-block" style={{marginLeft: 10}}>
                                <a onClick={() => PopConfirm('是否确认要禁用？', '', () => this.onConfirm())}>
                                    禁用
                                </a>
                            </div>
                        </Tooltip>
                    </Functions>
                </div>)
                :
                (
                    <div className="npd-depot-option">
                        <Functions {...this.props} functionkey="005-000001-000001-004">
                            <Tooltip placement="bottom" title={"启用后当前数据可用"}>
                                <div className="npd-inline-block">
                                    <a onClick={() => PopConfirm('是否确认要启用？', '', () => this.onConfirm())}>
                                        启用
                                    </a>
                                </div>
                            </Tooltip>
                        </Functions>
                    </div>
                )
        );
    }
}

export default Options;