import React from 'react';

import {
    Table,
    Spin,
    Button,
    Pagination,
    Checkbox,
    Tooltip,
} from 'antd';

import { levelOptions } from '../../../../../util/options';
import { timestampFromat } from '../../../../../util/baseTool';
import Functions from '../../../../../components/functions';

export default class Tablelist extends React.Component {
    state = {
        selectedRowKeys: [],
        indeterminate: false,
        checkAll: false,
    }

    // componentWillMount() {
    //     this.Paginatihandle();
    // }

    columns = () => [
        {
            title: <Checkbox
                onChange={this.selectAllOrNo}
                indeterminate={this.state.indeterminate}
                checked={this.state.checkAll}
            />,
            dataIndex: 'rowSelection',
            width: 30,
            key: 'rowSelection',
            render: (value, row) => {
                const { selectedRowKeys } = this.state;
                const obj = {
                    children: <Checkbox
                        onChange={() => this.onChange(row.i_code)}
                        checked={selectedRowKeys.indexOf(row.i_code) !== -1}
                    />,
                    props: {},
                };
                if (row.rowSpan) {
                    obj.props.rowSpan = row.rowSpan;
                } else {
                    obj.props.rowSpan = 0;
                }
                return obj;
            },
        },
        {
            title: 'SKU',
            dataIndex: 'SKU',
            width: 100,
            key: 'SKU',
            render: (value, row) => {
                const obj = {
                    children: (
                        <div>
                            <p>{row.sku}</p>
                            <p>{row.productDesc}</p>
                        </div>
                    ),
                    props: {},
                };
                if (row.rowSpan) {
                    obj.props.rowSpan = row.rowSpan;
                } else {
                    obj.props.rowSpan = 0;
                }
                return obj;
            },
        },
        {
            title: '核查任务编号',
            dataIndex: 'checkTaskNumber',
            width: 100,
            key: 'checkTaskNumber',
            render: (value, row) => {
                const obj = {
                    children: value,
                    props: {},
                };
                if (row.rowSpan) {
                    obj.props.rowSpan = row.rowSpan;
                } else {
                    obj.props.rowSpan = 0;
                }
                return obj;
            },
        },
        {
            title: '核价员',
            dataIndex: 'priceAuditor',
            width: 100,
            key: 'priceAuditor',
            render: (value, row) => {
                const obj = {
                    children: value,
                    props: {},
                };
                if (row.rowSpan) {
                    obj.props.rowSpan = row.rowSpan;
                } else {
                    obj.props.rowSpan = 0;
                }
                return obj;
            },
        },
        {
            title: '核查时间',
            dataIndex: 'checkTime',
            width: 100,
            key: 'checkTime',
            render: (value, row) => {
                const obj = {
                    children: timestampFromat(Number.parseInt(value, 10), 2),
                    props: {},
                };
                if (row.rowSpan) {
                    obj.props.rowSpan = row.rowSpan;
                } else {
                    obj.props.rowSpan = 0;
                }
                return obj;
            },
        },
        {
            title: '核查类型',
            dataIndex: 'pricingType',
            width: 100,
            key: 'pricingType',
            render: (value, row) => {
                const obj = {
                    children: value,
                    props: {},
                };
                if (row.rowSpan) {
                    obj.props.rowSpan = row.rowSpan;
                } else {
                    obj.props.rowSpan = 0;
                }
                return obj;
            },
        },
        {
            title: '供应商',
            dataIndex: 'name',
            width: 100,
            key: 'name',
        },
        {
            title: '核查价格',
            dataIndex: 'checkPrice',
            width: 100,
            key: 'checkPrice',
        },
        {
            title: '核查数量',
            dataIndex: 'checkCount',
            width: 100,
            key: 'checkCount',
        },
        {
            title: '起订量',
            dataIndex: 'minCount',
            width: 100,
            key: 'minCount',
        },
        {
            title: '包装规格',
            dataIndex: 'packageSpecification',
            width: 100,
            key: 'packageSpecification',
        },
        {
            title: '产品链接',
            dataIndex: 'tennisRacketLink',
            width: 50,
            key: 'tennisRacketLink',
            render: (text) => {
                return (
                    <a
                       href={text}
                       className='english-or-number-line-feed'
                       target={'_blank'}
                    >
                        {text}
                    </a>
                )
            },
        },
        // {
        //     title: '运费',
        //     dataIndex: 'freight',
        //     width: 100,
        //     key: 'freight',
        // },
        {
            title: '是否包邮',
            dataIndex: 'isPinkage',
            width: 100,
            key: 'isPinkage',
            render: text => (text ? '是' : '否'),
        },
        {
            title: '货期',
            dataIndex: 'delivery',
            width: 100,
            key: 'delivery',
        },
        {
            title: '付款方式',
            dataIndex: 'payType',
            width: 100,
            key: 'payType',
        },
        {
            title: '联系人',
            dataIndex: 'contact',
            width: 100,
            key: 'contact',
        },
        {
            title: '手机',
            dataIndex: 'telNumber',
            width: 40,
            key: 'telNumber',
            render: (text) => {
                return (
                    <div className='english-or-number-line-feed'>{text}</div>
                )
            },
        },
        {
            title: 'QQ',
            dataIndex: 'qq',
            width: 40,
            key: 'qq',
            render: (text) => {
                return (
                    <div className='english-or-number-line-feed'>{text}</div>
                )
            },
        },
        {
            title: '旺旺',
            dataIndex: 'aliWangWang',
            width: 40,
            key: 'aliWangWang',
            render: (text) => {
                return (
                    <div className='english-or-number-line-feed'>{text}</div>
                )
            },
        },
        {
            title: '核查备注',
            dataIndex: 'checkRemark',
            width: 80,
            key: 'checkRemark',
            render: (value) => (<Tooltip  title={value}>
                <div className="pms-prmanage-remark">{value}</div>
            </Tooltip>),
        },
    ];

