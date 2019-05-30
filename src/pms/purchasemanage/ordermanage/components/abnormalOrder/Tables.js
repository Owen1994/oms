import React from 'react';

import {
    Table,
    Spin,
    Button,
    message,
    Pagination,
} from 'antd';

import { levelOptions } from '../../../../../util/options';
import { popUpImage } from '../../../../../util/baseTool';
import Functions from '../../../../../components/functions';

export default class Tablelist extends React.Component {
    state = {
    }

    columns = [
        {
            title: '图片',
            width: 100,
            dataIndex: 'imgUrl',
            key: 'imgUrl',
            render: text => (
                <div className="table-img" onClick={() => popUpImage(text, true)}>
                    <img src={text} alt="图片" />
                </div>
            ),
        },
        {
            title: 'PR单号',
            dataIndex: 'prNumber',
            width: 100,
            key: 'prNumber',
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            width: 100,
            key: 'sku',
        },
        {
            title: '在售状态',
            dataIndex: 'state',
            width: 60,
            key: 'state',
        },
        {
            title: '日均销量',
            dataIndex: 'averageSales',
            width: 60,
            key: 'averageSales',
        },
        {
            title: '仓库',
            dataIndex: 'wareHouse',
            width: 60,
            key: 'wareHouse',
        },
        {
            title: 'SKU备注',
            dataIndex: 'skuRemark',
            width: 140,
            key: 'skuRemark',
        },
        {
            title: '采购数量',
            dataIndex: 'purchaseCount',
            width: 60,
            key: 'purchaseCount',
        },
        {
            title: '参考价/供应商报价',
            dataIndex: 'referencePrice-supplierPrice',
            width: 100,
            key: 'referencePrice-supplierPrice',
            render: (text, record) => (`${record.referencePrice} / ${record.supplierPrice}`),
        },
        {
            title: '采购金额',
            dataIndex: 'purchasePrice',
            width: 100,
            key: 'purchasePrice',
        },
        {
            title: '角色',
            dataIndex: 'role',
            width: 150,
            key: 'role',
            render: (text, record) => (
                <div className="text-left">
                    <p><span>计划员：</span>{record.planRole}</p>
                    <p><span>订货员：</span>{record.opEmployee}</p>
                    <p><span>跟单员：</span>{record.merchandiser}</p>
                    <p><span>开发员：</span>{record.developer}</p>
                </div>
            ),
        },
        {
            title: '交期',
            dataIndex: 'deliveryTime',
            width: 60,
            key: 'deliveryTime',
        },
        {
            title: '供应商',
            dataIndex: 'supplier',
            width: 140,
            key: 'supplier',
        },
        {
            title: '异常类型',
            dataIndex: 'errorType',
            width: 100,
            key: 'errorType',
        },
    ];

    // componentWillMount() {
    //     this.Paginatihandle();
    // }

    // Paginatihandle = (page, pageSize) => {
    //     const { orderManagementAbnormalOrderList, getorderManagementAbnormalOrderAsync } = this.props;
    //     const params = orderManagementAbnormalOrderList.params;
    //     if (page && pageSize) {
    //         params.pageNumber = page;
    //         params.pageData = pageSize;
    //     }
    //     getorderManagementAbnormalOrderAsync(params);
    // }

    updata = () => {
        const { getOrderManagementUpdateAbnormalAsync, orderManagementAbnormalOrderList } = this.props;
        const params = orderManagementAbnormalOrderList.params;
        getOrderManagementUpdateAbnormalAsync()
            .then((result) => {
                if (result) {
                    message.success(result.msg);
                    this.Paginatihandle(1, params.pageSize);
                }
            });
    }

    render() {
        const { orderManagementAbnormalOrderList, onSearch, showExport } = this.props;
        const {
            total,
            list,
            params,
            loading,
        } = orderManagementAbnormalOrderList;
        const pageNumber = this.props.pageNumber;
        const pageData = this.props.pageSize;

        const table = (
            <Spin spinning={loading} delay={500} tip="Loading...">
                <div className="padding-sm">
                    <div className="padding-lg-bottom">
                        <Functions
                            {...this.props}
                            functionkey="010-000003-000001-005"
                        >
                                <Button onClick={this.updata} className="margin-sm-bottom pull-right" icon="sync">批量更新异常</Button>
                        </Functions>
                        <Functions
                            {...this.props}
                            functionkey="010-000003-000001-006"
                        >
                        <Button
                            icon="upload"
                            className="margin-sm-right margin-sm-bottom pull-right"
                            onClick={showExport}
                        >
                            数据导出
                            </Button>
                        </Functions>
                    </div>


                    <Table
                        bordered
                        size="small"
                        dataSource={list}
                        pagination={false}
                        columns={this.columns}
                    />
                    <Pagination
                        showTotal={t => `共 ${t} 条`}
                        pageSizeOptions={levelOptions('分页显示条数')}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={onSearch}
                        total={total}
                        pageSize={pageData}
                        onChange={onSearch}
                    />
                </div>
            </Spin>
        );
        return (
            <div>
                {table}
            </div>
        );
    }
}
