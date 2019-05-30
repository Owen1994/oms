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
import axios from "../../../util/axios";
import * as config from "../../../util/connectConfig";
import qs from "qs";
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
        const locationarr = window.location.href.split('?');
        const reimReportId =locationarr.length > 1 ? qs.parse(locationarr[1])['reimReportId'] ? qs.parse(locationarr[1])['reimReportId'] : '' : '';
        this.props.baseInfoForm({reimReportId:reimReportId});
        const newobj = {}
        newobj.pageData=20;
        newobj.pageNumber=1;
        newobj.searchKey={
            isReimOk:"100",
            processStatus:"100",
            reimType:"100",
            asin:"",
            sellerSku:"",
            fnsku:"",
            caseId:"",
            reimReportId:reimReportId,
        }

        this
            .props
            .fetchPosts({
                key: 'data',
                value: newobj
            });
    }

    render() {
        return (
            <div className="newClue">
                <Condition {...this.props} />
                <Tablelist {...this.props} />
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