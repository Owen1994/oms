import React, { Component } from 'react';
import { Table, Pagination, Spin } from 'antd';

import { page } from '../../../../constants';
import { timestampFromat } from '../../../../utils';
import { getSpecialpermitType } from '../constants'
import Tableoption from '../../../../components/Tableoption';
import BtnOperation from '../../../../components/BtnOperation';
import Tableitem from '../../../../components/Tableitem';
import PopConfirm from '../../../../common/components/confirm';

class App extends Component {
    componentDidMount() {
        this.props.listFetch();
    };
    columns = [
        {
            title: '平台',
            dataIndex: 'platformName',
            width: 120,
        },
        {
            title: '站点',
            dataIndex: 'siteName',
            width: 120,
        },
        {
            title: '销售账号',
            dataIndex: 'saleAccount',
            width: 240,
            render: (text, record) => {
                return (
                    <Tableitem
                        label="lable"
                        title=""
                        separator={'\,'}
                        onClick={() => {this.props.onChangeModal('detailVisible', '查看', record, record.saleAccount)}}
                        content={record.saleAccount}
                        float={'left'}
                        left={'20px'}
                        right={'180px'}
                    />
                )
            }
        }, 
        {
            title: '特批类型',
            dataIndex: 'specialpermitType',
            align: 'center',
            width: 120,
            render: (text) =>{
                let arr = text.split(",");
                let str = ''
                for(let i =0 ;i < arr.length;i++){
                    for(let j =0 ;j < getSpecialpermitType.length;j++){
                        if(arr[i] == getSpecialpermitType[j].value){
                            i ===arr.length-1 ? (str += getSpecialpermitType[j].label) : (str += getSpecialpermitType[j].label + ', ')
                        }
                    }
                }
                return str
            }
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            width: 240,
            render: (text, record) => {
                return (
                    <Tableitem
                        label="lable"
                        title=""
                        separator={'\,'}
                        onClick={() => {this.props.onChangeModal('detailVisible', '查看', record, record.sku)}}
                        content={record.sku}
                        float={'left'}
                        left={'20px'}
                        right={'180px'}
                    />
                )
            }
        }, 
        {
            title: '添加人员',
            dataIndex: 'addPerson',
            width: 120,
        }, {
            title: '添加时间',
            dataIndex: 'addTime',
            width: 120,
            render: text => timestampFromat(text, 'yyyy-mm-dd hh:MM:ss')
        },
        {
            title: '最新修改人员',
            dataIndex: 'lastUpdatePerson',
            width: 120,
        }, {
            title: '最新修改时间',
            dataIndex: 'lastUpdateTime',
            width: 120,
            render: text => timestampFromat(text, 'yyyy-mm-dd hh:MM:ss')
        }, 
        {
            title: '操作',
            width: 120,
            render: (text, record) => {
                let options = [
                    {
                        name: '编辑',
                        onChange: () => {this.props.onChangeModal('editVisible', '修改', record)},
                        funcId: '007-000002-000004-002',
                        subs: []
                    }, {
                        name: '删除',
                        onChange:() => PopConfirm('是否确认删除？', '', () => this.props.deleteModal(record.saleAccountCodeId)),
                        // onChange: () => {this.props.deleteItem(record)},
                        funcId: '007-000002-000004-003',
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
                funcId: '007-000002-000004-002',
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
                            rowKey={(record, index) => (index)}
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
