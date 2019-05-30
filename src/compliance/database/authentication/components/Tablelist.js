import React, { Component } from 'react';
import { Table, Pagination, Spin } from 'antd';

import { page } from '../../../../constants';

import Tableoption from '../../../../components/Tableoption';
import BtnOperation from '../../../../components/BtnOperation';
import Tableitem from '../../../components/Tableitem';

class App extends Component {
    componentDidMount() {
        this.props.listFetch();
    };
    columns = [
        {
            title: '英文名称',
            dataIndex: 'englishName',
            align: 'center',
            width: 120
        }, {
            title: '中文名称',
            dataIndex: 'chineseName',
            width: 120
        }, {
            title: '认证项目',
            dataIndex: 'authenticationProject',
            width: 120
        }, {
            title: '知产代码',
            dataIndex: 'intellectualCode',
            width: 120
        }, {
            title: '禁售信息',
            dataIndex: 'disableInfo',
            align: 'center',
            width: 360,
            render: (text, record) => {
                return (
                    <div>
                        {
                            record.disableInfo.map ((item, index)=> {
                                return (
                                    <Tableitem
                                        title={item.sensitiveLayer}
                                        content={item.platformSite}
                                        left={100}
                                    />
                                )
                            })
                        }
                    </div>
                )
            }
        }, {
            title: '操作',
            width: 120,
            render: (text, record) => {
                let options = [
                    {
                        name: "查看",
                        onChange: () => {this.props.onChangeModal('detailVisible', '查看', record)},
                        funcId: '007-000001-000007-001',
                        subs: []
                    }, 
                    {
                        name: '编辑',
                        onChange: () => {this.props.onChangeModal('editVisible', '修改', record)},
                        funcId: '007-000001-000007-002',
                        subs: []
                    }, {
                        name: '删除',
                        onChange: () => {this.props.deleteItem(record)},
                        funcId: '007-000001-000007-003',
                        subs: []
                    }
                ];
                return (
                    <Tableoption {...this.props} options={ options }/>
                )
            }
        }
    ]

    render() {
        const { data, loading } = this.props.list_reducer;
        const { total, current, pageSize } = this.props.paginationReducer;
        const { listFetch } = this.props;
        const btnOptions = {
            left: [  
            ],
            right: [{
                name: '新增',
                type: 'button',
                icon: 'plus',
                funcId: '007-000001-000007-002',
                onChange: () => this.props.onChangeModal('newVisible', '添加'),
            }]
        }
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
                            rowKey={(record, index) => (record.platformAuthenticationId)}
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
