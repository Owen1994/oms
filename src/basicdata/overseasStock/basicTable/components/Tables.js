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
    // }

    columns = [
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
            title: '唯一值',
            dataIndex: 'skuUnique',
        },
        {
            title: '中文名称',
            dataIndex: 'skuName',
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
            title: 'sku状态',
            dataIndex: 'skuState',
        },
        {
            title: '备货状态',
            dataIndex: 'stockState',
        },
        {
            title: 'SKU等级',
            dataIndex: 'skuGrade',
        },
        {
            title: '属性值',
            dataIndex: 'attributeValue',
        },
        {
            title: 'sku精英值',
            dataIndex: 'skuEliteValue',
        },
        {
            title: '采购成本',
            dataIndex: 'skuCost',
        },
        {
            title: '产品产量(KG)',
            dataIndex: 'skuWeight',
        },
        {
            title: '长(CM)',
            dataIndex: 'skuLength',
        },
        {
            title: '宽(CM)',
            dataIndex: 'skuWidth',
        },
        {
            title: '高(CM)',
            dataIndex: 'skuHeight',
        },
        {
            title: '海外仓库存体积',
            dataIndex: 'volume',
        },
        {
            title: '实际头程费用',
            dataIndex: 'actualHeadCost',
        },
        {
            title: '本地派送渠道',
            dataIndex: 'localDeliveryChannel',
        },
        {
            title: '本地派送资费(RMB)',
            dataIndex: 'localDeliveryCost',
        },
        {
            title: '一级分类',
            dataIndex: 'categoryOneName',
        },
        {
            title: '二级分类',
            dataIndex: 'categoryTwoName',
        },
        {
            title: '上次上架时间',
            dataIndex: 'shelfDate',
        },
        {
            title: '最后一次下架时间',
            dataIndex: 'reShelfDate',
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
        //     onChange: (rowKeys) => {
        //         this.setState({
        //             selectedRowKeys: rowKeys,
        //         });
        //     },
        // };


        return (
            <div className="gallery-table breadcrumb margin-ms-top padding-sm">
                <div className="overflow-hidden">
                    <div className="pull-right">
                        {/* <Functions {...this.props} functionkey="011-000002-000001-004"> */}
                        <Button onClick={displayFieldsModal} className="margin-ss-right">
                            <Icon type="font-size" />
                            设置显示字段
                        </Button>
                        {/* </Functions> */}
                        <Functions {...this.props} functionkey="011-000002-000001-003">
                            <Button onClick={this.props.showImportModal} className="margin-ss-right">
                                <Icon type="download" />
                                数据导入
                            </Button>
                        </Functions>
                        <Functions {...this.props} functionkey="011-000002-000001-002">
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
