import React, { Component } from 'react';
import { Table, Pagination, Spin } from 'antd';

import { page } from '../../../../constants';

import Tableoption from '../../../../components/Tableoption';
import BtnOperation from '../../../../components/BtnOperation';
import Tableitem from '../../../../components/Tableitem';
import { timestampFromat } from '../../../../utils';

class App extends Component {
    state = {
        selectedRowKeys: [],
        selectedIds: []
    }
    componentDidMount() {
        this.props.listFetch();
    };
    columns = [
        {
            title: 'SPU',
            dataIndex: 'spu',
            key:"spu",
            width: 120,
        }, {
            title: '中文名称',
            key:"chinessName",
            dataIndex: 'chinessName',
            width: 120,
        }, 
        {
            title: 'SKU',
            key:"sku",
            dataIndex: 'sku',
            width: 240,
            render: (text, record) => {
                return (
                    <div className='data-sku'>
                        <Tableitem
                        separator={'\,'}
                        title=""
                        onClick={() => {this.props.onChangeModal('detailVisible', '查看', record)}}
                        content={record.sku}
                        float={'left'}
                        right={'180px'}
                    />
                    </div>
                )
            }
        }, {
            title: '知产代码',
            key:"intellectualCode",
            dataIndex: 'intellectualCode',
            width: 140,
        }, {
            title: '敏感原因',
            key:"sentiveReason",
            dataIndex: 'sentiveReason',
            width: 240,
        }, {
            title: '最新修改时间',
            key:"lastUpdateTime",
            dataIndex: 'lastUpdateTime',
            width: 120,
            render: (text, record) => (
                <span>{timestampFromat(text, 'yyyy-mm-dd hh:MM:ss')}</span>
            )
        }, {
            title: '操作',
            key:"handle",
            width: 120,
            render: (text, record) => {
                let options = [
                    {
                        name: "查看",
                        onChange: () => {this.props.onChangeModal('detailVisible', '查看', record)},
                        funcId: '007-000001-000002-000001-001',
                        subs: []
                    }, 
                    {
                        name: '删除',
                        onChange: () => {this.props.deleteItem(record.id)},
                        funcId: '007-000001-000002-000001-003',
                        subs: []
                    }
                ];
                return (
                    <Tableoption {...this.props} options={ options }/>
                )
            }
        }
    ]
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys });
        const ids = selectedRows.map(item => item.id)
        this.setState({ selectedIds: ids })
    }
    render() {
        const { data, loading } = this.props.list_reducer;
        const { total, current, pageSize } = this.props.paginationReducer;
        const { listFetch } = this.props;
        const btnOptions = {
            left: [
                {
                    name: '删除',
                    type: 'button',
                    icon: 'plus',
                    funcId: '007-000001-000002-000001-003',
                    onChange: () => {
                        this.props.deleteItem(this.state.selectedIds), this.setState({selectedRowKeys: []})},
                }
            ],
            right: [{
                name: '新增',
                type: 'button',
                icon: 'plus',
                funcId: '007-000001-000002-000001-002',
                onChange: () => this.props.onChangeModal('newVisible', '添加'),
            }]
        }
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
          };
        return (
            <div className="breadcrumb padding-sm overflow-hidden margin-sm-top">
                <Spin spinning={loading} delay={500}>
                    <div className="table">
                        <BtnOperation
                            btnOptions={btnOptions}
                            {...this.props}
                        />
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={data}
                            rowKey={(record, index) => (index)}
                            pagination={false}
                            rowSelection={rowSelection}
                        />
                    </div>
                    <div className="pagination">
                        <Pagination
                            className="pull-right"
                            showTotal={total => `共 ${total} 条`}
                            pageSizeOptions={page.pageSizeOptions}      // 指定每页可以显示多少条
                            showSizeChanger                             // 是否可以改变 pageSize
                            defaultCurrent={page.defaultCurrent}        // 默认的当前页数
                            current={current}
                            showQuickJumper                             // 是否可以快速跳转至某页
                            total={total}                               // 数据总数
                            pageSize={pageSize}                         // 每页条数
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
