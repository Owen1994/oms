import React from 'react';
import { Table, Pagination, Spin } from 'antd';

import { GET_DOMESTIC_LOGS } from '../constants';
import { fetchPost } from '../../../../util/fetch';
import { randNum } from '../../../../util/baseTool';
import { page } from '../../../../constants';

export default class LogsModal extends React.Component {
    state = {
        logsData: [],
        current: page.defaultCurrent,
        pageSize: page.defaultPageSize
    }

    columns = [
        {
            title: '操作类型',
            dataIndex: 'operatorType',
            align: 'center',
            width: 100,
            render: (text) => <span>{ text === 1 ? '新增' : '修改' }</span>
        },
        {
            title: '变更字段',
            dataIndex: 'changeContent',
            align: 'center',
            width: 200,
            render: (text) => {
                if (text && Array.isArray(text) && text[0]) {
                    const field = text[0];
                    return field.map(item => (
                        <div>{item}</div>
                    ));
                }
                return '';
            }
        },
        {
            title: '变更前',
            dataIndex: 'changeContent',
            align: 'center',
            width: 200,
            render: (text) => {
                if (text && Array.isArray(text) && text[1]) {
                    const changedBefore = text[1];
                    return changedBefore.map(item => (
                        <div>{item}</div>
                    ));
                }
                return '';
            }
        },
        {
            title: '变更后',
            dataIndex: 'changeContent',
            align: 'center',
            width: 200,
            render: (text) => {
                if (text && Array.isArray(text) && text[2]) {
                    const changedAfter = text[2];
                    return changedAfter.map(item => (
                        <div>{item}</div>
                    ));
                }
                return '';
            }
        },
        {
            title: '操作时间',
            dataIndex: 'operatorTime',
            width: 200,
            align: 'center',
        },
        {
            title: '操作人员',
            dataIndex: 'operator',
            width: 200,
            align: 'center',
        }
    ]

    componentDidMount() {
        this.getLogs();
    }

    getLogs = (pageNumber, pageData) => {
        const { basisId } = this.props.record;
        const params = {};
        params.basisId = basisId;
        params.pageNumber = pageNumber || page.defaultCurrent;
        params.pageData = pageData || page.defaultPageSize;
        this.setState({ loading: true });
        fetchPost(GET_DOMESTIC_LOGS, { data: params }, 2)
            .then((res) => {
                if (res && res.state === '000001') {
                    this.setState({
                        logsData: res.data,
                        current: params.pageNumber,
                        pageSize: params.pageData,
                    });
                }
                this.setState({ loading: false });
            })
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
                        rowKey={() => randNum()}
                    />
                    <Pagination
                        className='computedrule-logs-pagination'
                        showTotal={totals => `共 ${totals} 条`}
                        pageSizeOptions={page.pageSizeOptions} // 指定显示页数的选项(数组) ['20', '30', '40', '50', '100', '200']
                        showSizeChanger // 是否可以改变 pageSize
                        defaultCurrent={page.defaultCurrent} // 默认的当前页数
                        current={current}
                        showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                        total={logsData.total} // 数据总数
                        pageSize={pageSize} // 每页条数
                        onChange={this.getLogs} // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={this.getLogs} // pageSize 变化的回调
                    />
                </Spin>
            </div>
        );
    }
}
