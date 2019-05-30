/**
 *作者: 任贸华
 *功能描述: 修改入口组件
 *参数说明:
 *时间: 2018/4/16 11:33
 */
import React, { Component } from 'react'
import { render } from 'react-dom'

import EditconditionModal from './EditconditionModal';
import axios from "../../../util/axios";
import * as config from "../../../util/connectConfig";
import { message, Form, Modal } from 'antd'
import $ from "../../../components/jqueryfilter";

// const EditconditionModal = (props) => (
//     <Bundle load={() => import('./EditconditionModal')}>
//         {(EditconditionModal) => <EditconditionModal {...props} />}
//     </Bundle>
// )

class UserForm extends Component {

    state = {
        visible: false
    }

    ModalhandleCancel = (value) => () => {
        this.props.editconditionAppaction({ [value]: false, operationLog: [] })
        // this.props.form.setFieldsValue({ configRuleName: '', priority: '', isAvailable: 0 })
        this.props.form.resetFields();
    }


    ModalhandleOk = () => {
        const filter = this.props.editconditionApp.filter
        const group = filter.getData();
        const val = $.ligerui.toJSON(group)
        if (!val) {
            message.error('条件配置为空，请获取当前规则后提交！')
            return false
        }
        /**
         *作者: 任贸华
         *功能描述: 列表修改请求
         *参数说明:
         *时间: 2018/4/17 9:51
         */
        this.props.form.validateFieldsAndScroll((err, values) => {

            if (!err) {

                const obj = {}
                obj.priority = values.priority
                obj.configRuleName = values.configRuleName
                obj.isAvailable = values.isAvailable
                obj.configJson = val
                obj.id = this.props.editconditionApp.ruleId
                obj.platformName = values.platformCode;
                obj.platformCode = values.platformCode;
                axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabConfigApi/saveConditionConfig`, obj)
                    .then(response => {

                        if (response.status == 200) {
                            if (response.data.state == '000001') {
                                message.success(`${response.data.msg}`);
                                this.ModalhandleCancel('visible')()
                                this.props.fetchPosts({ key: 'data', })
                            } else {
                                message.error(`${response.data.msg}`);
                            }

                        }
                    }).catch(e => {
                        console.log(e);
                    })
            }
        });


    }

    render() {
        return (
            <EditconditionModal
                visible={this.props.editconditionApp.visible}
                title={this.props.editconditionApp.title}
                destroyOnClose={true}
                onCancel={this.ModalhandleCancel('visible')}
                onOk={this.ModalhandleOk}
                {...this.props}
            />
        );
    }
}

export default Form.create()(UserForm)
// export default UserForm;