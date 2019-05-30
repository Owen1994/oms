import React, { Component } from 'react';
import { message, } from 'antd';
import Modal from '../../../../../components/Modal';
import AddDetail from './AddDetail';
import { post } from '../../../../../util/axios';
import { USER_UPDATE_API, USER_SWITCHNPS_API } from '../../../../constants/Api';
import Popconfirm from '../../../../../components/Popconfirm';
import Functions from '../../../../../components/functions'

class Options extends Component {
    state = {
        visible: false,
        update: true    //用于控制编辑数据-点击确定后，再次点击编辑时数据的同步
    }

    // 确定
    handleOk = (e) => {
        this.refs.form.validateFields((err, values) => {
            if (!err) {
                if (this.props.item) {    //有id为修改，无id为新增
                    values["id"] = this.props.item.id;
                }
                values['type'] = 2;
                // values['businessLineCode'] = values.businessLineCode.toString();
                post(USER_UPDATE_API, values).then(data => {
                    if (data) {
                        message.success('修改成功.');
                        this.props.listFetch1();
                        this.setState({
                            visible: false,
                            // update: false
                        });
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
            update:true
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
        newObj["userName"] = this.props.item.userName;
        newObj["state"] = this.props.item.state === 1 ? 0 : 1;
        post(USER_SWITCHNPS_API, newObj).then(data => {
            if (data) {
                this.props.listFetch1();
                message.success('操作成功.')
            }
        })
    };

    render() {
        const { item, list_reducer, list_reducer2, list_reducer3, list_fetch1, list_fetch3 } = this.props;

        const { visible, update } = this.state;
        return (
            item.state === 1 ? (
                <div className="npd-usermanagement-options">
                    <Functions {...this.props} functionkey="005-000001-000002-002">
                        <div className="npd-inline-block">
                            <Modal
                                component={(<AddDetail ref="form" update={update} visible={visible} item={item} list_reducer={list_reducer} list_reducer2={list_reducer2} list_reducer3={list_reducer3} list_fetch1={list_fetch1} list_fetch3={list_fetch3} />)}
                                btnName="编辑"
                                title="修改用户"
                                btnType="font"
                                visible={visible}
                                showModal={this.showModal}
                                handleOk={this.handleOk}
                                handleCancel={this.handleCancel}
                            />
                        </div>
                    </Functions>
                    <span className="npd-vertical-moulding">|</span>
                    <Functions {...this.props} functionkey="005-000001-000002-003">
                        <div className="npd-inline-block">
                            <Popconfirm
                                btnName="禁用"
                                text={`确定要禁用该项?`}
                                onConfirm={this.onConfirm}
                            />
                        </div>
                    </Functions>
                </div>
            )
                :
                (
                    <div className="npd-usermanagement-options">
                        <Functions {...this.props} functionkey="005-000001-000002-004">
                            <div className="npd-inline-block">
                                <Popconfirm
                                    btnName="启用"
                                    text={`确定要启用该项?`}
                                    onConfirm={this.onConfirm}
                                />
                            </div>
                        </Functions>
                    </div>
                )
        )
    }
}

export default Options;