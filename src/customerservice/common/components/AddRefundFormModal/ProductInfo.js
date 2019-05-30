import React from 'react';
import {
    Form, Checkbox, Input, InputNumber,
} from 'antd';

const FormItem = Form.Item;

class ProductInfo extends React.Component {
    getUsedQuantity = (item) => {
        // Q:is Sku unique?
        const { isReview } = this.props;
        const { refundSkus } = this.props.orderRefunds;
        let usedQuantity = item.usedQuantity;
        if (isReview) {
            refundSkus.forEach(ele => {
                if (ele.sku === item.sku) {
                    usedQuantity = ele.quantity;
                }
            })
        } 
        // else if (type === 'edit') {
        //     refundSkus.forEach(ele => {
        //         if (ele.sku === item.sku) {
        //             usedQuantity = item.usedQuantity - ele.quantity;
        //             availableQuantity = item.quantity - usedQuantity;
        //         }
        //     })
        // }
        return usedQuantity;
    }

    // 若为查看筛选出仅在添加退款单时添加的商品,而非展示全部商品
    getReviewData = () => {
        const { productInfo } = this.props;
        const { refundSkus } = this.props.orderRefunds;
        let arr = [];
        productInfo.forEach(item => {
            refundSkus.forEach(ele => {
                if (ele.sku === item.sku) {
                    item.initChecked = true;
                    arr.push(item);
                }
            })
        })
        return arr;
    }

    // 编辑退款单时checkbox给已添加的商品加状态
    addIschecked = () => {
        const { productInfo, type } = this.props;
        const { refundSkus } = this.props.orderRefunds;
        if (type === 'edit') {
            for(let i = 0;i < productInfo.length;i++) {
                let flag = false;
                for(let j = 0;j < refundSkus.length;j++) {
                    if (refundSkus[j].sku === productInfo[i].sku) {
                        flag = true;
                        break;
                    }
                }
                productInfo[i].initChecked = flag;
            }
        } else {
            productInfo.forEach(item => {
                item.initChecked = false;
            });
        }
        return productInfo;
    }

    render() {
        const { isReview } = this.props;
        const { getFieldDecorator } = this.props.form;
        let applyText = '已申请数量：';
        let productInfo;
        if (isReview) {
            applyText = '申请数量：';
            productInfo = this.getReviewData();
        } else {
            productInfo = this.addIschecked();
        }
        return (
            <div className="add-refund-item">
                <div className="add-label">产品信息</div>
                <div className="add-content">
                    {productInfo.map((item) => {
                        return (
                            <div className="product-item" key={`${item.itemId}${item.sku}`}>
                                <FormItem>
                                    {getFieldDecorator(`product.data${item.itemId}${item.sku}.checked`, {
                                        initialValue: item.initChecked,
                                    })(
                                        <Checkbox
                                            defaultChecked={item.initChecked}
                                            disabled={isReview}
                                            onChange={this.props.filterData}
                                            className="refund-product-check"
                                        >
                                            <div className="ant-row">
                                                <div className="ant-col-20 ant-col-offset-2">
                                                    <div className="product-sku pt-7">
                                                        <span>刊登SKU：</span>
                                                        <span>{item.sku}</span>
                                                    </div>
                                                    <div className="product-name">{item.productName}</div>
                                                    <div className="ant-row">
                                                        <div className="ant-col-14 pt-7">
                                                            <span>SKU单价：</span>
                                                            <span className="product-amount">{item.currency} {item.price}</span>
                                                        </div>
                                                        <div className="ant-col-10 pt-7">
                                                            <span>数量：</span>
                                                            <span className="product-quatity">{item.quantity}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Checkbox>,
                                    )}
                                </FormItem>
                                <div className={["product-register-num", isReview ? 'customer-gray' : ''].join(' ')}>
                                    <span>{applyText}</span>
                                    <span>{this.getUsedQuantity(item)}</span>
                                </div>
                                {!isReview
                                    ? (
                                        <div className="product-input-num">
                                            <FormItem
                                                labelCol={{ span: 12 }}
                                                wrapperCol={{ span: 12 }}
                                                label="可申请数量"
                                            >
                                                {getFieldDecorator(`product.data${item.itemId}${item.sku}.quantity`, {
                                                    initialValue: item.availableQuantity,
                                                })(
                                                    <InputNumber
                                                        min={1}
                                                        max={item.availableQuantity}
                                                        precision={0}
                                                        onChange={this.props.filterData}
                                                        formatter={value => `${value}`.replace(/^\s*$/, '0')} // 避免退款数为空(报错)
                                                        parser={value => value.replace(/^\s*$/, '00')}
                                                    />,
                                                )}
                                            </FormItem>
                                        </div>
                                    ) : null}
                                <FormItem>
                                    {getFieldDecorator(`product.data${item.itemId}${item.sku}.itemId`, {
                                        initialValue: item.itemId,
                                    })(
                                        <Input type="hidden" />,
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator(`product.data${item.itemId}${item.sku}.price`, {
                                        initialValue: item.price,
                                    })(
                                        <Input type="hidden" />,
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator(`product.data${item.itemId}${item.sku}.totalQuantity`, {
                                        initialValue: item.quantity,
                                    })(
                                        <Input type="hidden" />,
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator(`product.data${item.itemId}${item.sku}.sku`, {
                                        initialValue: item.sku,
                                    })(
                                        <Input type="hidden" />,
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator(`product.data${item.itemId}${item.sku}.availableQuantity`, {
                                        initialValue: item.availableQuantity,
                                    })(
                                        <Input type="hidden" />,
                                    )}
                                </FormItem>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
export default Form.create()(ProductInfo);
