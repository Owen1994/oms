import React, { Component } from 'react';
import { message, Tooltip } from 'antd';
import Modal from '../../../../../components/Modal';
import AddDetail3 from './AddDetail3';
import { post } from '../../../../../util/axios';
import { USER_GROUP_ADDORUPDATE_API } from '../../../../constants/Api';
import Functions from '../../../../../components/functions'

class TableOption3 extends Component {
    state = {
        visible: false
    }
    // 确定
    handleOk = (e) => {
        this.refs.form.validateFields((err, values) => {
            if (!err) {
                values['type'] = 1;
                // let index = values.name;
                // values['name'] = this.props.list_reducer3[index-1].name;
                post(USER_GROUP_ADDORUPDATE_API, values).then(data => {
                    if (data.state === '000001') {
                        message.success('新增成功.');
                        this.setState({
                            visible: false,
                        });
                        this.refs.form.resetFields();
                        this.props.listFetch3();
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
        return (
            <div className="npd-usermanagement-table-option">
                <Tooltip placement="bottom" title={"新增用户组"}>
                    <div className="pull-right">
                        <Functions {...this.props} functionkey="005-000001-000002-007">
                            <Modal
                                component={(<AddDetail3 ref="form" list_fetch2={this.props.list_fetch2} list_reducer2={this.props.list_reducer2} list_reducer3={this.props.list_reducer3} />)}
                                btnName="新增"
                                title="新建用户组"
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

export default TableOption3;