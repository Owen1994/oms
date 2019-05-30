import React, { Component } from 'react';
import {
    Button,
    message,
    Spin,
} from 'antd';

import {
    ORDER_GET_PRINT_RUL_STATE,
    ORDER_UPDATE_PRINT_STATE,
    Check_Users_Purchase_Orders_Api,
} from '../constants/Api';

import { fetchPost, downlodFile } from '../../../../util/fetch';
import { getPageCache } from '../../../../util/PageCache';
import { randNum } from '@/util/baseTool';

import CartView from './CartView';
import OrderView from './OrderView';
import OrderModal from './OrderModal';
import { closeCurrentPage } from '../../../../util/baseTool';
import PopConfirm from '../../../../common/components/confirm';


class PrintView extends Component {

    state = {
        orderNumbers: [],
        orderModalVisible: false,
    };

    componentDidMount() {
        const a = getPageCache("kOrderQueryPrintArray");
        a.then((v) => {
            this.setState({
                orderNumbers: v.purchaseNumber,
            }, () => {
                const parameter = { data: { purchaseNumber: this.state.orderNumbers } };
                this.props.getOrderPrintAccess(parameter);
            });
        });


        if (window.matchMedia) {
            const mediaQueryList = window.matchMedia('print');
            mediaQueryList.addListener((mql) => {
                if (mql.matches) {
                    window.location.reload();
                }
            });
        }
    }

    /**
     * 返回到上一页
     */
    back = () => {
        closeCurrentPage();
    };

    /**
     * 校验否是该采购单的订货员或跟单员
     */
    checkOperation = () => {
        const purchaseNumber = this.state.orderNumbers;
        const params = {
            data: {
                purchaseNumbers: purchaseNumber,
            },
        };
        fetchPost(Check_Users_Purchase_Orders_Api, params, 2)
            .then(result => {
                if (result.state === '000001') {
                    if (result.data.isOpEmployeeOrMerchandiser === true) {
                        this.handleBatchPrint();
                    } else {
                        message.error(result.msg);
                    }
                }
            });
    };

    /**
     * 处理批量下载
     */
    handleBatchDownload = () => {
        if (this.state.orderNumbers.length > 1) {
            PopConfirm('批量下载', '确认批量下载文件到导入导出管理列表？', this.httpExport);
        } else {
            const parameter = { data: { purchaseNumber: this.state.orderNumbers } };
            fetchPost(ORDER_GET_PRINT_RUL_STATE, parameter, 2)
                .then((result) => {
                    if (result.state === '000001') {
                        message.info('请求已发出，请等待下载！');
                        downlodFile(result.data.url);
                    }
                });
        }
    };

    httpExport = () => {
        const parameter = { data: { purchaseNumber: this.state.orderNumbers } };
        fetchPost(ORDER_GET_PRINT_RUL_STATE, parameter, 2)
            .then((result) => {
                if (result.state === '000001') {
                    window.open('/pms/importexportmanage/importexportlist/', '_blank');
                }
            });
    };

    /**
     * 处理批量打印
     */
    handleBatchPrint = () => {
        const arrayData = this.props.arrayOrderPrintInfo;
        let showMessage = false;
        let sMessage = '';
        for (let i = 0; i < arrayData.length; i++) {
            if (arrayData[i].info.paymentTypeCode === 3) {
                if (!arrayData[i].info.alOrderNumber) {
                    showMessage = true;
                    sMessage = sMessage + `${arrayData[i].info.POnumber}、`;
                } else {
                    if (arrayData[i].info.alOrderNumber.length === 0) {
                        showMessage = true;
                        sMessage = sMessage + `${arrayData[i].info.POnumber}、`;
                    }
                }

            }
        }

        if (showMessage) {
            sMessage = sMessage.substring(0, sMessage.length - 1);
            message.info(`采购单：${sMessage}，网拍订单号为空，订单打印失败！请录入阿里订单号后再打印订单！`);
            return;
        }

        this.setState({
            orderModalVisible: true,
        });
    };


    callPrintProgram = () => {
        this.updatePrintState();
        const newcontainer = document.querySelector('.print_modal_view');
        document.body.innerHTML = newcontainer.innerHTML;
        window.print();
    };

    /**
     * 更新采购订单打印信息
     * */
    updatePrintState = () => {
        const parameter = { data: { purchaseNumber: this.state.orderNumbers } };
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
            arrayOrderPrintInfo,
        } = this.props;

        const {
            orderModalVisible,
        } = this.state;

        return (
            <div className="print_main_all">
                <Spin spinning={this.props.loadingObj}>
                    <div className="print_table-footer-fixed">
                        <Button
                            className="margin-sm-right"
                            onClick={this.back}
                        >
                            返回
                        </Button>
                        <Button
                            className="margin-sm-right"
                            onClick={this.handleBatchDownload}
                        >
                            批量下载
                        </Button>
                        <Button
                            className="margin-sm-right"
                            onClick={this.checkOperation}
                        >
                            批量打印
                        </Button>
                    </div>
                    <div className="print_view_main">
                        {
                            arrayOrderPrintInfo.map((t) => {
                                return (
                                    <div key={randNum()} className="print_view_sub">
                                        <OrderView
                                            key={randNum()}
                                            isShowButton={true}
                                            info={t.info}
                                            skuList={t.skuList}
                                        />

                                        <CartView
                                            key={randNum()}
                                            infoCard={t.infoCard}
                                            listCard={t.listCard}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </Spin>

                <OrderModal
                    visible={orderModalVisible}
                    arrayOrderPrintInfo={arrayOrderPrintInfo}
                    onCancel={() => this.setState({
                        orderModalVisible: false,
                    })}
                    onOK={this.callPrintProgram}
                />
            </div>
        );
    }
}

export default PrintView;
