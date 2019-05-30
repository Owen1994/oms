import React, { Component } from 'react';
import { Form, message, Modal } from 'antd';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import actions from '../actions';

import Functions from '../../../../components/functions';
import Modal2 from '../../../../components/Modal2';
import Search from './Search';
import Tablelist from './Tablelist';
import Addoredit from './Addoredit';

// import { INTELLECTUALCODE_ADD_EDIT, INTELLECTUALCODE_DELETE } from '../constants';
import { filterRequest } from "../../../../utils";
import { page } from "../../../../constants";
import { fetchPost } from "../../../../util/fetch";
import { path } from '../../../configs';

const confirm = Modal.confirm;

class App extends Component {
    state = {
        riskVisible: false,
        title: '',
        confirmLoading: false,
        intellectualCodeId: null
    }

    /**
     * 请求列表
     * @param <Number> pageNumber 页码
     * @param <Number> pageData 每页条数
     */
    listFetch = (pageNumber, pageData) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const filter = filterRequest(values)
                filter['pageNumber'] = pageNumber || page.defaultCurrent;
                filter['pageData'] = pageData || page.defaultPageSize;
                this.props.listFetch({ name: 'data', value: filter });
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
        this.props.form.resetFields();
    };
    /**
 * 弹框
 * @param <String> name   弹窗visible状态
 * @param <String> bool   弹窗开启状态
 * @param <String> item   某一项数据
 */
    onChangeModal = (name, bool, title, id) => {
        console.log(id);
        this.setState({
            [name]: bool,
            title: title,
            intellectualCodeId: id
        })
    };

    // 新增修改
    handleOk = () => {
        const {disableinfoRef}= this.state
        this.refs.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    confirmLoading: true
                });
                let params = {
                    ...values,
                    ...disableinfoRef.getData()
                }
                // 触发新增一级分类按钮
                if (!this.state.intellectualCodeId) {
                    this.postEditRequest(params)
                } else {
                    params.intellectualCodeId = this.state.intellectualCodeId
                    this.postEditRequest(params)
                }
            }
        });

    };
    /**
     * 发送新增修改请求
     * @param <String> params为请求参数
     */
    postEditRequest(params) {
        fetchPost(path.irp + 'intellectualCode/Edit/edit', params).then(data => {
            this.setState({
                confirmLoading: false
            });
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
    onDeleteTemp = (intellectualCodeId) => {
        const params = { intellectualCodeId: intellectualCodeId }
        const self = this
        confirm({
            maskClosable: true,
            title: '确定要删除吗？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                fetchPost(path.irp + 'intellectualCode/Delete/delete', params).then(data => {
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
    /**
     * 关闭弹框,清空数据
     * @param <String> name 弹窗显示状态
     */
    handleCancel() {
        this.setState({
            riskVisible: false,
            intellectualCodeId: null,
        })
    }
    // 用于获取 Disableinfo 组件
    getRef = (a) => this.setState({ disableinfoRef: a })

    render() {
        const { riskVisible, confirmLoading, intellectualCodeId, title } = this.state;
        console.log(title);
        return (
            <Functions {...this.props} isPage={true} functionkey="007-000002-000002-001">
                <div className='data-risk-code'>
                    <Search
                        onReset={this.onReset}
                        onSubmit={this.onSubmit}
                        {...this.props}
                        listFetch={this.listFetch}
                    />
                    <Tablelist
                        {...this.props}
                        listFetch={this.listFetch}
                        onChangeModal={this.onChangeModal}
                        onDeleteTemp={this.onDeleteTemp}
                    />
                    <Modal2
                        component={(<Addoredit getRef={this.getRef} visible={riskVisible} intellectualCodeId={intellectualCodeId} ref="form" />)}
                        title={title}
                        visible={riskVisible}
                        handleOk={this.handleOk}
                        handleCancel={() => this.onChangeModal('riskVisible', false, {})}
                        confirmLoading={confirmLoading}
                        width={700}
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