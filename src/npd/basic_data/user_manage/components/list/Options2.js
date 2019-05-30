import React, { Component } from 'react';
import { message, Tooltip } from 'antd';
import Modal from '../../../../../components/Modal';
import AddDetail2 from './AddDetail2';
import { post } from '../../../../../util/axios';
import { PLATFORM_ADDORUPDATE_API } from '../../../../constants/Api';
import Functions from '../../../../../components/functions'

class Options extends Component {
    state = {
        visible: false,
        update: true    //用于控制编辑数据-点击确定后，再次点击编辑时数据的同步
    }

    // 确定
    handleOk = (e) => {
        this.refs.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
                if (this.props.item) {    //有id为修改，无id为新增
                    values["id"] = this.props.item.id;
                }
                values['type'] = 2;
                post(PLATFORM_ADDORUPDATE_API, values).then(data => {
                    if (data.state === '000001') {
                        message.success('修改成功.');
                        this.props.listFetch2();
                        this.setState({
                            visible: false,
                            // update: false
                        });
                    }else{
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

    render() {
        const { visible } = this.state;
        return (
            <div className="npd-usermanagement-options2">
                <Functions {...this.props} functionkey="005-000001-000002-006">
                    <Tooltip placement="bottom" title={"修改平台属性"}>
                        <div className="npd-inline-block">
                            <Modal
                                component={(<AddDetail2 ref="form"
                                    update={this.state.update}
                                    visible={visible}
                                    item={this.props.item}
                                />)}
                                btnName="编辑"
                                title="修改平台信息"
                                btnType="font"
                                visible={visible}
                                showModal={this.showModal}
                                handleOk={this.handleOk}
                                handleCancel={this.handleCancel}
                            />
                        </div>
                    </Tooltip>
                </Functions>
            </div>
        );
    }
}

export default Options;