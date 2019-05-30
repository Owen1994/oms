import React from 'react';
import {
    Table,
    Spin,
    Pagination,
    Tooltip,
    Button,
    message,
} from 'antd';
import { ORDER_DETAIL_EXPORT } from '../constants/Api';
import { fetchPost } from '@/util/fetch';
import { getTimeStamp } from '../../../../compliance/utils';
import { parseStrToArray } from '../../../../util/StrUtil';
import Functions from '../../../../components/functions';

export default class Tables extends React.Component {
    state = {
        exportLoading: false,
    }
    columns =[
        {
            title: '序号',
            dataIndex: 'key',
            width: 20,
        },
        {
            title: '采购单号',
            dataIndex: 'po',
            width: 100,
            render: (text, row) => (
                <div className="text-left">
                    <a href={`/pms/purchasemanage/orderquery/detail/?orderNumber=${row.po}`}>{row.po}</a>
                </div>
            ),
        },
        {
            title: '订单SKU状态',
            dataIndex: 'skuState',
            width: 60,
        },
        {
            title: '角色',
            dataIndex: 'remark',
            width: 120,
            render: (text, row) => (
                <div className="statement-order-list-text">
                    <p>订货员:{row.opEmployee}</p>
                    <p>跟单员:<span>{row.merchandiser}</span></p>
                </div>
            ),
        },
        {
            title: '采购时间',
            dataIndex: 'poTime',
            sorter: true,
            width: 90,
        },
        {
            title: '预计到货日期',
            dataIndex: 'receivingTime',
            sorter: true,
            width: 90,
        },
        {
            title: '入库日期',
            dataIndex: 'warehouseInTime',
            sorter: true,
            width: 90,
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            width: 70,
        },
        {
            title: '数量',
            dataIndex: 'num',
            width: 100,
            render: (text, row) => (
                <div className="text-left statement-order-list-text">
                    <p>采购数量:{row.poNumber}</p>
                    <p>收货数量:<span>{row.receivingNumber}</span></p>
                    <p>质检数量:{row.qualityInspectionNumber}</p>
                    <p>不合格数量:<span>{row.unqualifiedNumber}</span></p>
                    <p>入库数量:{row.warehouseInNumber}</p>
                </div>
            ),
        },
        {
            title: '采购价格',
            dataIndex: 'poPrice',
            width: 50,
        },
        {
            title: '目的仓库',
            dataIndex: 'purposeWarehouse',
            width: 50,
        },
        {
            title: '供应商',
            dataIndex: 'supplier',
            width: 50,
        },
        {
            title: '公司主体',
            dataIndex: 'company',
            width: 50,
        },
        {
            title: '退税类型',
            dataIndex: 'taxRebatesType',
            width: 50,
        },
        {
            title: 'PR单号',
            dataIndex: 'prNumber',
            width: 70,
            render: (value) => (<Tooltip  title={value}>
                <div className="pms-prmanage-remark one-ellipsis" style={{width: "70px"}}>{value}</div>
            </Tooltip>),
        },
    ];

    handleExport = () => {
        const formData = { ...this.props.form.getFieldsValue() };


        const purchaseTimes = formData.purchaseTimes ? formData.purchaseTimes.map(t => getTimeStamp(t)) : [];
        const payTime = formData.payTime ? formData.payTime.map(t => getTimeStamp(t)) : [];

        let searchContents = undefined;
        let searchType = undefined;
        if (formData.searchContents) {
            if (parseStrToArray(formData.searchContents).length > 10) {
                message.warning('搜索内容不能超过10个');
                return false;
            } else {
                searchContents = parseStrToArray(formData.searchContents);
                searchType = formData.searchType;
            }
        }

        const data = {
            data: {
                ...formData,
                warehouse: formData.warehouse[0],
                purchaseTimes,
                searchContents,
                searchType,
                payTime,
            }
        };
        this.onConfirm(data);
    };

    // 确认弹窗
    onConfirm = (params) => {
        this.setState({ exportLoading: true });
        fetchPost(ORDER_DETAIL_EXPORT, params, 2).then((result) => {
            this.setState({ exportLoading: false });
            if (result.state === '000001') {
                message.success(result.msg);
                window.open('/pms/importexportmanage/importexportlist/', '_blank');
            }
        });
    };


    handleTabChange = (pagination, filters, sorter) => {
        const params = { ...sorter };
        if (params.field === 'poTime') {
            params.field = 'poTimeNumber';
        } else if (params.field === 'receivingTime') {
            params.field = 'receivingTimeNumber';
        } else if (params.field === 'warehouseInTime') {
            params.field = 'warehouseInTimeNumber';
        }
        this.props.sortFieldsList(params);
    };


    render() {
        const {
            loadingState,
            data,
            onSearch,
            pageNumber,
            pageData,
        } = this.props;
        const total = data.total;
        return (
            <div className="gallery-table breadcrumb margin-ms-top padding-sm">
                <Functions
                    {...this.props}
                    functionkey="010-000006-000001-002"
                >
                    <div className="overflow-hidden">
                        <div className="pull-right">
                            <Button icon="upload" type="button" onClick={this.handleExport}>
                                数据导出
                            </Button>
                        </div>
                    </div>
                </Functions>
                <div className="margin-ss-top">
                    <Spin spinning={loadingState} delay={500} tip="Loading...">
                        <Table
                            columns={this.columns}
                            dataSource={data.list}
                            pagination={false}
                            onChange={this.handleTabChange}
                            size="small"
                            bordered
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
