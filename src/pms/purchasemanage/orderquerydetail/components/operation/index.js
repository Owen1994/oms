import React, { Component } from 'react';
import { Button, message } from 'antd';
import { Link } from 'react-router-dom';

import PopConfirm from '../../../../../common/components/confirm';
import {
    PURCHASE_ORDER_CANCEL,
    PURCHASE_ORDER_DETAILS_APPROVALDISMISSAL,
    PURCHASE_ORDER_DETAILS_APPROVALPASS,
    PURCHASE_ORDER_DETAILS_TRANSFER_APPROVAL,
    PURCHASE_ORDERDETAILS_SUBMIT,
    Check_Users_Purchase_Orders_Api,
} from '../../constants/Api';
import { fetchPost } from '../../../../../util/fetch';
import TransferAuditModal from './TransferAuditModal';
import ApprovalDismissalModal from './ApprovalDismissalModal';
import ApprovalPassModal from './ApprovalPassModal';
import { getLoginmsg,closeCurrentPage } from '../../../../../util/baseTool';
import Functions from '../../../../../components/functions';
import { setPageCache } from '../../../../../util/PageCache';
import moment from 'moment';
import {getTimeStamp} from '../../../../../util/moment';
/**
 * 底部操作按钮
 */
export default class FloatButton extends Component {
    state = {
        showTransferAuditModal: false,
        showApprovalDismissalModal: false,
        showApprovalPassModal: false,
        buttonLoading: false,
        isHaveJurisdiction: false,
    };

    /**
     * 返回到上一页
     */
    // back = () => {
    //     this.props.history.goBack();
    // };

    /**
     * 校验否是该采购单的订货员或跟单员
     */
    checkOperation = (type, isSubmit = 1) => {
        this.setState({
            buttonLoading: true,
        });
        const purchaseNumber = this.props.access.basicInfo.purchaseNumber + '';
        const params = {
            data: {
                purchaseNumbers: [purchaseNumber],
            },
        };
        fetchPost(Check_Users_Purchase_Orders_Api, params, 2)
            .then(result => {
                if (result.state === '000001') {
                    this.setState({
                        buttonLoading: false,
                    });
                    if (result.data.isOpEmployeeOrMerchandiser === true) {
                        if (type === 1) {
                            // 取消订单
                            this.cancelOrder();
                        } else {
                            // 保存订单
                            this.saveOrSubmitOrder(isSubmit);
                        }
                    } else {
                        message.error(result.msg);
                        this.setState({
                            buttonLoading: false,
                            isHaveJurisdiction: true,
                        });
                    }
                } else {
                    this.setState({
                        buttonLoading: false,
                    });
                }
            });
    };


    /**
     * 取消订单
     */
    cancelOrder = () => {
        const purchaseNumber = this.props.access.basicInfo.purchaseNumber;
        const keys = this.props.selectData.selectedRowKeys;
        const params = {
            data: {
                purchaseNumber,
                keys,
            },
        };
        fetchPost(PURCHASE_ORDER_CANCEL, params, 1)
            .then(() => {
            this.setState({
                buttonLoading: false,
            });
        });
    };

