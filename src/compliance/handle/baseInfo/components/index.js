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
import Log from './log';
import Export from './export'

// import { AUTHENTICATION_EDIT, 
//          AUTHENTICATION_DELETE } from "../constants";
import { path } from '../../../configs';

import '../css/index.css';

const confirm = Modal.confirm;

class App extends Component {
    state = {
        exportVisible: false,
        editVisible: false,
        logVisible: false,
        currentItem: {},
        timeVisible: false,
        title: '',
        tagValue: {
            reviewStatus: [1]
        },
        selectIds: [],
        tempListParam: {},
        // 勾选项
        selectedRowKeys: [],
        selectedIds: []
    }

    componentDidMount() {
        this.props.form.setFieldsValue({
            reviewStatus: [1]
        });
        this.listFetch();
    };
    /**
     * 请求列表
     * @param <Number> pageNumber 当前第几页
     * @param <Object> pageData   分页页码
     */
    listFetch = (pageNumber, pageData) => {
        this.setState({
            selectedRowKeys: [],
            selectedIds: []
        })
        this.props.form.validateFields((err, values) => {
            this.setState({ tempListParam: values })

            if (values.reviewDate && values.reviewDate.length) {
                const diffDate = values.reviewDate[1].diff(values.reviewDate[0], 'days')
                if (diffDate > 30) {
                    message.error('默认支持查询30天范围内的数据')
                    this.props.form.setFieldsValue({ reviewDate: undefined })
                    return
                } else {
                    values.reviewDate = [
                        values.reviewDate[0].startOf('day').valueOf(),
                        values.reviewDate[1].endOf('day').valueOf()
                    ]
                }
            }
            const param = { ...values }
            if (param.reviewDate && param.reviewDate.length) {
                param.reviewDate = [param.reviewDate[0].valueOf(), param.reviewDate[1].valueOf()]
            }
            if (!err) {
                const filter = filterRequest(param)
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
                reviewStatus: [1]
            }
        })
        this.props.form.resetFields();
        this.props.form.setFieldsValue({
            reviewStatus: [1]
        });
    };

    onChangeModal = (name, title, item) => {
        if (item) {
            this.setState({ currentItem: item })
        }
        if (name === 'logVisible') {
            this.setState({ logVisible: true })
        } else {
            this.setState({
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
            exportVisible: false,
            editVisible: false,
            logVisible: false,
            timeVisible: false,
            currentItem: {}
        })
    }
    handleOk = () => {
        this.refs.form.validateFields((err, values) => {
            if (err) {
                return
            }
            let params = { ...values }
            // 触发新增一级分类按钮
            if (this.state.exportVisible) {
                const data = this.props.form.getFieldsValue()

                if (data.reviewDate) {
                    data.reviewDate = [
                        data.reviewDate[0].startOf('day').valueOf(),
                        data.reviewDate[1].endOf('day').valueOf()
                    ]
                }
                if (!data.searchContent) {
                    delete data.searchType
                    delete data.searchContent
                }
                params.data = data
                if (params.type === 2) {
                    params.id = this.state.selectIds
                }
                this.postExportRequest(params)
            } else if (this.state.editVisible) {
                params.platformAuthenticationId = this.state.currentItem.platformAuthenticationId
                this.postEditRequest(params)
            }
        });
    }
    /**
    * 发送导出请求
    * @param <String> params为请求参数
    */
    postExportRequest = (param) => {
        fetchPost('/irp/api/baseInfoReview/Export/export', param).then(data => {
            if (data && data.state === "000001") {
                message.success(data.msg || '操作成功.')
                this.downFile(data.url)
                this.handleCancel()
            } else {
                message.error(data.msg)
            }
        })
    }

    downFile = (url) => {
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
    /**
     * 发送新增修改请求
     * @param <String> params为请求参数
     */
    postEditRequest(params) {
        fetchPost(path.irp + 'PlatformAuthenticationAddPoolOrEdit/platformAuthenticationAddPoolOrEdit', params).then(data => {
            if (data && data.state === "000001") {
                message.success('操作成功.')
                this.listFetch()
                this.handleCancel()
            } else {
                message.error(data.msg)
            }
        })
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        const ids = selectedRows.map(item => item.id)
        this.setState({ selectedRowKeys, selectedIds: ids })
    }

    export = (ids) => {
        const reviewDate = this.props.form.getFieldValue("reviewDate")
        this.setState({ selectIds: ids }, () => { this.setState({ exportVisible: true, timeVisible: !!(reviewDate && reviewDate.length) }) })
    }
    render() {
        const {
            title,
            tagValue,
            selectedRowKeys,
            selectedIds,
            timeVisible
        } = this.state;
        return (
            <Functions {...this.props} isPage={true} functionkey="007-000004-000002-001">
                <div className="data-baseInfo" >
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
                        export={this.export}
                        onSelectChange={this.onSelectChange}
                        selectedRowKeys={selectedRowKeys}
                        selectedIds={selectedIds}
                    />
                    <Modal2
                        width='600px'
                        component={<Export ref="form" timeVisible={timeVisible} ids={this.state.selectIds} />}
                        visible={this.state.exportVisible}
                        title='导出'
                        handleCancel={() => this.handleCancel()}
                        handleOk={this.handleOk}
                    />
                    <Modal2
                        width='969px'
                        component={(<Log ref="form" item={this.state.currentItem} />)}
                        title='日志'
                        visible={this.state.logVisible}
                        handleCancel={() => this.handleCancel()}
                        handleOk={() => { this.setState({ logVisible: false }) }}
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