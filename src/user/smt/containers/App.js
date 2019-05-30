import React, {Component} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../actions';
import {Form, Breadcrumb} from 'antd';
import '../css/css.css';
import Condition from '../components/Condition';
import Tablelist from '../components/Tablelist';
import {datasaddkey, pageCache} from '@/util/baseTool';
import axios from "@/util/axios";
// import Breadcrumbs from '../../components/breadcrumb/index';
import * as config from '@/util/connectConfig';
class UserForm extends Component {

    constructor(props) {
        super(props);
    }
    /**
    *作者: 唐勇
    *功能描述: 页面加载初始化绑定数据
    *参数说明:
    *时间: 2018/4/3 19:00
    */

    componentDidMount() {
        const pageCachedata = pageCache(this,`${location.pathname}${location.search}`)
        const newobj = {}
        newobj.pageNumber = 1
        newobj.pageData = 20
        newobj.authState = ''
        this
            .props
            .tablemodelaction({loading: true})
        axios
            .post(`${config.api_url}/oms/order/grab/motan/SellStoreAccountApi/findStoreList`, pageCachedata||newobj)
            .then(response => {
                if (response.status == 200) {
                    const productInfo = response.data.data;
                    const productInfoarr = datasaddkey(productInfo);
                    const newproductInfoarr = productInfoarr.length
                        ? productInfoarr.map((v, i) => {
                            var starttime = v.secretStartTime;
                            var endtime = v.secretEndTime;
                            var showabled = true
                            var time = ''
                            if (!starttime || !endtime) {
                                showabled = false;
                            }
                            time = showabled
                                ? starttime + '-' + endtime
                                : starttime || "" + endtime || ""

                            return ({
                                sid: v.sid,
                                platformAccounts: v.platformAccount,
                                accountTypes: {
                                    name: `accountTypes${v.key}`,
                                    initialValue: v.accountType,
                                    message: '请选择账号类型',
                                    placeholder: '账号类型'
                                },
                                authStates: {
                                    name: `authStates${v.key}`,
                                    initialValue: v.authState,
                                    message: '请选择授权状态',
                                    placeholder: '授权状态'
                                },
                                // shopowners: v.shopowner,
                                Keyvalidityperiods: time,
                                operators: v.operator,
                                operationTimes: v.operationTime,
                                shopId: v.shopId,
                                url: v.url
                            })
                        })
                        : []
                    const total = response.data.total;
                    this
                        .props
                        .Paginationmodelaction({
                            current: pageCachedata?pageCachedata['pageNumber']:newobj['pageNumber'] || 1,
                            total: total,
                            pageSize: newobj['pageData'] || 20
                        })

                    this
                        .props
                        .tablemodelaction({data: newproductInfoarr, count: newproductInfoarr.length, loading: false});
                }
            })
            .catch(e => {
                console.log(e);
            });

    }

    render() {
        return (
            <div className="newClue">
                <div className="newCluewk">
                    <Condition {...this.props}/>
                    <Tablelist {...this.props}/>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    ...state
}), dispatch => bindActionCreators(actions, dispatch))(Form.create({
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

    }
})(UserForm));
