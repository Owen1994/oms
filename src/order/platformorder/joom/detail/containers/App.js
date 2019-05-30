/**
 * 作者: pzt
 * 描述: 速卖通列表页父组件
 * 时间: 2018/4/18 20:24
 **/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Order from '../components/Order'
import Payment from '../components/Payment'
import Delivery from '../components/Delivery'
import Logistics from '../components/Logistics'
import Goods from '../components/Goods'
import Log from '../components/Log'
import { getUrlParams } from 'util/baseTool';
import action from '../actions/index'
import {
    message
} from "antd";
import '../css/css.css'

class Joom extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        id: "",
        list: []
    }
    componentDidMount() {
        const { id } = getUrlParams(this.props.location.search)
        const params = {
            id,
            pageNumber: 1,
            pageData:20,
        }
        if (!id) return message.warning("参数ID错误");
        this.props.getDetailAsync({ data: { key: id } });
        this.queryLog(params);
    }

    queryLog = (params) => {
        this.props.getLogAsync({ data: params })
            .then(result => {
                this.setState({
                    list: result
                })
            })
    }

    render() {
        const { list } = this.state;
        const { Infos } = this.props;
        return (
            <div className="newClue smtorder-list">
                <div className="newCluewk">
                    <Order Infos={Infos} />
                    <Payment Infos={Infos} />
                    <Delivery Infos={Infos} />
                    <Logistics Infos={Infos} />
                    <Goods Infos={Infos} />
                    <Log list={list} queryLog={this.queryLog} />
                </div>
            </div>
        );
    }
}

export default connect(state => state, action)(Joom);
