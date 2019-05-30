import React from 'react';
import {
    Table,
    Spin,
    Pagination,
    Button,
} from 'antd';
import Functions from '../../../../components/functions';
import '../../../../common/css/table.css';


export default class Tables extends React.Component {
    columns = [
        {
            title: '序号',
            dataIndex: 'sno',
            width: 100,
            render: (value, record, index) => (
                (this.props.pageNumber - 1) * this.props.pageData + (index + 1)
            ),
        },
        {
            title: '缩略图',
            dataIndex: 'mainPic',
            width: 100,
            render: (value, record) => (
                <img width="72" height="68" src={record.mainPic} alt="缩略图" />
            ),
        },
        {
            title: 'SPU',
            dataIndex: 'spuCode',
            width: 100,
        },
        {
            title: 'SKU',
            dataIndex: 'skuCode',
            width: 150,
        },
        {
            title: '中文名称',
            dataIndex: 'skuName',
            width: 150,
        },
        {
            title: '成本价',
            dataIndex: 'skuCost',
            width: 150,
        },
        {
            title: '发货重量',
            dataIndex: 'skuClearWeight',
            width: 150,
        },
        {
            title: '属性代码',
            dataIndex: 'attributeCode',
            width: 150,
        },
        {
            title: '物流属性',
            dataIndex: 'skuLogisticsProperty',
            width: 150,
        },
        {
            title: '一级分类',
            dataIndex: 'categoryOneName',
            width: 150,
        },
        {
            title: '二级分类',
            dataIndex: 'categoryTwoName',
            width: 150,
        },
        {
            title: '三级分类',
            dataIndex: 'categoryThreeName',
            width: 150,
        },
        {
            title: '今日状态',
            dataIndex: 'todayState',
            width: 150,
        },
        {
            title: '可用库存',
            dataIndex: 'quantity',
            width: 150,
        },
        {
            title: '备注',
            dataIndex: 'remark',
            width: 150,
        },
        {
            title: '重新上架时间',
            dataIndex: 'reShelfDate',
            width: 150,
        },
        {
            title: '主仓库',
            dataIndex: 'mainWarehouse',
            width: 150,
        },
        {
            title: '初次上架时间',
            dataIndex: 'shelfDate',
            width: 150,
        },
        {
            title: '计划员',
            dataIndex: 'planner',
            width: 150,
        },
        {
            title: '开发',
            dataIndex: 'developer',
            width: 150,
        },
        {
            title: '跟单',
            dataIndex: 'merchandiser',
            width: 150,
        },
        {
            title: '组别',
            dataIndex: 'groupName',
            width: 150,
        },
        {
            title: '禁售平台及站点',
            dataIndex: 'forbidSite',
            width: 150,
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
        newArray.push({ fieldCode: 'sno' });
        newArray.push({ fieldCode: 'mainPic' });
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
            showImportModal,
            displayFieldsModal,
            actionKeys,
            exportLoading,
        } = this.props;
        return (
            <div className="yks-erp-table">
                <div className="top-container">
                    <div className="top-right-wrap">
                        <Functions {...this.props} functionkey={actionKeys[1]}>
                            <Button className="margin-ss-right" onClick={showImportModal}>导入统表</Button>
                        </Functions>
                        <Functions {...this.props} functionkey={actionKeys[0]}>
                            <Button className="margin-ss-right" loading={exportLoading} onClick={onExportSku}>导出</Button>
                        </Functions>
                        <Functions {...this.props} functionkey={actionKeys[2]}>
                            <Button onClick={displayFieldsModal}>设置显示字段</Button>
                        </Functions>
                    </div>
                </div>
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Table
                        columns={this.columnsCopy}
                        dataSource={data.list}
                        pagination={false}
                        size="small"
                        bordered
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
                        total={data.total}
                        pageSize={pageData}
                        onChange={onSearch}
                    />
                </Spin>
            </div>
        );
    }
}
