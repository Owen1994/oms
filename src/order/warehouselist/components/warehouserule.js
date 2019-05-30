/**
 *作者: 任贸华
 *功能描述: 指定发货仓增、查、改组件
 *参数说明:
 *时间: 2018/4/16 11:23
 */
import React, {Component} from 'react'
import {render} from 'react-dom'

import Modalmodel from '../../../components/modalmodel/searchmodel';
import axios from "../../../util/axios";
import * as config from "../../../util/connectConfig";
import {dataPack, unbinds} from "../../../util/baseTool";
import {message} from 'antd'
import Bundle from '../../../common/components/bundle/bundle'
import $ from "../../../components/jqueryfilter";

const RuleApp = (props) => (
    <Bundle load={() => import('./ruleApp')}>
        {(RuleApp) => <RuleApp {...props} />}
    </Bundle>
)

class UserForm extends Component {

    constructor(props) {
        super(props);
    }

    /**
     *作者: 任贸华
     *功能描述: 关闭弹窗
     *参数说明:
     *时间: 2018/4/17 10:24
     */
    ModalhandleCancel = (value) => () => {
        this.props.warehouseruleaction({[value]: false})
        const filtertabledata = this.props.filtertable.data
        const prioritytabledata = this.props.prioritytable.data
        unbinds(this, {
            data: [...filtertabledata, ...prioritytabledata],
            ruleName: '',
            platformName: '',
            priorityId: ''
        })
    }

    /**
     *作者: 任贸华
     *功能描述: 规则弹窗方法
     *参数说明:
     *时间: 2018/4/17 10:25
     */
    ModalhandleOk = () => {

        this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {

                    const filter = this.props.filtertable.filter
                    const group = filter.getData();
                    const val = $.ligerui.toJSON(group)
                    if (!val) {
                        message.error('条件配置为空，请获取当前规则后提交！')
                        return false
                    }

                    const id = this.props.warehouserule.id || null
                    const template = {
                        ruleWarehouseDetail: {ruleName: '', platformName: '', platformId: '', priorityId: ''},
                        priorityList: [{priority: '', warehouseCode: '', warehouseName: '', pid: ''}],
                    }
                    const newobj = {}
                    const data = dataPack(template, values)
                    newobj.addRule = data
                    data.filterList = val
                    data.priorityList.map(v => {
                        if (!v.pid) {
                            Reflect.deleteProperty(v, 'pid');
                        }
                        if (!v.rid && id) {
                            v.rid = id
                        }
                    })
                    if (id) {
                        data.ruleWarehouseDetail.rid = id
                    }
                    const viewtype = this.props.warehouserule.viewtype
                    let url = ''
                    if (viewtype == 2) {
                        url = '/oms/order/manage/motan/IOrderManageConfigApi/updateConfigRuleWarehouse'
                    } else if (viewtype == 3) {
                        url = '/oms/order/manage/motan/IOrderManageConfigApi/saveConfigRuleWarehouse'
                    }

                    axios.post(`${config.api_url}${url}`, newobj)
                        .then(response => {

                            if (response.status == 200) {
                                if (response.data.state == '000001') {
                                    //this.props.warehouseruleaction({visible: false})

                                    this.props.fetchPosts({key: 'data',})
                                    this.props.modalmodelaction({ModalText: '保存中···', confirmLoading: true})
                                    setTimeout(() => {
                                        message.success(`${response.data.msg ? response.data.msg : '操作成功'}`);
                                        this.ModalhandleCancel('visible')()
                                        this.props.modalmodelaction({
                                            confirmLoading: false,
                                        });
                                    }, 1500);
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
        const content = <RuleApp {...this.props}/>

        const footer = this.props.warehouserule.type ? {
            footer: null
        } : {}

        return (

            <Modalmodel  {...{
                ...this.props.warehouserule,
                visible: this.props.warehouserule.visible,
                width: 800,
                title: `${this.props.warehouserule.title}`,
                ModalContent: content
            }}
                         onOk={this.ModalhandleOk} className={'modalmt10'} {...footer} destroyOnClose
                         confirmLoading={this.props.warehouserule.confirmLoading}
                         onCancel={this.ModalhandleCancel('visible')}/>


        );
    }
}

export default UserForm;