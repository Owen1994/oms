import React, { Component } from 'react';

import { Input, Form, Select, Radio, Checkbox, message, Row, Col } from 'antd';
import Disableinfo from '../../../common/components/Disableinfo-new';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

import CheckboxInput from '../../../components/CheckboxInput';
import BaseClass from './BaseClass';
import { grade, getSinsitiveReason, getSkuDetail, getCountry, getSite, getAccount } from '../../../data';
import {
    getIntellctualCode,
    getDisableInfoTabel
} from '../../../common/request/index';
// import { GET_SENSITIVESKUDETAIL_DETAIL } from "../constants";
import { path } from "../../../configs";

import { fetchPost } from '../../../../util/fetch';
import { deepCopyobject } from '../../../../util/baseTool';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataInfo: {},           // 详情内容
            reason: [],       // 敏感原因
            country: [],
            intellectualCodeList: [],
            disableInfo: [],

        };
    }

    componentDidMount() {
        if (this.props.getReason) {
            this.props.getReason(this.getReason)
        }
        // this.props.form.getFieldDecorator('reason');
        getCountry().then((result) => {
            this.setState({ country: result })
        });
        getIntellctualCode().then((result) => {
            if (result.data.length) {
                const arr = [{ value: '0', label: '请选择' }]
                const newArr = arr.concat(result.data)
                this.setState({ intellectualCodeList: newArr })
            }
        });
        const { item } = this.props;
        if (item) {
            this.getDetail()
        }
    }

    getDefaultReason = () => deepCopyobject(getSinsitiveReason).filter(v => v.id !== 0 && v.id !== 4)

    getSinsitiveReason = this.getDefaultReason()

    getReason = () => {
        let arr = []
        this.getSinsitiveReason.forEach(v => {
            if (v.isChecked) {
                arr.push({
                    id: v.id,
                    remarks: v.inputValue || ""
                })
            }
        })
        return arr
    }

    getDetail = () => {
        if (this.props.item.id) {
            let params = {}
            params.id = this.props.item.id
            const { setFieldsValue } = this.props.form
            fetchPost(path.irp + 'GetSensitiveSkuDetail/getSensitiveSkuDetail', params).then(data => {
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
                    setFieldsValue({
                        isSensitive: dataObj.isSensitive,
                        sku: dataObj.sku,
                        remarks: dataObj.remarks,
                        source: dataObj.source,
                    })
                    this.setState(
                        { reason: dataObj.reason, disableInfo: dataObj.disableInfo, dataInfo: dataObj },
                        () => {
                            let data = {}
                            if (dataObj.isSensitive === 1) {
                                data.registerCountryId = dataObj.registerCountryId
                                data.intellectualCodeId = dataObj.intellectualCodeId
                                if (dataObj.reason && dataObj.reason.length) {
                                    dataObj.reason.forEach(v => {
                                        let data = this.getSinsitiveReason.find(val => val.id === v.id);
                                        if (data) {
                                            data.isChecked = true;
                                            data.inputValue = v.remarks
                                        }
                                    })
                                }
                            }
                            this.props.form.setFieldsValue({
                                ...data
                            })
                        }
                    )

                }
            })
        }
    }
    add = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        let uuid = keys[keys.length - 1];
        uuid++;
        const nextKeys = keys.concat(uuid);
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    // 获取敏感原因
    onChangeCheckbox = (event, obj) => {
        let index;
        const { reason } = this.state;
        for (var key in reason) {
            if (reason[key].id === obj.id) {
                index = key;
            }
        }

        if (event.target.checked === true) {
            if (event.nativeEvent.type === 'input') {
                for (var key in reason) {
                    if (reason[key].id === obj.id) {
                        reason[key].remarks = obj.remarks;
                        break;
                    }
                }
            } else {
                reason.push(obj);
            }
        } else if (event.target.checked === false) {
            reason.splice(index, 1);
        }
        this.setState({
            reason: reason
        });
        this.props.form.setFieldsValue({
            reason: this.state.reason
        })
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
        })
    }
    handleRegisterCountryChange = (value) => {
        if (!value.length) {
            return
        }
        const values = this.props.form.getFieldsValue()
        if (!values.intellectualCodeId || values.intellectualCodeId === '0') return;
        let params = { intellectualCodeId: values.intellectualCodeId, countryId: value }
        getDisableInfoTabel(params).then((data) => {
            if (data.state = '000001') {
                this.setState({ disableInfo: data.disableInfo || [] })
            }
        });
    }


    clearSomeData = (e) => {
        let value = e.target.value;
        if (value === 2) {
            this.getSinsitiveReason = this.getDefaultReason()
        }
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            platform: [],
            sensitiveLayer: [],
            site: [],
            intellectualCodeId: undefined
        })

    }

    checkboxHandle = (e, id) => {
        let data = this.getSinsitiveReason.find(v => v.id === id);
        if (e.target.checked) {
            data.isChecked = true;
        } else {
            data.isChecked = false;
            data.inputValue = undefined;
        }
        this.setState({})
    }

    inputHandle = (e, id) => {
        let data = this.getSinsitiveReason.find(v => v.id === id);
        if (data) {
            data.inputValue = e.target.value
        }
        this.setState({})
    }

    componentWillUnmount() {
        if (this.props.getReason) {
            this.props.getReason(null)
        }
    }

    render() {
        const { item } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { country, intellectualCodeList, reason } = this.state;
        const isSensitive = getFieldValue("isSensitive") || 1;
        // 布局
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 12 },
        };

        return (
            <div className="sensitive-sku-detail">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="SKU"
                    >
                        {getFieldDecorator('sku', {
                            rules: [{
                                required: true, message: '支持逗号隔开输入多个，每次最多支持输入100个SKU.',
                            },],
                        })(
                            <Input placeholder="支持逗号隔开输入多个." disabled={!!this.props.item} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="是否敏感"
                    >
                        {getFieldDecorator('isSensitive', {
                            rules: [{ required: true }],
                            initialValue: 1
                        })(
                            <RadioGroup onChange={this.clearSomeData}>
                                <Radio value={1}>是</Radio>
                                <Radio value={2}>否</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    {
                        isSensitive === 1 ?
                            (
                                <div>
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
                                    <Row type="flex" className="mb15">
                                        <Col span={4} className="text-right pt7">
                                            <label className="ant-form-item-required">敏感原因：</label>
                                        </Col>
                                        <Col span={20} className="audit-result-right">
                                            {
                                                this.getSinsitiveReason.map((v, index) => {
                                                    return (
                                                        <Row key={index} type="flex" align="middle">
                                                            <Col span={5} className="audit-result-right-label">
                                                                <FormItem>
                                                                    <Checkbox
                                                                        checked={v.isChecked}
                                                                        onChange={e => this.checkboxHandle(e, v.id)}
                                                                    >{v.name}</Checkbox>
                                                                </FormItem>
                                                            </Col>
                                                            <Col span={14}>
                                                                <FormItem>
                                                                    <Input value={v.inputValue} onChange={(e) => this.inputHandle(e, v.id)} disabled={!v.isChecked} style={{ width: "216px" }} placeholder="详细描述" />
                                                                </FormItem>
                                                            </Col>
                                                        </Row>
                                                    )
                                                })
                                            }
                                        </Col>
                                    </Row>
                                </div>
                            ) : null
                    }
                    <FormItem
                        {...formItemLayout}
                        label="来源"
                    >
                        {getFieldDecorator('source', {
                        })(
                            <TextArea autosize={{ minRows: 1, maxRows: 6 }} style={{ width: 420 }} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="备注"
                    >
                        {getFieldDecorator('remarks', {
                            rules: [
                                { max: 1000, message: '最多输入1000个字符' },
                            ]
                        })(
                            <TextArea autosize={{ minRows: 1, maxRows: 6 }} style={{ width: 420 }} />
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create()(App);
