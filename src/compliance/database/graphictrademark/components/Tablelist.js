import React, { Component } from 'react';
import { Table, Pagination, Spin } from 'antd';

import { page } from '../../../../constants';
import { config } from '../../../configs';
import { angentPicUrl} from '../../../../util/baseTool'

import Tableoption from '../../../../components/Tableoption';
import BtnOperation from '../../../../components/BtnOperation';

class App extends Component {
    componentDidMount() {
        this.props.listFetch();
    };
    columns = [
        {
            title: '图形商标',
            dataIndex: 'figureLogoPic',
            align: 'center',
            width: 120,
            render: (text, record) => {
                let defaultUrl = config.defaultImg;
                return (
                    <img src={text ? angentPicUrl(text) : defaultUrl} width={58} height={50} 
                        onError={() => {
                            record.figureLogoPic = defaultUrl
                            this.forceUpdate()
                        }}
                    />
                )
            }
        }, {
            title: '图形类型',
            dataIndex: 'goodsCategory',
            width: 120,
        }, {
            title: '注册国家',
            dataIndex: 'registerCountry',
            width: 120,
        }, {
            title: '知产代码',
            dataIndex: 'intellectualCode',
            align: 'center',
            width: 120,
        },
        {
            title: '商标商品分类',
            dataIndex: 'trademarkClass',
            width: 120,
            render: (text, record) => {
                return (
                    <div>
                        {
                            record.trademarkClass.map ((item, index)=> 
                                <div key={index}>
                                    <span>
                                        {
                                            item.name +  '(' + item.code +  ')'
                                        }
                                    </span>
                                </div>
                            )
                        }
                    </div>
                )
            }
        }, {
            title: '权利人',
            dataIndex: 'obligee',
            width: 120,
        }, {
            title: '商标号',
            dataIndex: 'logoNo',
            align: 'center',
            width: 120,

        }, {
            title: '操作',
            width: 120,
            render: (text, record) => {
                let options = [
                    {
                        name: "查看",
                        onChange: () => {this.props.onChangeModal('detailVisible', '查看', record)},
                        funcId: '007-000001-000003-001',
                        subs: []
                    }, 
                    {
                        name: '编辑',
                        onChange: () => {this.props.onChangeModal('editVisible', '修改', record)},
                        funcId: '007-000001-000003-002',
                        subs: []
                    }, {
                        name: '删除',
                        onChange: () => {this.props.deleteItem(record)},
                        funcId: '007-000001-000003-003',
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
                funcId: '007-000001-000003-002',
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
                            rowKey={(record, index) => (record.figureLogoId)}
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
