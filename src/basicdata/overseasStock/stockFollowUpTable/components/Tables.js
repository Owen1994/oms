import React from 'react';
import {
    Table,
    Spin,
    Pagination,
    Button,
    Icon,
    // Tooltip,
} from 'antd';
import Functions from '../../../../components/functions';

export default class Tables extends React.Component {
    // state = {
    //     selectedRowKeys: [],
    //     selectedsSku: [],
    // }

    columns = [
        {
            title: '唯一值',
            dataIndex: 'skuUnique',
        },
        {
            title: '仓别',
            dataIndex: 'warehouseType',
        },
        {
            title: 'SKU',
            dataIndex: 'skuCode',
        },
        {
            title: 'SPU',
            dataIndex: 'spuCode',
        },
        {
            title: '平台',
            dataIndex: 'platform',
        },
        {
            title: '团队',
            dataIndex: 'team',
        },
        {
            title: '主管',
            dataIndex: 'leader',
        },
        {
            title: '销售专员',
            dataIndex: 'salesperson',
        },
        {
            title: '采购开发',
            dataIndex: 'developer',
        },
        {
            title: '主销售状态',
            dataIndex: 'mainSalesState',
        },
        {
            title: '分团队状态',
            dataIndex: 'subTeamState',
        },
        {
            title: '计划下单',
            dataIndex: 'planOrder',
        },
        {
            title: '采购在途',
            dataIndex: 'purchaseInTransit',
        },
        {
            title: '中转仓',
            dataIndex: 'transferWarehouse',
        },
        {
            title: '国际在途',
            dataIndex: 'internationalInTransit',
        },
        {
            title: '海外仓',
            dataIndex: 'overseasWarehouse',
        },
        {
            title: '当日全段',
            dataIndex: 'fullDay',
        },
        {
            title: '缺货预警提示',
            dataIndex: 'outStockAlert',
        },
        {
            title: '预计缺货下架日期',
            dataIndex: 'expectedShelfDate',
        },
        {
            title: '预计到货所在环节',
            dataIndex: 'expectedArrival',
        },
        {
            title: '预计到货数量',
            dataIndex: 'expectedArrivalQuantity',
        },
        {
            title: '预计到货日期',
            dataIndex: 'expectedArrivalDate',
        },
        {
            title: '是否延迟',
            dataIndex: 'delayFlag',
        },
        {
            title: '异常备注',
            dataIndex: 'exceptionRemark',
        },
        {
            title: '海外仓库存料本',
            dataIndex: 'overseasStockBook',
        },
        {
            title: '全段库存总料本',
            dataIndex: 'allStockBook',
        },
        {
            title: '缺货前7天日均',
            dataIndex: 'stockoutBefore7DaysAverage',
        },
        {
            title: '30加权天日均销量',
            dataIndex: 'stock30DaysWeightedDailySales',
        },
        {
            title: '90天最大销量',
            dataIndex: 'stock90DaysMaxSales',
        },
        {
            title: '海外仓库存天数',
            dataIndex: 'overseaLocationStockNumber_days',
        },
        {
            title: '全段库存天数',
            dataIndex: 'allStockNumberDays',
        },
        {
            title: '库存优化预警',
            dataIndex: 'stockOptimizeWarning',
        },
        {
            title: '需要优化目标销量',
            dataIndex: 'needOptimizeTargetSales',
        },
    ];

    columnsCopy = [...this.columns];

    componentWillReceiveProps(nextProps) {
        const preFilterColumns = this.props.filterColumns;
        const filterColumns = nextProps.filterColumns;
        if (filterColumns && preFilterColumns !== filterColumns) {
            this.filterCol(filterColumns);
        }

        const preData = this.props.data;
        const data = nextProps.data;
        if (data && data !== preData) {
            this.filterCol(filterColumns);
        }
    }

    filterCol = (filterColumns) => {
        const newArray = [...filterColumns];
        const filterObj = {};
        newArray.push({ fieldCode: 'skuCode' });
        newArray.forEach((item) => {
            filterObj[item.fieldCode] = 1;
        });
        this.columnsCopy = this.columns.filter(item => (filterObj[item.dataIndex] === 1));
    }

    render() {
        const {
            loadingState,
            data,
            onSearch,
            pageNumber,
            pageData,
            onExportSku,
            displayFieldsModal,
        } = this.props;
        const total = data.total;
        // const { selectedRowKeys } = this.state;
        // const rowSelection = {
        //     selectedRowKeys,
        //     onChange: (rowKeys, selectedRows) => {
        //         this.setState({
        //             selectedRowKeys: rowKeys,
        //             selectedsSku: selectedRows,
        //         });
        //     },
        // };


        return (
            <div className="gallery-table breadcrumb margin-ms-top padding-sm">
                <div className="overflow-hidden">
                    <div className="pull-right">
                        {/* <Functions {...this.props} functionkey="011-000002-000002-004"> */}
                        <Button onClick={displayFieldsModal} className="margin-ss-right">
                            <Icon type="font-size" />
                            设置显示字段
                        </Button>
                        {/* </Functions> */}
                        <Functions {...this.props} functionkey="011-000002-000002-003">
                            <Button onClick={this.props.showImportModal} className="margin-ss-right">
                                <Icon type="download" />
                                数据导入
                            </Button>
                        </Functions>
                        <Functions {...this.props} functionkey="011-000002-000002-002">
                            <Button onClick={onExportSku}>
                                <Icon type="export" />
                                数据导出
                            </Button>
                        </Functions>
                    </div>
                </div>
                <div className="margin-ss-top">
                    <Spin spinning={loadingState} delay={500} tip="Loading...">
                        <Table
                            columns={this.columnsCopy}
                            dataSource={data.list}
                            pagination={false}
                            size="small"
                            bordered
                            // rowSelection={rowSelection}
                            scroll={{ x: (this.columnsCopy.length < 10 ? true : 3200) }}
                        />
                        <Pagination
                            showTotal={num => `共 ${num} 条`}
                            pageSizeOptions={['20', '30', '40', '50']}
                            showSizeChanger
                            showQuickJumper={{ goButton: true }}
                            current={pageNumber}
                            defaultCurrent={1}
                            onShowSizeChange={onSearch}
                            total={total}
                            pageSize={pageData}
                            onChange={onSearch}
                        />
                    </Spin>
                </div>
            </div>
        );
    }
}
