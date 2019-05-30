/**
 *作者: 魏洁(唐峰)
 *功能描述: 订单管理--异常订单--详情页--商品信息
 *参数说明:
 *时间: 2018/5/29 15:50
 */
import React, {Component} from 'react';
import {render} from 'react-dom';
import {
    Form,
    Icon,
    Input,
    Button,
    Select,
    Row,
    Col,
    Radio,
    Cascader,
    Upload,
    Table,
    Popconfirm,
    Modal,
    DatePicker,
    message,
    Spin,
} from 'antd';
import '../css/css.css';
import * as config from "util/connectConfig";

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import Modalmodel from '@/components/modalmodel';
import {levelOptions} from "util/options";
import axios from "util/axios";
import {datasaddkey, functions} from "util/baseTool";
import Addproduct from './addproduct';
import Revisedproduct from './revisedProduct';
import PopConfirm from '@/common/components/confirm';


class ProductInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    };

    state = {
        readonly: true,
        numb1: {len: 0, color: ''},
        numb2: {len: 0, color: ''},
        numb3: {len: 0, color: ''},
        brandSelectorVisible: false,
        categorySelectorVisible: false,
        Selectortype: 'multiple',
        formloading: true,
    };

    upIcon = (<Icon type="plus" className="avatar-uploader-trigger"/>)

    uploadicon = (id, num, ic = this.upIcon) =>
        this.props.form.getFieldValue(id) && this.props.form.getFieldValue(id).length >= num ? null : ic;

    normFile = (e) => {

        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    uploadonChange = (info) => {
        const status = info.file.status;
        const response = info.file.response;
        if (status === 'done') {
            message.success(`${info.file.name} 图片上传成功.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} 图片上传失败.`);
        }
    };

    handlePreview = (file) => {

        this.props.modalmodelaction({
            previewVisible: true,
            previewImage: file.url || file.thumbUrl,
        });

    };

    uploadsprops2 = {
        name: 'Filedata',
        listType: 'picture-card',
        className: 'upload-list-inline',
        onPreview: this.handlePreview,
        multiple: true,
        accept: 'image/*',
        onRemove: () => false,
        beforeUpload: this.beforeUpload,
        action: `${config.api_url}/upload?type=approveLicensePic`,
    };

    adduploaddata = ({name, message, initialValue = [], placeholder = '', num = 1}) => {
        const newname = name.replace(/(.*?)s(\d+)$/g, '$1$2');

        return (<FormItem className="widthAll" {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                rules: [{required: false, message: message}],
                onChange: this.uploadonChange,
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                initialValue: initialValue,
            })(
                <Upload {...this.uploadsprops2} >
                    {this.uploadicon(name, num)}
                </Upload>
            )}


        </FormItem>)
    };

    addinputdata = ({name, message, placeholder = '', initialValue = '', required = false,}) => (
        <FormItem className="widthAll" {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {

                rules: [{required: required, message: message,},],
                initialValue: initialValue,

            })(
                <Input disabled placeholder={placeholder} className="widthAll" maxLength={30}/>
            )}
        </FormItem>);

    Modalshow2 = (index) => () => {
        this.props.modalmodelaction({visible2: true,});
        this.props.tablemodelaction2({delkey2: index,});
    };

    columns = [
        {
            title: '序号',
            dataIndex: 'No',
            width: 50,
            render: text => text,
        }, {
            title: '缩略图',
            className: 'column-img',
            dataIndex: 'img',
            width: 120,
            render: this.adduploaddata,
        }, {
            title: '规格',
            dataIndex: 'sku',
            render: (text, record, index) => {
                const itemId = record.record.itemId ? <p key={4}><span>itemId：</span>{record.record.itemId}</p> : '';
                let skuCode = record.sku.initialValue.toUpperCase();
                return (<div className="tl explain">
                    {/* <p key={5}><span>平台单号：</span>{this.props.Infos.platformOrderId.value}</p> */}
                    <p key={5}><span>前后缀：</span>{record.record.skuAffix}</p>
                    <p key={1}><span>SKU编码：</span>{skuCode}</p>
                    <p key={2}><span>在线商品编码：</span>{record.record.onlineSkuCode}</p>
                    <p key={3}><span>商品名称：</span>{record.name}</p>
                    {itemId}
                </div>)
            }
        },
        {
            title: 'SKU物流属性',
            dataIndex: 'logisticsProperty',
            render: (text, record, index) => `${record.record.logisticsProperty}`,
        },
        {
            title: '打包后重量',
            dataIndex: 'weight',
            render: (text, record, index) => `${record.record.weight}`,
        },
        {
            title: '销售单价',
            dataIndex: 'unit',
            render: (text, record, index) => `${record.record.currency} ${record.record.unit}`,
            width: 140,
        },
        {
            title: '销售数量',
            dataIndex: 'num',
            render: (text, record, index) => `${record.record.num}`,
            width: 140,
        },
        {
            title: '销售金额',
            dataIndex: 'amount',
            render: (text, record, index) => `${record.record.currency} ${record.record.amount}`,
            width: 140,

        },
        {
            title: '操作',
            width: 140,
            dataIndex: 'Operation',
            render: (text, record, index) => {
                const { abnormaltype } = this.props.Infos;
                return (

                    (
                        <div>
                            {
                                (this.props.isEditModel.is || abnormaltype && Array.isArray(abnormaltype) && abnormaltype[0] === 19) && functions(this, '001-000002-000002-000001-006') ?
                                    <a className={'viewbtn ml5'}
                                       onClick={this.handleAddshow('revisedproductvisible', 2, record, index)}>修改</a>
                                    : null
                            }
                            {
                                this.props.isEditModel.is ?
                                    <a className={'viewbtn margin-ss-left'} onClick={this.Modalshow2(index)}>删除</a>
                                    : null
                            }
                        </div>)
                );
            },
        }
    ];


    ModalhandleOk2 = () => {
        const delkey2 = this.props.tablemodel2.delkey2;
        var orderId = this.props.form.getFieldValue("yksOrderNumber");
        const parms = {id: this.props.tablemodel2.data2[delkey2].id, orderId};
        axios.post(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/deleteGoods`, parms)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.state === '000001') {
                        message.success(`${response.data.msg}`);
                        const data2 = [...this.props.tablemodel2.data2];
                        data2.splice(delkey2, 1);
                        this.props.modalmodelaction({ModalText: '删除中···', confirmLoading: true,});
                        setTimeout(() => {
                            this.props.tablemodelaction2({data2: data2,});
                            this.props.modalmodelaction({
                                visible2: false,
                                confirmLoading: false,
                            });

                        }, 500);
                    } else {
                        message.error(`${response.data.msg}`);
                    }
                }
            }).catch(e => {
            console.log(e);
        })


    };

    //关闭弹窗
    ModalhandleCancel = (value) => () => {
        this.props.modalmodelaction({[value]: false});
        let status = this.props.Infos.productInfoStatus;
        clearTimeout(status);
    };

    //添加及修改弹窗按钮
    handleAddshow = (key, type = 1, record, index = 0) => () => {
        const title = type === 1 ? '添加商品' : '修改商品';
        let productId = '', addnum = '', addname = '', addsku = '', addunit = '', itemId = '', onlineSkuCode = "";
        if (type === 2) {
            productId = record.id;
            addnum = record.num.initialValue;
            itemId = record.itemId;
            addname = record.name;
            addsku = record.sku.initialValue;
            addunit = record.unit.initialValue;
            onlineSkuCode = record.onlineSkuCode;
        }

        this.props.tablemodelaction2({
            title,
            type,
            productId,
            addnum,
            addname,
            addsku,
            addunit,
            itemId,
            index,
            record,
            onlineSkuCode
        });
        this.props.modalmodelaction({[key]: true});
        this.props.baseInfoForm({productInfoStatus: true});
    };

    handleAdd = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { amendSkuArrModel, amendSkuArrAction } = this.props;
                const id = this.props.tablemodel2.productId;
                const orderId = this.props.Infos.orderId;
                const num = values.addnum;
                const currency = values.addcurrency;
                const salePrice = values.addsalePrice;
                const sku = values.addsku;
                const skuChinese = values.skuChinese;
                const type = this.props.tablemodel2.type;
                const skuAffix = values.skuAffix;
                const skuAffixType = values.skuAffixType;

                const parms = {
                    id,
                    num,
                    currency,
                    orderId,
                    salePrice,
                    sku,
                    skuChinese,
                    type,
                    skuAffix,
                    skuAffixType,
                };

                amendSkuArrAction([sku, ...amendSkuArrModel]);


                axios.post(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/addProductToOrder`, parms)
                    .then(response => {
                        if (response.status === 200) {

                            if (response.data.state === '000001') {
                                message.success(`${response.data.msg}`);
                                this.getProductInfo();
                                this.props.modalmodelaction({addproductvisible: false})


                            } else {
                                message.error(response.data.msg)
                            }
                        }
                    }).catch(e => {
                    console.log(e);
                })
            }
        })
    };

    handleCancel2 = (visible) => () => {
        this.props.modalmodelaction({[visible]: false,})
    };

    /**
     * 作者：魏洁
     * 描述：获取修改信息
     * 时间：2018-4-17
     * @param <Object> data
     */
    getmodificationdata = () => {

        const excsuffix = this.props.form.getFieldValue('excsuffix');
        const excsuffixSku = this.props.form.getFieldValue('excsuffixSku') ? this.props.form.getFieldValue('excsuffixSku') : '';

        if (excsuffix || excsuffixSku) {
            if (excsuffix !== '1' || excsuffixSku.length > 0) {
                PopConfirm('前后缀提示', '当前SKU发现了海外仓前后缀，请确认当前SKU前后缀填写是否正确！避免海外仓订单到国内仓发货！', () => {
                        this.handleModificationData();
                    }
                );
            } else {
                this.handleModificationData();
            }
        } else {
            this.handleModificationData();
        }
    };

    handleModificationData = () => {
        setTimeout(() => {

            const parameter = [
                "yksOrderNumber",
                "excsuffix",
                "excsuffixSku",
                "exceditsku",
                "exceditsalePrice",
                "exceditnum",
                "exceditcurrency",
                "editskuChinese"
            ];

            this.props.form.validateFields(parameter, (err, values) => {
                if (!err) {
                    const params = {
                        currency: values.exceditcurrency,
                        decoration: values.excsuffixSku && values.excsuffixSku.toUpperCase(),
                        decorationType: values.excsuffix,
                        id: this.props.tablemodel2.productId || 0,
                        num: values.exceditnum,
                        orderId: values.yksOrderNumber,
                        salePrice: values.exceditsalePrice,
                        sku: values.exceditsku,
                        skuChinese: values.editskuChinese,
                    };

                    axios.post(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/updateGoodsForOrder`, params)
                        .then(response => {
                            const state = response.data.state;
                            if (state === '000001') {
                                message.success(`${response.data.msg}`);
                                this.getProductInfo()
                            } else {
                                message.error(`${response.data.msg}`);
                            }
                            this.props.modalmodelaction({revisedproductvisible: false})
                        }).catch(e => {
                        console.log(e);
                    })
                }
            });
        }, 600);
    };


    getProductInfo = () => {
        const params = {
            orderId: this.props.form.getFieldValue("yksOrderNumber")
        };
        axios.post(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/getOrderSkuList`, params)
            .then(response => {
                const state = response.data.state;
                if (state === '000001') {
                    this.setProductInfo(response.data.data)
                } else {
                    message.error(`${response.data.msg}`);
                }
            }).catch(e => {
            console.log(e);
        })
    };

    fileListhanddle = (list) => {
        return list ? list.split('@').map((v, i) => ({
            uid: i,
            name: `${i}`,
            status: 'done',
            url: `${v}`,
        })) : []
    };

    /**
     * 作者：魏洁
     * 描述：设置 商品信息
     * 时间：2018-4-17
     * @param <Object> data
     */
    setProductInfo = (productInfoarr) => {

        const newproductInfoarr = productInfoarr.length ? productInfoarr.map((v, i) => {

            return ({
                key: ++i + '',
                No: i + '',
                id: v.id,
                itemId: v.itemId,
                record: v,
                upper: productInfoarr,
                onlineSkuCode: v.onlineSkuCode,
                name: v.name,
                img: {
                    name: `img${v.key}`,
                    initialValue: this.fileListhanddle(v.img.replace(/^http[s]?\:/, '')),
                    message: '请上传图片',
                    placeholder: '请上传图片',
                    num: 0,
                },
                sku: {
                    name: `sku${v.key}`,
                    initialValue: v.sku,
                    message: '请输入规格',
                    placeholder: '规格',
                },
                unit: {
                    name: `unit${v.key}`,
                    initialValue: v.unit,
                    message: '请输入销售单价',
                    placeholder: '销售单价',

                },
                num: {
                    name: `num${v.key}`,
                    initialValue: v.num,
                    message: '请输入销售数量',
                    placeholder: '销售数量',

                },
                amount: {
                    name: `amount${v.key}`,
                    initialValue: v.amount,
                    message: '请输入销售金额',
                    placeholder: '销售金额',

                },
                Operation: '删除',
            })
        }) : [];

        this.props.tablemodelaction2({
            data2: newproductInfoarr,
            count: newproductInfoarr.length + 1,
            upper: productInfoarr
        })
    };

    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const {data2} = this.props.tablemodel2;
        const columns = this.columns;

        const content = (
            <Addproduct
                {...this.props}
            />
        );

        const revisedcontent = (
            <Revisedproduct
                {...this.props}
                visible={this.props.modalmodel.revisedproductvisible}
            />
        );


        return (
            <div className="newCluenk exc-product">
                <div className="title pr">
                    商品信息
                    {functions(this, '001-000002-000002-000001-005') ? <Button
                        className="editable-add-btn"
                        onClick={this.handleAddshow('addproductvisible')}>添加商品</Button> : null}
                </div>
                <div className="content">

                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={data2}
                        bordered
                        footer={null}
                    />

                    <Modalmodel  {...{
                        ...this.props.modalmodel,
                        visible: this.props.modalmodel.visible2,
                        ModalText: '确认删除吗?',
                    }}
                                 onOk={this.ModalhandleOk2}
                                 confirmLoading={this.props.modalmodel.confirmLoading}
                                 onCancel={this.ModalhandleCancel('visible2')}/>

                    {/*添加商品-弹窗*/}
                    <Modalmodel
                        {
                            ...{
                                ...this.props.modalmodel,
                                visible: this.props.modalmodel.addproductvisible,
                                ModalText: content,
                                title: this.props.tablemodel2.title
                            }
                        }
                            onOk={this.handleAdd}
                            destroyOnClose
                            confirmLoading={this.props.modalmodel.confirmLoading}
                            onCancel={this.ModalhandleCancel('addproductvisible')}
                    />

                    {/*修改-弹窗*/}
                    <Modalmodel
                        {
                            ...{
                                ...this.props.modalmodel,
                                visible: this.props.modalmodel.revisedproductvisible,
                                ModalText: revisedcontent,
                                title: this.props.tablemodel2.title
                            }
                        }
                            onOk={this.getmodificationdata}
                            destroyOnClose
                            confirmLoading={this.props.modalmodel.confirmLoading}
                            onCancel={this.ModalhandleCancel('revisedproductvisible')}
                    />

                    {/* 图片预览 - 弹窗 */}
                    <Modalmodel  {...{
                        ...this.props.modalmodel,
                        visible: this.props.modalmodel.previewVisible,
                        title: '',
                        width: '650px',
                        style: {'maxWidth': '100%'}
                    }} footer={null} onCancel={this.handleCancel2('previewVisible')}
                                 ModalText={(
                                     <img alt='example' style={{'maxWidth': '100%'}}
                                          src={this.props.modalmodel.previewImage}/>)}/>
                </div>
            </div>
        );
    }
}

export default ProductInfo
