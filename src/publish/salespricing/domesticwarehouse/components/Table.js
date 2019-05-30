import React from 'react';
import {
    Table, Pagination, Spin, Icon, Button, message
} from 'antd';
import Functions from '../../../../components/functions';
import EditCell from './EditCell';

import { page } from '../../../../constants';
import { fetchPost } from '../../../../util/fetch';
import { MODIFY_SINGLE } from '../constants';

export default class TableList extends React.Component {
    state = {}

    columns = [
        {
            title: 'SKU',
            dataIndex: 'sku',
            width: 200,
            align: 'center',
        },
        {
            title: '中文名称',
            dataIndex: 'skuName',
            width: 200,
            align: 'center',
        },
        {
            title: '利润率(%)',
            dataIndex: 'profitsRate',
            width: 200,
            align: 'center',
            render: (text,record) => <EditCell
                value={text ? text : '--'}
                type={"number"}
                onChange={this.onCellChange(record.id, 'profitsRate')}
            />
        },
        {
            title: '建议售价',
            dataIndex: 'salesPrice',
            width: 200,
            align: 'center',
            render: (text,record) => <EditCell
                value={text ? text : '--'}
                type={"number"}
                onChange={this.onCellChange(record.id, 'salesPrice')}
            />
        },
        {
            title: '币种',
            dataIndex: 'currency',
            width: 200,
            align: 'center',
        },
        {
            title: '正推边际利润',
            dataIndex: 'marginalProfit',
            width: 200,
            align: 'center'
        },
        {
            title: '正推边际利润率(%)',
            dataIndex: 'marginalProfitRate',
            width: 200,
            align: 'center',
        },
        {
            title: '总成本价',
            dataIndex: 'totalCostPrice',
            width: 200,
            align: 'center',
        },
        {
            title: '发货重量（g）',
            dataIndex: 'weight',
            width: 200,
            align: 'center',
        },
        {
            title: '理论运费',
            dataIndex: 'theoryFreight',
            width: 200,
            align: 'center',
            render: (text,record) => <EditCell
                value={text ? text : '--'}
                type={"number"}
                onChange={this.onCellChange(record.id, 'theoryFreight')}
            />
        },
        {
            title: '试算结果',
            dataIndex: 'handlerResult',
            width: 200,
            align: 'center',
        },
    ]

    onCellChange = (id, type) => {
        return (value) => {
            if (value.length > 20) {
                message.info('不能超出20位字符！');
                return false;
            }
            if (type === 'salesPrice' && value <= 0) {
                message.info('建议售价不能小于0！');
                return false;
            }
            if (value) {
                let params = {
                    data: {
                        id,
                        [type]: value
                    }
                };
                let { domesticList } = this.props.domesticReducer;
                fetchPost(MODIFY_SINGLE, params, 1)
                    .then(data => {
                        if (data && data.state === "000001") {
                            const res = data.data;
                            domesticList.forEach(item => {
                                if (item.id === id) {
                                    item.marginalProfit = res.marginalProfit;
                                    item.marginalProfitRate = res.marginalProfitRate;
                                    item.handlerResult = res.handlerResult;
                                    item.profitsRate = res.profitsRate;
                                    item.salesPrice = res.salesPrice;
                                    item.theoryFreight = res.theoryFreight;
                                    item.totalCostPrice = res.totalCostPrice;
                                }
                            })
                            this.setState({ data: domesticList });
                        }
                    })
            }
        };
    };

    render() {
        const { total, current, pageSize } = this.props.paginationReducer;
        const { domesticList, loading } = this.props.domesticReducer;
        const { listFetch, queryBtnShow, getDomesticState } = this.props;
        const queryResultCom = queryBtnShow
            ? (
                <div>
                    <Button onClick={() => getDomesticState(1)}>查询结果</Button>
                    <p className={"text-center margin-ms-top text-danger"}>试算售价中，请点击查询结果...</p>
                </div>
            )
            : [
                <div className='overflow-hidden'>
                    <div className='pull-right'>
                        <Functions {...this.props} functionkey="008-000005-000003-002">
                            <Button className="margin-sm-left" onClick={() => this.props.handleOpenModal('calSaleVisible')}><Icon type='plus' />试算售价</Button>
                        </Functions>
                        <Functions {...this.props} functionkey="008-000005-000003-002">
                            <Button className="margin-sm-left" onClick={this.props.exportPricing}><Icon type='upload' />数据导出</Button>
                        </Functions>
                    </div>
                </div>,
                <div className='margin-sm-top'>
                    <Table
                        bordered
                        size="small"
                        indentSize={0}
                        columns={this.columns}
                        dataSource={domesticList}
                        pagination={false}
                        // onChange={this.handleTableChange}
                        rowKey={record => (record.id)}
                    />
                    <Pagination
                        showTotal={totals => `共 ${totals} 条`}
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
                </div>
            ];
        return (
            <div className="tablelist-item breadcrumb padding-sm overflow-hidden margin-sm-top">
                <Spin spinning={loading} delay={500}>
                    {queryResultCom}
                </Spin>
            </div>
        );
    }
}
