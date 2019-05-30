/**
 *作者: 任贸华
 *功能描述: 抓单转换配置渲染主文件
 *参数说明:
 *时间: 2018/4/16 11:31
 */
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import {Form,} from 'antd'
import '../css/css.css'
import Condition from '../components/Condition';
import Tablelist from '../components/Tablelist';
import SkuprefixApp from '../components/skuprefixApp';
import CharacterApp from '../components/characterApp';
import EditconditionApp from '../components/editconditionApp';
import SearchValues from '../../../components/searchValues/containers/App';
import {pageCache} from "../../../util/baseTool";

class UserForm extends Component {

    constructor(props) {
        super(props);
    }

    /**
     *作者: 任贸华
     *功能描述: 请求后台相关接口
     *参数说明:
     *时间: 2018/4/17 9:46
     */
    componentDidMount() {
        const pageCachedata = pageCache(this,`${location.pathname}${location.search}`)
        //仓库
        this.props.getCommonSelectData({
            url: '/oms/order/manage/motan/service/api/IOrderManageService/getAllWarehouse',
            key: 'commonWarehouse'
        })
        //物流渠道
        this.props.getCommonSelectData({
            url: '/oms/order/manage/motan/IPackageApi/getLogisticsChannel',
            key: 'commonLogistics'
        })
        //SKU字符规则
        this.props.getCommonSelectData({
            url: '/oms/order/grab/motan/OrderGrabConfigApi/getSkuCharacterRuleList',
            key: 'commonSkucharacter'
        })
        //SKU前后缀位置
        this.props.getCommonSelectData({
            url: '/oms/order/grab/motan/OrderGrabConfigApi/getSkuConvertPositionList',
            key: 'commonPosition'
        })
        this.props.fetchPosts({key: 'data',value:pageCachedata|| {}})//列表
    }

    componentWillUnmount() {
        this.props.form.resetFields();
    }

    render() {
        const {
            editconditionAppaction,
            editconditionApp,
            fetchPosts,
            commonSelectData,
            getCommonSelectData,
        } = this.props;
        return (
            <div className="newClue">

                <div className="newCluewk">
                    <Condition {...this.props} />
                    <EditconditionApp
                        editconditionAppaction={editconditionAppaction}
                        editconditionApp={editconditionApp}
                        fetchPosts={fetchPosts}
                        commonSelectData={commonSelectData}
                        getCommonSelectData={getCommonSelectData}
                    />
                    <SkuprefixApp {...this.props} />
                    <CharacterApp {...this.props} />
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
