import React, { Component } from 'react';
import { Table, Pagination, Spin} from 'antd';
import Tableoption from '../../../../components/Tableoption';
import BtnOperation from '../../../../components/BtnOperation';
import { page } from '../../../../constants';
import { timestampFromat } from '../../../../utils';
import Tableitem from '../../../components/Tableitem';
import Functions from  '../../../../components/functions';

class App extends Component {
    componentDidMount() {
        this.props.listFetch();
    };

    columns = [
        {
            title: '知产代码',
            dataIndex: 'intellectualCode',
            key: 'intellectualCode',
            width: 120,
        }, {
            title: '禁售信息',
            dataIndex: 'disableInfo',
            key: 'disableInfo',
            align: 'center',
            width: 360,
            render: (text, record) => {
                return (
                    <div>
                        {
                            record.disableInfo.map ((item, index)=> {
                                return (
                                    <Tableitem
                                        key={index}
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
        },{
            title: '新增人员',
            dataIndex: 'addPerson',
            key: 'addPerson',
            width: 120,
        },{
            title: '新增时间',
            dataIndex: 'addTime',
            key: 'addTime',
            width: 120,
            render: (text, record) => (
                <span>{timestampFromat(text, 'yyyy-mm-dd hh:MM:ss')}</span>
            )
        },{
            title: '最新修改人员',
            dataIndex: 'lastUpdatePerson',
            key: 'lastUpdatePerson',
            width: 120,
        },{
            title: '最新修改时间',
            dataIndex: 'lastUpdateTime',
            key: 'lastUpdateTime',
            width: 120,
            render: (text, record) => (
                <span>{timestampFromat(text, 'yyyy-mm-dd hh:MM:ss')}</span>
            )
        },{
            title: '操作',
            dataIndex: 'option',
            key: 'option',
            align: 'center',
            width: 120,
            render: (text, record) => {
                let options = [
                    {
                        name: "编辑",
                        onChange: () => this.props.onChangeModal('riskVisible', true, '编辑知产代码', record.intellectualCodeId),
                        funcId: "007-000002-000002-002",
                        subs: []
                    },{
                        name: "删除",
                        onChange: () => this.props.onDeleteTemp(record.intellectualCodeId),
                        funcId: "007-000002-000002-003",
                        subs: []
                    }
                ];
                return (
                    <Tableoption {...this.props} options={ options } isRender/>
                )
            }
        }
    ]

    render() {
        const { data, loading } = this.props.listReducer;
        const { total, current, pageSize } = this.props.paginationReducer;
        const { listFetch } = this.props;
        const btnOptions = {
            left: [],
            right: [
                {
                    name: '新增知产代码',
                    onChange: () => this.props.onChangeModal('riskVisible', true, '新增知产代码'),
                    type: 'button',
                    icon: 'plus',
                    funcId: '007-000002-000002-002',
                    subs: []
                }
            ]
        };
        return (
            <Spin spinning={loading} delay={500}>
                <div className="breadcrumb padding-sm overflow-hidden margin-sm-top">
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
                    />
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
        );
    }
}

export default App;
