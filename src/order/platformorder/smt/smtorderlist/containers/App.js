/**
 * 作者: pzt
 * 描述: 速卖通列表页父组件
 * 时间: 2018/4/18 20:24
 **/
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'

import {
    Form,
} from 'antd'

import '../css/css.css'

import moment from 'moment';
import axios from '../../../../../util/axios'
import Condition from '../components/Condition'; // 条件查询模块
import Tablelist from '../components/Tablelist'; // 列表数据

import SearchValues from '../../../../../components/searchValues/containers/App';
import * as config from "../../../../../util/connectConfig";
import {addQuotes,pageCache} from '../../../../../util/baseTool';
import {levelOptions} from "../../../../../util/options";
import { selectValues, getGangeGimes, closehandle, timestampFromat } from '../../../../../util/baseTool';

class UserForm extends Component {

    constructor(props) {
        super(props);
    }

    state={
        active: -2147483648,
        pageNumber: 1,
        pageData: 20,
    }

    // 用于设置时间的一些数据
    orderTime = {
        range: [],
        type: 0
    }
    orderTimeRange = []

    componentDidMount() {
        const pageCachedata = pageCache(this, `${location.pathname}${location.search}`);
        this.props.fetchquickdstatePosts({name: 'data'});  //快捷状态
        this.props.getCommonSelectData({url: '/oms/order/grab/motan/OrderGrabApi/getAllOrderStatus', key: 'allOrderStatus'}); //订单状态
        //this.props.getCommonSelectData({url: '/oms/order/grab/motan/OrderBadgeApi/getListLogisticsService', key: 'logisticsBusiness'}); // 物流服务商
        this.props.getCommonSelectData({url: '/oms/order/grab/motan/OrderBadgeApi/getSendTypeList', key: 'sendTypelist'}); // 标记追踪号之发货类型
        // this.props.form.setFieldsValue({orderDate:[moment('00:00:00', 'HH:mm:ss'),moment('23:59:59', 'HH:mm:ss')]})
        this.setDefaultTime();
        if (pageCachedata && pageCachedata.quickdState && pageCachedata.quickdState > 0) {  // 设置页签为缓存中的数据
            this.setState({
                active: pageCachedata.quickdState
            }, () => {
                this.handleSubmit();
            })
        } else {
            this.handleSubmit();
        }
    }

