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
import * as config from "../../../util/connectConfig";

const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
import Modalmodel from './Modalmodel'
import {levelOptions} from "../../../util/options";
import {timestampFromat} from "../../../util/baseTool";

class ProductInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }
    state = {
        readonly: true,
        numb1: {len: 0, color: ''},
        numb2: {len: 0, color: ''},
        numb3: {len: 0, color: ''},
        brandSelectorVisible: false,
        categorySelectorVisible: false,
        Selectortype: 'multiple',
        formloading: true,
    }


    addselectdata2 = ({name, message, initialValue = undefined, placeholder = ''}) => (
        <FormItem style={{width: '100%'}} {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                rules: [{required: false, message: message}], initialValue: initialValue
            })(
                <Select style={{width: '100%'}} placeholder="请选择">
                    {levelOptions('品牌类型').map(item => {
                        return (
                            <Option key={item.value} value={item.value}
                            >
                                {item.label}
                            </Option>
                        )
                    })}
                </Select>
            )}
        </FormItem>)

    upIcon = (<Icon type="plus" className="avatar-uploader-trigger"/>)

    uploadicon = (id, num, ic = this.upIcon) =>
        this.props.form.getFieldValue(id) && this.props.form.getFieldValue(id).length >= num ? null : ic

    normFile = (e) => {

        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    uploadonChange = (info) => {
        const status = info.file.status;
        const response = info.file.response;
        if (status === 'done') {
            message.success(`${info.file.name} 图片上传成功.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} 图片上传失败.`);
        }
    }

    handlePreview = (file) => {

        this.props.modalmodelaction({
            previewVisible: true,
            previewImage: file.url || file.thumbUrl,
        });

    }

    uploadsprops2 = {
        name: 'Filedata',
        listType: 'picture-card',
        className: 'upload-list-inline',
        onPreview: this.handlePreview,
        multiple: true,
        accept: 'image/*',
        beforeUpload: this.beforeUpload,
        action: `${config.api_url}/upload?type=approveLicensePic`,
    }

    adduploaddata = ({name, message, initialValue = [], placeholder = '', num = 0}) => {
        const newname = name.replace(/(.*?)s(\d+)$/g, '$1$2')
        return (<FormItem style={{width: '100%'}} {...{
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
    }

    addinputdata = ({name, message, placeholder = '', initialValue = '', required = false, type = 'string',}) => (
        <FormItem style={{width: '100%'}} {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                rules: [{required: required, message: message, type: type}, {
                    validator: this.contactsvalid,
                }], initialValue: initialValue,
                onChange: name.match(/^remark/g) ? this.companyIntroductionHandle(name, 30) : null,
            })(
                <Input  readOnly="true" placeholder={placeholder} style={{width: '100%'}} maxLength="30"/>
            )}
        </FormItem>)

    Modalshow2 = (index) => () => {
        this.props.modalmodelaction({visible2: true,})
        this.props.tablemodelaction2({delkey2: index,})
    }

    columns = [
        {
            title: '缩略图',
            className: 'column-img',
            dataIndex: 'image',
            width: 100,
            render: this.adduploaddata,
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            render: this.addinputdata,
            render: (text, record, index) => {
                const itemId = record.record.itemId ? <p key={4} className="sku-flex"><span className="sku-left">itemId：</span><span className="sku-font">{record.record.itemId}</span></p> : ''
                return (<div className="tl marginLeft-15">
                    {/* <p key={5} className="sku-flex"><span className="sku-left">平台单号：</span><span className="sku-font">{this.props.Infos.platformOrderNumber.value}</span></p> */}
                    <p key={1} className="sku-flex"><span className="sku-left">SKU编码：</span><span className="sku-font">{record.record.sku}</span></p>
                    <p key={2} className="sku-flex"><span className="sku-left">采购名称：</span><span className="sku-font">{record.record.skuName}</span></p>
                    {itemId}
                </div>)
            }
        },
        {
            title: '成本价',
            dataIndex: 'costPrice',
            render: this.addinputdata,
            width: 140,
        },
        {
            title: '打包后重量',
            dataIndex: 'weight',
            render: this.addinputdata,
            width: 140,
        },{
            title: 'SKU物流属性',
            dataIndex: 'logisticsProperty',
            render: (text, record, index) => text,
        },
        {
            title: '储位',
            dataIndex: 'productsPlace',
            render: this.addinputdata,
            width: 120,
            render:(text,record)=>{
                if(!text.initialValue && typeof(text.initialValue) != "undefined" && text.initialValue != 0 ){
                    return (<p className="colorRed">SKU无储位</p>)
                }else{
                    return (<p>{text.initialValue}</p>)
                }
            }
        },
        {
            title: '销售单价',
            dataIndex: 'salePrice',
            render: this.addinputdata,
            width: 140,

        },
        {
            title: '销售数量',
            dataIndex: 'salenum',
            render: this.addinputdata,
            width: 80,
        },
        // {
        //     title: '试算包裹销售价',
        //     dataIndex: 'totalMoney',
        //     width: 140,
        //     render: this.addinputdata,
        // },
    ];

    companyIntroductionHandle = (n, v) => (e) => {
        const {value} = e.target;
        var len = value.length
        const reg = new RegExp('(.{' + v + '}).*', 'g');
        var color = ''
        if (len > v) {
            e.target.value = e.target.value.replace(reg, '$1');
            len = v
            color = "#ff0000";
        }
        this.setState({[n]: {len: len, color: color}})
    }

    ModalhandleOk2 = () => {
        const data2 = [...this.props.tablemodel2.data2];
        const delkey2 = this.props.tablemodel2.delkey2;
        data2.splice(delkey2, 1);
        this.props.modalmodelaction({ModalText: '删除中···', confirmLoading: true,})
        setTimeout(() => {
            this.props.tablemodelaction2({data2: data2,});
            this.props.modalmodelaction({
                visible2: false,
                confirmLoading: false,
            });

        }, 500);
    }
    ModalhandleCancel = (value) => () => {
        this.props.modalmodelaction({[value]: false})
    }

    handleAdd2 = () => {
        const {count, data2} = this.props.tablemodel2;
        const newData = {
            key: count + '',
            No: count + '',
            img: {name: 'img' + count, message: '缩略图', placeholder: '缩略图', num: 3,},
            Specification: {name: 'Specification' + count, message: '规格', placeholder: '规格',},
            unit: {name: 'unit' + count, message: '销售单价', placeholder: '销售单价',},
            num: {name: 'num' + count, message: '销售数量', placeholder: '销售数量',},
            amount: {name: 'amount' + count, message: '销售金额', placeholder: '销售金额',},
            Operation: '删除',
        };

        this.props.tablemodelaction2({data2: [...data2, newData], count: count + 1,})
    }


    handleCancel2 = (visible) => () => this.props.modalmodelaction({[visible]: false,})

    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        const {data2} = this.props.tablemodel2;
        const columns = this.columns;

        return (
            <div className="newCluenk newCluenkTable">
                <div className="title">产品信息</div>
                <div className="content">

                    <Table
                        columns={columns}
                        pagination={false}
                        bordered
                        dataSource={data2}
                        />

                    <Modalmodel  {...{
                        ...this.props.modalmodel,
                        visible: this.props.modalmodel.visible2,
                        ModalText: '确认删除吗?',
                    }}
                                 onOk={this.ModalhandleOk2}
                                 confirmLoading={this.props.modalmodel.confirmLoading}
                                 onCancel={this.ModalhandleCancel('visible2')}/>

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
