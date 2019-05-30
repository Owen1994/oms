import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'

import {
    Form,
} from 'antd'

import '../css/css.css'

import {pageCache} from '../../../util/baseTool'
import Condition from '../components/Condition';
import Tablelist from '../components/Tablelist';

// import Searchplatform from '../../../components/searchOpt/containers/App';
import SearchValues from '../../../components/searchValues/containers/App';

class UserForm extends Component {

    constructor(props) {
        super(props);
    }
    /**
    *作者: 唐勇
    *功能描述: 页面打开加载
    *参数说明:
    *时间: 2018/4/3 19:00
    */
    componentDidMount() {
        const pageCachedata = pageCache(this,`${location.pathname}${location.search}`)
        this.props.getCommonSelectData({url: '/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform', key: 'salesPlatform'})
        const newobj = {}
        newobj.pageData=20;
        newobj.pageNumber=1;
        this.props.fetchPosts({key: 'data', value:pageCachedata||newobj});
    }

    render() {

        return (
            <div className="newClue">

                <div className="newCluewk">
                    <Condition {...this.props} />
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