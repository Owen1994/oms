import React, { Component } from 'react';
import {
    Button, Spin, Table, message,
} from 'antd';
import { fetchPost } from '../../../../util/fetch';
import {
    COVER_SHEET, PRINT_RETURN_LABEL, SIGN_ABNORMAL_SKU, SIGN_SHORTAGE,
} from '../constants/Api';
import { printWpUrl } from '../../../common/util';
import Functions from '../../../../components/functions';
import PrintReturnLabelModal from '../../../common/components/modal/PrintReturnLabelModal';
import { CHECKPACKAGE_10_SINGLE } from '../constants';

const renderContent = (text, record) => {
    const obj = {
        children: text,
        props: {},
    };
    obj.props.rowSpan = record.rowSpanSize ? record.rowSpanSize : 0;
    return obj;
};

class TableList extends Component {
    state = {
        showReturnLabel: false,
        printData: {},
    };

    columns = [
        {
            title: '订单号',
            dataIndex: 'orderNumber',
            render: renderContent,
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
        },
        {
            title: '产品数量',
            dataIndex: 'quantity',
        },
        {
            title: '待核对数量',
            dataIndex: 'checkNumber',
        },
        {
            title: '已核对数量',
            dataIndex: 'checkedQuantity',
        },
    ];

    /**
     *标记不良
     */
    signAbnormalSku = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { sku } = values;
                const { partList } = this.props;
                const skuInfo = this.getCheckSkuInfo(partList, sku);
                const params = {
                    data: {
                        ...values,
                        scanSkuUnique: sku,
                        orderNumber: partList.orderInfo.orderNumber,
                        skuInfo,
                    },
                };
                fetchPost(SIGN_ABNORMAL_SKU, params, 1)
                    .then((result) => {
                        if (result.state === '000001') {
                            this.showReturnLabelPrint();
                            this.props.setScanSearchFocus(result.data.taskOver);
                        }
                    });
            }
        });
    };

    /**
     *打包缺货
     */
    signShortage = () => {
        this.props.form.validateFields(['containerCode'], (err, values) => {
            if (!err) {
                const { sku } = values;
                const { partList } = this.props;
                const skuInfo = this.getCheckSkuInfo(partList, sku);
                const params = {
                    data: {
                        ...values,
                        scanSkuUnique: sku,
                        orderNumber: partList.orderInfo.orderNumber,
                        skuInfo,
                    },
                };
                fetchPost(SIGN_SHORTAGE, params, 1)
                    .then((result) => {
                        if (result.state === '000001') {
                            this.showReturnLabelPrint();
                            this.props.setScanSearchFocus(result.data.taskOver);
                        }
                    });
            }
        });
    };

    // 获取已核对完和当前核对的sku信息
    getCheckSkuInfo = (partList, sku) => {
        const skuInfo = [];
        partList.orderInfo.skuList.forEach((item) => {
            const tempSkuList = item.skuName.split(',');
            if (tempSkuList.indexOf(sku) !== -1 || item.checkedQuantity > 0) { // 判断当前扫描的sku.
                let skuUnique = '';
                item.scanSkuList.forEach((t) => {
                    skuUnique += `${t},`;
                });
                skuInfo.push({
                    scanSkuQuantity: item.checkedQuantity,
                    sku: item.sku,
                    skuUnique,
                });
            }
        });
        return skuInfo;
    };

    // 打印回库标签
    showReturnLabelPrint = () => {
        const { orderInfo, seedWallType } = this.props.partList;
        if (seedWallType === CHECKPACKAGE_10_SINGLE) { // 单品单件不需要回库
            return;
        }
        const params = {
            data: {
                orderNumber: orderInfo.orderNumber,
            },
        };
        fetchPost(PRINT_RETURN_LABEL, params, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.setState({
                        showReturnLabel: true,
                        printData: result.data,
                    });
                }
            });
    };

    /**
     * 补打面单
     */
    coverSheet = () => {
        const { partList } = this.props;
        if (!partList.orderInfo.label) {
            message.error('没有打印信息,请扫描容器或者SKU');
            return;
        }
        const { orderNumber } = partList.orderInfo.label;

        const params = {
            data: {
                orderNumber,
            },
        };
        fetchPost(COVER_SHEET, params, 1)
            .then((result) => {
                if (result.state === '000001') {
                    const {
                        labelType, labelUrl, height, width, direction,
                    } = result.data.label;
                    printWpUrl(width, height, labelType, labelUrl, direction === '1');
                }
            });
    };

    render() {
        const {
            partList,
            loadingState,
        } = this.props;
        return (
            <div className="padding-sm breadcrumb margin-ss-top search_content">
                <div className="text-right margin-sm-bottom margin-ts-top">
                    <Functions
                        {...this.props}
                        functionkey="012-000006-000003-004"
                    >
                        <Button className="margin-ss-left" onClick={this.signAbnormalSku}> 标记不良</Button>
                    </Functions>
                    <Functions
                        {...this.props}
                        functionkey="012-000006-000003-005"
                    >
                        <Button className="margin-ss-left" onClick={this.signShortage}> 打包缺货</Button>
                    </Functions>
                    <Functions
                        {...this.props}
                        functionkey="012-000006-000003-002"
                    >
                        <Button className="margin-ss-left" onClick={this.coverSheet}> 补打面单</Button>
                    </Functions>
                </div>
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        dataSource={partList.orderInfo.skuList}
                        pagination={false}
                    />
                </Spin>
                <PrintReturnLabelModal
                    visible={this.state.showReturnLabel}
                    cancel={() => {
                        this.setState({
                            showReturnLabel: false,
                        });
                    }}
                    printData={this.state.printData}
                />
            </div>
        );
    }
}

export default TableList;
