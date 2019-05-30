import React, { Component } from 'react';
import { Form, Modal, message } from 'antd';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import actions from '../actions';

import { filterRequest } from '../../../utils';
import { fetchPost } from '../../../../util/fetch';
import { page } from '../../../configs';

import Functions from  '../../../../components/functions';
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
        detailVisible: false,
        currentItem: {},
        title: '',
        tagValue: {
            reviewStatus: [1]
        },
    }
    
    componentDidMount() {
        this.props.form.setFieldsValue({
            reviewStatus:[1]
        });
        this.listFetch();
    };
    /**
     * 请求列表
     * @param <Number> pageNumber 当前第几页
     * @param <Object> pageData   分页页码
     */     
    listFetch = (pageNumber, pageData) => {
        this.props.form.validateFields((err, values) => {
            if (values.reviewDate && values.reviewDate.length) { 
                const diffDate = values.reviewDate[1].diff(values.reviewDate[0], 'days')
                if (diffDate > 30) {
                    message.error('默认支持查询30天范围内的数据')
                    this.props.form.setFieldsValue({ reviewDate: undefined })
                    return
                }
            }
            const param = {...values}
            if (param.reviewDate && param.reviewDate.length) {
                param.reviewDate = [param.reviewDate[0].valueOf(), param.reviewDate[1].valueOf()]
            } 
            if (!err) {
                const filter = filterRequest(param)
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
    // 点击按钮搜索
    onSubmit = (event) => {
        event.preventDefault();
        this.listFetch();
    };

    // 重置
    onReset = () => {
        this.setState({
            tagValue: {
                reviewStatus: [0]
            }
        })
        this.props.form.resetFields();
        this.props.form.setFieldsValue({
            reviewStatus:[1]
        });
    };
    dateChange = (value)=> {
        const date = value[1].diff(value[0], 'days')
        if (date > 30) {
            message.error('默认支持查询30天范围内的数据')
            // this.props.form.resetFields('reviewDate')
            // this.props.form.resetFields()setFieldsValue
            this.props.form.setFieldsValue({ reviewDate: undefined, searchContent: 'bb'})
        }
    }
    onChangeModal = (name, title, item) => {
        if (item) {
            this.setState({ currentItem: item })
        } 
        if (name === 'detailVisible') {
            this.setState({ detailVisible: true } )
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
            detailVisible: false,
            currentItem: {}
        })
    }
    handleOk = ()=> {
        this.refs.form.validateFields((err, values) => {
            if (err) {
                return
            }
            let params = values
            // 触发新增一级分类按钮
            if (this.state.exportVisible) {
                this.postEditRequest(params)
            } else if (this.state.editVisible) {
                params.platformAuthenticationId = this.state.currentItem.platformAuthenticationId
                this.postEditRequest(params)
            }
        });
    }
    /**
     * 发送新增修改请求
     * @param <String> params为请求参数
     */
    postEditRequest(params) {
        fetchPost(path.irp + 'PlatformAuthenticationAddPoolOrEdit/platformAuthenticationAddPoolOrEdit', params).then(data=>{
            if(data && data.state === "000001"){
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
        const params = { platformAuthenticationId: item.platformAuthenticationId }
        const self = this
        confirm({
            maskClosable: true,
            title: '确定要删除吗？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                fetchPost(path.irp + 'PlatformAuthenticationPoolDelete/platformAuthenticationPoolDelete', params).then(data =>{
                    if(data && data.state === "000001"){
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
        if (this.state.exportVisible) {
            return (<Detail ref="form" />)
        } else {
            return (<Detail ref="form" item={this.state.currentItem}/>)
        }
    }
    render() {
        const { title, tagValue } = this.state;
        return (
            <Functions { ...this.props } isPage={true} functionkey="007-000004-000003-001">
                <div className="data-listing-review" >
                    <Search 
                        {...this.props}
                        onChange={this.dateChange}
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
                        width='700px'
                        component={<Export ref="form" />}
                        visible={this.state.exportVisible}
                        title={title}
                        handleCancel={() => this.handleCancel()}
                        handleOk={this.handleOk}
                    />
                    <Modal2
                        width='969px'
                        component={(<Log ref="form" item={this.state.currentItem} />)}
                        title='日志'
                        visible={this.state.detailVisible}
                        handleCancel={() => this.handleCancel()}
                        handleOk={()=> { this.setState({ detailVisible: false}) }}
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