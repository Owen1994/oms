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
import Detail2 from './Detail2';

import {
    PERMITSALEACCOUNT_EDIT,
    PERMITSALEACCOUNT_DELETE
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
            specialpermitType: [0]
        },
        detailData: []
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
                specialpermitType: [0]
            }
        })
        this.props.form.resetFields();
        this.props.form.setFieldsValue({ specialpermitType: [0] });
    };
    onChangeModal = (name, title, item, detailData) => {
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
        this.setState({ detailData: detailData })

    };

    deleteItem = () => {

    }
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
            let params = values
            if (this.state.newVisible) {
                this.postEditRequest(params)
            } else if (this.state.editVisible) {
                params.saleAccountCodeId = this.state.currentItem.saleAccountCodeId
                params.platform = this.state.currentItem.platform
                params.site = this.state.currentItem.site
                delete params.siteName
                delete params.platformName
                this.postEditRequest(params)
            }
        });
    }
    /**
     * 发送新增修改请求
     * @param <String> params为请求参数
     */
    postEditRequest(params) {
        fetchPost(PERMITSALEACCOUNT_EDIT, params).then(data => {
            if (data && data.state === "000001") {
                message.success(data.msg || '操作成功.')
                this.listFetch()
                this.handleCancel()
            } else {
                message.error(data.msg)
            }
        })
    }

    /**
     * 删除
     * @param <String> params为请求参数
     */
    postDeleteRequest(id) {
        fetchPost(PERMITSALEACCOUNT_DELETE, { saleAccountCodeId: id }).then(data => {
            if (data && data.state === "000001") {
                message.success(data.msg || '操作成功')
                this.listFetch()
            } else {
                message.error(data.msg)
            }
        })
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
            <Functions {...this.props} isPage={true} functionkey="007-000002-000004-001">
                <div className="data-permit-sale-account" >
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
                        deleteModal={this.postDeleteRequest}
                    />
                    <Modal2
                        width='630px'
                        component={this.renderDetailComponent()}
                        title={title}
                        visible={isShow}
                        handleCancel={() => this.handleCancel()}
                        handleOk={this.handleOk}
                    />
                    <Modal2
                        width='630px'
                        component={(<Detail2 ref="form" item={this.state.currentItem} detailData={this.state.detailData} />)}
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