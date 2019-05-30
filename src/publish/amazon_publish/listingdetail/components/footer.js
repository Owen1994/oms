import React from 'react'
import {
    Button,
    message
} from 'antd'

class Footer extends React.PureComponent {

    state = {
    }

    isSameImgInfo = (arr, arr1) => {
        if (!arr && !arr1) return true;
        if ((!arr && arr1 && !arr1.length) || (arr && !arr.length && !arr1)) return true;
        if (!arr || !arr1) return false
        if (arr.length !== arr1.length) return false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== arr1[i]) return false
        }
        return true;
    }

    isSamePrice = (obj, obj1) => {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if ((obj[key] || obj1[key]) && obj[key] !== obj1[key]) return false
        }
        return true
    }

    isSameProduct = (obj, obj1) => {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key === "sellPoint") {
                if (!this.isSameImgInfo(obj[key], obj1[key])) {
                    return false
                }
            } else if ((obj[key] || obj1[key]) && obj[key] !== obj1[key]) {
                return false
            }
        }
        return true
    }

    checkInfo = (info, oldInfo) => {
        const {
            packHeight, packLength, packWidth,
            productHeight, productLength, productWidth,
        } = info
        if (packHeight || packLength || packWidth) {
            if (!packHeight || !packLength || !packWidth) {
                message.warning("包裹尺寸 长 宽 高 不可为零或为空")
                return false
            }
        } else if (info.packSizeUnit !== oldInfo.packSizeUnit) {
            info.packSizeUnit = oldInfo.packSizeUnit
        }
        if ((productHeight || productLength || productWidth)) {
            if (!productHeight || !productLength || !productWidth) {
                message.warning("产品尺寸 长 宽 高 不可为零或为空")
                return false
            }
        } else if (info.productSizeUnit !== oldInfo.productSizeUnit) {
            info.productSizeUnit = oldInfo.productSizeUnit
        }
        if (!info.packWeight) {
            info.packWeightUnit = oldInfo.packWeightUnit
        }
        if (!info.productWeight) {
            info.productWeightUnit = oldInfo.productWeightUnit
        }
        return true
    }

    goBack = () => {
        const { history } = this.props;
        history.replace('/publish/amazonlisting/list/?type=1')
    }

    checkAlterationField = (obj, obj1) => {
        const { isSameImgInfo } = this;
        const arr = [];
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            let k = keys[i]
            if (Array.isArray(obj[k])) {
                if (!isSameImgInfo(obj[k], obj1[k])) {
                    arr.push(k)
                }

            } else if ((obj[k] || obj1[k]) && obj[k] !== obj1[k]) {
                arr.push(k)
            }
        }
        return arr
    }

    save = () => {
        const { isSameProduct, isSameImgInfo, isSamePrice, checkInfo } = this;
        const { data, publishAsync } = this.props;
        const { validateFields } = this.props.form;
        validateFields((err, value) => {
            if (err) {
                try {
                    let errMessage;
                    while (!(errMessage = err.message)) {
                        let arr = Object.keys(err)
                        err = err[arr[0]]
                    }
                    return message.warning(errMessage)
                } catch (error) {
                    message.warning("请核实必填字段是否填写")
                }
                return
            }
            const updateField = []
            const {
                basicInfo,
                detailInfo,
                imgInfo,
                skuInfo
            } = value;
            if (skuInfo.retailPrice <= 0.1) return message.warning("零售价需大于 0.1")
            if (skuInfo.discountPrice >= skuInfo.retailPrice) return message.warning("折后价需小于零售价")


            if (!detailInfo.description || /^(<p>(&nbsp;|<br>|\s)*<\/p>)*$/.test(detailInfo.description)) {
                return message.warning("请填写描述信息")
            }
            // if(detailInfo.description){
            //     // 长度不计算 标签
            //     let str = "";
            //     try {
            //         str = detailInfo.description.replace(/<\/?.+?>/g, "").replace(/&nbsp;/g, " ");
            //     } catch (err) {
            //         str = detailInfo.description
            //     }
            //     if(str.length > 2000){
            //         return message.warning("描述内容最大字符数为2000，请酌情删减")
            //     }
            // }
            const promotion = skuInfo.promotion;
            if (promotion && promotion.length) {
                skuInfo.promotionBeginDate = promotion[0].valueOf();
                skuInfo.promotionEndDate = promotion[1].valueOf();
                delete skuInfo.promotion;
            }
            detailInfo.sellPoint = detailInfo.sellPoint.filter(v => v);

            // isUpdatePic	是否修改图片(0：否,1:是)	number	
            // isUpdatePrice	是否修改价格(0：否,1:是)	number	
            // isUpdateProduct	是否修改产品信息(0：否,1:是)	number	
            // isUpdateStock	是否修改库存(0：否,1:是)	number	
            const params = {
                isUpdatePic: 1,
                isUpdatePrice: 1,
                isUpdateProduct: 1,
                isUpdateStock: 1,
            };
            const info = {
                title: basicInfo.title,
                description: detailInfo.description,
                packHeight: detailInfo.packHeight,
                packLength: detailInfo.packLength,
                packSizeUnit: detailInfo.packSizeUnit,
                packWeight: detailInfo.packWeight,
                packWeightUnit: detailInfo.packWeightUnit,
                packWidth: detailInfo.packWidth,
                productHeight: detailInfo.productHeight,
                productLength: detailInfo.productLength,
                productSizeUnit: detailInfo.productSizeUnit,
                productWeight: detailInfo.productWeight,
                productWeightUnit: detailInfo.productWeightUnit,
                productWidth: detailInfo.productWidth,
                searchTerm: detailInfo.searchTerm,
                sellPoint: detailInfo.sellPoint,
            }
            const oldInfo = {
                title: data.basicInfo.title,
                description: data.detailInfo.description,
                packHeight: data.detailInfo.packHeight,
                packLength: data.detailInfo.packLength,
                packSizeUnit: data.detailInfo.packSizeUnit,
                packWeight: data.detailInfo.packWeight,
                packWeightUnit: data.detailInfo.packWeightUnit,
                packWidth: data.detailInfo.packWidth,
                productHeight: data.detailInfo.productHeight,
                productLength: data.detailInfo.productLength,
                productSizeUnit: data.detailInfo.productSizeUnit,
                productWeight: data.detailInfo.productWeight,
                productWeightUnit: data.detailInfo.productWeightUnit,
                productWidth: data.detailInfo.productWidth,
                searchTerm: data.detailInfo.searchTerm,
                sellPoint: data.detailInfo.sellPoint,
            }
            const price = {
                retailPrice: skuInfo.retailPrice,
                discountPrice: skuInfo.discountPrice,
                promotionBeginDate: skuInfo.promotionBeginDate,
                promotionEndDate: skuInfo.promotionEndDate,
            }
            const oldPrice = {
                retailPrice: data.skuInfo.retailPrice,
                discountPrice: data.skuInfo.discountPrice,
                promotionBeginDate: data.skuInfo.promotionBeginDate,
                promotionEndDate: data.skuInfo.promotionEndDate,
            }
            if (!checkInfo(info, oldInfo)) return;
            if (isSameProduct(info, oldInfo)) {
                params.isUpdateProduct = 0
            }
            if (skuInfo.quantity === data.skuInfo.quantity) {
                params.isUpdateStock = 0
            } else {
                updateField.push("quantity")
            }
            if (isSamePrice(price, oldPrice)) {
                params.isUpdatePrice = 0
            }
            if (isSameImgInfo(imgInfo, data.imgInfo)) {
                params.isUpdatePic = 0
            } else {
                updateField.push("imgInfo")
            }
            const updateField1 = this.checkAlterationField({
                ...info,
                ...price
            }, {
                    ...oldInfo,
                    ...oldPrice
                })
            value.basicInfo = {
                ...basicInfo,
                ...params
            }
            if (!imgInfo) {
                value.imgInfo = []
            }
            value.updateField = [...updateField, ...updateField1]
            publishAsync({
                data: value
            })
                .then(r => {
                    if (r) {
                        message.success(r.msg);
                        this.goBack()
                    }
                })
        })
    }

    render() {
        return (
            <div className="amazon-listing-detail-footer bgcfff">
                <Button onClick={this.save} type="primary">保存并刊登</Button>
                <Button onClick={this.goBack} className="margin-ss-left">取消</Button>
            </div>
        )
    }
}

export default Footer
