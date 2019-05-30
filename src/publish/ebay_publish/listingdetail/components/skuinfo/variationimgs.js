import React from 'react'
import {
    message, Table, Upload, Icon, Modal, Checkbox
} from 'antd'
import { IMPORT_FILE_API } from "../../../../common/constants/actionTypes";
import StandardFormRow from '../../../../../common/components/advancedSearchModel/StandardFormRow'

export default class Vimgs extends React.Component {

    state = {
        uploadIndex: -1,   //上传图片所在行索引
        uploading: false,  // 图片上传loading
        visible: false,    // 图库页面
        galleryList: [],    // 图库获取的图片数据
        galleryChecked: undefined  //选中的图的索引
    }
    // 上传图片配置
    uploadConfig = {
        name: 'file',
        action: IMPORT_FILE_API,
        headers: {
            authorization: 'authorization-text',
        }
    }
    columns = [
        {
            title: this.props.vrelationship.specificName,
            dataIndex: 'primeAttrVal',
            width: 100,
            render: text => text
        },
        {
            title: '主图',
            dataIndex: 'images',
            width: 100,
            render: (text, record, index) => {
                let defaultUrl = require('../../../../common/constants/imgs/default.png');
                return (
                    <div>
                        <img src={text ? text : defaultUrl} width={80} height={70} />
                    </div>
                )
            }
        },
        {
            title: '操作',
            width: 100,
            render: (text, record, index) => {

                const { sellerSku, saleAccount } = this.props;
                const { uploading, uploadIndex } = this.state;
                return (<div className="imgs-list_btns">
                    <Upload
                        {...this.uploadConfig}
                        className="margin-ss-right"
                        onChange={this.handleUpload}
                    >
                        <span onClick={() => this.uploadIndex(index)}>
                            从本地上传
                            {uploading && uploadIndex === index
                                ? <Icon type="loading" theme="outlined" />
                                : null
                            }
                        </span>
                    </Upload>
                    <span onClick={() => this.showImgs(index, record)}>从图库选择</span>
                </div>)
            }
        }
    ]

    handleUpload = (info) => {
        this.setState({
            uploading: true
        })
        if (info.file.status !== 'uploading') { }
        if (info.file.status === 'done') {
            const res = info.file.response;
            if (res.state === "000001") {
                const { dataSource } = this.props;
                const { uploadIndex } = this.state;
                const { specificName } = this.props.vrelationship;
                this.props.uploadVimg({
                    propsName: specificName,
                    propsVal: dataSource[uploadIndex].primeAttrVal,
                    picUrl: res.data[0].awsPath
                });
                this.setState({
                    uploading: false
                })
            }
        } else if (info.file.status === 'error') {
            message.error(`图片上传失败！`);
            this.setState({
                uploading: false
            })
        }
    }
    uploadIndex = (index) => {
        this.setState({
            uploadIndex: index
        })
    }

    // 从图库上传
    showImgs = (index, record) => {
        const { saleAccount, getGalleryListAction, vrelationship, vlist } = this.props;
        const specificName = vrelationship.specificName;
        const primeAttrVal = record.primeAttrVal;
        let skuData = vlist && vlist.find(v => {
            return v[specificName] === primeAttrVal
        })
        if (!skuData || !skuData.sellerSku) {
            return message.warning("sku 选择异常")
        }
        getGalleryListAction({
            sku: skuData.sellerSku,
            saleAccount
        })
            .then(result => {
                if (result) {
                    if (!result.length) {
                        return message.warning("当前图库无可选图片")
                    }
                    this.setState({
                        visible: true,
                        uploadIndex: index,
                        galleryList: result
                    });
                }
            })
    }
    imgSelected = (e, index) => {
        if (e.target.checked) {
            this.setState({
                galleryChecked: index
            })
        } else {
            this.setState({
                galleryChecked: undefined
            })
        }
    }
    selectImg = () => {
        const { dataSource } = this.props;
        const { uploadIndex, galleryChecked, galleryList } = this.state;
        if (galleryChecked === undefined) return message.warning("请选择一张图片")
        const { specificName } = this.props.vrelationship;
        const path = galleryList[galleryChecked].url;
        this.props.uploadVimg({
            propsName: specificName,
            propsVal: dataSource[uploadIndex].primeAttrVal,
            picUrl: path
        });
        this.selectCancel()
    }

    selectCancel = () => {
        this.setState({
            visible: false,
            uploadIndex: -1,
            galleryChecked: undefined,
            galleryList: []
        });
    }
    componentWillMount() { }
    componentWillReceiveProps(nextProps) {
        const { specificName } = this.props.vrelationship;
        this.columns[0].title = specificName;
    }

    render() {
        const { dataSource } = this.props;
        const { galleryList, galleryChecked } = this.state
        return (
            <div className="auctionInfo_container">
                <StandardFormRow title={"多属性图片："} required={true} className="variation-imgs">
                    <Table
                        bordered
                        dataSource={dataSource}
                        columns={this.columns}
                        pagination={false}
                        size={"small"}
                    />
                </StandardFormRow>
                <Modal
                    title="从图库选择"
                    width={700}
                    visible={this.state.visible}
                    onOk={this.selectImg}
                    onCancel={this.selectCancel}
                    className={"vimgs-select-img"}
                >
                    <ul className={"select-img_list"}>
                        {
                            galleryList.map((v, index) => {
                                return (
                                    <li key={index}>
                                        <img src={v.url} width={106} height={92} />
                                        <p className="one-ellipsis">{v.fileName}</p>
                                        <Checkbox checked={galleryChecked === index} onChange={(e) => this.imgSelected(e, index)} ></Checkbox>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </Modal>
            </div>
        )
    }

}
