import React, { Component } from 'react';
import { message, Tooltip } from 'antd';
import Modal from '../../../../../components/Modal';
import AddDetail from './AddDetail';
import { post } from '../../../../../util/axios';
import { AUDIT_ADDORUPDATE_API } from '../../../../constants/Api'      //导入审核流新增修改、启用禁用接口
import Functions from '../../../../../components/functions';

class TableOption extends Component {
    state = {
        visible: false
    }
    // 确定
    handleOk = (e) => {   
        this.refs.form.validateFields((err, values) => {
            if (!err) {
                values.type = 1;
                //多选的四项变成字符串
                values.csiSManager = values.csiSManager.join(',');
                values.npDSalers = values.npDSalers.join(',');
                values.hpaDirector = values.hpaDirector.join(',');
                values.faSalers = values.faSalers.join(',');
                post(AUDIT_ADDORUPDATE_API, values).then(data => {
                    if (data.state === '000001') {
                        message.success('新增成功.');
                        this.setState({
                            visible: false,
                        });
                        this.props.listFetch();
                        this.refs.form.resetFields();
                    }else{
                        message.error('新增失败');
                    }
                })
            }else{
                for(let i in err){
                    var msg = i;break;
                }
                message.error(err[msg].errors[0].message);
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
            <div className="npd-audit-table-option">
                <Tooltip placement="bottom" title={"针对项目流设置审核节点用户"}>
                    <div className="pull-right">
                        <Functions {...this.props} functionkey="005-000001-000005-001">
                            <Modal
                                component={(<AddDetail ref="form"
                                />)}
                                btnName="新增"
                                title="新建审核流"
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