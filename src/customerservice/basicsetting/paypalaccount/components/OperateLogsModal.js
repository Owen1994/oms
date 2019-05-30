import React from 'react';
import { Form, Table, Pagination, Spin } from 'antd';

import { OPERATION_LOGS } from '../constants';
import { fetchPost } from '../../../../util/fetch';
import { page } from '../../../../constants';

class AddModal extends React.Component {
    state = {
        logsData: [],
        current: page.defaultCurrent,
        pageSize: page.defaultPageSize
    }

    columns = [
        {
            title: '序号',
            dataIndex: 'index',
            align: 'center',
            width: 50,
            render: (text, record, index) => <span>{index+1}</span>
        },
        {
            title: '操作类型',
            dataIndex: 'type',
            align: 'center',
            width: 200,
        },
        {
            title: '操作人',
            dataIndex: 'operator',
            align: 'center',
            width: 200,
        },
        {
            title: '操作时间',
            dataIndex: 'createTime',
            width: 200,
            align: 'center',
            sorter: true,
        }
    ]

    componentDidMount() {
        this.getOperationLogs();
    }

    getOperationLogs = (pageNumber, pageData) => {
        const { order } = this.state;
        const { id } = this.props.record;
        const params = {};
        params.id = id;
        params.sort = order;
        params.pageNumber = pageNumber || page.defaultCurrent;
        params.pageData = pageData || page.defaultPageSize;
        this.setState({ loading: true });
        fetchPost(OPERATION_LOGS, params, 2)
            .then((res) => {
                if (res && res.state === '000001') {
                    this.setState({
                        logsData: res.data,
                        current: params.pageNumber,
                        pageSize: params.pageData,
                    });
                    this.setState({ loading: false });
                }
            })
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.setState({
            order: sorter.order === 'descend' ? 'desc' : 'asc',
        }, () => {
            this.getOperationLogs();
        });
    }

    render() {
        const { logsData, current, pageSize, loading } = this.state;
        return (
            <div className='overflow-hidden'>
                <Spin spinning={loading} delay={500}>
                    <Table
                        bordered
                        size="small"
                        indentSize={0}
                        columns={this.columns}
                        dataSource={logsData.list}
                        pagination={false}
                        onChange={this.handleTableChange}
                        rowKey={record => (record.id)}
                    />
                    <Pagination
                        className='upload-logs-pagination'
                        showTotal={totals => `共 ${totals} 条`}
                        pageSizeOptions={page.pageSizeOptions} // 指定显示页数的选项(数组) ['20', '30', '40', '50', '100', '200']
                        showSizeChanger // 是否可以改变 pageSize
                        defaultCurrent={page.defaultCurrent} // 默认的当前页数
                        current={current}
                        showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                        total={logsData.total} // 数据总数
                        pageSize={pageSize} // 每页条数
                        onChange={this.getOperationLogs} // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={this.getOperationLogs} // pageSize 变化的回调
                    />
                </Spin>
            </div>
        );
    }
}
export default Form.create()(AddModal);
