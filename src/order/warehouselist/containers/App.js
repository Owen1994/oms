/**
 *作者: 任贸华
 *功能描述: 指定发货仓渲染主文件
 *参数说明:
 *时间: 2018/4/16 11:18
 */
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'

import {
    Form,
} from 'antd'

import '../css/css.css'


import Condition from '../components/Condition';
import Tablelist from '../components/Tablelist';
import Warehouserule from '../components/warehouserule';

import SearchValues from '../../../components/searchValues/containers/App';
import {pageCache} from "../../../util/baseTool";


class UserForm extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const pageCachedata = pageCache(this,`${location.pathname}${location.search}`)
        this.props.getCommonSelectData({url: '/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform', key: 'platformId'})
        this.props.getCommonSelectData({url: '/oms/order/manage/motan/IPackageApi/getLogisticsChannel', key: 'newChannelCode'})
        this.props.getCommonSelectData({url: '/oms/order/grab/motan/SellStoreAccountApi/findStoreListPublic', key: 'ordersBelongAccount'})
        this.props.fetchPosts({key: 'data',value:pageCachedata|| {}})
    }

    componentWillUnmount() {
        this.props.form.resetFields()
    }

    render() {

        return (
            <div className="newClue">

                <div className="newCluewk">
                    <Condition {...this.props} />
                    <Warehouserule {...this.props} />
                    <Tablelist {...this.props} />
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