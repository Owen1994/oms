import React, { Component } from 'react';
import {
    Button,
    Col,
    Row,
    Table,
    message,
} from 'antd';
import { fetchPost, downlodFile } from '../../../../util/fetch';
import {
    ORDER_UPDATE_PRINT_STATE,
    ORDER_GET_PRINT_RUL_STATE,
    Check_Users_Purchase_Orders_Api,
} from '../constants/Api';

/**
 * 采购单基本信息
 */
class OrderView extends Component {
    columns = [
        {
            title: '项次',
            dataIndex: 'key',
            width: 50,
            render: (value, row, index) => {
                const isLastCell = this.props.skuList.length - 1 === index;
                return (
                    isLastCell ? (<div>{value}</div>) : (<div>{index + 1}</div>)
                );
            },
        },
        {
            title: '图片',
            dataIndex: 'skuImage',
            width: 70,
            render: (value, row, index) => {
                const isLastCell = this.props.skuList.length - 1 === index;
                return (
                    isLastCell ? '' : (
                        <img
                            src={this.props.skuList.length > 0 ? this.props.skuList[index].skuImage : ''}
                            alt="sku图片"
                            style={{maxWidth: '90px'}}
                        />
                    )
                );
            },
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            width: 70,
            render: (value, row, index) => {
                const isLastCell = this.props.skuList.length - 1 === index;
                return (
                    isLastCell ? <div>{value}</div> : (
                        <div>
                            <img
                                src={this.props.skuList.length > 0 ? this.props.skuList[index].skuBarCode : ''}
                                alt="sku条形码"
                                style={{maxWidth: '200px'}}
                            />
                        </div>
                    )
                );
            },
        },
        {
            title: '采购名称',
            dataIndex: 'skuName',
            width: 90,
        },
        {
            title: '数量',
            dataIndex: 'skuNumber',
            width: 50,
        },
        {
            title: '单位',
            dataIndex: 'unit',
            width: 60,
        },
        {
            title: '单价',
            dataIndex: 'skuPrice',
            width: 70,
        },
        {
            title: '金额',
            dataIndex: 'totalMoney',
            width: 70,
        },
        {
            title: '备注',
            dataIndex: 'note',
            width: 110,
            render: (value, row, index) => {
                const isLastCell = this.props.skuList.length - 1 === index;
                const obj = {
                    children: isLastCell ? '' : this.props.info.note,
                    props: {},
                };
                if (isLastCell) {
                    obj.props.rowSpan = 1;
                } else if (index === 0) {
                    obj.props.rowSpan = this.props.skuList.length === 0 ? 0 : this.props.skuList.length - 1;
                } else {
                    obj.props.rowSpan = 0;
                }
                return obj;
            },
        },
    ];

    /**
     * 校验否是该采购单的订货员或跟单员
     */
    checkOperation = () => {
        const info = this.props.info;
        const purchaseNumber = info.POnumber + '';
        const params = {
            data: {
                purchaseNumbers: [purchaseNumber],
            },
        };
        fetchPost(Check_Users_Purchase_Orders_Api, params, 2)
            .then(result => {
                if (result.state === '000001') {
                    if (result.data.isOpEmployeeOrMerchandiser === true) {
                        this.printing();
                    } else {
                        message.error(result.msg);
                    }
                }
            });
    };

    /**
     * 调起打印窗口
     * */
    printing = () => {
        const info = this.props.info;
        if (info.paymentTypeCode === 3) {
            if (!info.alOrderNumber) {
                message.info(`采购单：${info.POnumber}，网拍订单号为空，订单打印失败！请录入阿里订单号后再打印订单！`);
                return;
            }
            if (info.alOrderNumber.length === 0) {
                message.info(`采购单：${info.POnumber}，网拍订单号为空，订单打印失败！请录入阿里订单号后再打印订单！`);
                return;
            }
        }

        this.updatePrintState();
        const newcontainer = document.querySelector('.print_purchase_order_div');
        document.body.innerHTML = newcontainer.innerHTML;
        window.print();
    };

