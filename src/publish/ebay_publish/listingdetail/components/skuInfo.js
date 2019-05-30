import React from 'react'
import { Form, Select, Checkbox, message, Tooltip } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
import StandardFormRow from '../../../../common/components/advancedSearchModel/StandardFormRow'
import ImgsUploadAndDrag from '../../../common/components/imgsUploadAndDrag'
import AuctionInfo from './skuinfo/auctioninfo'
import PriceInfo from './skuinfo/priceinfo'
import PriceModal from './skuinfo/priceModal'
import VariationInfo from './skuinfo/variationinfo'
import { IMPORT_FILE_API } from '../../../common/constants/actionTypes'
import * as types from '../constants/reducerTypes'
import { angentPicUrl } from '../../../../util/baseTool'
import { fetchUpload } from 'util/fetch';
let imgId = 100000;

export default class SkuInfo extends React.Component {
    state = {
        uploadWay: 1,         // 本地上传/网络上传
        fileList: [],         // 待上传的图片文件
        checkedImgs: [],      // 选中的图片
        visible: false,
        confirmLoading: false, // 上传等待效果
        priceVisible: false
    }

    showPriceModel = () => {
        this.setState({ priceVisible: true })
    }
    imgsUploadConfig = {
        beforeUpload: (file) => {
            //  console.log(file);
            const reg = /\.(jpeg|jpg)$/i;  // 图片格式校验
            const isLt2M = file.size / 1024 / 1024 < 1;
            if (reg.test(file.name) && isLt2M) {
                this.setState(({ fileList }) => ({
                    fileList: [...fileList, file],
                }));
            } else {
                this.setState(({ fileList }) => ({
                    fileList: [...fileList],
                }));
                message.error("请上传不大于1M的jpg/jpeg格式的图片！")
            }
            return false
        },
        handleUpload: () => {
            let skuImages = this.props.skuinfoData.img;
            const { fileList } = this.state;
            let skuImg = [];
            // console.log(fileList)
            if (fileList.length > 0) {
                // const formData = new FormData();
                // fileList.forEach((file) => {
                //     formData.append('file', file);
                // });

                // let request = new Request(IMPORT_FILE_API, {
                //     method: 'POST',
                //     credentials: 'include',
                //     body: formData,
                // });
                fetchUpload('/yks/file/server/', fileList).then(result => {
                    if (result.state === '000001') {
                        let data = result.data;
                        let imgArr = [];
                        if (data.length > 0) {
                            data.forEach(v => {
                                skuImg.push(angentPicUrl(v.awsPath));
                                imgArr.push({
                                    label: v.filename,
                                    value: ++imgId,
                                    url: angentPicUrl(v.awsPath)
                                });
                            });
                            skuImages = [...skuImages, ...imgArr];
                            this.props.editComponentDataAction(types.ADD_SKUINFO, 'img', skuImages);
                            this.setState({
                                fileList: [],
                            })
                        }
                    }
                })
            } else {
                message.warn("请选择图片文件")
                return
            }
            this.setState({
                confirmLoading: true,
            });
            setTimeout(() => {
                this.setState({
                    visible: false,
                    confirmLoading: false,
                });
            }, 1000);
        },
        move: (val1, val2) => {    // 图片拖拽排序
            // if (val2 === undefined) {
            //     val2 = val1
            // }
            let skuImages = this.props.skuinfoData.img.slice(0);
            const valueIndex = skuImages.findIndex(v => v.value === val1)
            const value = skuImages[valueIndex]
            skuImages.splice(valueIndex, 1)
            const index = skuImages.findIndex(v => v.value === val2)
            if (index === -1) {
                skuImages.push(value)
            } else {
                skuImages.splice(index, 0, value)
            }
            const newArr = skuImages.map(v => v.url)
            this.props.editComponentDataAction(types.ADD_SKUINFO, 'img', newArr);
        },
        imgHandleChecked: (e, value) => {
            const { checkedImgs } = this.state;
            if (e.target.checked) {
                this.setState({
                    checkedImgs: [...checkedImgs, value]
                })
            } else {
                this.setState({
                    checkedImgs: this.state.checkedImgs.filter(v => {
                        return v !== value;
                    })
                })

            }
        },
        handleDel: (type) => {
            let skuImages = this.props.skuinfoData.img;
            const { checkedImgs } = this.state;
            let images = [...skuImages]
            if (type === "checked") {
                if (checkedImgs.length > 0) {
                    let skuImg = [];
                    images.forEach((item, index) => {
                        checkedImgs.forEach(v => {
                            if (item.value === v) {
                                delete images[index];
                            }
                        })
                    });
                    images.forEach(_item => {
                        if (_item !== undefined) {
                            skuImg.push(_item)
                        }
                    })
                    this.props.editComponentDataAction(types.ADD_SKUINFO, 'img', skuImg);
                    this.setState({
                        // skuImages: skuImg,
                        checkedImgs: [],
                    });
                } else {
                    message.info("请选择要删除的图片！")
                }
            }
            if (type === "unChecked") {
                let newArr = [];
                skuImages.forEach(item => {
                    checkedImgs.forEach(v => {
                        if (item.value === v) {
                            newArr.push(item);
                        }
                    })
                });
                this.props.editComponentDataAction(types.ADD_SKUINFO, 'img', newArr);
                this.setState({
                    // skuImages: newArr,
                    checkedImgs: this.state.checkedImgs,
                })
            }
        },
        showModal: () => {
            this.setState({
                visible: true,
            });
        },
        cancelUpload: () => {
            console.log('取消上传图片');
            this.setState({
                visible: false,
            });
        },
        onRemove: (file) => {
            this.setState(({ fileList }) => {
                const index = fileList.indexOf(file);
                const newFileList = fileList.slice();
                newFileList.splice(index, 1);
                return {
                    fileList: newFileList,
                };
            });
        }
    }
    changePrice = (value) => {
        this.props.form.setFieldsValue({ 'skuInfo[price]': value });
    }

