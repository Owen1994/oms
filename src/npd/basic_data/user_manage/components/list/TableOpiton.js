import React, { Component } from 'react';
import { message, Tooltip } from 'antd';
import Modal from '../../../../../components/Modal';
import AddDetail from './AddDetail';
import { post } from '../../../../../util/axios';
import { USER_UPDATE_API } from '../../../../constants/Api';
import Functions from '../../../../../components/functions'

class TableOption extends Component {
    state = {
        visible: false
    }
    // 确定
    handleOk = (e) => {
        this.refs.form.validateFields((err, values) => {
            if (!err) {
                values['type'] = 1;
                post(USER_UPDATE_API, values).then(data => {
                    if (data.state === '000001') {
                        message.success('新增成功.');
                        this.setState({
                            visible: false,
                        });
                        this.refs.form.resetFields();
                        this.props.listFetch1();
                    }else{
                        message.error('新增失败.');
                    }
                })
            }
        });

    }
    // 打开弹窗
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    // 取消
    handleCancel = () => {
        this.setState({
            visible: false,
        });
        this.refs.form.resetFields();
    }
    render() {
        const { visible } = this.state;
        const { list_reducer, list_reducer2, list_reducer3, list_fetch1, list_fetch3, list_fetch4 } = this.props;
        return (
            <div className="npd-usermanagement-table-option">
                <Tooltip placement="bottom" title={"新增用户"}>
                    <div className="pull-right">
                        <Functions {...this.props} functionkey="005-000001-000002-001">
                            <Modal
                                component={(<AddDetail ref="form"
                                    list_reducer={list_reducer}
                                    list_reducer2={list_reducer2}
                                    list_reducer3={list_reducer3}
                                    list_fetch1={list_fetch1}
                                    list_fetch3={list_fetch3}
                                    list_fetch4={list_fetch4}
                                />)}
                                btnName="新增"
                                title="新增用户"
                                iconType="plus"
                                btnType="button"
                                visible={visible}
                                showModal={this.showModal}
                                handleOk={this.handleOk}
                                handleCancel={this.handleCancel}
                            />
                        </Functions>
                    </div>
                </Tooltip>
            </div>
        );
    }
}

export default TableOption;