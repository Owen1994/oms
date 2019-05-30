/**
 *作者: 任贸华
 *功能描述: 指定发货仓增、查、改组件
 *参数说明:
 *时间: 2018/4/16 11:23
 */
import React, {Component} from 'react'
import {render} from 'react-dom'

import Newfilter from './newfilter';
import Basic from './basic';
import Execaction from './execaction';
import Execattach from './execattach';
import axios from "../../../util/axios";
import * as config from "../../../util/connectConfig";
import {datasaddkey,} from '../../../util/baseTool';
import '../../../components/jqueryfilter/css/all.css'
import '../../../components/jqueryfilter/css/ligerui-all.css'
import $ from "../../../components/jqueryfilter";
import '../../../components/jqueryfilter/js/base'
import '../../../components/jqueryfilter/js/ligeruiall'
import '../../../components/jqueryfilter/js/ligerfetchingconf'
import observer from "../../../util/observer"

class UserForm extends Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps) {
        const oldPlat = prevProps.platformSelected;
        const newPlat = this.props.platformSelected;
        if(oldPlat !== newPlat && newPlat){
            this.fn();
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.selectPlatform(this.props.markupData.platform || '', this.renderData);
        }, 500);
    }
    renderData = () => {
        this.fn()
        observer.on("getFilterData",this.getFilterData)
    }
    filter = null 
    ordersIsTracking = [{text:"是",id:1},{text:"否",id:0}]
    orderTargetStatus= [
        {text:"新录入",id:1},
        {text:"已通地",id:2},
        {text:"已打印",id:3},
        {text:"已核对",id:4},
        {text:"已发货",id:5},
    ]
    fn = ()=>{
        const {markupData, platformSelected} = this.props
        const ChannelCodearr = this.props.commonSelectData.newChannelCode || []
        const ServiceCodearr = this.props.commonSelectData.newServiceCode || []
        const CountryCodearr = this.props.commonSelectData.newCountryCode || []
        const PackageStatusarr = this.props.commonSelectData.newPackageStatus || []
        
        const newChannelCodearr = ChannelCodearr.map(v => ({text: v.name, id: v.id}))
        const newServiceCodearr = ServiceCodearr.map(v => ({text: v.name, id: v.value}))
        const newCountryCodearr = CountryCodearr.map(v => ({text: v.name, id: v.id}))
        const newPackageStatusarr = PackageStatusarr.map(v => ({text: v.name, id: v.id}))
        
        let fields = [
            {
                display: '运输方式', name: 'guestChooseFreight', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: newServiceCodearr, valueField: "id", textField: "text",
                    }
                }
            },
            {
                display: '物流渠道', name: 'channelCode', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: newChannelCodearr, valueField: "id", textField: "text",
                    }
                }
            },
            {
                display: '是否挂号', name: 'ordersIsTracking', type: 'radiolist', editor: {
                    type: 'radiolist',
                    options: {
                        data: this.ordersIsTracking, valueField: "id", textField: "text",
                    }
                }
            },
            {
                display: '付款时间', name: 'deliveryTime', type: 'float'
            },
            {
                display: '目的国', name: 'orderCountry', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: newCountryCodearr, valueField: "id", textField: "text",
                    }
                }
            },
            {
                display: '老ERP状态', name: 'orderTargetStatus', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: newPackageStatusarr, valueField: "id", textField: "text",
                    }
                }
            },
        ];
        if(platformSelected === 'EB') {
            fields.push({
                    display: '销售账号', name: 'sellerAccounts', type: 'string', 
                });
        }

        const filter = this.filter = $("#filter").ligerFilter({fields: fields});
        this.props.filterTableaction({filter})
        if(markupData.id && markupData.restrictionJson){
            const json = JSON.parse(markupData.restrictionJson);
            this.translateFormat(json, 'old');
            filter.setData(json)
        }
    }
    getFilterData = ()=>{
        const group = this.filter.getData();
        this.translateFormat(group, 'new');
        const val = $.ligerui.toJSON(group)
        return val
    }

    // 包含（enum）新旧格式转换
    translateFormat = (group, type) => {
        this.translateCondition(group.rules, type);
        this.translateGroup(group.groups, type);
    }
    // 条件
    translateCondition = (rules, type) => {
        if(rules && rules.length > 0) {
            rules.map(it => {
                if(it.op === 'enum') {
                    if (type === 'new') {   // 转换成新格式
                        const val = it.value;
                        const arr = val.split(',');
                        const str = JSON.stringify(arr);
                        // it.value = str.replace(/\"/g, '\\"');
                        it.value = str;
                    } else if (type === 'old') {    // 转换成旧格式
                        it.value = JSON.parse(it.value).join(',');
                    }
                }
            })
        } else {
            return;
        }
    }
    // 分组
    translateGroup = (groups, type) => {
        if(groups && groups.length > 0) {
            groups.map(v => {
                this.translateCondition(v.rules, type);
            })
        } else {
            return;
        }
    }
    render() {
        return (
            <div className="newClue markrules-modal">
                <Basic {...this.props}></Basic>
                <Newfilter {...this.props} />
                <Execaction {...this.props}></Execaction>
                <Execattach {...this.props}></Execattach>
            </div>
        );
    }
}

export default UserForm;