import React, { Component } from 'react';
import { message, Tooltip } from 'antd';
import Modal from '../../../../components/Modal';
import AddDetail from './AddDetail';
import { post } from '../../../../util/axios';
import { INTENT_SUPPLIER_ADDORUPDATE_API } from '../../../constants/Api';
import Functions from '../../../../components/functions';

class Options extends Component {
    state = {
        visible: false,
        update: true    //用于控制编辑数据-点击确定后，再次点击编辑时数据的同步
    }


    // 确定 - 调用意向供应商修改接口
    handleOk = (e) => {
        const { attachment1, attachment2 } = this.props.data_reducer;
        this.refs.form.validateFields((err, values) => {
            if (!err) {
                if (this.props.item) {    //有id为修改，无id为新增
                    values["id"] = this.props.item.id;
                }

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

                values["type"] = 2;
                post(INTENT_SUPPLIER_ADDORUPDATE_API, values).then(data => {
                    if (data.state === "000001") {
                        message.success('修改成功.');
                        this.setState({
                            visible: false,
                        });
                        this.props.listFetch();
                    }else{
                        message.success('修改失败.');
                    }
                })
            }
        });
        // this.props.dataFetch('attachment1', []);
        // this.props.dataFetch('attachment2', []);
    }

    // 打开弹窗
    showModal = () => {
        this.setState({
            visible: true,
            update: true,
        });
    };

    // 取消弹框
    handleCancel = () => {
        this.refs.form.resetFields();
        this.setState({
            visible: false,
            update: false,
        });
        // this.props.dataFetch('attachment1', []);
        // this.props.dataFetch('attachment2', []);
    }

    render() {
        const { visible, update } = this.state;
        const { item, dataFetch } = this.props;
        return (
            <div className="npd-supplier-options">
                <Functions {...this.props} functionkey="005-000001-000003-002">
                    <Tooltip placement="bottom" title={"修改意向供应商属性"}>
                        <div className="npd-inline-block">
                            <Modal
                                component={(<AddDetail ref="form"
                                    update={update}
                                    visible={visible}
                                    item={item}
                                    dataFetch={dataFetch}
                                />)}
                                btnName="编辑"
                                title="修改意向供应商"
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
        )

    }
}

export default Options;