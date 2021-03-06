import React, { Component } from 'react';
import { Form, Modal, message } from 'antd';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import actions from '../actions';

import { filterRequest } from '../../../utils';
import { fetchPost } from '../../../../util/fetch';
import { page } from '../../../configs';

import Functions from '../../../../components/functions';
import Modal2 from '../../../../components/Modal2';
import Tablelist from './Tablelist';
import Search from "./Search";
import Detail from './Detail';
import Detail2 from './Detail2';

// import { CONDITIONMENU_DELETE, 
//          CONDITIONMENU_EDIT} from "../constants";
import { path } from '../../../configs';

import '../css/index.css';

const confirm = Modal.confirm;

class App extends Component {
    state = {
        newVisible: false,
        detailVisible: false,
        currentItem: {},
        isShow: false,
        title: ''
    }
    /**
     * 请求列表
     * @param <Number> pageNumber 当前第几页
     * @param <Object> pageData   分页页码
     */
    listFetch = (pageNumber, pageData) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const filter = filterRequest(values)
                filter['pageNumber'] = pageNumber || page.defaultCurrent;
                filter['pageData'] = pageData || page.defaultPageSize;
                const filters = { ...this.state.tagValue, ...filter }
                this.setState({
                    tagValue: filters
                })
                this.props.list_fetch({ name: 'data', value: filter });
            }
        });
    }
    // 点击按钮搜索
    onSubmit = (event) => {
        event.preventDefault();
        this.listFetch();
    };

    // 重置
    onReset = () => {
        this.setState({
            tagValue: {
                bindingMainState: [0]
            }
        })
        this.props.form.resetFields();
    };
    onChangeModal = (name, title, item) => {
        if (item) {
            this.setState({ currentItem: item })
        }
        if (name === 'detailVisible') {
            this.setState({ detailVisible: true })
        } else {
            this.setState({
                isShow: true,
                [name]: true,
                title: title,
            })
        }

    };
    /**
     * 关闭弹框,清空数据
     * @param <String> name 弹窗显示状态
     */
    handleCancel() {
        this.setState({
            newVisible: false,
            detailVisible: false,
            isShow: false,
            currentItem: {}
        })
    }
    handleOk = () => {
        this.refs.form.validateFields((err, values) => {
            if (err) {
                return
            }
            const { disableinfoRef } = this.state;
            
            const data = disableinfoRef.getData()
            let params = {
                ...values,
                ...data
            }
            // 触发新增一级分类按钮
            if (this.state.newVisible) {
                this.postEditRequest(params)
            }
        });
    }
    /**
     * 删除确认弹框
     * @param <String> params为请求参数
     */
    postEditRequest(params) {
        fetchPost(path.irp + 'ConditionsMenuAddOrEdit/conditionsMenuAddOrEdit', params).then(data => {
            if (data && data.state === "000001") {
                message.success('操作成功.')
                this.listFetch()
                this.handleCancel()
            } else {
                message.error(data.msg)
            }
        })
    }
    /**
     * 发送新增修改请求
     * @param <String> item为某一行数据
     */
    showDeleteConfirm = (ids) => {
        let params;
        if (Array.isArray(ids)) {
            params = { id: ids }
        } else {
            params = { id: [ids] }
        }

        const self = this
        confirm({
            maskClosable: true,
            title: '确定要删除吗？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                fetchPost(path.irp + 'ConditionMenuDelete/conditionMenuDelete', params).then(data => {
                    if (data && data.state === "000001") {
                        message.success('操作成功.');
                        self.listFetch();
                    } else {
                        message.error(data.msg)
                    }
                })
            }
        });
    }

    // 用于获取 Disableinfo 组件
    getRef = (a) => this.setState({ disableinfoRef: a })

    renderDetailComponent() {
        if (this.state.newVisible) {
            return (<Detail getRef={this.getRef} ref="form" />)
        } else {
            return (<Detail getRef={this.getRef} ref="form" item={this.state.currentItem} />)
        }
    }
    render() {
        const { isShow, title } = this.state;
        return (
            <Functions {...this.props} isPage={true} functionkey="007-000001-000002-000001-001">
                <div className="conditionMenu" >
                    <Search
                        {...this.props}
                        listFetch={this.listFetch}
                        onReset={this.onReset}
                        onSubmit={this.onSubmit}
                    />
                    <Tablelist
                        {...this.props}
                        listFetch={this.listFetch}
                        onChangeModal={this.onChangeModal}
                        deleteItem={this.showDeleteConfirm}
                    />
                    <Modal2
                        width='700px'
                        component={this.renderDetailComponent()}
                        title={title}
                        visible={isShow}
                        handleCancel={() => this.handleCancel()}
                        handleOk={this.handleOk}
                    />
                    <Modal2
                        width='969px'
                        component={(<Detail2 ref="form" item={this.state.currentItem} />)}
                        title='查看'
                        visible={this.state.detailVisible}
                        handleCancel={() => this.handleCancel()}
                        handleOk={() => { this.setState({ detailVisible: false }) }}
                    />
                </div>
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