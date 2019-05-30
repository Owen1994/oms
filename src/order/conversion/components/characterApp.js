/**
*作者: 任贸华
*功能描述: 字段配置模块入口文件
*参数说明:
*时间: 2018/4/16 11:35
*/
import React, {Component} from 'react'
import {render} from 'react-dom'

import Platformconf from './platformconf';
import Orderconf from './orderconf';
import Paymentconf from './paymentconf';
import PayRecordconf from './payRecordconf';
import Customerconf from './customerconf';
import Log from './log';
import Modalmodel from '../../../components/modalmodel/searchmodel';
import axios from "../../../util/axios";
import * as config from "../../../util/connectConfig";
import {

    message,

} from 'antd'
import {dataPack, unbinds} from "../../../util/baseTool";

class UserForm extends Component {

    constructor(props) {
        super(props);
    }

    ModalhandleCancel = (value) => () => {
        this.props.characterAPPaction({[value]: false})
        const arr = [...this.props.charactertable.customerdata, ...this.props.charactertable.methoddata,
            ...this.props.charactertable.orderdata, ...this.props.charactertable.paymentdata, ...this.props.charactertable.platformdata,]
        unbinds(this, {data:arr})

    }

/**
*作者: 任贸华
*功能描述: 字段配置模块保存请求
*参数说明:
*时间: 2018/4/17 10:04
*/
    ModalhandleOk = () => {

        this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {

                    const template = {
                        order_main: [{platformfield: '', platformfieldafter: '',}],
                        order_pay_info: [{paymentfield: '', paymentfieldafter: '',}],
                        order_pay_record: [{methodfield: '', methodfieldafter: '',}],
                        order_receiver_info: [{customerfield: '', customerfieldafter: '',}],
                        order_goods: [{orderfield: '', orderfieldafter: '',}],
                    }

                    let data = dataPack(template, values)
                    for (let i in data) {
                        data[i].forEach(v => {
                            for (let k in v) {
                                if (k.match(/field$/)) {
                                    v.before = v[k]
                                    Reflect.deleteProperty(v, k)
                                } else if (k.match(/after$/)) {
                                    v.after = v[k]
                                    Reflect.deleteProperty(v, k)
                                }
                            }
                        })
                    }


                    axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabConfigApi/addAndUpdateFieldConfig`, {
                        data,
                        platformName: 'SM'
                    })
                        .then(response => {
                            if (response.status == 200) {
                                if (response.data.state == '000001') {
                                    message.success(`${response.data.msg}`);
                                    this.props.characterAPPaction({visible: false})
                                } else {
                                    message.error(response.data.msg)
                                }
                            }
                        }).catch(e => {
                        console.log(e);
                    })
                }
            }
        )


    }


    render() {
        const content = <div className="newClue">
            <Platformconf {...this.props} />
            <Orderconf {...this.props} />
            <Paymentconf {...this.props} />
            <PayRecordconf {...this.props} />
            <Customerconf {...this.props} />
            <Log {...this.props} />
        </div>


        return (

            <Modalmodel  {...{
                ...this.props.characterAPP,
                visible: this.props.characterAPP.visible,
                width: 800,
                title: `${this.props.characterAPP.title}`,
                ModalContent: content
            }}
                         onOk={this.ModalhandleOk} wrapClassName={'mtdiv10'} destroyOnClose
                         onCancel={this.ModalhandleCancel('visible')}/>


        );
    }
}

export default UserForm;