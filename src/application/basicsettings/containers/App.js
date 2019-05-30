import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import {
    Form,
    Tabs
} from 'antd'
import '../css/css.css'

// 引入子组件
import Condition from '../components/Condition';
import Storetablelist from '../components/Storetablelist';      //店铺列表
import Thresholdtablelist from '../components/Thresholdtablelist';  //金额阈值列表
import Inventorytablelist from '../components/Inventorytablelist';      //盘点列表
import * as types from "../constants/ActionTypes";
import SearchValues from '../../../components/searchValues/containers/App';
import Functions from "../../../components/functions"

const TabPane = Tabs.TabPane;

class UserForm extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        params: {
            isEnabled: ['']
        },
        filterData: [],
        pageNumber: 1,
        pageSize: 20,
        filterName: '',
        filterVal: '',
        sortInfo: {}
    }

    componentDidMount() {
        this.getStoreLsit();
    }

    componentWillUnmount() {
        this.props.form.resetFields();
        this.props.baseInfoForm({preValue:{}});
    }

    //店铺列表请求      @pageCachedata 请求参数
    getStoreLsit = (pageCachedata) => {
        this.props.fetchPosts({             //店铺设置页数据请求
            key: 'data',
            value: pageCachedata || {
                pageNumber: 1,
                pageData: 20,           
            },
            url: types.GET_SHOPACCOUNTSETTINGLIST_API,
            tableAction: 'StoretablelistAction'
        });
    }

    // 条件筛选
    handleFormSubmit = (param, name) => {
        this.setState({
            params: {
                isEnabled: param
            }
        });
    }

    render() {
        let {params} = this.state;
        return (
            <div>
                <div className="basicSetting">
                    <div className="tweb-tabs">
                        <Tabs onChange={this.callback} type="card">
                            <TabPane tab="店铺设置" key="1">
                                <div className="basicSetting_container">
                                    <Condition
                                        {...this.props}
                                        getStoreLsit={this.getStoreLsit}
                                        handleFormSubmit={this.handleFormSubmit}
                                        tagSelectParams={params}
                                    />
                                </div>
                                <div className="basicSetting_container basicSetting_table">
                                    <Storetablelist
                                        {...this.props}
                                        getStoreLsit={this.getStoreLsit}
                                    />
                                </div>
                            </TabPane>
                            <TabPane tab="金额阈值设置" key="2">
                                <Functions {...this.props} functionkey={'006-000001-000003-005'}>
                                    <div className="basicSetting_container basicSetting_table">
                                        <Thresholdtablelist {...this.props} />
                                    </div>
                                </Functions>
                            </TabPane>
                            <TabPane tab="盘点报赔设置" key="3">
                                <Functions {...this.props} functionkey={'006-000001-000003-007'}>
                                    <div className="basicSetting_container basicSetting_table">
                                        <Inventorytablelist {...this.props} />
                                    </div>
                                </Functions>
                            </TabPane>

                        </Tabs>
                    </div>
                </div>
                <SearchValues {...this.props} />
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