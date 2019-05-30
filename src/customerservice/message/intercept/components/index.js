import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, message } from 'antd';

import SearchComponent from './Search';
import TableList from './TableList';
import Modal2 from '../../../../components/Modal2';
import AddUpdateModal from './AddModal';
import PopConfirm from '../../../../common/components/confirm';

import { fetchPost } from '../../../../util/fetch';
import { DELETE_API, MESSAGE_INTERCEPT_ADD_OR_EDIT } from '../constants/Api';
import actions from '../actions';
import commonRequest from '../../../common/request/common';
import Functions from '../../../../components/functions';

import '../css/index.css';

/**
 *作者: zhj
 *功能描述:  消息拦截组件容器
 */
class App extends React.Component {
    state = {
        addUpdateVisible: false,
        modalTitle: '',
        item: {},
        confirmLoading: false, // 确认按钮loading
    }

    form = React.createRef()

    platformChange = (platformId) => {
        this.setState({ platformId }, () => {
            this.listFetch();
        });
    }

    // 请求列表
    listFetch = () => {
        const { platformId } = this.state; 
        this.props.queryMessageInterceptList({ name: 'data', value: { platformId } });
    };

    /* 取消弹框
    * name  -弹窗visible状态
    * */
    handleCancel = (name) => {
        this.setState({
            [name]: false,
        });
    };

    /* 打开新增或编辑窗口
    * item          - 列表的某一行数据,没有则为空
    * title         - 弹窗标题
    * */
    showAddUpdateModal = (title, index) => {
        const { data } = this.props.listReducer;
        const item = data[index];
        this.setState({
            item: item || {},
            modalTitle: title,
            addUpdateVisible: true,
        });
    }

    // 提交保存
    handleOk = () => {
        const { item } = this.state;
        this.form.current.validateFields((err, values) => {
            if (!err) {
                const param = { ...values };
                const params = {
                    keywordId: item ? item.keywordId : '',
                    keywords: param.keywords,
                    platformId: param.platformId,
                };
                fetchPost(MESSAGE_INTERCEPT_ADD_OR_EDIT, params).then((data) => {
                    this.setState({ confirmLoading: true });
                    if (data.state === '000001') {
                        message.success('操作成功');
                        this.setState({ addUpdateVisible: false, confirmLoading: false });
                        this.listFetch();
                    } else {
                        message.error(data.msg);
                        this.setState({ addUpdateVisible: false, confirmLoading: false });
                    }
                });
            }
        });
    }

    // 删除操作弹窗
    handleOperate = (record) => {
        PopConfirm(
            '提示！',
            '是否确认要删除？',
            () => this.onConfirmDel(record),
        );
    }

    // 删除数据请求
    onConfirmDel = (record) => {
        commonRequest(DELETE_API, { keywordId: record.keywordId }, this.listFetch);
    }

    render() {
        const {
            addUpdateVisible,
            item,
            modalTitle,
            confirmLoading,
        } = this.state;

        return (
            <div>
                <Functions {...this.props} isPage functionkey="009-000002-000001-001">
                    <SearchComponent
                        {...this.props}
                        listFetch={this.listFetch}
                        platformChange={this.platformChange}
                    />
                    <TableList
                        {...this.props}
                        listFetch={this.listFetch}
                        showAddUpdateModal={this.showAddUpdateModal}
                        onOperate={this.handleOperate}
                    />
                    {/* 新增编辑同一弹窗 */}
                    <Modal2
                        component={(<AddUpdateModal item={item} ref={this.form} />)}
                        title={modalTitle}
                        visible={addUpdateVisible}
                        handleOk={this.handleOk}
                        handleCancel={() => this.handleCancel('addUpdateVisible')}
                        confirmLoading={confirmLoading}
                    />
                </Functions>
            </div>
        );
    }
}

export default connect(
    state => ({ ...state }),
    dispatch => bindActionCreators(actions, dispatch),
)(
    Form.create()(App),
);
