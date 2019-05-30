import React from 'react'
import {
    Button,
    Spin,
    Table,
    Pagination,
    message,
} from 'antd'
import PopConfirm from '../../../../common/components/confirm';
import Functions from '../../../../components/functions'
import { fetchPost } from '../../../../util/fetch';
import * as API from '../../../common/constants/Api'

export default class Tablelist extends React.Component {
    columns = [
        {
            title: '平台',
            dataIndex: 'yksPlatformCode',
            align: 'center',
        },
        {
            title: '销售账号',
            dataIndex: 'sellerId',
            align: 'center',
        },
        {
            title: '站点',
            dataIndex: 'yksSiteCode',
            align: 'center',
        },
        {
            title: '添加人员',
            dataIndex: 'creator',
            align: 'center',
        },
        {
            title: '添加时间',
            dataIndex: 'createdTime',
            align: 'center',
        },
        {
            title: '最新修改人员',
            dataIndex: 'modifier',
            align: 'center',
        },
        {
            title: '最新修改时间',
            dataIndex: 'modifiedTime',
            align: 'center',
        },
        {
            title: '操作',
            align: 'center',
            render: (text, record, index) => {
                return (
                    <div>
                        <Functions {...this.props} functionkey="008-000002-000005-003">
                            <a onClick={(e) => this.props.openModal(e, record)} style={{ display: 'inline-block', marginRight: 10 }}>编辑</a>
                        </Functions>
                        <Functions {...this.props} functionkey="008-000002-000005-004">
                            <a onClick={() => PopConfirm('是否确认要删除？', '', (e) => { this.delRule(e, [record.ruleId]) })}>删除</a>
                        </Functions>
                    </div>
                )
            }
        },
    ]
    delRule = (e, ruleId) => {
        const or = typeof e === 'object' ? true : false;
        or && e.preventDefault();
        fetchPost(API.DELETE_LISTING_UPDATE, { ruleIdArr: ruleId })
            .then(result => {
                if (result.state === '000001') {
                    message.success(result.msg);
                    this.props.handleSubmit();
                }
            })
    }
    render() {
        const { data, pageNumber, pageData, handleSubmit, loadingState, openModal } = this.props;
        const total = data.total;
        return (
            <div className="update-tablelist">
                <Functions {...this.props} functionkey="008-000002-000005-002">
                    <div className="update-addBtn">
                        <Button icon="plus" onClick={(e) => this.props.openModal(e, '')} >新增</Button>
                    </div>
                </Functions>
                <div className="update-table">
                    <Spin spinning={loadingState}>
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={data.list}
                            pagination={false}
                            rowKey={(record, index) => (index)}
                        />
                    </Spin>
                </div>
                <div className="pagination">
                    <Pagination className="pull-right"
                        showTotal={total => `共 ${total} 条`}
                        showSizeChanger                             // 是否可以改变 pageSize
                        current={pageNumber}
                        showQuickJumper={{ goButton: true }}       // 是否可以快速跳转至某页
                        total={total}                             // 数据总数
                        pageSize={pageData}                       // 每页条数
                        onChange={handleSubmit}                // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={handleSubmit}        // pageSize 变化的回调
                        // size="small"
                    />
                </div>
            </div>
        )
    }
}