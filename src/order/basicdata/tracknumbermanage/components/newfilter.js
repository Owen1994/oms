/**
 *作者: 任贸华
 *功能描述: 指定发货仓过滤器组件 (暂未用到，勿删)
 *参数说明:
 *时间: 2018/4/16 11:24
 */
import React, {Component} from 'react'
import {render} from 'react-dom'
import '../css/css.css'


class WarehouseOrder extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        let {ruleData} = this.props
        return (
            <div className="newCluenk">
                <div className="content">
                    <div id="filter"></div>
                    <input id="txtGroup" type="hidden"/>
                </div>
                <div className="tracknumbermanage-comment">
                    <p>当前状态：{ruleData && ruleData.status ? "启动状态" : "停止状态"}</p>
                    <p>物流渠道：（数据来源对应老ERP物流渠道列表）</p>
                    <p>发货时间：（数值填写整数，1代表1小时）</p>
                </div>
            </div>

        );
    }
}

export default WarehouseOrder
