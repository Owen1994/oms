import React, { Component } from 'react';
import { Form, Modal, message } from 'antd';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import actions from '../actions';

import { fetchPost } from '../../../../util/fetch';

import Functions from '../../../../components/functions';
import Modal2 from '../../../../components/Modal2';
import Tablelist from './Tablelist';
import Search from "./Search";
import Tableoption from '../../../../components/Tableoption';

import { tableColum } from "../constants";

import '../css/index.css';
import index from 'antd/lib/modal';


const confirm = Modal.confirm;

class App extends Component {
    state = {
        detailVisible: false,
        currentItem: {},
        isShow: false,
        title: '',

        loading: true,
        currentTabValue: '1',
        currentDataSource: [],
        currentTotal: 0,
        currentColum: [],
        currentComponent: null
    }
    componentDidMount() {
        // 初始化列表数据
        this.handleTabsChange('1')
    }

    // 点击按钮搜索
    onSubmit = (event) => {
        event.preventDefault();
        this.handleTabsChange(this.state.currentTabValue);
    };

    // 重置
    onReset = () => {
        this.props.form.resetFields();
    };
    onChangeModal = (name, title, record, detailData) => {
        if (this.state.currentDataSource.length > detailData) {
            const item = this.state.currentDataSource[detailData];
            if (item) {
                this.setState({ currentItem: item })
            }
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
    /**
     * 关闭弹框,清空数据
     * @param <String> name 弹窗显示状态
     */
    handleCancel() {
        this.setState({
            detailVisible: false,
            isShow: false,
            currentItem: {}
        })
    }

    // const { current, pageSize,total } = this.props.paginationReducer;
    handleTabsChange = (value, current = 1, pageSize = 20) => {
        if (!value) return
        this.setState({ currentTabValue: value })
        if (tableColum && tableColum.length) {
            const ids = tableColum.map(item => {
                return item.id + ''
            })
            if (ids.indexOf(value) !== -1) {
                const index = ids.indexOf(value)
                this.getTableData(
                    value,
                    tableColum[index].url,
                    tableColum[index].tableColum,
                    tableColum[index].components,
                    current,
                    pageSize
                )
            }
        }
    }
    getTableData = (value, url, tableColum, component, current, pageSize) => {
        const values = this.props.form.getFieldsValue();
        if (value === '1') {
            let searchType = 0;
            switch (values.searchType) {
                case 8:
                    searchType = 1
                    break;
                case 9:
                    searchType = 9
                    break;
            }
            values.searchType = searchType
        }
        if (!values.searchContent) {
            delete values.searchContent
            delete values.searchType
        }
        let params = {
            ...values,
            pageData: pageSize,
            pageNumber: current,
        };
        this.setState({ loading: true })
        fetchPost(url, params).then(data => {
            this.setState({ loading: false })
            if (data && data.state === "000001") {
                if (data.data && data.data.data && Array.isArray(data.data.data)) {
                    const lastColum = this.dynamicAddLastCloum()
                    const copyColum = [...tableColum]
                    // 当tab选择全部的时候，不需要显示查看按钮
                    if (value !== '1') {
                        copyColum.push(lastColum)
                    }

                    const dataSource = data.data.data
                    this.props.paginationAction({
                        total: data.data.total,
                        current,
                        pageSize
                    })
                    this.setState({
                        currentDataSource: dataSource,
                        currentColum: copyColum,
                        currentComponent: component,
                        currentTotal: data.data.total
                    })
                }
            } else {
                message.error('操作失败.')
            }
        })
    }
    // 动态插入最后一列，需要传props
    dynamicAddLastCloum = () => {
        const lastColum = {
            title: '操作',
            width: 120,
            render: (text, record, index) => {
                let options = [
                    {
                        name: "查看",
                        onChange: () => { this.onChangeModal('detailVisible', '查看', record, index) },
                        funcId: '007-000003-000001-001',
                        subs: []
                    }
                ]
                return (
                    <Tableoption {...this.props} options={options} />
                )
            }
        }
        return lastColum;
    }

    listFetch = (current = 1, pageSize = 20) => {
        const { currentTabValue } = this.state;
        this.handleTabsChange(currentTabValue, current, pageSize)
    }

    render() {
        const { isShow, title } = this.state;
        const Detail = this.state.currentComponent ? this.state.currentComponent : null
        return (
            <Functions {...this.props} isPage={true} functionkey="007-000003-000001-001">
                <div className="data-intellctual-query" >
                    <Search
                        {...this.props}
                        onReset={this.onReset}
                        onSubmit={this.onSubmit}
                        handleTabsChange={this.handleTabsChange}
                    />
                    <Tablelist
                        {...this.props}
                        data={this.state.currentDataSource}
                        colum={this.state.currentColum}
                        total={this.state.currentTotal}
                        loading={this.state.loading}
                        listFetch={this.listFetch}
                        onChangeModal={this.onChangeModal}
                        deleteItem={this.showDeleteConfirm}
                    />
                    {
                        Detail ? (<Modal2
                            width='969px'
                            component={(<Detail ref="form" item={this.state.currentItem} />)}
                            title='查看'
                            visible={this.state.detailVisible}
                            handleCancel={() => this.handleCancel()}
                            handleOk={() => { this.setState({ detailVisible: false }) }}
                        />) : null
                    }

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