import React, { Component } from 'react';
import { message, Tooltip } from 'antd';
import Modal from '../../../../components/Modal';
import AddDetail from './AddDetail';
import { post } from '../../../../util/axios';
import { WARE_HOUSE_ADDORUPDATE_API } from '../../../constants/Api'     //导入新增、修改仓库接口
import Functions from '../../../../components/functions';

class TableOption extends Component {
    state = {
        visible: false
    }
    // 确定
    handleOk = (e) => {
        this.refs.form.validateFields((err, values) => {
            if (!err) {
                values["type"] = 1;     //接口所需，1为新增，0为修改?
                post(WARE_HOUSE_ADDORUPDATE_API, values).then(data => {
                    if (data.state === "000001") {
                        message.success('新增成功.');
                        this.setState({
                            visible: false,
                        });
                        this.props.listFetch();
                        this.refs.form.resetFields();
                    }else {
                        message.error('新增失败.');
                    }    
                })
            }else{
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
    }
    render() {
        const { visible } = this.state;
        return (
            <div className="npd-depot-table-option">
            <Tooltip placement="bottom" title={"新增仓库"}>
                <div className="pull-right">
                    <Functions {...this.props} functionkey="005-000001-000001-001">
                        <Modal
                            component={(<AddDetail ref="form" />)}                            //弹窗内容组件
                            btnName="新增"                              //新增组件标题
                            title="新建仓库"                            //弹窗标题
                            iconType="plus"                             //新增组件前缀icon
                            btnType="button"                            //新增组件类型
                            visible={visible}                           //弹窗显示控制
                            showModal={this.showModal}                  //
                            handleOk={this.handleOk}                    //弹窗确定按钮
                            handleCancel={this.handleCancel}            //弹窗取消按钮
                        />
                    </Functions>
                </div>
            </Tooltip>
            </div>
        );
    }
}

export default TableOption;