    /**
     * 调起下载
     * */
    downloadPOPrint = () => {
        const parameter = { data: { purchaseNumber: [this.props.info.POnumber] } };
        fetchPost(ORDER_GET_PRINT_RUL_STATE, parameter, 2)
            .then((result) => {
                if (result.state === '000001') {
                    message.info('请求已发出，请等待下载！');
                    downlodFile(result.data.url);
                }
            });
    };

    /**
     * 更新采购订单打印信息
     * */
    updatePrintState = () => {
        const parameter = { data: { purchaseNumber: [this.props.info.POnumber] } };
        fetchPost(ORDER_UPDATE_PRINT_STATE, parameter, 2)
            .then((result) => {
                if (result.state === '000001') {
                    this.message();
                }
            });
    };

    message = () => {};

    render() {
        const {
            info,
            skuList,
            isShowButton,
        } = this.props;

        const functionButton = (
            <div className="print_button">
                <Button
                    className="margin-sm-bottom margin-sm-right"
                    onClick={this.downloadPOPrint}
                >
                    下载
                </Button>
                <Button
                    className="margin-sm-bottom"
                    onClick={this.checkOperation}
                >
                    打印
                </Button>
            </div>
        );

        return (
            <div className={isShowButton ? "print_div" : "print_div_hidden_button"}>
                {
                    isShowButton ? functionButton : null
                }
                <div className="print_purchase_order_div">
                    <Row type="flex" justify="center">
                        <Col span={24}>

                            <div>
                                <img className="print_purchase_order_div_head_PObarCode" src={info.PObarCode} alt="采购单条形码" style={{width: '180px'}} />
                                <h2 className="print_purchase_order_div_head_title">
                                    有棵树电子商务有限公司
                                </h2>
                                <div className="print_purchase_order_div_head_title1">
                                    {`订购单(${info.isTaxRebate})`}
                                </div>
                            </div>

                            <Row
                                type="flex"
                                align="top"
                                className="print_purchase_order_div_head_info"
                            >
                                <Col span={11}>
                                    <div className="print_purchase_order_head_info_cell">
                                        <div className="cell_div_height">采购订单号:</div>
                                        <div className="cell_div_neiron">{info.POnumber}</div>
                                    </div>
                                </Col>
                                <Col span={11} offset={2}>
                                    <div className="print_purchase_order_head_info_cell">
                                        <div className="cell_div_height">订购日期:</div>
                                        <div className="cell_div_neiron">{info.orderTime}</div>
                                    </div>
                                </Col>

                                <Col span={11}>
                                    <div className="print_purchase_order_head_info_cell">
                                        <div className="cell_div_height">供应商:</div>
                                        <div className="cell_div_neiron">{info.supplier}</div>
                                    </div>
                                </Col>
                                <Col span={11} offset={2}>
                                    <div className="print_purchase_order_head_info_cell">
                                        <div className="cell_div_height">联系人:</div>
                                        <div className="cell_div_neiron">{info.supplierLinkman}</div>
                                    </div>
                                </Col>

                                <Col span={11}>
                                    <div className="print_purchase_order_head_info_cell">
                                        <div className="cell_div_height">运费:</div>
                                        <div className="cell_div_neiron">{info.freight}</div>
                                    </div>
                                </Col>
                                <Col span={11} offset={2}>
                                    <div className="print_purchase_order_head_info_cell">
                                        <div className="cell_div_height">电话:</div>
                                        <div className="cell_div_neiron">{info.supplierPhone}</div>
                                    </div>
                                </Col>

                                <Col span={11}>
                                    <div className="print_purchase_order_head_info_cell">
                                        <div className="cell_div_height">付款方式:</div>
                                        <div className="cell_div_neiron">{info.paymentType}</div>
                                    </div>
                                </Col>
                                <Col span={11} offset={2}>
                                    <div className="print_purchase_order_head_info_cell">
                                        <div className="cell_div_height">手机:</div>
                                        <div className="cell_div_neiron">{info.supplierMobilePhone}</div>
                                    </div>
                                </Col>

                                <Col span={11}>
                                    <div className="print_purchase_order_head_info_cell">
                                        <div className="cell_div_height">币种:</div>
                                        <div className="cell_div_neiron">{info.currency}</div>
                                    </div>
                                </Col>
                                <Col span={11} offset={2}>
                                    <div className="print_purchase_order_head_info_cell">
                                        <div className="cell_div_height">Fax:</div>
                                        <div className="cell_div_neiron">{info.supplierFAX}</div>
                                    </div>
                                </Col>

                                <Col span={11}>
                                    <div className="print_purchase_order_head_info_cell">
                                        <div className="cell_div_height">仓库:</div>
                                        <div className="cell_div_neiron">{info.warehouseName}</div>
                                    </div>
                                </Col>
                            </Row>

                            <Table
                                className='print_table_color'
                                columns={this.columns}
                                dataSource={skuList}
                                pagination={false}
                                size="small"
                                rowKey={record => record.keyNumber}
                                bordered
                            />

                            <div className="print_purchase_order_foot_info_sku">
                                <p>
                                    1、本订购单为《采购框架合同》不可分割的组成部分，效力受框架合同约束，订购单未约定事宜，适用《采购框架合同》的约定，二者约定不一致的，以《采购框架合同》约定的为准。
                                </p>
                                <p>
                                    2、本订购单一式两份，双方各执一份，自双方签字盖章之日起生效，双方签字盖章的合同传真件、扫描件与原件相等效力相同。
                                </p>
                            </div>

                            <Row className="print_purchase_order_div_head_info">
                                <Col span={24}>
                                    <div className="print_purchase_order_head_info_cell">
                                        <div className="cell_div_height">户名:</div>
                                        <div className="cell_div_neiron">{info.supplierAccountName}</div>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className="print_purchase_order_head_info_cell">
                                        <div className="cell_div_height">开户银行:</div>
                                        <div className="cell_div_neiron">{info.supplierAccountBank}</div>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className="print_purchase_order_head_info_cell">
                                        <div className="cell_div_height">银行账号:</div>
                                        <div className="cell_div_neiron">{info.supplierAccountNumber}</div>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="print_purchase_order_div_head_info">
                                <Col span={24}>
                                    <div className="print_purchase_order_head_info_cell">
                                        <div className="cell_div_height">交货地址:</div>
                                        <div className="cell_div_neiron_long">{info.deliveryAddress}</div>
                                    </div>
                                </Col>
                                <Col span={10}>
                                    <div className="print_purchase_order_head_info_cell">
                                        <div className="cell_div_height">跟单员:</div>
                                        <div className="cell_div_neiron">{info.merchandiserName}</div>
                                    </div>
                                </Col>
                                <Col span={10} offset={4}>
                                    <div className="print_purchase_order_head_info_cell">
                                        <div className="cell_div_height">联系电话:</div>
                                        <div className="cell_div_neiron">{info.merchandiserPhone}</div>
                                    </div>
                                </Col>
                                <Col span={10}>
                                    <div className="print_purchase_order_head_info_cell">
                                        <div className="cell_div_height">采购中心总监:</div>
                                        <div className="cell_div_neiron">{info.directorName}</div>
                                    </div>
                                </Col>
                                <Col span={10} offset={4}>
                                    <div className="print_purchase_order_head_info_cell">
                                        <div className="cell_div_height">总监投诉电话:</div>
                                        <div className="cell_div_neiron">{info.directorPhone}</div>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="print_purchase_order_foot_info_time">
                                <Col span={12}> 供方：
                                </Col>
                                <Col span={12}> 需方：
                                </Col>
                                <Col span={12}> 日期：________年____月____日
                                </Col>
                                <Col span={12}> 日期：________年____月____日
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default OrderView;
