import React, { Component } from 'react';
import { Form, message } from 'antd';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import actions from '../actions';

import Functions    from  '../../../../components/functions';
import Modal2       from '../../../../components/Modal2';
import Search       from './Search';
import Tablelist    from './Tablelist';
import Detail       from './Detail';
import Add          from './Add';

import { filterRequest }    from '../../../../utils';
import { page }             from '../../../../constants';
import { fetchPost }        from '../../../../util/fetch';
import { GET_SENSITIVE }    from '../constants';


class App extends Component {
    state = {
        tagValue: {
            state: [0]              // 处理状态
        },
        item: {},                   // 列表某一项数据
        seeVisible: false,         // 查看弹窗状态
        reptilianVisible: false    // 爬虫参数配置状态
    }

    /**
     * 请求列表
     * @param <Number> pageNumber 页码
     * @param <Number> pageData 每页条数
     */
    listFetch = (pageNumber, pageData ) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const filter = filterRequest(values)
                filter['pageNumber'] = pageNumber || page.defaultCurrent;
                filter['pageData'] = pageData || page.defaultPageSize;
                const filters = { ...this.state.tagValue, ...filter}
                this.setState({
                    tagValue: filters
                })
                this.props.list_fetch({ name: 'data', value: filter });
            }
        });
    }

    /**
     * 弹框
     * @param <String> name   弹窗visible状态
     * @param <String> bool   弹窗开启状态
     * @param <String> item   某一项数据
     */
    onChangeModal = (name, bool, item) => {
        this.setState({
            [name]: bool,
            item: item
        })
    };

    // 提交爬虫参数配置
    handleOk = () => {
        this.refs.form.validateFields((err, values) => {
            if (!err) {
                if(!values.obligee && !values.sensitive && !values.trademarkType){
                    message.error('权利人、商标商品分类、商标词至少填写一项.');
                    return false
                }
                let params = {
                    condition: {
                        activeState: values.activeState,
                        registerCountryId: values.registerCountryId,
                        obligee: values.obligee,
                        sensitive: values.sensitive,
                        trademarkType: values.trademarkType
                    },
                    info: {
                        intellectualCodeId: values.intellectualCodeId,
                        sensitiveLayer: values.sensitiveLayer,
                        platform: values.platform,
                        site: values.site,
                    }
                }
                fetchPost(GET_SENSITIVE, params).then(data=>{
                    if(data && data.state === "000001"){
                        message.success('操作成功.');
                        this.listFetch();
                        this.setState({reptilianVisible: false})
                    }
                })
            }
        });

    };

    render() {
        const { tagValue, item, seeVisible, reptilianVisible } = this.state;
        return (
            <Functions { ...this.props } isPage={true} functionkey="007-000001-000001-000001-001">
                <Search
                    {...this.props}
                    tagValue={tagValue}
                    listFetch={this.listFetch}
                />
                <Tablelist
                    {...this.props}
                    listFetch={this.listFetch}
                    onChangeModal={this.onChangeModal}
                />
                <Modal2
                    component={(<Detail item={item}/>)}
                    title="配置详情"
                    visible={seeVisible}
                    handleCancel={() => this.onChangeModal('seeVisible', false, {})}
                    handleOk={() => this.onChangeModal('seeVisible', false, {})}
                />
                <Modal2
                    component={(<Add ref="form"/>)}
                    width='750px'
                    title="爬虫参数配置"
                    visible={reptilianVisible}
                    handleCancel={() => this.onChangeModal('reptilianVisible', false)}
                    handleOk={this.handleOk}
                />
            </Functions>
        );
    }
}

export default connect(
    state => ({ ...state }),
    dispatch => bindActionCreators(actions, dispatch)
)(
    Form.create()(App)
);