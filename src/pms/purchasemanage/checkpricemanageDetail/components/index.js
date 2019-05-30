import React from 'react';
import { Form, Button, message } from 'antd';
import BasicInfo from './BasicInfo';
import SupplierList from './SupplierList';
import UnShelveCom from './UnShelveCom';
import { getUrlParams, closeCurrentPage } from '../../../../util/baseTool';
import Functions from '../../../../components/functions';
import { hasPerssion } from '../../../../util/baseTool';
/**
 *作者: huangjianfeng
 *功能描述: 核价管理
 *时间: 2018/10/11 15:55
 */
class App extends React.Component {
    uuid = 0

    state = {
        visible: false,
    }

    componentWillMount() {
        const {
            location,
            getPriceDetailsDataAcquisitionAsync,
            getPaymentMethodAsync,
        } = this.props;
        const params = getUrlParams(location.search);
        if (!params.id) return;
        const id = params.id;
        getPriceDetailsDataAcquisitionAsync({ data: { checkNumber: id } });
        getPaymentMethodAsync();
    }

    getParams = () => {
        const { validateFields } = this.props.form;
        return new Promise((resolve) => {
            validateFields((err, value) => {
                if (err) {
                    const data = err.data;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i]) {
                            message.error(data[i][Object.keys(data[i])[0]].errors[0].message);
                            return resolve();
                        }
                    }
                    return resolve();
                }
                resolve(value);
            });
        });
    }

    saveSupplier = () => {
        const {
            priceDetailsDataAcquisition,
            priceDetailsAddSupplierAsync,
        } = this.props;
        this.getParams()
            .then((value) => {
                if (value) {
                    const list = priceDetailsDataAcquisition.supplierArray;
                    const {
                        checkNumber,
                        checkType,
                        supplierArray,
                    } = value;
                    const newSupplierArray = list.map((v) => {
                        const key = v.key;
                        
                        if (v.isOrigin) {
                            supplierArray[key].key = key;
                        } else {
                            supplierArray[key].key = 0;
                        }
                        supplierArray[key].code = v.code;
                        return supplierArray[key];
                    });
               
                    priceDetailsAddSupplierAsync({
                        data: {
                            checkNumber,
                            checkType,
                            supplierArray: newSupplierArray,
                        },
                    })
                        .then((result) => {
                            if (result) {
                                message.success(result.msg);
                                this.goBack();
                            }
                        });
                }
            });
    }

    addSupplier = () => {
        const {
            priceDetailsDataAcquisitionAction,
            priceDetailsDataAcquisition,
        } = this.props;
        const {
            supplierArray,
        } = priceDetailsDataAcquisition;
        this.getParams()
            .then((value) => {
                if (!value) return;
                supplierArray.push({
                    isOrigin: false,
                    key: ++this.uuid,
                });
                priceDetailsDataAcquisitionAction({
                    ...priceDetailsDataAcquisition,
                    supplierArray,
                });
            });
    }

    removeSupplie = (id) => {
        const {
            priceDetailsDataAcquisitionAction,
            priceDetailsDataAcquisition,
        } = this.props;
        const {
            supplierArray,
        } = priceDetailsDataAcquisition;
        for (let i = 0; i < supplierArray.length; i++) {
            if (supplierArray[i].key === id) {
                supplierArray.splice(i, 1);
                break;
            }
        }
        priceDetailsDataAcquisitionAction({
            ...priceDetailsDataAcquisition,
            supplierArray,
        });
    }

    handleChangeSupplie = (key, value) => {
        const data = value[0];
        const {
            priceDetailsDataAcquisitionAction,
            priceDetailsDataAcquisition,
        } = this.props;
        const {
            getFieldValue,
        } = this.props.form;
        const {
            supplierArray,
        } = priceDetailsDataAcquisition;

        const result = getFieldValue(`data[${key}]`);

        for (let i = 0; i < supplierArray.length; i++) {
            if (supplierArray[i].key === key) {
                const obj = {
                    ...result,
                    key: ++this.uuid,
                    isOrigin: false,
                    name: data.name,
                    code: data.code,
                    deliveryDay: data.deliveryDay,
                    payType: data.payType,
                    telNumber: data.telNumber,
                    qq: data.qq,
                    aliWangWang: data.aliWangWang,
                    contact: data.contact,
                    supplieList: value,
                };
                supplierArray.splice(i, 1, obj);
                break;
            }
        }

        priceDetailsDataAcquisitionAction({
            ...priceDetailsDataAcquisition,
            supplierArray: [...supplierArray],
        });
    }

    goBack = () => {
        const { history } = this.props;
        history.go(-1);
    }
    closePop = () => {
        closeCurrentPage();
    };

    onCancel = () => {
        this.setState({ visible: false });
    }

    render() {
        const {
            visible,
        } = this.state;
        
        const {
            priceDetailsDataAcquisition,
            skuHistoricalPurchaseOrderAsync,
            priceDetailsLowerTipsAsync,
            paymentMethod,
        } = this.props;
        const { basicInfo, supplierArray } = priceDetailsDataAcquisition;

        const btn = (
            <div className="table-footer-fixed">
                <Functions
                    {...this.props}
                    functionkey="010-000003-000002-000001-002"
                >
                    <Button
                        disabled={basicInfo.state === 2 || basicInfo.state === 3 || basicInfo.state === 4}
                        onClick={this.addSupplier}
                        className="margin-sm-right"
                    >
                        添加供应商
                    </Button>
                </Functions>

                <Functions
                    {...this.props}
                    functionkey="010-000003-000002-000001-003"
                >
                    <Button
                        disabled={basicInfo.state === 2 || basicInfo.state === 4}
                        className="margin-sm-right"
                        onClick={() => this.setState({ visible: true })}
                    >
                        申请下架
                    </Button>
                </Functions>

                <Functions
                    {...this.props}
                    functionkey="010-000003-000002-000001-004"
                >
                    <Button
                        disabled={basicInfo.state === 2 || basicInfo.state === 4}
                        onClick={this.saveSupplier}
                        className="margin-sm-right"
                    >
                        核查结束
                    </Button>
                </Functions>

                <Button
                    disabled={basicInfo.state === 4}
                    onClick={this.closePop}
                >
                    关闭
                </Button>
            </div>
        );

        return (
            <div className="checkpricemanage-detail tweb-tab">
                <BasicInfo
                    skuHistoricalPurchaseOrderAsync={skuHistoricalPurchaseOrderAsync}
                    basicInfo={basicInfo}
                    form={this.props.form}
                />
                <SupplierList
                    {...this.props}
                    addSupplier={this.addSupplier}
                    removeSupplie={this.removeSupplie}
                    handleChangeSupplie={this.handleChangeSupplie}
                    paymentMethod={paymentMethod}
                    supplierArray={supplierArray}
                    form={this.props.form}
                    sku={basicInfo.sku}
                />
                {btn}
                <UnShelveCom
                    visible={visible}
                    sku={basicInfo.sku}
                    onCancel={this.onCancel}
                    priceDetailsLowerTipsAsync={priceDetailsLowerTipsAsync}
                />
            </div>
        );
    }
}
export default Form.create()(App);
