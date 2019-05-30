import React, { Component } from 'react';
import { Form, message, Modal } from 'antd';

import Functions from  '../../../../components/functions';
import Modal2 from '../../../../components/Modal2';
import Tablelist from './Tablelist';
import Detail from './Detail';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import actions from '../actions';

import { filterRequest } from '../../../utils';
import { fetchPost } from '../../../../util/fetch';
import { page } from '../../../configs';
// import { GET_FIGURECATEGORY_EDIT, 
//         GET_FIGURECATEGORY_DELETE, 
//         GET_FIGURECATEGORY_PARENTNAME } from "../constants";
import { path } from '../../../configs';
import '../css/index.css';

const confirm = Modal.confirm;

class App extends Component {
    state = {
        newVisible: false,
        newFirstVisible: false,
        detailVisible: false,
        isShow: false,
        title: '',
        currentItem: {}
    }

    /**
     * 请求列表
     * @param <Number> pageNumber 当前第几页
     * @param <Object> pageData   分页页码
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
     * 显示弹框
     * @param <String> name 弹窗名字
     * @param <String> title 弹窗标题
     * @param <Object> item 某一行数据, 用于保存当前行数据
     */
    onChangeModal = (name, title, item) => {
        if (item) {
            this.setState({ currentItem: item }, this.getParentCategoryName)
        } 
        this.setState({
            isShow: true,
            [name]: true,
            title: title,
        })
    };

    /**
     * 关闭弹框,清空数据
     * @param <String> name 弹窗显示状态
     */
    handleCancel() {
        this.setState({
            newVisible: false,
            newFirstVisible: false,
            detailVisible: false,
            isShow: false,
            currentItem: {}
        })
    }

    // 触发弹框确定事件
    handleNewOk = ()=> {
        this.refs.form.validateFields((err, values) => {
            if (err) {
                return
            }
            let params = {
                figureCategoryName: values.figureCategoryName,
            }
            // 触发新增一级分类按钮
            if (this.state.newFirstVisible) {
                this.postEditRequest(params)
            } else if (this.state.newVisible) {
                params.parentId = this.state.currentItem.figureCategoryId
                this.postEditRequest(params)
            } else {
                params.figureCategoryId = this.state.currentItem.figureCategoryId
                this.postEditRequest(params)
            }
        });
    }
    postEditRequest(params) {
        fetchPost(path.irp + 'figureCategory/Edit/edit', params).then(data=>{
            if(data && data.state === "000001"){
                message.success('操作成功.')
                this.listFetch()
                this.setState({newVisible: false})
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
        if (item.children && item.children.length) {
            message.error('该分类有子级,删除失败!')
            return
        }
        const params = { figureCategoryId: item.figureCategoryId }
        const self = this
        confirm({
            maskClosable: true,
            title: '确定要删除吗？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                fetchPost(path.irp + 'figureCategory/Delete/delete', params).then(data =>{
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
 
    getParentCategoryName() {
        // 创建子级分类
        if (this.state.newVisible) {
            this.state.currentItem.parentCategoryName  = this.state.currentItem.figureCategoryName
            this.state.currentItem.currentCategoryName  = ''
            this.setState({ currentItem: this.state.currentItem })
        } else {
            // 修改
            const params = {
                figureCategoryId: this.state.currentItem.figureCategoryId,
            }
            fetchPost(path.irp + 'figureCategory/ListParentName/listParentName', params).then(responeData=>{
                if(responeData && responeData.state === "000001"){
                    const data = responeData.data
                    if (data.figureCategory) {
                        this.state.currentItem.parentCategoryName  = data.figureCategory.figureCategoryName
                        this.state.currentItem.currentCategoryName  = this.state.currentItem.figureCategoryName
                        this.setState({ currentItem: this.state.currentItem })
                    }
                }
            })
        }
        
    }
    renderDetailComponent() {
        if (this.state.newFirstVisible) {
            return (<Detail ref="form" />)
        } else {
            return (<Detail ref="form" item={this.state.currentItem}/>)
        }
    }
    render() {
        const { isShow, title } = this.state;
        return (
            <Functions { ...this.props } isPage={true} functionkey="007-000002-000003-001">
                <div className="data-figure-category" >
                    <Tablelist
                        {...this.props}
                        listFetch={this.listFetch}
                        onChangeModal={this.onChangeModal}
                        deleteItem={this.showDeleteConfirm}
                    />
                    <Modal2
                        component={this.renderDetailComponent()}
                        title={title}
                        visible={isShow}
                        handleCancel={() => this.handleCancel()}
                        handleOk={this.handleNewOk}
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