import React from 'react'

import {
    Button,
    Table,
    Spin,
    Modal,
    Pagination,
    message
} from 'antd'
import {
    timestampFromat,
} from "../../../util/baseTool"

import { levelOptions } from '../../../util/options';

export default class Tablelist extends React.Component {
    state = {
        visible: false,
        id: undefined
    }
    columns = () => {
        return this.columns = [
            {
                title: '序号',
                dataIndex: 'NO',
                width: 100,
                key: 'NO',
                render: (text, record, index) => {
                    return index + 1
                }
            },
            {
                title: '平台',
                dataIndex: 'platformName',
                width: 100,
                key: 'platformName',
            },
            {
                title: '规则名称',
                dataIndex: 'ruleName',
                width: 100,
                key: 'ruleName',
            },
            {
                title: '优先级',
                dataIndex: 'priority',
                width: 100,
                key: 'priority',
            },
            {
                title: '状态',
                dataIndex: 'ruleState',
                width: 100,
                key: 'ruleState',
                render: (text, record, index) => {
                    return text ? "停用" : "启用"
                }
            },
            {
                title: '创建人',
                dataIndex: 'creator',
                width: 100,
                key: 'creator',
            },
            {
                title: '最后更新时间',
                dataIndex: 'updateTime',
                width: 100,
                key: 'updateTime',
                render: (text, record, index) => {
                    return timestampFromat(Number(text), 0)
                }
            },
            {
                title: '操作',
                dataIndex: 'handle',
                width: 100,
                key: 'handle',
                render: (text, record, index) => {
                    return (
                        <div>

                                <a href="javascript:;" className="padding-ss-right" onClick={() => this.editRule(record.ruleId)}>编辑</a>
                                <a href="javascript:;" onClick={() => this.changeModal(true, record.ruleId)}>删除</a>

                        </div>
                    )
                }
            },
        ];
    }
    addRule = () => {
        this.props.changeOrdermodal({
            visible: true,
            ruleId: null,
            title: "新增标记规则",
        })
    }
    editRule = (ruleId) => {
        this.props.changeOrdermodal({
            visible: true,
            title: "编辑标记规则",
            ruleId: ruleId,
        })
    }
    changeModal = (flag, id) => {
        this.setState({
            visible: flag,
            id
        })
    }
    delRule = () => {
        var { id } = this.state;
        this.props.delMarkupActionAsync({ ruleId: id })
            .then(result => {
                if (result) {
                    message.success(result.msg)
                    this.Paginatihandle()
                    this.changeModal(false)
                }
            })
    }
    Paginatihandle = (page, pageSize) => {
        var { tableDataActionAsync, npdProjecListData } = this.props
        var params = npdProjecListData.params
        if (page) {
            params.pageNumber = page
        }
        if (pageSize) {
            params.pageData = pageSize
        }
        tableDataActionAsync(params)
    }

    render() {

        var { npdProjecListData, loadingData } = this.props
        var { total, list, params } = npdProjecListData;
        var { pageNumber, pageData } = params
        var columns = typeof this.columns == "function" ? this.columns() : this.columns;

        var table = (
            <Spin spinning={loadingData} delay={500} tip="Loading...">
                <div className="padding-notop-10">
                    <Table
                        bordered={true}
                        size="small"
                        dataSource={list}
                        pagination={false}
                        columns={columns} />
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={levelOptions('分页显示条数')}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        current={pageNumber}
                        defaultCurrent={1} onShowSizeChange={this.Paginatihandle}
                        total={total}
                        pageSize={pageData}
                        onChange={this.Paginatihandle} />
                </div>
            </Spin>
        )
        var buttons = (
                <div className="markrules-tablewrap-btns">
                    <Button icon="plus" onClick={this.addRule} className="pull-right">
                        <span>新增</span>
                    </Button>
                </div>
        )
        return (
            <div className="markrules-tablewrap">
                {buttons}
                {table}
                <Modal
                    title="提示"
                    visible={this.state.visible}
                    onOk={this.delRule}
                    onCancel={() => this.changeModal(false)}>
                    <p className="text-center">确认删除吗？</p>
                </Modal>
            </div>
        )
    }

}