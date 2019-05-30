import React, { Component } from 'react';
import { Table, Pagination, Spin } from 'antd';

import { page } from '../../../../constants';
import { config } from '../../../configs';
import { angentPicUrl,popUpImage} from '../../../../util/baseTool'

import Tableoption from '../../../../components/Tableoption';
import BtnOperation from '../../../../components/BtnOperation';
import Tableitem from '../../../../components/Tableitem';

class App extends Component {
    componentDidMount() {
        this.props.listFetch();
    };
    columns = [
        {
            title: '版权名称',
            dataIndex: 'productName',
            width: 120,
        },
        {
            title: '示例SKU',
            dataIndex: 'sku',
            width: 240,
            render: (text, record) => {
                return (
                    <Tableitem
                        title=""
                        separator={'\,'}
                        content={record.sku}
                        float={'left'}
                        right={'180px'}
                    />
                )
            }
        }, 
        {
            title: '知产代码',
            dataIndex: 'intellectualCode',
            align: 'center',
            width: 120,
        },
        {
            title: '版权号',
            dataIndex: 'version',
            width: 120,
        },
        {
            title: '权利人',
            dataIndex: 'obligee',
            width: 120,
            render: (text, record) => {
                return (
                    <div className="breakwrod">{text}</div>
                )
            }
        },
        {
            title: '实物图片',
            dataIndex: 'versionPic',
            align: 'center',
            width: 120,
            render: (text, record) => {
                let defaultUrl = config.defaultImg;
                const src= text ? angentPicUrl(text) : defaultUrl
                return (
                    <img className="pointer" onClick={()=>popUpImage(src,true)} src={src} width={58} height={50} 
                        onError={() => {
                            record.versionPic = defaultUrl
                            this.forceUpdate()
                        }}
                    />
                )
            }
        }, 
        {
            title: '操作',
            width: 120,
            render: (text, record) => {
                let options = [
                    {
                        name: "查看",
                        onChange: () => {this.props.onChangeModal('detailVisible', '查看', record)},
                        funcId: '007-000001-000004-001',
                        subs: []
                    }, 
                    {
                        name: '编辑',
                        onChange: () => {this.props.onChangeModal('editVisible', '修改', record)},
                        funcId: '007-000001-000004-002',
                        subs: []
                    }, {
                        name: '删除',
                        onChange: () => {this.props.deleteItem(record)},
                        funcId: '007-000001-000004-003',
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
                funcId: '007-000001-000004-002',
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
                            rowKey={(record, index) => (record.versionId)}
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
