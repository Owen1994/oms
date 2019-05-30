import React from 'react';
import { Form } from 'antd';
import Modal2 from '../../../../components/Modal2';
import FilterType from './FilterType';
import ProductInfo from './ProductInfo';
import OrderInfo from './OrderInfo';
import TrackingInformation from './TrackingInformation';
import OrderDetailModal from '../OrderDetailModal';
import { fetchPost } from '../../../../util/fetch';
import { GET_REFUND_INFO } from '../../constants';
import './index.css';

class AddRefundFormModal extends React.Component {
    state = {
        orderInfo: {},
        productInfo: [], // sku数据
        operateLogs: [], // 退款单操作记录
        fieldInfo: [], // 字段表单的数据
        orderRefunds: {},
        orderVisible: false,
    }

    componentDidMount() {
        this.getRefundInfo();
    }

    // 获取退款单信息
    getRefundInfo = () => {
        const { record, type, platformId, form } = this.props;
        let params = { platformId, group: '1' };
        if (type === 'edit') {
            params.refundId = record.refundId;
        } else {
            params.orderNumber = record.orderNumber;
        }
        fetchPost(GET_REFUND_INFO, params, 2)
            .then((data) => {
                if (data && data.state === '000001') {
                    if (type === 'edit') {
                        form.setFieldsValue({ refundType: data.data.orderRefunds[0].refundType });
                    }
                    this.setState({
                        orderInfo: data.data,
                        productInfo: data.data.orderItems,
                        fieldInfo: data.data.orderRefunds[0].fieldData,
                        operateLogs: data.data.orderRefunds[0].logData,
                        orderRefunds: data.data.orderRefunds[0]
                    });
                }
            });
    }

    // 去除金额小数点 (已确认产品单价为精确至小数点后四位，本次计算延伸至五位)
    handleNumber = num => `${Number(num).toFixed(5)}`.replace('.', '')

    // 产品选中，产品数量变化的回调
    filterData = () => {
        setTimeout(() => {
            const formValues = Object.values(this.props.form.getFieldValue('product'));
            let targetArr = formValues.filter(item => item.checked); // 选中项产品集合
            targetArr = targetArr.map(item => this.handleNumber(item.price) * item.quantity);
            const newTotal = targetArr.length > 0 ? targetArr.reduce((pre, cur) => (pre + cur)) / 100000 : 0; // 选中项总价
            const uncheckedArr = formValues.filter(item => item.checked === false);
            const numIsFullArr = formValues.filter(item => `${item.quantity}` !== `${item.totalQuantity}`);
            if (!uncheckedArr.length && !numIsFullArr.length) {
                this.props.form.setFieldsValue({
                    refundType: 1,
                });
            } else {
                this.props.form.setFieldsValue({
                    refundType: 2,
                });
            }
            this.props.form.setFieldsValue({
                refundAmount: newTotal,
            });
            // 弹窗内容改变时取消loading状态 cwc 2019年1月30日09:25:47
            this.props.cancelRefundLoading();
        }, 0);
    }

    // 点击订单编号产查看详情
    handleOrderClick = () => {
        this.setState({ orderVisible: true });
    }

    handleCancel = () => {
        this.setState({ orderVisible: false });
    }

    render() {
        const {
            total,
            isReview,
            fieldInfo,
            orderInfo,
            productInfo,
            orderRefunds,
            operateLogs,
            orderVisible,
        } = this.state;
        const {
            type,
        } = this.props;
        const refundType = this.props.form.getFieldValue('refundType');
        let productCom = null;
        let trackCom = null;
        if ([1, 2].includes(refundType)) {
            productCom = (
                <ProductInfo
                    {...this.props}
                    orderRefunds={orderRefunds}
                    productInfo={productInfo}
                    filterData={this.filterData}
                />
            )
        }
        if (type === 'edit' || isReview) {
            trackCom = (
                <TrackingInformation
                    {...this.props}
                    operateLogs={operateLogs}
                />
            )
        }
        return (
            <div className="add-refund-form">
                <Form>
                    {trackCom}
                    <OrderInfo
                        {...this.props}
                        orderInfo={orderInfo}
                        handleOrderClick={this.handleOrderClick}
                    />
                    {productCom}
                    <FilterType
                        {...this.props}
                        total={total}
                        fieldInfo={fieldInfo}
                        orderRefunds={orderRefunds}
                    />
                </Form>
                {/* 订单详情弹窗 */}
                <Modal2
                    component={(
                        <OrderDetailModal
                            {...this.props}
                            buyerAccount={orderInfo.buyerAccount}
                            sellerAccount={orderInfo.sellerAccount}
                            orderNumber={orderInfo.orderNumber}
                        />
                    )}
                    title="订单详情"
                    visible={orderVisible}
                    handleCancel={this.handleCancel}
                    footer={null}
                />
            </div>
        );
    }
}
export default Form.create()(AddRefundFormModal);
