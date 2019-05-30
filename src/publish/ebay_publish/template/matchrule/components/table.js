/**
 * 作者: 陈林
 * 描述: 库存价格队列列表组件
 * 时间: 2018/7/30 0030 下午 3:14
 * @param
 **/
import React,{ Component } from 'react'
import { Button,Table,Pagination,Spin,Icon, Menu, Dropdown,} from 'antd';
import Functions from '../../../../../components/functions/index'
import PopConfirm from '../../../../../common/components/confirm';
import {fetchPost} from "../../../../../util/fetch";
import '../../css/css.css'
import {DELETE_TEMPL_MATCH} from "../constants/MatchList";
class table extends Component{

    columns = [
        {
            title: '销售账号',
            dataIndex: 'sellerId',
        }, {
            title: '站点',
            dataIndex: 'siteCode',
        },{
            title: '添加人员',
            dataIndex: 'creator',
        },{
            title: '添加时间',
            dataIndex: 'createdTime',
        },{
            title: '最新修改人员',
            dataIndex: 'modifier',
        },{
            title: '最新修改时间',
            dataIndex: 'modifiedTime',
        },
        {
            title: '操作',
            dataIndex: 'resultInformation',
            key: 'resultInformation',
            render: (text, record) => (
                <div className="lgt-customs_set_btns">
                    <Functions { ...this.props } functionkey="008-000001-000007-003">
                          <span className="modify" onClick={() => this.props.showModal(record)}>编辑</span>
                    </Functions>
                    <Functions { ...this.props } functionkey="008-000001-000007-004">
                        <span className="margin-ss-left modify"
                              onClick={() => PopConfirm('是否确认要删除？', '', () => this.onConfirm(record))}
                        >删除</span>
                    </Functions>
                </div>
            ),
        }
    ];

    //单条数据删除
    onConfirm = (record) => {
        fetchPost(DELETE_TEMPL_MATCH, {matchIdArr:[record.matchId]}, 1)
            .then(result => {
                if(result.state === '000001') {
                    this.props.onSearch()
                }
            })
    }


    render(){
        const { loadingState,onSearch } = this.props;
        const { pageNumber, pageSize } = this.props.paginationData;
        const { data,total } = this.props.matchListData;
        const dataList = data;
        return(
            <div className="gallery-table breadcrumb margin-ms-top padding-sm">
                <div className="overflow-hidden">
                    <div className="pull-right">
                        <Functions { ...this.props } functionkey="008-000001-000007-002">
                            <Button onClick={() => this.props.showModal()}>
                                <Icon type="plus" />
                                新增
                            </Button>
                        </Functions>
                    </div>
                </div>
                <div className="margin-ss-top">
                    <Spin spinning={false} delay={500} tip="Loading...">
                        <Table
                            columns={this.columns}
                            dataSource={ dataList }
                            onChange={this.props.sorter}
                            pagination={false}
                            bordered={true}
                            size="small"
                        />
                        <Pagination
                            showTotal={total => `共 ${total} 条`}
                            pageSizeOptions={['20', '30', '40', '50']}
                            showSizeChanger
                            showQuickJumper={{goButton: true}}
                            current={pageNumber}
                            defaultCurrent={1}
                            onShowSizeChange={onSearch}
                            total={total}
                            pageSize={pageSize}
                            onChange={onSearch}
                        />
                    </Spin>
                </div>
            </div>
        )
    }
}

export default table
