/**
 *作者: 唐峰
 *功能描述: 渠道标记模块父组件
 *参数说明:
 *时间: 2018/4/4 11:15
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
import SearchValues from '../../../components/searchValues/containers/App';
import {pageCache} from "../../../util/baseTool";
class UserForm extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const pageCachedata = pageCache(this,`${location.pathname}${location.search}`);
        this.props.fetchPosts({
            key: 'data', value: pageCachedata||{
                pageNumber: 1,
                pageData: 20,
            }
        });

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