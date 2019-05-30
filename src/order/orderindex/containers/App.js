import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions, {platformaction} from '../actions'

import {
    Form,
} from 'antd'

import '../css/css.css'
import Condition from '../components/Condition';
import Tablelist from '../components/Tablelist';
import axios from "../../../util/axios";
import * as config from '../../../util/connectConfig'

class UserForm extends Component {

    constructor(props) {
        super(props);
    }

    /**
     *作者: 唐勇
     *功能描述:  页面加载初始化获取平台并加载数据
     *参数说明:
     *时间: 2018/5/15 10:30
     */
    componentDidMount() {
        const newobj = {}
        axios.post(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform`,newobj)
            .then(response => {
                if (response.status == 200) {
                    if (response.data.state == '000001') {
                        this.props.platformaction({data:response.data.data });
                        this.yestdaySku();   //昨日SKU数据初始化加载
                        this.orderdetail();  //订单数据信息初始化数据加载
                    }
                }
            }).catch(e => {
                console.log(e);
        });

    }

    /**
     *作者: 唐勇
     *功能描述:  订单数据信息初始化数据加载
     *参数说明:
     *时间: 2018/5/12 10:30
     */
    orderdetail=()=>{
        const newobj = {
            platformId:''
        }
        axios.post(`${config.api_url}/oms/order/manage/motan/IIndexPageApi/getCurrentDayAndMonthOrderData`,newobj)
            .then(response => {
                if (response.status == 200) {
                    if (response.data.state == '000001') {
                        this.props.orderdeailaction({data:response.data.data})
                    }
                }
            }).catch(e => {
            console.log(e);
        });
    }

    /**
     *作者: 唐勇
     *功能描述:  昨日SKU数据初始化加载
     *参数说明:
     *时间: 2018/5/12 10:30
     */
    yestdaySku= () => {
        const newobj = {
            platformId:''
        }
        axios.post(`${config.api_url}/oms/order/manage/motan/IIndexPageApi/getYesterdaySkuTop`,newobj)
            .then(response => {
                if (response.status == 200) {
                    if (response.data.state == '000001') {
                        this.props.yesterdaySkuaction({data:response.data.data})
                    }
                }
            }).catch(e => {
            console.log(e);
        });
    }

    render() {
        return (
            <div className="newClue">
                <div className="newCluewk">
                    <Condition {...this.props} />
                    <Tablelist {...this.props} />
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