    /**
     * 保存订单
     */
    saveOrSubmitOrder = (isSubmit = 1) => {
        let params;
        let purchaseNumberPrintable,logisticskey;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // 可打印和已经打印要的参数
            if (this.props.access.basicInfo) {
                if (this.props.access.basicInfo.purchaseState.code === 4 || this.props.access.basicInfo.purchaseState.code === 5) {
                    purchaseNumberPrintable = this.props.access.basicInfo.purchaseNumber;
                    logisticskey = this.props.access.basicInfo.logistics.key;
                    params = {
                        data: {
                            basicInfo: {
                                ...values,
                                purchaseNumber:purchaseNumberPrintable,
                                logistics:logisticskey
                            },
                            isSubmit, // 是否提交 (1.只保存,2.保存并提交)
                        },
                    };
                    delete params.data.basicInfo.purchaseCount;
                }else {

                    // 待采购打印的参数
                    for (let i = 0; i < values.purchaseCount.length; i++) {
                        const dicInfo = this.props.access.productInfoArray[i];

                        const sSku = dicInfo.sku;
                        const originalPONumber = dicInfo.originalPONumber;

                        if (values.purchaseCount[i] > originalPONumber * 1.2) {
                            message.error(`SKU:${sSku} 数量不能超过原有采购数量的120%`);
                            return;
                        }
                    }

                    let productInfoArray=[];

                    for (let i = 0; i < values.arrivalTime.length; i++) {

                        const unitPrice = Number.parseFloat(values.unitPrice[i]);
                        const arrivalTime = moment(values.arrivalTime[i]).format('YYYY-MM-DD');
                        const purchaseCount = Number.parseInt(values.purchaseCount[i]);
                        this.setState({
                            buttonLoading: false,
                        });
                        if (!purchaseCount) {
                            message.warning("请填写采购数量");
                            return false;
                        }

                        if (!unitPrice) {
                            message.warning("请填写不含税单价");
                            return false;
                        }

                        if (!getTimeStamp(values.arrivalTime[i])) {
                            message.warning("请选择到货/取货日期");
                            return false;
                        }


                        let productInfoArrayList = {};
                        const { sku } = this.props.access.productInfoArray[i];
                        productInfoArrayList.sku = sku;
                        productInfoArrayList.unitPrice = unitPrice;
                        productInfoArrayList.arrivalTime = arrivalTime;
                        productInfoArrayList.purchaseCount = purchaseCount;

                        productInfoArray.push(productInfoArrayList);
                    }

                    // 采购单基本信息
                    const {
                        purchaseNumber, purchaseState, companyKey, companyLable, transshipWarehouse, logistics,
                    } = this.props.access.basicInfo;

                    let iCompany = '';
                    if (values.company === companyLable) {
                        iCompany = companyKey;
                    } else {
                        iCompany = values.company;
                    }

                    let iTransshipWarehouse = '';
                    if (values.transshipWarehouse === transshipWarehouse.label) {
                        iTransshipWarehouse = transshipWarehouse.key;
                    } else {
                        iTransshipWarehouse = values.transshipWarehouse;
                    }

                    let iLogistics = '';
                    if (values.logistics === logistics.label) {
                        iLogistics = logistics.key;
                    } else {
                        iLogistics = values.logistics;
                    }

                    params = {
                        data: {
                            basicInfo: {
                                ...values,
                                company: iCompany,
                                transshipWarehouse: iTransshipWarehouse,
                                logistics: iLogistics,
                                purchaseNumber,
                                purchaseState: purchaseState.code,
                            },
                            productInfoArray,
                            isSubmit, // 是否提交 (1.只保存,2.保存并提交)
                        },
                    };

                    delete params.data.basicInfo.arrivalTime;
                    delete params.data.basicInfo.unitPrice;
                    delete params.data.basicInfo.purchaseCount;

                }
            }

            fetchPost(PURCHASE_ORDERDETAILS_SUBMIT, params, 1)
                .then(() =>{
                    this.setState({
                        buttonLoading: false,
                    });
            });
        });
    };

    /**
     * 转移审核
     */
    transferApproval = () => {
        this.props.form.validateFields(['ApproverKey'], (err, values) => {
            if (!err) {
                const { ApproverKey } = values;
                const purchaseNumber = this.props.access.basicInfo.purchaseNumber;
                const params = {
                    data: {
                        ApproverKey,
                        purchaseNumber,
                    },
                };
                fetchPost(PURCHASE_ORDER_DETAILS_TRANSFER_APPROVAL, params, 1)
                    .then(() => {
                        this.setState({ showTransferAuditModal: false });
                    });
            }
        });
    };

    /**
     * 审核通过
     */
    approvalPass = () => {
        this.props.form.validateFields(['OpinionThrough'], (err, values) => {
            if (!err) {
                const { OpinionThrough } = values;
                const purchaseNumber = this.props.access.basicInfo.purchaseNumber;
                const params = {
                    data: {
                        Opinion: OpinionThrough,
                        purchaseNumber,
                    },
                };
                fetchPost(PURCHASE_ORDER_DETAILS_APPROVALPASS, params, 1)
                    .then(() => {
                        this.setState({ showApprovalPassModal: false });
                    });
            }
        });
    };

    /**
     * 审核驳回
     */
    approvalDismissal = () => {
        this.props.form.validateFields(['OpinionRejected'], (err, values) => {
            if (!err) {
                const { OpinionRejected } = values;
                const purchaseNumber = this.props.access.basicInfo.purchaseNumber;
                const params = {
                    data: {
                        Opinion: OpinionRejected,
                        purchaseNumber,
                    },
                };
                fetchPost(PURCHASE_ORDER_DETAILS_APPROVALDISMISSAL, params, 1)
                    .then(() => {
                        this.setState({ showApprovalDismissalModal: false });
                    });
            }
        });
    };

    // 关闭浏览器窗口
    closePop = () => {
        closeCurrentPage();
        // this.back();
    };

    /**
     * 前往打印页
     */
    handleGotoPrintView = () => {
        const dataURL = {
            purchaseNumber: [this.props.access.basicInfo.purchaseNumber],
        };
        setPageCache(dataURL, "kOrderQueryPrintArray");
    };

    render() {
        const { basicInfo } = this.props.access;
        const { buttonLoading, isHaveJurisdiction } = this.state;

        const state = basicInfo.purchaseState ? basicInfo.purchaseState.code : 0;
        const checkUrlPrint = `/pms/purchasemanage/orderquery/print/?orderNumber=${this.props.access.basicInfo.purchaseNumber}`;

        let isHavePermissions = false;
        if (basicInfo.currentPersonEn) {
            if (basicInfo.currentPersonEn === getLoginmsg().userName) {
                isHavePermissions = true;
            } else {
                isHavePermissions = false;
            }
        }

        return (
            <div className="table-footer-fixed">
                <Functions
                    {...this.props}
                    functionkey="010-000003-000005-000001-002"
                >
                    <Link
                        className="margin-sm-right"
                        to={checkUrlPrint}
                        target="_blank"
                    >
                        <Button onClick={this.handleGotoPrintView}>
                            打印订单
                        </Button>
                    </Link>
                </Functions>

                <Functions
                    {...this.props}
                    functionkey="010-000003-000005-000001-003"
                >
                    <Button
                        className="margin-sm-right"
                        disabled={(state !== 2 && state !== 4 && state !== 5) || isHaveJurisdiction}
                        onClick={() => PopConfirm('取消订单', '确定取消当前订单?', () => this.checkOperation(1))}
                        loading={buttonLoading}
                    >
                        取消订单
                    </Button>
                </Functions>

                <Functions
                    {...this.props}
                    functionkey="010-000003-000005-000001-004"
                >
                    <Button
                        className="margin-sm-right"
                        disabled={(state !== 2 && state !== 4 && state !== 5) || isHaveJurisdiction}
                        onClick={() => this.checkOperation(2, 1)}
                        loading={buttonLoading}
                    >
                        保存订单
                    </Button>
                </Functions>

                <Functions
                    {...this.props}
                    functionkey="010-000003-000005-000001-005"
                >
                    <Button
                        className="margin-sm-right"
                        disabled={state !== 2 || isHaveJurisdiction}
                        onClick={() => PopConfirm('提交订单', '确定提交当前订单?', () => this.checkOperation(2, 2))}
                        loading={buttonLoading}
                    >
                        保存并提交
                    </Button>
                </Functions>

                <Functions
                    {...this.props}
                    functionkey="010-000003-000005-000001-006"
                >
                    <Button
                        className="margin-sm-right"
                        disabled={state !== 3 || !isHavePermissions}
                        onClick={() => {
                            this.setState({
                                showTransferAuditModal: true,
                            });
                        }}
                    >
                        转移审核
                    </Button>
                </Functions>

                <TransferAuditModal
                    isRequired={state === 3}
                    {...this.props}
                    cancel={() => this.setState({ showTransferAuditModal: false })}
                    ok={this.transferApproval}
                    visible={this.state.showTransferAuditModal}
                />

                <Functions
                    {...this.props}
                    functionkey="010-000003-000005-000001-007"
                >
                    <Button
                        className="margin-sm-right"
                        disabled={state !== 3 || !isHavePermissions}
                        onClick={() => {
                            this.setState({
                                showApprovalPassModal: true,
                            });
                            // closeCurrentPage();
                        }}
                    >
                        审批通过
                    </Button>
                </Functions>

                <ApprovalPassModal
                    {...this.props}
                    purchaseNumber={basicInfo.purchaseNumber}
                    cancel={() => this.setState({ showApprovalPassModal: false })}
                    ok={this.approvalPass}
                    visible={this.state.showApprovalPassModal}
                />

                <Functions
                    {...this.props}
                    functionkey="010-000003-000005-000001-008"
                >
                    <Button
                        className="margin-sm-right"
                        disabled={state !== 3 || !isHavePermissions}
                        onClick={() => {
                            this.setState({
                                showApprovalDismissalModal: true,
                            });
                            // closeCurrentPage();
                        }}
                    >
                        审批驳回
                    </Button>
                </Functions>

                <ApprovalDismissalModal
                    isRequired={state === 3}
                    {...this.props}
                    cancel={() => this.setState({ showApprovalDismissalModal: false })}
                    ok={this.approvalDismissal}
                    visible={this.state.showApprovalDismissalModal}
                />

                <Button
                    onClick={this.closePop}
                >
                    关闭
                </Button>
            </div>
        );
    }
}

