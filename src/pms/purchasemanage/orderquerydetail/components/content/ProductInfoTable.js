import React, { Component } from 'react';
import {
    InputNumber, Table, message,DatePicker,
} from 'antd';
import {
    Update_SKU_Name_Api
} from '../../constants/Api';
import { fetchPost } from '../../../../../util/fetch';
import Functions from '../../../../../components/functions';
import moment from 'moment';
import {timestampFromat,getTimeStamp} from '../../../../../util/moment';
const imgVerticalLine = require('../../img/VerticalLine.png');
const dateFormat = 'YYYY-MM-DD';

/**
 * 采购产品信息
 */
class ProductInfoTable extends Component {
    componentWillReceiveProps(nextProps, nextContext) {
        const preOrderList = this.props.productInfoArray;
        const orderList = nextProps.productInfoArray;
        if (preOrderList !== orderList) {
            const list = orderList ? orderList : [];
            const arrayKeys = [];
            for (let i = 0; i < orderList.length; i++) {
                arrayKeys.push(orderList[i].key);
            }
            this.props.getProductSelect({
                selectedRows: list,
                selectedRowKeys: arrayKeys,
            });
        }
    }

    /**
     * 列表头标签
     * @type {*[]}
     */
    tableColumns = [
        {
            title: '序号',
            dataIndex: 'index',
            render: (text, record, index) => (<div>{index + 1}</div>),
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
        },
        {
            title: '采购名称',
            dataIndex: 'productName',
            render: (text, record) => {
                if (record.isShowUpdate) {
                    return (
                        <div>
                            <div>{text}</div>
                            <Functions
                                {...this.props}
                                functionkey="010-000003-000005-000001-009"
                            >
                                <a
                                    onClick={() => this.loadData(record.key)}
                                >
                                    更新
                                </a>
                            </Functions>
                        </div>
                    );
                }
                return <div>{text}</div>;
            },
        },
        {
            title: '采购数量',
            dataIndex: 'purchaseCount',
            render: (text, record, index) => {
                if (this.props.isCanEdit) {
                    return (
                        this.props.form.getFieldDecorator(`purchaseCount[${index}]`, {
                            initialValue: text,
                        })(<InputNumber min={1} />)
                    );
                }
                return <div>{text}</div>;
            },
            width: 100,
        },
        {
            title: '单位',
            dataIndex: 'unit',
            width: 50,
        },
        {
            title: '不含税单价',
            dataIndex: 'unitPrice',
            render: (text, record, index) => {
                if (this.props.isCanEdit) {
                    return (
                        this.props.form.getFieldDecorator(`unitPrice[${index}]`, {
                            initialValue: text,
                        })(<InputNumber min={0} />)
                    );
                }
                return <div>{text}</div>;
            },
            width: 100,
        },
        {
            title: '增值税率',
            dataIndex: 'taxRate',
        },
        {
            title: '税额',
            dataIndex: 'taxAmount',
            width: 50,
        },
        {
            title: '采购未税金额',
            dataIndex: 'amount',
        },
        {
            title: '采购金额',
            dataIndex: 'purchaseAmount',
        },
        {
            title: '收货量',
            dataIndex: 'yield',
        },
        {
            title: '质检',
            dataIndex: 'qualityTest',
            width: 50,
        },
        {
            title: '入库量',
            dataIndex: 'receiveCount',
        },
        {
            title: '不合格量',
            dataIndex: 'unqualifiedCount',
        },
        {
            title: '出库量',
            dataIndex: 'outTreasuryCount',
        },
        {
            title: '可用量',
            dataIndex: 'availableCount',
        },
        {
            title: '状态',
            dataIndex: 'state',
        },
        {
            title: '到货/取货日期',
            dataIndex: 'arrivalTime',
            render: (text, record, index) => {
                if (this.props.isCanEdit) {
                    return (
                        this.props.form.getFieldDecorator(`arrivalTime[${index}]`, {
                            initialValue: moment(text, dateFormat),
                        })(<DatePicker 
                            style={{ width: 160 }} 
                            format={dateFormat}/>
                            )
                    );
                }
                return <div>{text}</div>;
            },
        },
        {
            title: '网拍链接',
            dataIndex: 'racketLink',
            render: text => (
                <a onClick={() => this.copy(text)}>复制链接</a>
            ),
            width: 80,
        },
    ];

    copy = (text) => {
        const oInput = document.createElement('input');
        oInput.value = text;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand('Copy'); // 执行浏览器复制命令
        oInput.style.display = 'none';
        document.body.removeChild(oInput);
        message.success('复制成功');
    };

    loadData = (params) => {
        const data = {
            data: {
                key: params,
            }
        };
        fetchPost(Update_SKU_Name_Api, data, 1)
            .then(() => {
                if (result.state === '000001') {
                    const parameter = { data: { purchaseNumber: getUrlParams('').orderNumber } };
                    this.props.getOrderDetailAccess(parameter);
                }
            });

    };

    render() {
        const { productInfoArray } = this.props;

        /**
         * table选中回调
         */
        const rowSelection = {
            selectedRowKeys: this.props.selectData.selectedRowKeys,
            selectedRows: this.props.selectData.selectedRows,
            onChange: (selectedRowKeys, selectedRows) => {
                this.props.getProductSelect({
                    selectedRowKeys,
                    selectedRows,
                });
            },
        };

        return (
            <div className="margin-ss-bottom white padding-sm">
                <img
                    className="group-img"
                    src={imgVerticalLine}
                    alt=""
                    width="3px"
                    height="12px"
                />
                <span className="group-label">采购产品信息</span>
                <div className="padding-sm-top">
                    <Table
                        rowKey={t => t.key}
                        dataSource={productInfoArray}
                        rowSelection={rowSelection}
                        pagination={false}
                        bordered
                        size="small"
                        columns={this.tableColumns}
                    />
                </div>
            </div>
        );
    }
}

export default ProductInfoTable;
