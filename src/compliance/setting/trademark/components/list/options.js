import React, { Component } from 'react';
import { message } from 'antd';

import Modal from '../../../../components/Modal';
import AddEdit from '../addEdit';
import { post } from '../../../../../util/axios';
import { path } from '../../../../configs';
import { notempty } from '../../../../utils';
import Functions from '../../../../../components/functions';

class Options extends Component {
    state = {
        visible: false
    }

    // 修改商标商品分类
    handleOk = () => {
        const { id, code } = this.props;
        this.refs.form.validateFields((err, values) => {
            var params = {
                id: id,
                oneClass: notempty(values.oneClass),
                trademark: code,
                twoClass: notempty(values.twoClass)
            }
            if (!err) {
                post(path.irp + 'trademark/Edit/edit', params).then(data=>{
                    if(data && data.state === "000001"){
                        message.success('操作成功.');
                        this.props.listFetch();
                        this.setState({
                            visible: false
                        });
                    }
                })
            }
        });
    }

    // 打开弹窗
    showModal = (name) => {
        this.setState({
            [name]: true,
        });
    };

    // 取消弹框
    handleCancel = (name) => {
        this.setState({
            [name]: false,
        });
    }


    render() {
        const { id } = this.props;
        const { visible } = this.state;

        return (
            <Functions { ...this.props } functionkey="007-000002-000001-002">
                <Modal
                    component={(<AddEdit ref="form" id={ id } />)}
                    btnName="编辑"
                    title="编辑商标商品分类"
                    btnType="font"
                    visible={visible}
                    showModal={() => this.showModal('visible')}
                    handleOk={this.handleOk}
                    handleCancel={() => this.handleCancel('visible')}
                />
            </Functions>
        );
    }
}

export default Options;