    // 设置默认时间
     setDefaultTime = () => {
        let clstart = (new Date()).valueOf() - 86399000 * 9;
        clstart = timestampFromat(clstart, 1);
        this.props.form.setFieldsValue({ orderDate: [moment(clstart, 'YYYY-MM-DD HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]||[] })
    }
    
    // 禁用日期范围
    disabledDate = (current) => {
        var { range, type } = this.orderTime
        var rangeNum = type ? 3 : 1
        if (range.length == 1) {
            var nowRange = moment(range[0])
            if (current < nowRange.subtract(rangeNum, "months").add(1, "days")) {
            return true
            }
            nowRange = moment(range[0])
            
            if (current > nowRange.add(rangeNum, "months").subtract(1, "days")) {
                return true
            }
        }
        return current && current > moment().endOf('day');
    }

    orderTimeChange = (arr) => {
        this.orderTime.range = arr
    }

    /**
     * 作者: pzt
     * 描述: taglick（快捷状态查询）
     * 时间: 2018/4/4 9:10
     * @param <string> value 数组项
     * @param <number> index 数组索引
     **/
    taglick = (value, index) => () => {
        this.setState({ active: value.id }, () => {
            let arr = this.props.quickdstateModel.orderstate;
            arr.map((val) => {
                if (value.name == val.option) {
                    this.props.form.setFieldsValue({ orderState: val.value })
                }
            });
            // TAB页变化时，订单状态重置为“全部”
            this.props.form.setFieldsValue({ 'orderState': '' });
            // 三个月时间区间
            let startTime = (new Date()).valueOf() - 86399000 * 91;
            let clstart = (new Date()).valueOf() - 86399000 * 9
            clstart = timestampFromat(clstart, 1)
            startTime = timestampFromat(startTime, 1);
            if (value.name == "全部") {
                this.orderTime.type = 0
                this.props.form.setFieldsValue({ orderDate: [moment(clstart, 'YYYY-MM-DD HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')] })
            } else {
                this.orderTime.type = 1
                this.props.form.setFieldsValue({ orderDate: [moment(startTime, 'YYYY-MM-DD HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')] })
            }
            this.handleSubmit();
        });
    }

    // 选择订单状态切换至全部订单查询
    changeOption = () => {
        this.setState({
            active: -2147483648
        })
        this.props.quickdstateModel.quickdstate = '';
    }
    
    /**
     *作者: pzt
     *时间: 2018/4/8
     *描述: 按逗号截取字符串，并给每一项添加单引号
     *@param: <string> str 一串逗号隔开的字符串
     **/
    addQuotes = (str) => {
        str = str.replace(/，/ig, ',');
        let arr = str.split(','),
            obj = '';
        for (let i = 0; i < arr.length; i++) {
            if (i == arr.length - 1) {
                arr[i] = arr[i].replace(arr[i], "'" + encodeURIComponent(arr[i]) + "'");
            } else {
                arr[i] = arr[i].replace(arr[i], "'" + encodeURIComponent(arr[i]) + "',");
            }
            obj += decodeURIComponent(arr[i])
        }
        return obj;
    }
    
    handleReset = () => {
        this.props.form.resetFields();
        this.props.form.setFieldsValue({ orderDate: [] })
    }

    // 数据提交请求
    handleSubmit = (pageNumber = 1, pageData = 20) => {
        const paramsObj = this.filterSearchParams(pageNumber, pageData);
        this.props.fetchPosts({ key: 'data', value: paramsObj });
    }

    filterSearchParams = (pageNumber = 1, pageData = 20) => {
        const newobj = {}
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                for (let i in values) {
                    if (values[i]) {
                        if (i == 'paymentDate') {
                            const arr = getGangeGimes(values[i])
                            newobj['paymentStartDate'] = arr[0] ? arr[0] : ''
                            newobj['paymentEndDate'] = arr[1] ? arr[1] : ''
                        } else if (i == 'orderDate') {
                            const arr = getGangeGimes(values[i])
                            newobj['orderStartDate'] = arr[0] ? arr[0] : ''
                            newobj['orderEndDate'] = arr[1] ? arr[1] : ''
                        } else if (i == 'goodsNumber') {
                            newobj[i] = this.addQuotes(values[i]);
                        } else if (i == 'waybillNumber') {
                            newobj[i] = this.addQuotes(values[i]);
                        } else if (i == 'orderId') {
                            continue
                        } else {
                            newobj[i] = values[i]
                        }
                    }
                }
                if (values.orderSource && values.orderSource[0] !== '') {
                    newobj.orderSource = values.orderSource[0];
                } else {
                    delete newobj.orderSource;
                }
                if (values.tipOrderType && values.tipOrderType[0] !== '') {
                    newobj.tipOrderType = values.tipOrderType[0];
                } else {
                    delete newobj.tipOrderType;
                }
                if (values.isFake && values.isFake[0] !== '') {
                    newobj.isFake = values.isFake[0]  == 2 ? true : false;
                } else {
                    delete newobj.isFake;
                }
            }
        });
        this.setState({
            pageNumber,
            pageData,
        })
        newobj["pageData"] = pageData;
        newobj["pageNumber"] = pageNumber;
        if (this.state.active > 0) {
            newobj["quickdState"] = this.state.active;
        }
        this.props.menudataaction({ pageCache: { ...this.props.menuInfos.pageCache, [`${location.pathname}${location.search}`]: newobj } });
        return newobj;
    }

    render() {
        const { active } = this.state;
        return (
            <div className="newClue smtorder-list yks-erp-search_order">
                <div className="newCluewk">
                    <Condition
                        {...this.props} 
                        handleReset={this.handleReset} 
                        handleSubmit={this.handleSubmit} 
                        disabledDate={this.disabledDate}
                        orderTimeChange={this.orderTimeChange}
                        changeOption={this.changeOption}
                        active={active}
                    />
                    <Tablelist
                        {...this.props} 
                        handleReset={this.handleReset} 
                        handleSubmit={this.handleSubmit}
                        taglick={this.taglick}
                        active={active}
                        filterSearchParams={this.filterSearchParams}
                    />
                    <SearchValues {...this.props} />
                </div>
            </div>
        );
    }
}

export default connect(state => ({...state}), dispatch => bindActionCreators(actions, dispatch))(
    Form.create({
        mapPropsToFields(props) {
            const Infos = {}
            for (let i in props.Infos) {
                if (props.Infos[i].name) {
                    Infos[i] = Form.createFormField(props.Infos[i])
                }
            }
            return Infos
        },
        onFieldsChange(props, fields) {
            props.baseInfoForm(fields)

        },
    })(UserForm));
