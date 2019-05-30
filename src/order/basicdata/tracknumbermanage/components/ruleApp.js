/**
 *作者: 任贸华
 *功能描述: 指定发货仓增、查、改组件
 *参数说明:
 *时间: 2018/4/16 11:23
 */
import React, {Component} from 'react'
import {render} from 'react-dom'

import Newfilter from './newfilter';
// import Priority from './priority';
// import RuleWarehouseDetail from './ruleWarehouseDetail';
import axios from "../../../../util/axios";
import * as config from "../../../../util/connectConfig";
import {datasaddkey,} from '../../../../util/baseTool';
import '../../../../components/jqueryfilter/css/all.css'
import '../../../../components/jqueryfilter/css/ligerui-all.css'
import $ from "../../../../components/jqueryfilter";
import '../../../../components/jqueryfilter/js/base'
import '../../../../components/jqueryfilter/js/ligeruiall'
import '../../../../components/jqueryfilter/js/ligerfetchingconf'

class UserForm extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fn()
        this.setDefualtData(this.props.ruleData)
    }
    filter = null ;

    fn = ()=>{
        const ChannelCodearr = this.props.commonSelectData.newChannelCode || []
        const ServiceCodearr = this.props.commonSelectData.newServiceCode || []
        const newChannelCodearr = ChannelCodearr.map(v => ({text: v.name, id: v.id}))
        const newServiceCodearr = ServiceCodearr.map(v => ({text: v.name, id: v.value}))
        const fields = [
            {
                display: '物流渠道', name: 'channelCode', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: newChannelCodearr, valueField: "id", textField: "text",
                    }
                }
            },
            {
                display: '运输方式', name: 'signChannelName', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: newServiceCodearr, valueField: "id", textField: "text",
                    }
                }
            },
            {display: '发货时间', name: 'deliveryTime', type: 'float'},
        ];

        const filter = this.filter =  $("#filter").ligerFilter({fields: fields});
        this.props.filterTableaction({filter})
        // var str = '{"rules":[{"field":"channelCode","op":"equal","value":"_RUS","type":"combobox"},{"field":"deliveryTime","op":"equal","value":"12","type":"float"}],"op":"and"}'
        // filter.setData(JSON.parse(str))
    }
    setDefualtData = (ruleData)=>{
        if(ruleData && ruleData.rule){
            this.filter.setData(JSON.parse(ruleData.rule))
        }
    }
    componentWillReceiveProps(next){
        let ruleData = next.ruleData
        if(ruleData !== this.props.ruleData){
            this.setDefualtData(ruleData)
        }
    }
    render() {

        return (
            <div className="newClue">
                <Newfilter {...this.props} />
            </div>
        );
    }
}

export default UserForm;