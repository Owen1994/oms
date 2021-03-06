import React from 'react'
import { Table, Pagination, Button, Spin } from 'antd'
import { pageOptions } from '../../../../constants'
import { fetchPost } from '../../../../util/fetch'
import PopConfirm from '../../../../common/components/confirm'
import { DELETE_ITEM_API } from '../constants/Api'
import Functions from '../../../../components/functions'

/**
 *作者: huangjianfeng
 *功能描述:  SKU列表数据展示
 *时间: 2018/8/27 15:55
 */
export default class TableList extends React.Component {
    columns = [
        {
            title: '平台',
            dataIndex: 'platformName',
            width: 85
        },
        {
            title: '站点',
            dataIndex: 'siteCode',
            width: 85
        },
        {
            title: '销售账号',
            dataIndex: 'account',
            width: 100
        },
        {
            title: '标题前缀',
            dataIndex: 'titlePrefix',
            width: 90,
            render:(text)=><div className="text-break">{text}</div>
        },
        {
            title: '标题后缀',
            dataIndex: 'titleSufix',
            width: 90,
            render:(text)=><div className="text-break">{text}</div>
        },
        {
            title: '添加人员',
            dataIndex: 'creator',
            width: 85
        },
        {
            title: '添加时间',
            dataIndex: 'createTime',
            width: 120
        },
        {
            title: '最近修改人员',
            dataIndex: 'modifer',
            width: 85
        },
        {
            title: '最近修改时间',
            dataIndex: 'modifyTime',
            width: 120
        },
        {
            title: '操作',
            width: 80,
            render: (text, record) =>
                    <div style={{ "textAlign": "center" }}>
                        <Functions {...this.props} functionkey={'008-000002-000003-003'}>
                            <a onClick={() => this.props.showAddUpdateModal(record)}
                                style={{ marginLeft: '10px' }}>
                                编辑
                            </a>
                        </Functions>
                        <Functions {...this.props} functionkey={'008-000002-000003-004'}>
                            <a onClick={() => PopConfirm('是否确认要删除？', '', () => this.onConfirmDel(record))}
                                style={{ marginLeft: '10px' }}>
                                删除
                            </a>
                        </Functions>
                    </div>
        },

    ]
    onConfirmDel = (record) => {
        fetchPost(DELETE_ITEM_API, {data:{modelName: 'titlePrefix', id: record.id}}, 1)
            .then(result => {
                if(result.state === '000001') {
                    this.props.handleSubmit()
                }
            })
    }
    render(){
        const { data, pageNumber, pageData, handleSubmit, loadingState } = this.props
        const total = data.total
        return (
            <Spin spinning={loadingState} delay={500} tip="Loading...">
                <div>
                    <div className='margin-sm-top clear white padding-sm'>
                        <Functions {...this.props} functionkey={'008-000002-000003-002'}>
                            <Button className='pull-right' icon="plus" onClick={() => this.props.showAddUpdateModal()}>新增</Button>
                        </Functions>
                    </div>
                    <div className='white padding-notop-10'>
                        <Table
                            className="fixed-table"
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={data.list}
                            pagination={false}
                        />
                        <Pagination
                            showTotal={total => `共 ${total} 条`}
                            pageSizeOptions={pageOptions}
                            showSizeChanger
                            showQuickJumper={{ goButton: true }}
                            current={pageNumber}
                            defaultCurrent={1} onShowSizeChange={handleSubmit}
                            total={total}
                            pageSize={pageData}
                            onChange={handleSubmit} />
                    </div>
                </div>
            </Spin>
        )
    }
}
