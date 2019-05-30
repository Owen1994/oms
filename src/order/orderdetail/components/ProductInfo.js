import React, {Component} from 'react'
import {render} from 'react-dom'
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
} from 'antd'
import '../css/css.css'

const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
import Modalmodel from '@/components/modalmodel'
import {
    getUrlParams,
} from 'util/baseTool';
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
    }

    componentDidUpdate(prevProps) {
        const oldProductData = prevProps.tablemodel2.data2;
        const newProductData = this.props.tablemodel2.data2;
        const { updateProductFlag } = this.props;
        if(oldProductData !== newProductData && oldProductData.length === 0 && newProductData.length > 0 && Number(updateProductFlag) === 1 ) {
            this.columns.push({
                title: '操作',
                width: 140,
                dataIndex: 'Operation',
                render: (text, record, index) => {
                    return record.record.canUpdate === 1 ? (
                        <div>
                            <a className={'viewbtn ml5'}
                                        onClick={this.handleAddshow2('revisedproductvisible', 2, record, index)}>修改</a>
                            <a className={'viewbtn margin-ss-left'} onClick={this.Modalshow2(index)}>删除</a>
                        </div>
                    ) : null
                },
            });
        }
    }

    /**
     * 判断是否允许修改或删除
     */
    // updateOrDelete = () => {
    //     const { data2 } = this.props.tablemodel2;
    //     const arr = data2.map(it => it.record.canUpdate);
    //     const firstIndex = arr.indexOf(1);
    //     const lastIndex = arr.lastIndexOf(1);
    //     if( firstIndex !== -1 && lastIndex !== -1 && firstIndex === lastIndex) {
    //         this.columns.push({
    //             title: '操作',
    //             width: 140,
    //             dataIndex: 'Operation',
    //             render: (text, record, index) => {
    //                 return record.record.canUpdate === 1 ? (
    //                     <div>
    //                         <a className={'viewbtn ml5'}
    //                                     onClick={this.handleAddshow2('revisedproductvisible', 2, record, index)}>修改</a>
    //                         <a className={'viewbtn margin-ss-left'} onClick={this.Modalshow2(index)}>删除</a>
    //                     </div>
    //                 ) : null
    //             },
    //         })
    //     }
    // }

    // upIcon = (<Icon type="plus" className="avatar-uploader-trigger"/>)

    // uploadicon = (id, num, ic = this.upIcon) =>
    //     this.props.form.getFieldValue(id) && this.props.form.getFieldValue(id).length >= num ? null : ic

    // normFile = (e) => {

    //     if (Array.isArray(e)) {
    //         return e;
    //     }
    //     return e && e.fileList;
    // }

    // uploadonChange = (info) => {
    //     const status = info.file.status;
    //     const response = info.file.response;
    //     if (status === 'done') {
    //         message.success(`${info.file.name} 图片上传成功.`);
    //     } else if (status === 'error') {
    //         message.error(`${info.file.name} 图片上传失败.`);
    //     }
    // }

    handlePreview = (file) => {
        this.props.modalmodelaction({
            previewVisible: true,
            previewImage: file.url || file.thumbUrl,
        });

    }

    // uploadsprops2 = {
    //     name: 'Filedata',
    //     listType: 'picture-card',
    //     className: 'upload-list-inline',
    //     onPreview: this.handlePreview,
    //     onRemove:()=>false,
    //     multiple: true,
    //     accept: 'image/*',
    //     beforeUpload: this.beforeUpload,
    //     action: `${config.api_url}/upload?type=approveLicensePic`,
    // }

    // adduploaddata = ({name, message, initialValue = [], placeholder = '', num = 1}) => {
    //     const newname = name.replace(/(.*?)s(\d+)$/g, '$1$2')
    //     return (<FormItem className="widthAll" {...{
    //         ...this.formItemLayout, ...{
    //             wrapperCol: {
    //                 span: 24,
    //             }
    //         }
    //     }}>
    //         {this.props.form.getFieldDecorator(name, {
    //             rules: [{required: false, message: message}],
    //             onChange: this.uploadonChange,
    //             valuePropName: 'fileList',
    //             getValueFromEvent: this.normFile,
    //             initialValue: initialValue,
    //         })(
    //             <Upload {...this.uploadsprops2} >
    //                 {this.uploadicon(name, num)}
    //             </Upload>
    //         )}


    //     </FormItem>)
    // }

    // 打开删除弹窗并删除
    Modalshow2 = (index) => () => {
        this.props.modalmodelaction({visible2: true,})
        this.props.tablemodelaction2({delkey2: index,})
    }

    

    columns = [{
            title: '序号',
            dataIndex: 'No',
            width: 50,
            render: text => text,
        }, {
            title: '缩略图',
            className: 'column-img',
            dataIndex: 'img',
            width: 160,
            // render: this.adduploaddata,
            render: (text, record, index) => {
                const imgUrl = record.record.img;
                return imgUrl ? <img src={imgUrl} className="orderlist-img" /> : null
            }
        }, {
            title: '规格',
            dataIndex: 'sku',
            className: 'tl',
            render: (text, record, index) => {
                return (<div className="tl explain">
                    <p key={5}><span>前后缀：</span>{record.record.skuAffix ? record.record.skuAffix : '--'}</p>
                    <p key={1}><span>SKU编码：</span>{record.record.sku ? record.record.sku.toUpperCase() : '--'}</p>
                    <p key={2}><span>在线商品编码：</span>{record.record.onlineSkuCode ? record.record.onlineSkuCode : '--'}</p>
                    <p key={3}><span>商品名称：</span>{record.record.name}</p>
                    <p key={4}><span>itemId：</span>{record.record.itemId ? record.record.itemId : '--'}</p>
                </div>)
            }
        },
        {
            title: 'SKU物流属性',
            dataIndex: 'logisticsProperty',
            render: (text, record, index) => record.record.logisticsProperty ? `${record.record.logisticsProperty}` : '--',
        },
        {
            title: '打包后重量',
            dataIndex: 'weight',
            render: (text, record, index) => record.record.weight ? `${record.record.weight}` : '--',
        },
        {
            title: '销售单价',
            dataIndex: 'unit',
            render: (text, record, index) => record.record.unit ? `${record.record.currency} ${record.record.unit}` : '--',
            width: 120,
        },
        {
            title: '销售数量',
            dataIndex: 'num',
            render: (text, record, index) => record.record.num ? `${record.record.num}` : '--',
            width: 80,
        },
        {
            title: '销售金额',
            dataIndex: 'amount',
            render: (text, record, index) => record.record.amount ? `${record.record.currency} ${record.record.amount}` : '--',
            width: 100,

        }
    ];

    // companyIntroductionHandle = (n, v) => (e) => {
    //     const {value} = e.target;
    //     var len = value.length
    //     const reg = new RegExp('(.{' + v + '}).*', 'g');
    //     var color = ''
    //     if (len > v) {
    //         e.target.value = e.target.value.replace(reg, '$1');
    //         len = v
    //         color = "#ff0000";
    //     }
    //     this.setState({[n]: {len: len, color: color}})
    // }

    // 删除
    handleDelete = () => {
        const data2 = [...this.props.tablemodel2.data2];
        const delkey2 = this.props.tablemodel2.delkey2;
        data2.splice(delkey2, 1);
        this.props.modalmodelaction({ModalText: '删除中···', confirmLoading: true,})
        setTimeout(() => {
            this.props.tablemodelaction2({ data2 });
            this.props.modalmodelaction({
                visible2: false,
                confirmLoading: false,
            });

        }, 500);
    }

    // 关闭弹窗
    ModalhandleCancel = (value) => {
        this.props.modalmodelaction({[value]: false});
        this.props.tablemodelaction2({ extraData: {} });
    }

    // 新增商品弹窗 - 确定
    handleAdd2 = () => {
        const validateArr = ['skuAffixType', 'skuAffix', 'addsku', 'skuChinese', 'addsalePrice', 'addnum', 'addcurrency'];
        this.props.form.validateFieldsAndScroll(validateArr, (err, values) => {
            if(!err) {
                const { count, data2, extraData } = this.props.tablemodel2;
                const v = {
                    sku: values.addsku,
                    skuAffixType: values.skuAffixType || '1',
                    skuAffix: values.skuAffix,
                    name: values.skuChinese,
                    unit: values.addsalePrice,
                    num: values.addnum,
                    currency: values.addcurrency,
                    canUpdate: 1,   // 新增的商品允许修改删除
                    logisticsProperty: extraData.skuLogisticsProperty ? extraData.skuLogisticsProperty : '--',
                    weight: extraData.skuClearWeight ? extraData.skuClearWeight : '--',
                    amount: values.addsalePrice || Number(values.addsalePrice) === 0 && values.addnum || Number(values.addnum) === 0 ? (Number(values.addsalePrice) * Number(values.addnum)).toFixed(2) : 0,
                };
                const newData = {
                    key: count + '',
                    No: count + '',
                    record: v,
                    img: {name: 'img' + count, message: '缩略图', placeholder: '缩略图', num: 3,},
                    sku: {name: 'sku' + count, message: '规格', placeholder: '规格', initialValue: values.addsku},
                    unit: {name: 'unit' + count, message: '销售单价', placeholder: '销售单价', initialValue: values.addsalePrice},
                    num: {name: 'num' + count, message: '销售数量', placeholder: '销售数量', initialValue: values.addnum},
                    amount: {name: 'amount' + count, message: '销售金额', placeholder: '销售金额'},
                    Operation: '删除',
                };
                // SKU相同时只替换原有SKU的数量和售价
                const arr = data2.map(it => it.record.sku);
                const index = arr.indexOf(v.sku);
                if(index !== -1){
                    data2[index].record.unit = v.unit;  // 售价
                    data2[index].record.num = v.num;    // 数量
                    data2[index].record.amount = (Number(v.unit) * Number(v.num)).toFixed(2);
                    this.props.tablemodelaction2({ data2 });
                } else {
                    this.props.tablemodelaction2({data2: [...data2, newData], count: count + 1,});
                }
                this.ModalhandleCancel('addproductvisible');
            }
        });
    }

    // 关闭图片预览弹窗
    handleCancel2 = (visible) => () => this.props.modalmodelaction({[visible]: false,})

    // 打开弹窗
    handleAddshow2 = (key, type = 1, record, index = 0) => () => {
        const title = type === 1 ? '添加商品' : '修改商品';
        this.props.tablemodelaction2({
            title,
            index,
        });
        this.props.modalmodelaction({[key]: true});
        // this.props.baseInfoForm({productInfoStatus: true});
    };

    // 修改弹窗 - 确定
    getmodificationdata = () => {
        const { getFieldValue } = this.props.form;
        const { index, data2 } = this.props.tablemodel2;
        const skuAffixType = data2[index].record.skuAffixType;
        const skuAffix = data2[index].record.skuAffix ? data2[index].record.skuAffix : '';
        if (skuAffixType !== '1' || skuAffix.length > 0) {
            PopConfirm('前后缀提示', '当前SKU发现了海外仓前后缀，请确认当前SKU前后缀填写是否正确！避免海外仓订单到国内仓发货！', () => {
                    this.handleModificationData();
                }
            );
        } else {
            this.handleModificationData();
        }
    };

    // 修改产品信息方法
    handleModificationData = () => {
        const validateArr = ['onlineSku', 'excsuffix', 'excsuffixSku', 'exceditsku', 'editskuChinese', 'exceditsalePrice', 'exceditnum'];
        this.props.form.validateFieldsAndScroll(validateArr, (err, values) => {
            if(!err) {
                const { index, data2, extraData } = this.props.tablemodel2;
                const v = {
                    'onlineSkuCode': values.onlineSku,
                    'skuAffixType': values.excsuffix || '1',
                    'skuAffix': values.excsuffixSku,
                    'sku': values.exceditsku,
                    'name': values.editskuChinese,
                    'unit': values.exceditsalePrice,
                    'num': values.exceditnum,
                    'currency': 'USD',
                    'canUpdate': 1,
                    'logisticsProperty': extraData.skuLogisticsProperty ? extraData.skuLogisticsProperty : '--',
                    'weight': extraData.skuClearWeight ? extraData.skuClearWeight : '--',
                    'amount': values.exceditsalePrice || Number(values.exceditsalePrice) === 0 && values.exceditnum || Number(values.exceditnum) === 0 ? (Number(values.exceditsalePrice) * Number(values.exceditnum)).toFixed(2) : 0,
                
                };
                const data = data2[index].record;
                Object.keys(v).forEach(item => {
                    if((data[item] || data[item] === undefined) && (v[item] || v[item] === undefined) && data[item] !== v[item]) {
                        data[item] = v[item];
                    }
                })
                this.props.tablemodelaction2({ data2 });
                this.ModalhandleCancel('revisedproductvisible');
            }
        });
    };

    render() {

        const { data2 } = this.props.tablemodel2;
        const columns = this.columns;
        const updateProductFlag = getUrlParams(location.href).updateProductFlag;
        return (
            <div className="newCluenk">
                <div className="title">
                    产品信息
                    {
                        Number(updateProductFlag) === 1 ? 
                            <Button
                                className="orderlist-add-btn"
                                onClick={this.handleAddshow2('addproductvisible')}>添加商品</Button>
                        : null
                    }
                </div>
                <div className="content">

                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={data2}
                        bordered
                        footer={null}
                    />

                    {/*添加商品-弹窗*/}
                    <Modalmodel
                        {
                            ...{
                                ...this.props.modalmodel,
                                visible: this.props.modalmodel.addproductvisible,
                                ModalText: <Addproduct {...this.props} />,
                                title: this.props.tablemodel2.title
                            }
                        }
                            onOk={this.handleAdd2}
                            destroyOnClose
                            confirmLoading={this.props.modalmodel.confirmLoading}
                            onCancel={() => this.ModalhandleCancel('addproductvisible')}
                    />

                    {/*修改-弹窗*/}
                    <Modalmodel
                        {
                            ...{
                                ...this.props.modalmodel,
                                visible: this.props.modalmodel.revisedproductvisible,
                                ModalText: <Revisedproduct
                                                {...this.props}
                                                visible={this.props.modalmodel.revisedproductvisible}
                                            />,
                                title: this.props.tablemodel2.title
                            }
                        }
                            onOk={this.getmodificationdata}
                            destroyOnClose
                            confirmLoading={this.props.modalmodel.confirmLoading}
                            onCancel={() => this.ModalhandleCancel('revisedproductvisible')}
                    />

                    {/* 删除弹窗 */}
                    <Modalmodel  {...{
                        ...this.props.modalmodel,
                        visible: this.props.modalmodel.visible2,
                        ModalText: '确认删除吗?',
                    }}
                                 onOk={this.handleDelete}
                                 confirmLoading={this.props.modalmodel.confirmLoading}
                                 onCancel={() => this.ModalhandleCancel('visible2')}/>

                    {/* 图片预览弹窗 */}
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