    render() {
        const { priceVisible } = this.state
        const { largePhotoFee } = this.props.anotherData;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const {
            site,
            getDomesticList,
            singleListingComputPriceAction
        } = this.props
        const { img, isLargeImage, sellerSku } = this.props.skuinfoData;
        const saleType = getFieldValue("basicData[saleType]");
        // const saleType = 2;
        return (
            <div className="sku-info">
                {saleType === 1 ?
                    <div>
                        <PriceInfo showPriceModel={this.showPriceModel} {...this.props} />
                        <PriceModal
                            changePrice={this.changePrice}
                            getDomesticList={getDomesticList}
                            singleListingComputPriceAction={singleListingComputPriceAction}
                            visible={priceVisible}
                            sellerSku={sellerSku}
                            onCancel={() => this.setState({ priceVisible: false })}
                            site={site}
                        />
                    </div>
                    : null
                }
                {saleType === 0 ?
                    <AuctionInfo {...this.props} />
                    : null
                }
                {saleType === 2 ?
                    <VariationInfo {...this.props} />
                    : null
                }
                <StandardFormRow title="图片：" required={true}>
                    <ImgsUploadAndDrag
                        {...this.props}
                        visible={this.state.visible}
                        confirmLoading={this.state.confirmLoading}
                        fileList={this.state.fileList}
                        skuImages={img}
                        imgsUploadConfig={this.imgsUploadConfig}
                    />
                    <Tooltip
                        overlayClassName="tooltip-style"
                        placement="topLeft"
                        title={
                            largePhotoFee ? `使用图片加大服务将花费 ${largePhotoFee}` : null
                        }
                    >
                        <div>
                            <FormItem>
                                {getFieldDecorator("skuInfo[isLargeImage]", {
                                    initialValue: isLargeImage
                                })(
                                    <Checkbox
                                        checked={getFieldValue("skuInfo[isLargeImage]")}
                                    >Display a large photo in search results with Gallery Plus{largePhotoFee ? (`：${largePhotoFee}`) : ''}</Checkbox>
                                )}
                            </FormItem>
                        </div>
                    </Tooltip>
                </StandardFormRow>
            </div>
        )
    }
}