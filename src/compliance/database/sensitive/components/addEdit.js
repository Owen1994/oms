import React, { Component } from 'react';
import { Input, Form, Select, Row, Col } from 'antd';
import Disableinfo from '../../../common/components/Disableinfo-new';

import {
    getIntellctualCode,
    getDisableInfoTabel
} from '../../../common/request/index';
import { infringementEvadingType } from "../constants";
import { path } from '../../../configs';
import { UPLOAD_URL } from '../../../../constants/Api'

import { fetchPost } from '../../../../util/fetch';
import renderForm from '../../../common/utils/render-form';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

import { getPlatform, getCountry, getTrademark, grade } from '../../../data';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            platform: [],   // 销售平台
            country: [],    // 国家
            trademark: [],
            intellectualCodeList: [],
            disabled: false,
            disableInfo: [],
            selectInfringementsEvadingType: ''
        };
    }
    componentDidMount() {
        const { item } = this.props;
        if (item) {
            // if (item.source === '爬虫系统') {
            //     this.setState({
            //         disabled: true
            //     })
            // }
            this.getDetail()
        }
        getCountry().then((result) => {
            this.setState({ country: result })
        });
        getTrademark().then((result) => {
            this.setState({ trademark: result })
        });
        getPlatform().then((result) => {
            this.setState({ platform: result })
        });
        getIntellctualCode().then((result) => {
            if (result.data.length) {
                const arr = [{ value: '0', label: '请选择' }]
                const newArr = arr.concat(result.data)
                this.setState({ intellectualCodeList: newArr })
            }
        });
    }
    getDetail = () => {
        if (this.props.item.id) {
            let params = {}
            params.id = this.props.item.id
            fetchPost(path.irp + 'GetSensitiveDetail/getSensitiveDetail', params).then(data => {
                if (data && data.state === "000001") {
                    const dataObj = data.data
                    if (dataObj.intellectualCodeId) {
                        dataObj.intellectualCodeId = dataObj.intellectualCodeId + ''
                    } else {
                        dataObj.intellectualCodeId = '0'
                    }
                    if (dataObj.registerCountryId) {
                        dataObj.registerCountryId = dataObj.registerCountryId.map(item => item + '')
                    }
                    // if (dataObj.trademarkId) {
                    //     dataObj.trademarkId = dataObj.trademarkId.map(item=> item + '')
                    // }
                    this.props.form.setFieldsValue({
                        registerCountryId: dataObj.registerCountryId,
                        intellectualCodeId: dataObj.intellectualCodeId,
                        obligee: dataObj.obligee,
                        remarks: dataObj.remarks,
                        sensitive: dataObj.sensitive,
                        trademarkId: dataObj.trademarkId,
                        trademarkNumber: dataObj.trademarkNumber,

                        sensitive: dataObj.sensitive,
                        trademarkId: dataObj.trademarkId,
                        trademarkNumber: dataObj.trademarkNumber,

                        infringementsEvading: dataObj.infringementsEvading === 0 ? undefined : dataObj.infringementsEvading + '',
                        infringementsEvadingContent: dataObj.infringementsEvadingContent,
                        isAuthorizations: dataObj.isAuthorizations + '',
                        image: dataObj.image,
                        imageCategory: dataObj.imageCategory,
                    })
                    this.setState({ selectInfringementsEvadingType: dataObj.infringementsEvading + "" })
                    if (dataObj.disableInfo) {
                        this.setState({ disableInfo: dataObj.disableInfo })
                    }
                } else {
                    message.error(data.msg)
                }
            })
        }
    }
    handleChange = (value) => {
        if (value === '0') return
        this.postDisableInfoRequest(value)
    }
    postDisableInfoRequest = (intellectualCodeId) => {
        if (!intellectualCodeId) return
        const values = this.props.form.getFieldsValue()
        let params = { intellectualCodeId: intellectualCodeId, countryId: values.registerCountryId }
        getDisableInfoTabel(params).then((data) => {
            if (data.state = '000001') {
                this.setState({ disableInfo: data.disableInfo })
            }
        });
    }
    handleRegisterCountryChange = (value) => {
        if (!value.length) {
            // this.setState({disableInfo: []}, this.addSensitiveLayer)
            // this.props.form.setFieldsValue({intellectualCodeId: []})
            return
        }
        const values = this.props.form.getFieldsValue()
        if (!values.intellectualCodeId || values.intellectualCodeId === '0') return
        let params = { intellectualCodeId: values.intellectualCodeId, countryId: value }
        getDisableInfoTabel(params).then((data) => {
            if (data.state = '000001') {
                // if (data.disableInfo && data.disableInfo.length === 0) {
                //     this.setState({ disableInfo: data.disableInfo })
                // } 
                // else {
                this.setState({ disableInfo: data.disableInfo })
                // 手动设置disableInfo组件表单值
                //     if (data.disableInfo && data.disableInfo.length) {
                //         this.manualOpertion(data)
                //     }
                // }
            }
        });
    }
    selectInfringementsEvading = (value) => {
        if (value === '1') {
            this.props.form.setFieldsValue({
                infringementsEvadingContent: undefined
            })
        }
        this.setState({ selectInfringementsEvadingType: value })
    }
    render() {
        const { item } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { intellectualCodeList, country, trademark, disabled } = this.state;
        if (item) {
            if (!item.salePlatform) item.salePlatform = [];
            if (!item.infringementsEvading) item.infringementsEvading = undefined;
        }

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 12 },
        };
        const imageItemLayout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 18,
            },
        }
        const formItems = [
            {
                label: '侵权规避',
                key: 'infringementsEvading',
                type: 'XSelect',
                formItemLayout: {
                    labelCol: { span: 12 },
                    wrapperCol: { span: 12 },
                },
                placeholder: '选择',
                colSpan: 8,
                otherProps: {
                    options: infringementEvadingType,
                    onChange: this.selectInfringementsEvading
                },
            },
            {
                label: '',
                key: 'infringementsEvadingContent',
                placeholder: '请输入内容',
                type: 'Input',
                colSpan: 8,
                formItemLayout: {
                    wrapperCol: {
                        offset: 1,
                        span: 23,
                    },
                },
                option: {
                    rules: [
                        {
                            required: this.state.selectInfringementsEvadingType === '2' ? true : false,
                            message: '请输入内容'
                        },
                    ],
                },
                otherProps: {
                    disabled: this.state.selectInfringementsEvadingType === '1' ? true : false
                },
            },
            {
                label: '是否授权',
                type: 'XSelect',
                key: 'isAuthorizations',
                placeholder: '请选择',
                colSpan: 24,
                formItemLayout,
                style: { width: '200px' },
                otherProps: {
                    options: [
                        {
                            key: 1,
                            value: "已授权"
                        }, {
                            key: 2,
                            value: "未授权"
                        }
                    ]
                },
                option: {
                    rules: [
                        {
                            required: true,
                            message: '请选择'
                        },
                    ],
                }
            },
            {
                label: '参考图片',
                key: 'image',
                type: 'PhotoUpload',
                colSpan: 24,
                formItemLayout: imageItemLayout,
                otherProps: {
                    action: UPLOAD_URL,
                },
            },
            {
                label: '图片类型',
                key: 'imageCategory',
                placeholder: '请输入图片类型',
                type: 'Input',
                colSpan: 24,
                formItemLayout,
                option: {
                    rules: [{ max: 40, message: '最多输入40个字符' },],
                },
            }
        ]
        return (
            <div className="sensitive-detail">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="商标名"
                    >
                        {getFieldDecorator('sensitive', {
                            rules: [{
                                required: true, message: '请输入商标名.',
                            }],
                        })(
                            <Input disabled={disabled} placeholder={'请输入商标名'} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="注册国家"
                    >
                        {getFieldDecorator('registerCountryId', {
                            rules: [{
                                required: true,
                                message: '请选择注册国家，支持多选.',
                                type: 'array'
                            }],
                        })(
                            <Select
                                mode="multiple"
                                allowClear
                                placeholder="请选择注册国家"
                                disabled={disabled}
                                onChange={this.handleRegisterCountryChange}
                                showSearch
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {
                                    country.map((item, index) => (
                                        <Option key={index} value={item.key + ''}>{item.value}</Option>
                                    ))


                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="知产代码"
                    >
                        {getFieldDecorator('intellectualCodeId', {
                        })(
                            <Select
                                showSearch
                                placeholder="请选择知产代码"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                disabled={disabled}
                                onChange={this.handleChange}
                            >
                                {
                                    intellectualCodeList.map((item, index) => (
                                        <Option key={index} value={item.value + ''}>{item.label}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                    <Disableinfo
                        mode="replace"
                        defaultItem={1}
                        getRef={this.props.getRef}
                        form={this.props.form}
                        setValue={this.state.disableInfo}
                    />
                    <FormItem
                        {...formItemLayout}
                        label="商标商品分类"
                    >
                        {getFieldDecorator('trademarkId', {
                            rules: [{
                                required: true, message: '请选择商标商品分类，支持多选.',
                            }],
                        })(
                            <Select
                                mode="multiple"
                                allowClear
                                placeholder="请选择商标商品分类"
                                showSearch
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                disabled={disabled}
                            >
                                {
                                    trademark.map((item, index) => (
                                        <Option key={index} value={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="权利人"
                    >
                        {getFieldDecorator('obligee', {
                            rules: [
                                { max: 200, message: '最多输入200个字符' },
                            ],
                        })(
                            <Input disabled={disabled} placeholder={'请输入权利人'} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="商标号"
                    >
                        {getFieldDecorator('trademarkNumber', {
                        })(
                            <Input disabled={disabled} placeholder={'请输入商标号'} />
                        )}
                    </FormItem>
                    {renderForm(formItems, this.props.form)}
                    <FormItem
                        {...formItemLayout}
                        label="备注"
                    >
                        {getFieldDecorator('remarks', {
                        })(
                            <Input maxLength={1000} placeholder={'请输入备注'} />
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create()(Detail);