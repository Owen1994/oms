import React, { Component } from 'react';
import { message, } from 'antd';
import Modal from '../../../../../components/Modal';
import AddDetail2 from './AddDetail2';
import { post } from '../../../../../util/axios';
import { PLATFORM_ADDORUPDATE_API} from '../../../../constants/Api';
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
                if(this.props.item){    //有id为修改，无id为新增
                    values["id"] = this.props.item.id;
                }
                values['type'] = 2;
                post(PLATFORM_ADDORUPDATE_API, values).then(data => {
                    if(data){
                    message.success('修改成功.');
                    this.props.listFetch2();
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

    render() {
        const { visible } = this.state;
        return (
            <div className="npd-usermanagement-options2">
                <Functions {...this.props} functionkey="005-000001-000002-006">
                    <div className="npd-inline-block">
                        <Modal
                            component={(<AddDetail2 ref="form" {...this.props}  update={this.state.update} visible={visible} />)}
                            btnName="编辑"
                            title="修改平台信息"
                            btnType="font"
                            visible={visible}
                            showModal={this.showModal}
                            handleOk={this.handleOk}
                            handleCancel={this.handleCancel}
                        />
                    </div>
                </Functions>
            </div>
        );
    }
}

export default Options;