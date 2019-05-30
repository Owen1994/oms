import React, { Component } from 'react';
import { message, Tooltip } from 'antd';
import Modal from '../../../../components/Modal';
import AddDetail from './AddDetail';
import { post } from '../../../../util/axios';
import { INTENT_SUPPLIER_ADDORUPDATE_API } from '../../../constants/Api';
import Functions from '../../../../components/functions';

class TableOption extends Component {
    state = {
        visible: false
    }
    // 确定
    handleOk = (e) => {
        const { attachment1, attachment2 } = this.props.data_reducer;
        this.refs.form.validateFields((err, values) => {
            if (!err) {
                values["type"] = 1;     //接口所需，1为新增，2为修改
                //附件控制 start
                if (attachment1 || attachment2) {
                    values["attachment"] = [];
                }
                let newArr;
                if (attachment1.length > 0 && attachment1[0].status === "done") {
                    newArr = {
                        name: attachment1[0].name, url: attachment1[0].url
                    };
                    values["attachment"][0] = newArr;
                } else if (attachment1.length < 0 && attachment1[0].status === "done") {
                    values["attachment"][0] = this.props.item.attachment[0];
                } else {
                    values["attachment"][0] = {};
                }
                if (attachment2.length > 0 && attachment2[0].status === "done") {
                    newArr = {
                        name: attachment2[0].name, url: attachment2[0].url
                    };
                    values["attachment"][1] = newArr;
                } else if (attachment2.length < 0 && attachment2[0].status === "done") {
                    values["attachment"][1] = this.props.item.attachment[1];
                } else {
                    values["attachment"][1] = {};
                }
                //附件控制 end

                post(INTENT_SUPPLIER_ADDORUPDATE_API, values).then(data => {
                    if (data.state === "000001") {
                        message.success('新增成功.');
                        this.setState({
                            visible: false,
                        });
                        this.props.listFetch();
                        this.refs.form.resetFields();
                        // this.props.dataFetch('attachment1', []);
                        // this.props.dataFetch('attachment2', []);
                    }else{
                        message.error('新增失败.');
                    }
                })
            } else {
                message.error('新增失败.');
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
        // this.props.dataFetch('attachment1', []);
        // this.props.dataFetch('attachment2', []);
    }
    render() {
        const { visible } = this.state;
        return (
            <div className="npd-supplier-table-option">
                <Tooltip placement="bottom" title={"新增意向供应商"}>
                    <div className="pull-right">
                        <Functions {...this.props} functionkey="005-000001-000003-001">
                            <Modal
                                component={(<AddDetail ref="form" visible={this.visible} dataFetch={this.props.dataFetch} />)}
                                btnName="新增"
                                title="新建意向供应商"
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