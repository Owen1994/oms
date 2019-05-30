import React from 'react';
import { Table, Pagination, Spin } from 'antd';
import Tableoption from '../../../../components/Tableoption';
import { page } from '../../../../constants';

export default class TableListItem extends React.Component {
    columns = [
        {
            title: '分类名称',
            dataIndex: 'title',
            align: 'left',
            render: (text, record) => {
                const { level } = record;
                switch (level) {
                case 1:
                    return this.spanText(text, 1);
                case 2:
                    return this.spanText(text, 2);
                default:
                    return this.spanText(text, 3);
                }
            },
        },
        {
            title: '平台',
            dataIndex: 'platform',
            align: 'center',
            width: 200,
            render: text => text.label,
        },
        {
            title: '排序',
            dataIndex: 'sort',
            align: 'center',
            width: 200,
        },
        {
            title: '操作',
            dataIndex: 'options',
            width: 200,
            key: 'options',
            render: (text, record) => {
                const { level } = record;
                const options = [
                    {
                        name: '新增子分类',
                        onChange: () => { this.props.onOperate('添加子分类', 'subVisible', 'addSublabel', record); },
                        funcId: '009-000002-000002-003',
                        subs: [],
                    }, {
                        name: '编辑',
                        funcId: '009-000002-000002-002',
                        onChange: () => { this.props.onOperate('编辑一级分类', 'visible', 'editlabel', record, record.key); },
                        subs: [],
                    }, {
                        name: '删除',
                        funcId: '009-000002-000002-004',
                        onChange: () => { this.props.onOperate('删除分类', '', 'deletelabel', record); },
                        subs: [],
                    }, {
                        name: '编辑',
                        onChange: () => { this.props.onOperate('编辑子分类', 'subVisible', 'editSublabel', record, record.key); },
                        funcId: '009-000002-000002-003',
                        subs: [],
                    },
                    {
                        name: '删除',
                        funcId: '009-000002-000002-004',
                        onChange: () => { this.props.onOperate('删除分类·', '', 'deleteSublabel', record); },
                        subs: [],
                    },
                ];
                switch (level) {
                case 1:
                    options.splice(3, 2);
                    break;
                case 2:
                    this.handleOptions(options, record);
                    break;
                default:
                    options.splice(0, 3);
                    break;
                }
                return (
                    <Tableoption {...this.props} options={options} />
                );
            },
        },
    ]

    spanText = (text, ischildren) => {
        let childrenText;
        switch (ischildren) {
        case 1:
            childrenText = '';
            break;
        case 2:
            childrenText = '|—';
            break;
        default:
            childrenText = '|——';
        }
        return <span><span className="message-template-class-span">{ childrenText }</span>{`${text}`}</span>;
    }

    // 操作是否是一级分类还是二级分类
    handleOptions = (item, record) => {
        const arr = item;
        const operation = {
            name: '编辑',
            funcId: '009-000002-000002-003',
            onChange: () => { this.props.onOperate('编辑分类', 'subVisible', 'editlabel', record, record.key); },
            subs: [],
        };
        arr.splice(3, 2);
        arr.splice(1, 1, operation);
        return arr;
    }

    render() {
        const { total, current, pageSize } = this.props.paginationReducer;
        const { listData, loading } = this.props.listReducer;
        const { listFetch } = this.props;
        return (
            <div className="temp-tablelist-item">
                <Spin spinning={loading} delay={500}>
                    <Table
                        className="message-template-class"
                        bordered
                        size="small"
                        indentSize={0}
                        columns={this.columns}
                        dataSource={listData}
                        pagination={false}
                        rowKey={record => (record.key)}
                    />
                    <Pagination
                        className="pull-right"
                        showTotal={() => `共 ${total} 条`}
                        pageSizeOptions={page.pageSizeOptions} // 指定显示页数的选项(数组) ['20', '30', '40', '50', '100', '200']
                        showSizeChanger // 是否可以改变 pageSize
                        defaultCurrent={page.defaultCurrent} // 默认的当前页数
                        current={current}
                        showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                        total={total} // 数据总数
                        pageSize={pageSize} // 每页条数
                        onChange={listFetch} // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={listFetch} // pageSize 变化的回调
                    />
                </Spin>
            </div>

        );
    }
}
