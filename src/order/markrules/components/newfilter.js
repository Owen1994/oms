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

        return (
            <div className="newCluenk">
                <div className="title">可选条件</div>
                <div className="content">
                    <div id="filter"></div>
                    <input id="txtGroup" type="hidden"/>
                </div>
            </div>

        );
    }
}

export default WarehouseOrder
