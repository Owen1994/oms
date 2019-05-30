import React, { Component } from 'react';
import { Row, Col, Form, message, Input, Select, DatePicker } from 'antd';
import PhotoUpload from '../../../common/components/PhotoUpload';

import { UPLOAD_URL } from '../../../../constants/Api'
import {
    getIntellctualCode,
    getCountry,
    getDisableInfoTabel
} from '../../../common/request/index';

import renderForm from '../../../common/utils/render-form';

import Disableinfo from '../../../common/components/Disableinfo-new';

import {
    GET_PATENTPOOL_DETAIL,
    getPatentTypeList
} from "../constants";
import { fetchPost } from '../../../../util/fetch';
import moment from 'moment';
import { path } from '../../../configs';

import '../css/index.css';

const FormItem = Form.Item;
const Option = Select.Option;

class App extends Component {
    state = {
        intellectualCodeList: [],
        countryList: [],
        disableInfo: [],
        dataSource: [],
    }
    componentDidMount() {
        // 获取资产代码
        getIntellctualCode().then((result) => {
            if (result.data.length) {
                const arr = [{ value: '0', label: '请选择' }]
                const newArr = arr.concat(result.data)
                this.setState({ intellectualCodeList: newArr })
            }
        });
        // 获取注册国家
        getCountry().then((result) => {
            this.setState({ countryList: result.data })
        });
        if (this.props.item) {
            this.getDetail()
        }else {
            this.addInfo()
        }
    }
    getDetail() {
        if (this.props.item.id) {
            let params = {}
            params.id = this.props.item.id
            fetchPost(path.irp + 'GetPatentPoolDetail/getPatentPoolDetail', params).then(data => {
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
                    this.props.form.setFieldsValue({
                        productName: dataObj.productName,
                        sku: dataObj.sku,
                        intellectualCodeId: dataObj.intellectualCodeId,
                        registerCountryId: dataObj.registerCountryId,
                        patentAbstract: dataObj.patentAbstract,
                        patentPic: dataObj.patentPic,
                        patentIllustrations: dataObj.patentIllustrations,
                        remark: dataObj.remark,
                    })

                    if (data.data.disableInfo) {
                        this.setState({ disableInfo: dataObj.disableInfo, dataSource: dataObj.patentInfo })
                    }
                } else {
                    message.error('操作失败.')
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
                this.setState({ disableInfo: data.disableInfo || [] })
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
                this.setState({ disableInfo: data.disableInfo || [] })
            }
        });
    }
    addInfo = () => {
        const obj = {}
        obj.patentNumber = ''
        obj.obligee = ''
        obj.patentType = ''
        obj.patentTime = 0
        obj.priorityTime = 0
        obj.patentApplyTime = 0
        obj.patentPic = []
        obj.patentIllustrations = []
        this.state.dataSource.push(obj)
        this.setState({ dataSource: this.state.dataSource })
    }
    deleteInfo = (index) => {
        const values = this.props.form.getFieldsValue()
        values.patentInfo.splice(index, 1);
        this.props.form.setFieldsValue({ patentInfo: values.patentInfo })
        this.setState({ dataSource: values.patentInfo })
    }
    render() {
        const formItemLayout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 12,
            },
        }
        const imageItemLayout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 18,
            },
        }
        const { getFieldDecorator } = this.props.form;
        const infoColumns = [
            {
                title: <span className="require-prefix">专利号</span>,
                dataIndex: 'patentNumber',
                width: 10,
                render: (text, record, index) => (
                    <FormItem>
                        {getFieldDecorator(`patentInfo[${index}].patentNumber`, {
                            initialValue: record.patentNumber ? record.patentNumber : '',
                            rules: [{
                                max: 50,
                                message: "最多输入50个字符.",
                            }, { required: true, message: '必填' },],
                        })(
                            <Input placeholder="专利号" />
                        )}
                    </FormItem>
                )
            },
            {
                title: <span className="require-prefix">权利人</span>,
                dataIndex: 'obligee',
                width: 10,
                render: (text, record, index) => (
                    <FormItem>
                        {getFieldDecorator(`patentInfo[${index}].obligee`, {
                            initialValue: record.obligee ? record.obligee : '',
                            rules: [{
                                max: 200,
                                message: "最多输入200个字符.",
                            }, { required: true, message: '必填' },],
                        })(
                            <Input placeholder="权利人" />
                        )}
                    </FormItem>
                ),
            },
            {
                title: <span className="require-prefix">专利类型</span>,
                dataIndex: 'patentType',
                align: 'center',
                width: 15,
                render: (text, record, index) => (
                    <FormItem className="platform">
                        {getFieldDecorator(`patentInfo[${index}].patentType`, {
                            initialValue: record.patentType ? record.patentType : [],
                            rules: [{ required: true, message: '必填' },],
                        })(
                            <Select
                                style={{ width: '100%', minWidth: "50px" }}
                                placeholder="专利类型"
                                showSearch
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {
                                    getPatentTypeList && getPatentTypeList.map((item, i) => (
                                        <Option key={i} value={item.id} disabled={item.disabled}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                ),
            },
            {
                title: <span className="require-prefix">专利申请日期</span>,
                dataIndex: 'patentApplyTime',
                align: 'center',
                width: 15,
                render: (text, record, index) => (
                    <FormItem>
                        {getFieldDecorator(`patentInfo[${index}].patentApplyTime`, {
                            rules: [{ required: true, message: '必填' },],
                            initialValue: record.patentApplyTime ? moment(record.patentApplyTime) : null,
                        })(
                            <DatePicker
                                format="YYYY-MM-DD"
                            />
                        )}
                    </FormItem>
                ),
            },
            {
                title: '专利过期日期',
                dataIndex: 'patentTime',
                align: 'center',
                width: 15,
                render: (text, record, index) => (
                    <FormItem>
                        {getFieldDecorator(`patentInfo[${index}].patentTime`, {
                            initialValue: record.patentTime ? moment(record.patentTime) : null,
                        })(
                            <DatePicker
                                format="YYYY-MM-DD"
                            />
                        )}
                    </FormItem>
                ),
            },
            {
                title: '优先权日期',
                dataIndex: 'priorityTime',
                align: 'center',
                width: 15,
                render: (text, record, index) => (
                    <FormItem>
                        {getFieldDecorator(`patentInfo[${index}].priorityTime`, {
                            initialValue: record.priorityTime ? moment(record.priorityTime) : null,
                        })(
                            <DatePicker
                                format="YYYY-MM-DD"
                            />
                        )}
                    </FormItem>
                ),
            },
            {
                title: '操作',
                width: 7,
                render: (text, record, index) => (
                    <div>
                        {
                            index === 0 ?
                                (<span className='tableOption' onClick={() => this.addInfo()}>添加</span>
                                ) : <span className='tableOption' onClick={() => this.deleteInfo(index)}>删除</span>
                        }
                    </div>
                ),
            },
        ]

        // {
        //     title: '专利图片',
        //     dataIndex: 'patentPic',
        //     align: 'center',
        //     render: (text, record, index) => (
        //         <FormItem className='detail-patentPics'>
        //             {getFieldDecorator(`patentInfo[${index}].patentPic`,{
        //                 initialValue: record.patentPic? record.patentPic: null,
        //                 rules: [{ required: true, message: '必填' }],
        //             })(
        //                 <PhotoUpload
        //                     action= {UPLOAD_URL}
        //                     maxLength={5}
        //                 />
        //             )}
        //         </FormItem>
        //     ),
        // }, 
        const firstFormItems = [
            {
                label: '专利名称',
                key: 'productName',
                placeholder: '请输入专利名称',
                type: 'Input',
                colSpan: 24,
                formItemLayout,
                option: {
                    rules: [
                        { required: true, message: '必填' },
                        { max: 80, message: '最多输入80个字符' },
                    ],
                },
            }, {
                label: '示例SKU',
                key: 'sku',
                placeholder: '请输入示例SKU',
                type: 'Input',
                colSpan: 24,
                formItemLayout,
                option: {
                    rules: [
                        { max: 2000, message: '最多输入2000个字符' },
                    ],
                },
            },
            , {
                label: '专利摘要',
                key: 'patentAbstract',
                placeholder: '请输入专利摘要',
                type: 'TextArea',
                colSpan: 24,
                formItemLayout,
                option: {
                    rules: [
                        { max: 5000, message: '最多输入5000个字符' },
                    ],
                },
            },
            {
                label: '注册国家',
                type: 'XSelect',
                key: 'registerCountryId',
                placeholder: '请输入注册国家',
                colSpan: 24,
                formItemLayout,
                style: { width: '200px' },
                option: {
                    rules: [
                        { required: true, message: '必填' },
                    ],
                },
                otherProps: {
                    allowClear: true,
                    mode: "multiple",
                    options: this.state.countryList,
                    onChange: this.handleRegisterCountryChange,
                }
            },

            {
                label: '知产代码',
                type: 'XSelect',
                key: 'intellectualCodeId',
                placeholder: '请输入知产代码',
                colSpan: 24,
                formItemLayout,
                style: { width: '200px' },
                otherProps: {
                    options: this.state.intellectualCodeList,
                    onChange: this.handleChange,
                    configKey: 'value',
                    configValue: 'label',
                }
            },
        ]
        const secondFormItem = [
            {
                label: '实物图片',
                key: 'patentPic',
                type: 'PhotoUpload',
                colSpan: 24,
                formItemLayout: imageItemLayout,
                option: {
                    rules: [
                        { required: true, message: '必填' },
                    ],
                },
                otherProps: {
                    action: UPLOAD_URL,
                    maxLength: 5
                },
            },
            {
                label: '专利信息',
                key: 'info',
                formItemLayout: imageItemLayout,
                type: 'Table',
                colSpan: 24,
                className: "patent-table-fixed",
                otherProps: {
                    size: "small",
                    // scroll: {x: '1020px'},
                    bordered: true,
                    columns: infoColumns,
                    dataSource: this.state.dataSource,
                    rowKey: (record, index) => (index),
                    pagination: false
                },
                option: {
                    rules: [
                        { required: true, message: '必填' },
                    ],
                    initialValue: 'a'
                },
            },
            {
                label: '专利图片',
                key: 'patentIllustrations',
                type: 'PhotoUpload',
                colSpan: 24,
                className: "margin-sm-bottom",
                formItemLayout: imageItemLayout,
                option: {
                    rules: [
                        { required: true, message: '必填' },
                    ],
                },
                otherProps: {
                    action: UPLOAD_URL,
                    maxLength: 9
                },
            },
            {
                label: '备注',
                key: 'remark',
                formItemLayout,
                placeholder: '请输入备注',
                type: 'TextArea',
                colSpan: 24,
                option: {
                    rules: [
                        { max: 1000, message: '最多输入1000个字符' },
                    ],
                },
            },
        ]
        return (
            <div className="data-patent-detail">
                <Row gutter={24}>
                    <Col span={24}>
                        {renderForm(firstFormItems, this.props.form)}
                        <Disableinfo
                            mode="replace"
                            defaultItem={1}
                            getRef={this.props.getRef}
                            form={this.props.form}
                            setValue={this.state.disableInfo}
                        />
                        {renderForm(secondFormItem, this.props.form)}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(App);