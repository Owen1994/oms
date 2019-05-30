import React from 'react';

import {
    Button,
    Table,
    Modal,
    Pagination,
} from 'antd';

import { levelOptions } from '../../../../../util/options';
import { timestampFromat, datasaddkey } from '../../../../../util/baseTool';


class logisticsCom extends React.Component {
    columns1 = [
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
                    children: timestampFromat(Number(value)),
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
            dataIndex: 'supplierName',
            width: 100,
            key: 'supplierName',
        },
        {
            title: '付款方式',
            dataIndex: 'payType',
            width: 100,
            key: 'payType',
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
            title: '货期',
            dataIndex: 'deliveryDay',
            width: 100,
            key: 'deliveryDay',
        },
        {
            title: '产品链接',
            dataIndex: 'link',
            width: 100,
            key: 'link',
            render: text => <a target=" _blank" href={text}>{text}</a>,
        },
        {
            title: '核查备注',
            dataIndex: 'checkRemark',
            width: 100,
            key: 'checkRemark',
        },
    ];

    state = {
        checkParams: {
            pageData: 20,
            pageNumber: 1,
            total: 0,
        },
        checkList: [],
    }

    componentWillReceiveProps(next) {
        if (next.visible) {
            const { checkParams } = this.state;
            this.getSkuHistoricalCheckData(checkParams.pageNumber, checkParams.pageData, next.data);
        }
    }

    formatData = (list = []) => {
        const arr = [];
        for (let k = 0; k < list.length; k++) {
            if (list[k].infoList && list[k].infoList.length) {
                for (let i = 0; i < list[k].infoList.length; i++) {
                    const data = {
                        checkTaskNumber: list[k].checkTaskNumber,
                        checkTime: list[k].checkTime,
                        priceAuditor: list[k].priceAuditor,
                        pricingType: list[k].pricingType,
                        createTime: list[k].createTime,
                        ...list[k].infoList[i],
                    };
                    if (i === 0) {
                        data.rowSpan = list[k].infoList.length;
                    }
                    arr.push(data);
                }
            } else {
                arr.push({
                    checkTaskNumber: list[k].checkTaskNumber,
                    checkTime: list[k].checkTime,
                    priceAuditor: list[k].priceAuditor,
                    pricingType: list[k].pricingType,
                    createTime: list[k].createTime,
                });
            }
        }
        return arr;
    }

    getSkuHistoricalCheckData = (page, pageSize, sku) => {
        const { skuHistoricalCheckAsync, data } = this.props;
        const { checkParams } = this.state;
        const params = {};
        params.sku = sku || data;
        params.pageData = pageSize || checkParams.pageData;
        params.pageNumber = page || checkParams.pageNumber;
        skuHistoricalCheckAsync(params)
            .then((result) => {
                if (result) {
                    const newcheckParams = {};
                    newcheckParams.total = result.total;
                    newcheckParams.pageData = params.pageData;
                    newcheckParams.pageNumber = params.pageNumber;
                    this.setState({
                        checkParams: newcheckParams,
                        checkList: datasaddkey(this.formatData(result.list)),
                    });
                }
            });
    }

    modalCancel = () => {
        this.props.onCancel();
        this.setState({
            checkParams: {
                pageData: 20,
                pageNumber: 1,
                total: 0,
            },
            checkList: [],
        });
    }

    render() {
        const { visible } = this.props;
        const {
            checkParams,
            checkList,
        } = this.state;
        const content = (
            <div className="checkpricemanage-task tweb-tab padding-sm text-center">
                <Table
                    bordered
                    size="small"
                    dataSource={checkList}
                    pagination={false}
                    columns={this.columns1}
                />
                <Pagination
                    showTotal={t => `共 ${t} 条`}
                    pageSizeOptions={levelOptions('分页显示条数')}
                    showSizeChanger
                    showQuickJumper={{ goButton: true }}
                    current={checkParams.pageNumber}
                    defaultCurrent={1}
                    onShowSizeChange={this.getSkuHistoricalCheckData}
                    total={checkParams.total}
                    pageSize={checkParams.pageData}
                    onChange={this.getSkuHistoricalCheckData}
                />
            </div>
        );

        const footer = (
            <div>
                <Button onClick={this.modalCancel}>关闭</Button>
            </div>
        );

        return (
            <Modal
                title="SKU核查历史"
                width={1000}
                destroyOnClose
                // centered
                visible={visible}
                footer={footer}
                maskClosable={false}
                onCancel={this.modalCancel}
                className="audited-task-detail-sku-info"
            >
                {content}
            </Modal>
        );
    }
}

export default logisticsCom;
