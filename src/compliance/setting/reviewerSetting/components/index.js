import React, { Component } from 'react';
import { Form, Modal, message } from 'antd';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import actions from '../actions';

import { filterRequest } from '../../../utils';
import { fetchPost } from '../../../../util/fetch';
import { page } from '../../../configs';
import { timestampFromat } from '../../../../utils';

import Functions from '../../../../components/functions';
import Modal2 from '../../../../components/Modal2';
import Tablelist from './Tablelist';
import Search from "./Search";
import Detail from './Detail';

import {
    REVIEWERSETTING_EDIT,
    REVIEWERSETTING_DELETE
} from "../constants";

import '../css/index.css';
import { path } from '../../../configs';

const confirm = Modal.confirm;

class App extends Component {
    state = {
        newVisible: false,
        editVisible: false,
        detailVisible: false,
        currentItem: {},
        isShow: false,
        title: '',
        tagValue: {
            reviewType: [1]
        },
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
                reviewType: [1]
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
            editVisible: false,
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
            if (values.firstCategory) {
                values.firstCategory = values.firstCategory.filter(v => !!v)
                values.secondCategory = values.secondCategory.filter(v => !!v)
            }
            let params = { ...values }
            params['reviewer'] = [values.reviewer.key, values.reviewer.label]
            if (this.state.newVisible) {
                this.postEditRequest(params)
            } else if (this.state.editVisible) {
                params.reviewerSettingId = this.state.currentItem.reviewerSettingId
                params.reviewType = this.state.currentItem.reviewType
                delete params.reviewer
                this.postEditRequest(params)
            }
        });
    }
    /**
     * 发送新增修改请求
     * @param <String> params为请求参数
     */
    postEditRequest(params) {
        fetchPost(REVIEWERSETTING_EDIT, params).then(data => {
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
     * 删除确认弹框
     * @param <String> item为某一行数据
     */
    showDeleteConfirm = (item) => {
        const params = { reviewerSettingId: item.reviewerSettingId, reviewType: item.reviewType }
        const self = this
        confirm({
            maskClosable: true,
            title: '确定要删除吗？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                fetchPost(REVIEWERSETTING_DELETE, params).then(data => {
                    if (data && data.state === "000001") {
                        self.handleCancel()
                        message.success('操作成功.');
                        self.listFetch();
                    } else {
                        message.error(data.msg)
                    }
                })
            }
        });
    }
    renderDetailComponent() {
        if (this.state.newVisible) {
            return (<Detail ref="form" />)
        } else {
            return (<Detail ref="form" item={this.state.currentItem} />)
        }
    }
    render() {
        const { isShow, title, tagValue } = this.state;

        return (
            <Functions {...this.props} isPage={true} functionkey="007-000002-000005-001">
                <div className="data-review-setting" >
                    <Search
                        {...this.props}
                        tagValue={tagValue}
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
                        width='720px'
                        component={this.renderDetailComponent()}
                        title={title}
                        visible={isShow}
                        handleCancel={() => this.handleCancel()}
                        handleOk={this.handleOk}
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