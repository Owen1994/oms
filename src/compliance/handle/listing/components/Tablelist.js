import React, { Component } from 'react';
import { Table, Pagination, Spin } from 'antd';
import PropTypes from 'prop-types'

import { page } from '../../../../constants';

import Tableoption from '../../../../components/Tableoption';
import BtnOperation from '../../../../components/BtnOperation';
import { timestampFromat } from '../../../../utils';
import Tableitem from '../../../components/Tableitem';

class App extends Component {
    static contextTypes = {
        router: PropTypes.object,
    }
    columns = [
        {
            title: 'SKU信息',
            dataIndex: 'sku',
            align: 'center',
            width: 100,
            render: (text, record) => {
                return (
                    <div>
                        <Tableitem
                            title="Item ID"
                            content={record.itemId}
                            left={70}
                            right={100}
                        />
                        <Tableitem
                            title="Seller SKU"
                            content={record.sellersku}
                            left={70}
                            right={100}
                        />
                    </div>
                )
            }
        }, {
            title: '销售账号',
            dataIndex: 'spu',
            align: 'center',
            width: 100,
            render: (text, record) => {
                return (
                    <div>
                        <Tableitem
                            title="销售账号"
                            content={record.saleAccount}
                            left={65}
                            right={100}
                        />
                        <Tableitem
                            title="站点"
                            content={record.site}
                            left={65}
                            right={100}
                        />
                        <Tableitem
                            title="平台"
                            content={record.platform}
                            left={65}
                            right={100}
                        />
                    </div>
                )
            }
        }, {
            title: '刊登人员/时间',
            align: 'center',
            dataIndex: 'productChinessName',
            width: 120,
            render: (text, record) => {
                return (
                    <div>
                        <Tableitem
                            title="刊登人员"
                            content={record.publishPerson}
                            left={65}
                            right={150}
                        />
                        <Tableitem
                            title="刊登时间"
                            content={timestampFromat(record.publishTime, 'yyyy-mm-dd hh:MM:ss')}
                            left={65}
                            right={150}
                        /> 
                    </div>
                )
            }
        },  {
            title: '审核次数',
            align: 'center',
            dataIndex: 'reviewTimes',
            width: 50
        }, {
            title: '审核信息',
            align: 'center',
            dataIndex: 'info',
            width: 120,
            render: (text, record) => {
                return (
                    <div>
                        <Tableitem
                            title="审核状态"
                            content={record.reviewStatus}
                            left={65}
                            right={150}
                        />
                        <Tableitem
                            title="审核人员"
                            content={record.reviewers}
                            left={65}
                            right={150}
                        />
                        <Tableitem
                            title="审核时间"
                            content={timestampFromat(record.reviewTime, 'yyyy-mm-dd hh:MM:ss')}
                            left={65}
                            right={150}
                        />
                    </div>
                )
            }
        }, {
            title: '操作',
            width: 50,
            align: 'center',
            render: (text, record) => {
                let options = [
                    {
                        name: '日志',
                        onChange: () => {this.props.onChangeModal('detailVisible', '日志', record)},
                        funcId: '007-000004-000003-003',
                        subs: []
                    }
                ]
                if (record.reviewStatus === '待审核') {
                    const obj = {
                        name: "审核",
                        onChange: () => {
                            // this.props.onChangeModal('editVisible', '审核', record)
                            this.context.router.history.push({
                                pathname: '/compliance/handle/listingImageReview/detail/',
                                search: `?id=${record.id}`,
                            })
                        },
                        funcId: '007-000004-000003-002',
                        subs: []
                    }
                    options.splice(0, 0, obj);
                } 
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
        return (
            <div className="breadcrumb padding-sm overflow-hidden margin-sm-top">
                <Spin spinning={loading} delay={500}>
                    <div className="table">
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
