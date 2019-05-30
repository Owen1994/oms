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


// import Condition from '../components/Condition';
import SearchComponent from '../components/Search';
import Tablelist from '../components/Tablelist';
import SearchValues from '../../../../components/searchValues/containers/App';
import {pageCache} from "../../../../util/baseTool";
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

    //查询按钮
    handleSubmit = () => {
        const values = this.props.form.getFieldsValue();
        if(values.channelNumber && values.channelNameId && values.channelName){
            if(values.channelNumber == values.channelNameId){
                values.channelNumber = ''
            }else{
                message.warning('渠道编号与渠道名称冲突,将以渠道名称为准!')
                values.channelNumber = values.channelNameId
            }
        }
        if(values.searchContent){
            values[values.searchType] = values.searchContent;
        }
        delete values.searchType;
        delete values.searchContent;
        values.pageNumber = 1;
        values.pageData = this.props.Paginationmodel.pageSize || 20; //获取存放在redux中当前 每页显示的最大条数
        this.props.fetchPosts({key: 'data', value: values});
        this.props.menudataaction({pageCache: {...this.props.menuInfos.pageCache, [`${location.pathname}${location.search}`]: values}});
    }

    render() {

        return (
            <div className="newClue">
                <SearchComponent {...this.props} handleSubmit={this.handleSubmit} />
                <div className="newCluewk breadcrumb">
                    {/* <Condition {...this.props} /> */}
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
