import React, { Component } from 'react';
import { Row, Col, Form, message, Select } from 'antd';

import {
    getSite,
    getPlatform,
    getSaleAccount
} from '../../../common/request/index';

import renderForm from '../../../common/utils/render-form';

import {
    GET_PERMITSALEACCOUNT_DETAIL,
    getSpecialpermitType
} from "../constants";
import { fetchPost } from '../../../../util/fetch';
import { path } from '../../../configs';

import '../css/index.css';

class App extends Component {
    state = {
        site: [],
        platform: [],
        saleAccount: [],
        showSku: false,
        saleAccountDisabled: true
    }
    componentDidMount() {
        const { item } = this.props
        if (item && item.saleAccountCodeId) {
            this.getDetail()
            // getSaleAccount({
            //     site: item.site,
            //     platform: item.platform,
            // }).then((result) => {
            //     if (result && result.length) {
            //         this.setState({ saleAccount: result, saleAccountDisabled: false })
            //     }
            // });
        } else {
            getPlatform().then((result) => {
                if (result && result.length) {
                    this.setState({ platform: result })
                }
            });
        }

    }
    onSelectId = (value) => {
        this.setState({ platformValue: value, saleAccountDisabled: true })
        this.props.form.setFieldsValue({ saleAccount: [], site: undefined })
        getSite({
            platformId: value
        }).then((result) => {
            // 站点为空
            this.setState({ site: result })
            if (!result || !result.length) {
                this.getSaleAccount()
                this.setState({ saleAccountDisabled: false })
            }
        });
    }
    onSiteSelectId = (value) => {
        this.props.form.setFieldsValue({ saleAccount: [] })
        this.getSaleAccount(value)
    }
    getSaleAccount = (value) => {
        const param = {}
        if (value) {
            param.site = value
        }
        param.platform = this.state.platformValue
        getSaleAccount(param).then((result) => {
            if (result && result.length) {
                var obj = {},
                    distinct = [];
                result.forEach(v => {
                    if (!obj[v.id]) {
                        obj[v.id] = true;
                        distinct.push(v)
                    }
                })
                this.setState({ saleAccount: distinct, saleAccountDisabled: false })
            }
        });
    }
    getDetail() {
        // debugger;
        if (this.props.item && this.props.item.saleAccountCodeId) {
            let params = {}
            params.saleAccountCodeId = this.props.item.saleAccountCodeId
            fetchPost(GET_PERMITSALEACCOUNT_DETAIL, params).then(data => {
                if (data && data.state === "000001") {
                    const dataObj = data.data
                    // 获取销售账号可选值
                    this.setState({ platformValue: dataObj.platform }, () => this.getSaleAccount(dataObj.site))
                    this.handleSpecialpermitTypeChange(dataObj.specialpermitType)
                    if (!dataObj.site) {
                        dataObj.site = '无'
                    }
                    let specialpermitType = dataObj.specialpermitType.map(v => Number(v))
                    if (specialpermitType.indexOf(3) != -1) {
                        this.setState({
                            showSku: true
                        })
                    }
                    this.props.form.setFieldsValue({
                        specialpermitType,
                        site: dataObj.site,
                        platform: dataObj.platform,
                        sku: dataObj.sku,
                        saleAccount: dataObj.saleAccount,
                    })
                } else {
                    message.error('操作失败.')
                }
            })
        }
    }
    handleSpecialpermitTypeChange = (values) => {
        if (values && values.length) {
            if (values.indexOf(3) !== -1) {
                this.setState({ showSku: true })
            } else {
                this.setState({ showSku: false })
            }
        }
    }
    formItemLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 12,
        },
    }
    render() {
        const { item } = this.props;
        const isAdd = !item || !item.saleAccountCodeId;
        const firstFormItems = [
            {
                label: '平台',
                type: !isAdd ? 'Text' : 'XSelect',
                key: isAdd ? 'platform' : 'platformName',
                placeholder: '请选择平台',
                colSpan: 24,
                formItemLayout: this.formItemLayout,
                style: { width: '200px' },
                option: {
                    initialValue: isAdd ? undefined : item.platformName,
                    rules: [
                        { required: isAdd, message: '必填' },
                    ],
                },
                otherProps: isAdd ? {
                    options: this.state.platform,
                    onChange: this.onSelectId,
                    configKey: 'id',
                    configValue: 'name',
                } : {}
            }, {
                label: '站点',
                type: this.props.item ? 'Text' : 'XSelect',
                key: isAdd ? 'site' : 'siteName',
                placeholder: '请选择站点',
                colSpan: 24,
                formItemLayout: this.formItemLayout,
                style: { width: '200px' },
                option: {
                    initialValue: isAdd ? undefined : item.siteName,
                    rules: [
                        { required: !this.props.item && this.state.site.length, message: '必填' },
                    ],
                },
                otherProps: !this.props.item ? {
                    disabled: !this.state.site.length,
                    options: this.state.site,
                    onChange: this.onSiteSelectId,
                    configKey: 'id',
                    configValue: 'name',
                } : {}
            },
            {
                label: '销售账号',
                type: 'XSelect',
                key: 'saleAccount',
                placeholder: '请选择销售账号',
                colSpan: 24,
                formItemLayout: this.formItemLayout,
                style: { width: '200px' },
                option: {
                    rules: [
                        { required: true, message: '必填' },
                    ],
                },
                otherProps: {
                    disabled: isAdd ? this.state.saleAccountDisabled : false,
                    allowClear: true,
                    mode: "multiple",
                    options: this.state.saleAccount,
                    configKey: 'id',
                    configValue: 'name',
                }
            },
            {
                label: '特批类型',
                type: 'CheckboxGroup',
                key: 'specialpermitType',
                colSpan: 24,
                formItemLayout: this.formItemLayout,
                style: { width: '200px' },
                option: {
                    rules: [
                        { required: true, message: '必填' },
                    ],
                },
                otherProps: {
                    options: getSpecialpermitType,
                    onChange: this.handleSpecialpermitTypeChange,
                }
            },
            {
                label: 'SKU',
                key: 'sku',
                placeholder: '请输入SKU',
                type: 'TextArea',
                colSpan: 24,
                isHidden: !this.state.showSku,
                formItemLayout: this.formItemLayout,
                option: {
                    rules: [
                        { max: 5000, message: '最多输入5000个字符' },
                    ],
                },
            },

        ]
        return (
            <div className="data-permit-sale-account-detail">
                <Row gutter={24}>
                    <Col span={24}>
                        {renderForm(firstFormItems, this.props.form)}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(App);