import React, { Component } from 'react';
import { message, Tooltip } from 'antd';
import Modal from '../../../../../components/Modal';
import AddDetail2 from './AddDetail2';
import { post } from '../../../../../util/axios';
import { PLATFORM_ADDORUPDATE_API } from '../../../../constants/Api';
import Functions from '../../../../../components/functions'

class TableOption2 extends Component {
    state = {
        visible: false
    }
    // 确定
    handleOk = (e) => {
        this.refs.form.validateFields((err, values) => {
            if (!err) {
                values['type'] = 1;
                post(PLATFORM_ADDORUPDATE_API, values).then(data => {
                    if (data.state === '000001') {
                        message.success('新增成功.');
                        this.setState({
                            visible: false,
                        });
                        this.refs.form.resetFields();
                        this.props.listFetch2();
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
                <Tooltip placement="bottom" title={"新增平台"}>

                    <div className="pull-right">
                        <Functions {...this.props} functionkey="005-000001-000002-005">
                            <Modal
                                component={(<AddDetail2 ref="form" />)}
                                btnName="新增"
                                title="新建平台"
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

export default TableOption2;