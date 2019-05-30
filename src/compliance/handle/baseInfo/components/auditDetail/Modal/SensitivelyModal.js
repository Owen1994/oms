import React, { Component } from 'react';
import {
    Input,
    Button,
    Form,
    Table,
    Pagination,
    Spin,
    Checkbox
} from 'antd';


import { fetchPost } from '../../../../../../util/fetch';
import { page } from '../../../../../../constants';
const FormItem = Form.Item

class App extends Component {
    state = {
        loading: false,
        list: [],
        pageData: 1,
        pageNumber: 20,
        total: 0,
        name: "",
        isOnlyShowSelected: false,
    }
    // 选中的项
    checkedList = []
    // 选中的项的id 
    checkedIdList = []
    columns = [
        {
            title: '商标名',
            dataIndex: 'sensitive',
            key: 'sensitive',
            align: 'center',
            width: 100
        }, {
            title: '知产代码',
            key: 'intellectualCode',
            align: 'center',
            dataIndex: 'intellectualCode',
            width: 100
        }, {
            title: '商标商品分类',
            align: 'center',
            key: 'trademark',
            dataIndex: 'trademark',
            width: 100
        }, {
            title: '注册信息',
            key: 'reviewTimes',
            dataIndex: 'reviewTimes',
            width: 100,
            render: (t, row) => {
                return (
                    <div>
                        <p>注册国家：{row.country}</p>
                        <p>权利人：{row.obligee}</p>
                        <p>商标号：{row.trademarkNumber}</p>
                    </div>
                )
            }
        }, {
            title: '参考图片',
            key: 'img',
            dataIndex: 'img',
            width: 60,
            render: t => <img style={{ width: "100%" }} src={t} alt="参考图片" />
        }, {
            title: '操作',
            key: 'reviewers',
            align: 'center',
            dataIndex: 'reviewers',
            width: 20,
            render: (t, r) => {
                return <Checkbox checked={this.checkedIdList.includes(r.id)} onChange={(e) => this.checked(e, r)} />
            }
        }
    ]

    checked = (e, r) => {
        const value = e.target.checked;
        const index = this.checkedIdList.indexOf(r.id);
        if (value) {
            if (index !== -1) {
                this.checkedList.splice(index, 1, r)
                this.checkedIdList.splice(index, 1, r.id)
            } else {
                this.checkedList.push(r)
                this.checkedIdList.push(r.id)
            }
        } else {
            if (index === -1) return;
            this.checkedList.splice(index, 1)
            this.checkedIdList.splice(index, 1)
        }
        this.setState({})
    }

    setName = (e) => {
        var value = e.target.value;
        this.setState({ name: value })
    }

    componentDidMount() {
        this.listFetch()
    }

    search = () => {
        this.listFetch(1, 20)
    }

    listFetch = (pageNumber, pageData) => {
        const { name, isOnlyShowSelected } = this.state;
        if (isOnlyShowSelected) return;
        const params = {
            useState: 1,
            dataType: 2,
            pageData: pageData || 20,
            pageNumber: pageNumber || 1,
        }
        if (name) {
            params.searchContent = name
            params.searchType = 8
        }
        fetchPost('/irp/api/sensitive/List/list', params)
            .then(data => {
                if (data.state === '000001') {
                    const result = data.data || {};
                    const list = Array.isArray(result.data) ?
                        result.data.map(v => {
                            v.key = v.id;
                            return v
                        }) : []
                    this.setState({
                        pageData: params.pageData,
                        pageNumber: params.pageNumber,
                        list: list,
                        total: result.total,
                    })
                }
            })
            .catch(err => {
                message.error(err.msg || err.message)
            })
    }

    onlyShowSelected = (e) => {
        const value = e.target.checked;
        if (value) {
            this.setState({
                list: this.checkedList,
                isOnlyShowSelected: true
            })
        } else {
            this.setState({
                isOnlyShowSelected: false
            }, this.search)
        }
    }

    render() {
        const { listFetch } = this;
        const { data = [] } = this.props;
        const { total, pageNumber, pageData, list, loading } = this.state;
        return (
            <div className="baseinfo-detail-modal">
                <div className="baseinfo-detail-modal-search">
                    <Input placeholder="请输入商标名称" onChange={this.setName} />
                    <Button onClick={this.search} type="primary">搜索</Button>
                    <div className="baseinfo-detail-modal-search-selected">
                        <Checkbox onChange={this.onlyShowSelected} />
                        <span>仅显示选中项</span>
                    </div>
                </div>
                <Spin spinning={loading} delay={500}>
                    <div className="table">
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={list}
                            pagination={false}
                        />
                    </div>
                    <div className="pagination">
                        <Pagination
                            className="pull-right"
                            showTotal={total => `共 ${total} 条`}
                            pageSizeOptions={page.pageSizeOptions}      // 指定每页可以显示多少条
                            showSizeChanger                             // 是否可以改变 pageSize
                            defaultCurrent={page.defaultCurrent}        // 默认的当前页数
                            current={pageNumber}
                            showQuickJumper                             // 是否可以快速跳转至某页
                            total={total}                               // 数据总数
                            pageSize={pageData}                         // 每页条数
                            onChange={listFetch}                        // 页码改变的回调，参数是改变后的页码及每页条数
                            onShowSizeChange={listFetch}                // pageSize 变化的回调
                        />
                    </div>
                </Spin>
            </div>
        );
    }
}

export default App;