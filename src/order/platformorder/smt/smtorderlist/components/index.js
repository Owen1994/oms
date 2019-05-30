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
import Condition from './Condition'; // 条件查询模块
import Tablelist from './Tablelist'; // 列表数据

import SearchValues from '@/components/searchValues/containers/App';
import { addQuotes, pageCache } from 'util/baseTool';
import { levelOptions } from "util/options";


class UserForm extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        const pageCachedata = pageCache(this,`${location.pathname}${location.search}`);
        this.props.fetchquickdstatePosts({name: 'data'});  //快捷状态
        this.props.getCommonSelectData({url: '/oms/order/grab/motan/OrderGrabApi/getAllOrderStatus', key: 'allOrderStatus'}); //订单状态
        //this.props.getCommonSelectData({url: '/oms/order/grab/motan/OrderBadgeApi/getListLogisticsService', key: 'logisticsBusiness'}); // 物流服务商
        this.props.getCommonSelectData({url: '/oms/order/grab/motan/OrderBadgeApi/getSendTypeList', key: 'sendTypelist'}); // 标记追踪号之发货类型
        this.props.form.setFieldsValue({orderDate:[moment('00:00:00', 'HH:mm:ss'),moment('24:00:00', 'HH:mm:ss')]})
        const newobj = {};
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                for (let i in values) {
                    if (values[i]) {
                        if (i == 'orderDate') {
                            const arr = values[i].map(v => v.valueOf())
                            newobj['orderStartDate'] = arr[0] ? arr[0] : ''
                            newobj['orderEndDate'] = arr[1] ? arr[1] : ''
                        } else if(i == 'orderId'){
                            continue
                        }else if(i == 'goodsNumber'){
                            newobj[i] = addQuotes(values[i]);
                        }else if(i == 'waybillNumber'){
                            newobj[i] = addQuotes(values[i]);
                        } else {
                            newobj[i] = values[i]
                        }
                    }
                }
                newobj["pageData"] = levelOptions('pageInit').pagedata;
                newobj["pageNumber"] = levelOptions('pageInit').pagenum;
                newobj["quickdState"] = -2147483648;
                this.props.fetchPosts({key: 'data', value: pageCachedata || newobj});
                this.props.menudataaction({pageCache:{...this.props.menuInfos.pageCache,[`${location.pathname}${location.search}`]:newobj}});
            }
        });
    }

    render() {
        return (
            <div className="newClue smtorder-list">
                <div className="newCluewk">
                    <Condition {...this.props} />
                    <Tablelist {...this.props} />
                    <SearchValues {...this.props} />
                </div>
            </div>
        );
    }
}

export default Form.create()(UserForm);