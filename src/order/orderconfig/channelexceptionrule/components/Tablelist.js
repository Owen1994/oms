import React from 'react'
import {
    Button,
    Spin,
    Table,
    Pagination,
    message,
    Tooltip,
    Switch,
    Menu,
    Dropdown,
    Icon,
    Modal,
} from 'antd';
import PopConfirm from '@/common/components/confirm';
import { fetchPost } from '@/util/fetch';
import { timestampFromat, functions } from 'util/baseTool';
import {
    DELETE_RULE,
} from '../constants/Api';

export default class Tablelist extends React.Component {
    columns = [
        {
            title: '序号',
            key: 'orderNum',
            render: (text, record, index) => {
                const { pageNumber, pageData } = this.props;
                return (pageNumber === 1 ? 0 : pageNumber - 1) * pageData  + (index + 1);
            }
        },
        {
            title: '平台',
            dataIndex: 'platformName',
            align: 'center',
        },
        {
            title: '规则名称',
            dataIndex: 'ruleName',
            align: 'center',
        },
        {
            title: '优先级',
            dataIndex: 'priority',
            align: 'center',
        },
        {
            title: '状态',
            dataIndex: 'isEnabled',
            align: 'center',
            render: text => {
                let res;
                switch (text){
                    case 1: res = '启用'; break;
                    case 2: res = '停用'; break;
                    default: res = '--';
                }
                return res;
            }
        },
        {
            title: '创建人',
            dataIndex: 'creator',
            align: 'center',
        },
        {
            title: '最后更新时间',
            dataIndex: 'modifiedTime',
            align: 'center',
            render: text => <p>{timestampFromat(text, 2)}</p>
        },
        {
            title: '操作',
            align: 'center',
            render: (text, record, index) => {
                return (
                    <div>
                        {functions(this, '001-000004-000007-003') ?
                            <a onClick={() => this.props.toggleModal(true, record.id)}
                                style={{ display: 'inline-block', marginRight: 10 }}
                            >
                                编辑
                            </a>
                        : null}
                        {functions(this, '001-000004-000007-004') ?
                            <a onClick={() => PopConfirm('删除确认',
                                '删除后无法恢复，确认要删除？',
                                () => this.delRule(record.id))}
                            >
                                删除
                            </a>
                        : null}
                    </div>
                )
            }
        },
    ];

    //删除
    delRule = (id) => {
        const { pageNumber, pageData } = this.props;
        fetchPost(DELETE_RULE, { data: { id } }, 1)
            .then(result => {
                if (result.state === '000001') {
                    this.props.onSearch(pageNumber, pageData);
                }
            })
    };

    render() {
        const { channelExceptionListData, pageNumber, pageData, onSearch, loadingState, toggleModal } = this.props;
        const total = channelExceptionListData.total;
        return (
            <div className="breadcrumb skureplacement-tablelist">
                <div className="skureplacement-optionBtn">
                    {functions(this, '001-000004-000007-002') ?
                        <Button onClick={() => toggleModal(true)} icon="plus"> 新增 </Button>
                    : null}
                </div>
                <div>
                    <Spin spinning={loadingState}>
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={channelExceptionListData.data}
                            pagination={false}
                            rowKey={(record, index) => (record.id)}
                        />
                    </Spin>
                </div>
                <div className="pagination">
                    <Pagination className="pull-right"
                        showTotal={total => `共 ${total} 条`}
                        showSizeChanger                             // 是否可以改变 pageSize
                        current={pageNumber}
                        showQuickJumper={{ goButton: true }}        // 是否可以快速跳转至某页
                        total={total}                               // 数据总数
                        pageSize={pageData}                         // 每页条数
                        onChange={onSearch}                     // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={onSearch}             // pageSize 变化的回调
                        size="small"
                    />
                </div>
            </div>
        )
    }
}