    selectAllOrNo = () => {
        let indeterminate;
        let checkAll;
        let keys;
        const { historyPricingList } = this.props;
        const {
            origin,
        } = historyPricingList;
        const { selectedRowKeys } = this.state;
        if (selectedRowKeys.length === origin.length) {
            indeterminate = false;
            checkAll = false;
            keys = [];
        } else {
            indeterminate = false;
            checkAll = true;
            keys = origin.map(v => v.key);
        }
        this.setState({
            checkAll,
            indeterminate,
            selectedRowKeys: keys,
        });
    }

    onChange = (key) => {
        let indeterminate;
        let checkAll;
        const { historyPricingList } = this.props;
        const {
            origin,
        } = historyPricingList;
        const { selectedRowKeys } = this.state;
        const index = selectedRowKeys.indexOf(key);
        if (index !== -1) {
            selectedRowKeys.splice(index, 1);
        } else {
            selectedRowKeys.push(key);
        }
        if (origin.length === selectedRowKeys.length) {
            indeterminate = false;
            checkAll = true;
        } else if (selectedRowKeys.length > 0 && selectedRowKeys.length < origin.length) {
            indeterminate = true;
            checkAll = false;
        } else {
            indeterminate = false;
            checkAll = false;
        }
        this.setState({ selectedRowKeys, indeterminate, checkAll });
    }

    Paginatihandle = (page, pageSize) => {
        const { historyPricingList, getHistoryPricingListAsync } = this.props;
        const params = historyPricingList.params;
        if (page && pageSize) {
            params.pageNumber = page;
            params.pageData = pageSize;
        }
        getHistoryPricingListAsync(params);
    }

    // 清除 selectedRowKeys
    clearSelected = () => {
        this.setState({ selectedRowKeys: [] });
    }

    render() {
        const { historyPricingList } = this.props;
        const {
            total,
            list,
            params,
            loading,
        } = historyPricingList;
        const { pageNumber, pageData } = params;
        /*
        const btn = (
            <Functions
                {...this.props}
                functionkey="010-000003-000002-009"
            >
                <div className="abnormal-order-table-btn text-right padding-sm-right padding-sm-top">
                    <Button>导出</Button>
                </div>
            </Functions>
        );*/

        const table = (
            <Spin spinning={loading} delay={500} tip="Loading...">
                <div className="padding-sm">
                    <Table
                        bordered
                        size="small"
                        dataSource={list}
                        pagination={false}
                        columns={this.columns()}
                    />
                    <Pagination
                        showTotal={t => `共 ${t} 条`}
                        pageSizeOptions={levelOptions('分页显示条数')}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={this.Paginatihandle}
                        total={total}
                        pageSize={pageData}
                        onChange={this.Paginatihandle}
                    />
                </div>
            </Spin>
        );
        return (
            <div className="abnormal-order-tablewrap">
                {table}
            </div>
        );
    }
}
