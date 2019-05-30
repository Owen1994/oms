import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions, {ringsitedataajax} from '../actions'

import {
    Form,
} from 'antd'

import '../css/css.css'
import Condition from '../components/Condition';
import Tablelist from '../components/Tablelist';
import Codytablelist from '../components/Codytablelist';
import SearchValues from '../../../components/searchValues/containers/App';
import axios from "../../../util/axios";
import * as config from "../../../util/connectConfig";
import {message} from "antd/lib/index";
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
        const newobj = {}
        newobj.lstShopAccount=[];
        this
            .props
            .dataoverviewajax({
                key: 'data',
                value: newobj
            });

        //排名时间
        const rankingtime={}
        const newibjringing={}
        let time2 = new Date()
        var preDate = new Date(time2.getTime() - 24*60*60*1000); //前一天
        let ztyy = preDate.getFullYear()
        let ztmm = ((preDate.getMonth() + 1) > 10 ? (preDate.getMonth() + 1) : '0' + (preDate.getMonth() + 1))
        let ztdd=preDate.getDate() > 10 ? preDate.getDate() : '0' + preDate.getDate();
        let end=ztyy + '-' + ztmm + '-' + ztdd;
        time2.setTime(preDate.getTime() - (24 * 60 * 60 * 1000 * 30))
        let Y2 = time2.getFullYear()
        let M2 = ((time2.getMonth() + 1) > 10 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
        let D2 = (time2.getDate() > 10 ? time2.getDate() : '0' + time2.getDate())
        let start = Y2 + '-' + M2 + '-' + D2 // 之前的30天

        rankingtime.starttime=start;
        rankingtime.endtime=end;
        this.props.rankingtimeaction({data:rankingtime});
        newibjringing.lstShopAccount=[];
        newibjringing.startDay=start;
        newibjringing.endDay=end;
        newibjringing.pageNumber=1
        newibjringing.pageData=20
        this
            .props
            .ringingdataajax({
                key: 'data',
                value: newibjringing
            })
    }

    render() {
        return (
            <div className="newClue">
                <div className="newCluewk">
                    <Condition {...this.props} />
                    <Tablelist {...this.props} />
                    <Codytablelist {...this.props} />
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