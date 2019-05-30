/**
 *作者: 任贸华
 *功能描述: 指定发货仓增、查、改组件
 *参数说明:
 *时间: 2018/4/16 11:23
 */
import React, {Component} from 'react'
import {render} from 'react-dom'

import Newfilter from './newfilter';
import Priority from './priority';
import RuleWarehouseDetail from './ruleWarehouseDetail';
import axios from "../../../util/axios";
import * as config from "../../../util/connectConfig";
import {datasaddkey,} from '../../../util/baseTool';
import '../../../components/jqueryfilter/css/all.css'
import '../../../components/jqueryfilter/css/ligerui-all.css'
import $ from "../../../components/jqueryfilter";
import '../../../components/jqueryfilter/js/base'
import '../../../components/jqueryfilter/js/ligeruiall'
import '../../../components/jqueryfilter/js/ligerFilter'

class UserForm extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const ChannelCodearr = this.props.commonSelectData.newChannelCode
        const ordersBelongAccountarr = this.props.commonSelectData.ordersBelongAccount || []
        const newChannelCodearr = ChannelCodearr.map(v => ({text: v.name, id: v.id}))
        const newordersBelongAccountarr = ordersBelongAccountarr.map(v => ({text: v.name, id: v.id}))
        const fields = [
            {
                display: '物流渠道', name: 'newChannelCode', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: newChannelCodearr, valueField: "id", textField: "text",
                    }
                }
            },

            {
                display: '销售账号', name: 'account', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: newordersBelongAccountarr, valueField: "id", textField: "text",
                    }
                }
            },
            {display: '订单金额', name: 'amount', type: 'float'},
        ];

        const filter = $("#filter").ligerFilter({fields: fields});
        this.props.filterTableaction({filter})


        const id = this.props.warehouserule.id
        if (id) {
            return axios.post(`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/getConfigRuleWarehouseDetail`, {id: id})
                .then(response => {
                    if (response.status == 200) {
                        if (response.data.state == '000001') {
                            const datas = response.data.data
                            const {ruleName, priorityname, priorityId, platformName, platformId} = datas.ruleWarehouseDetai
                            const filters = datas.filters
                            //const filters = '{"op":"and"}'
                            const warehousePriority = datas.warehousePriority
                            this.props.form.setFieldsValue({ruleName, priorityId, platformName, platformId})

                            const warehousePriorityarr = datasaddkey(warehousePriority)
                            const newwarehousePriorityarr = warehousePriorityarr.length ? warehousePriorityarr.map((v, i) => ({
                                key: ++i,
                                priority: {
                                    name: `priority${v.key}`,
                                    message: '优先级',
                                    initialValue: v.priority,
                                    placeholder: '优先级',
                                    readonly: false
                                },
                                id: v.id,
                                warehouseCode: {
                                    name: `warehouseCode${v.key}`,
                                    message: '仓库',
                                    initialValue: v.warehouseCode,
                                    placeholder: '仓库',
                                },
                                Operation: '删除',
                            })) : []

                            this.props.priorityTableaction({
                                data: newwarehousePriorityarr,
                                count: newwarehousePriorityarr.length + 1
                            })


                            filter.setData(JSON.parse(filters))

                        }
                    }
                }).catch(e => {
                    console.log(e);
                })
        } else {


        }
    }

    render() {

        return (

            <div className="newClue">
                <RuleWarehouseDetail {...this.props} />
                <Newfilter {...this.props} />
                <Priority {...this.props} />
            </div>


        );
    }
}

export default UserForm;