/**
 * 作者: pzt
 * 描述: 速卖通列表页父组件
 * 时间: 2018/4/18 20:24
 **/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import actions from '../actions'
import moment from 'moment'
import {
    Form,
    message
} from 'antd'
import '../css/css.css'

import Condition from '../components/Condition'; // 条件查询模块
import Tablelist from '../components/Tablelist'; // 列表数据
import OrderCommonSearchModal from '@/components/SearchModal/SearchModal.js';


class Joom extends Component {

    state={
        visible: false,
    }

    componentDidMount() {
        this.setDefaultTime();
        let params = this.getParams();
        this.props.getTabListAsync()
        this.getList(params)
    }

    // 设置默认时间
    setDefaultTime = () => {
        let { setFieldsValue } = this.props.form;
        let end = moment().endOf('day').valueOf();
        let start = moment().subtract(30, 'day').startOf('day').valueOf();
        let momentData = [moment(start), moment(end)] || [];
        setFieldsValue({ "paymentTime": momentData });
    }

    getList = (params) => {
        this.props.getListAsync({ data: params })
    }

    getParams = () => {
        const { tablemodel } = this.props;
        const { getFieldsValue } = this.props.form;
        const { params } = tablemodel;
        const value = getFieldsValue();
        // 订单金额
        if (value.orderAmount1 !== undefined) {
            if (value.orderAmount2 !== undefined) {
                if (value.orderAmount2 > value.orderAmount1) {
                    value.orderAmount = [value.orderAmount1, value.orderAmount2]
                } else {
                    message.warning("订单金额查询须后者大于前者");
                }
            } else {
                message.warning("请填写完整订单金额查询");
            }

        } else if (value.orderAmount2) {
            value.orderAmount = [0, value.orderAmount2]
        }
        delete value.orderAmount1
        delete value.orderAmount2

        // 搜索类型、内容
        if (!value.searchContents) {
            delete value.searchType
        } else {
            value.searchContents = value.searchContents.split(/\n/).filter(v => v)
        }
        if (value.salesAccount) {
            value.salesAccount = value.salesAccount.split(',').filter(v => v)
            if (value.salesAccount.length > 20) {
                value.salesAccount.length = 20;
            }
        }

        // 抓单时间
        if (value.grabTime && value.grabTime.length) {
            value.grabTime = [
                value.grabTime[0].startOf('day').valueOf(),
                value.grabTime[1].endOf('day').valueOf()
            ]
        } else {
            delete value.grabTime
        }

        // 付款时间
        if (value.paymentTime && value.paymentTime.length) {
            value.paymentTime = [
                value.paymentTime[0].startOf('day').valueOf(),
                value.paymentTime[1].endOf('day').valueOf()
            ]
        } else {
            delete value.paymentTime
        }

        // 发货截止时间
        if (value.shipDeadlineTime && value.shipDeadlineTime.length) {
            value.shipDeadlineTime = [
                value.shipDeadlineTime[0].startOf('day').valueOf(),
                value.shipDeadlineTime[1].endOf('day').valueOf()
            ]
        } else {
            delete value.shipDeadlineTime
        }

        if (!value.paymentTime && !value.grabTime) {
            let now = Date.now()
            if (value.searchContents) {
                // 有搜索内容但没有时间时查询一年的订单
                value.paymentTime = [
                    moment(now - 365 * 24 * 60 * 60 * 1000).startOf('day').valueOf(),
                    moment(now).endOf('day').valueOf()
                ]
            } else {
                // 默认查询一个月的订单
                value.paymentTime = [
                    moment(now - 30 * 24 * 60 * 60 * 1000).startOf('day').valueOf(),
                    moment(now).endOf('day').valueOf()
                ]
            }
        }

        // 创建类型
        if(!value.creationType){
            delete value.creationType;
        }

        // 平台佣金
        if(!value.platformCommission){
            delete value.platformCommission;
        }

        value.pageData = params.pageData;
        value.pageNumber = params.pageNumber;
        value.tab = params.tab;
        if (value.tab) {
            value.tab = params.tab;
        }
        return value
    }

    render() {
        const { getParams, getList } = this;
        const { visible } = this.state;
        return (
            <div className="smtorder-list">
                <Condition
                    {...this.props}
                    getParams={getParams}
                    getList={getList}
                    toggleModal={() => this.setState({
                        visible: true,
                    })}
                />
                <OrderCommonSearchModal
                    {...this.props}
                    visible={visible}
                    onCancel={() => this.setState({
                        visible: false,
                    })}
                    onSearch={() => this.getList(this.getParams())}
                    searchContent="searchContents"
                    // count={1000}
                />
                <div className="breadcrumb">
                    <Tablelist {...this.props} getParams={getParams} getList={getList} />
                </div>
            </div>
        );
    }
}

export default connect(
    (state, own) => ({
        ...state,
        ...own
    }), {
        ...actions
    })(Form.create()(Joom));
