import React, { Component } from 'react';
import { Row, Col, Form, message } from 'antd';
import CheckboxInput from '../../../components/CheckboxInput';

import {
    getIntellctualCode,
    getCountry,
    getDisableInfoTabel,
    getSku
} from '../../../common/request/index';

import renderForm from '../../../common/utils/render-form';

import Disableinfo from '../../../common/components/Disableinfo-new';

import { getSinsitiveReason } from '../constants';

import '../css/index.css';

const FormItem = Form.Item
class App extends Component {
    state = {
        intellectualCodeList: [],
        disableInfo: [],
        countryList: [],
        reason: [],
        conditionType: 'spu',
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
        this.props.form.getFieldDecorator('reason');
    }
    // getDetail() {
    //     if (this.props.item.platformCONDITIONMENUId) {
    //         let params = {}
    //         params.figureLogoId = this.props.item.figureLogoId
    //         fetchPost(GET_CONDITIONMENU_DETAIL, params).then(data=> {
    //             if(data && data.state === "000001"){
    //                 const dataObj = data.data
    //                 this.props.form.setFieldsValue({
    //                     englishCONDITIONMENU: dataObj.englishCONDITIONMENU,
    //                     chineseCONDITIONMENU: dataObj.chineseCONDITIONMENU,
    //                     associatedSku: dataObj.associatedSku,
    //                     intellectualCodeId: dataObj.intellectualCodeId,
    //                     productDesc: dataObj.productDesc,
    //                 })
    //                 if (dataObj.disableInfo) {
    //                     this.setState({disableInfo: dataObj.disableInfo})
    //                 }
    //             } else {
    //                 message.error('操作失败.')
    //             }
    //         })
    //     }
    // }
    addSensitiveLayer = () => {
        const { disableInfo } = this.state;
        disableInfo.push({
            sensitiveLayer: {
                label: "",
                key: "",
                platformSite: [
                    {
                        site: [],
                        platform: {
                            label: "",
                            key: ""
                        }
                    }
                ]
            }
        });
        this.setState({
            disableInfo: disableInfo
        })
    };

    addPlatformSite = (index, _index) => {
        const { disableInfo } = this.state;
        disableInfo[index].sensitiveLayer.platformSite.push(
            {
                site: [],
                platform: {
                    label: "",
                    key: ""
                }
            }
        );
        this.setState({
            disableInfo: disableInfo
        })
    }
    remove = (index, _index, type) => {
        const { disableInfo } = this.state;
        const values = this.props.form.getFieldsValue()
        if (type === 'sensitiveLayer') {
            values.sensitiveLayer.splice(index, 1);
            values.platform.splice(index, 1);
            values.site[index].splice(_index, 1);
            this.props.form.setFieldsValue({ sensitiveLayer: values.sensitiveLayer })
            this.props.form.setFieldsValue({ platform: values.platform })
            this.props.form.setFieldsValue({ site: values.site })
            disableInfo.splice(index, 1);
        }
        if (type === 'platformSite') {
            // 覆盖表单值
            if (_index === values.platform[index].length - 1) {
                values.platform[index][values.platform[index].length - 1] = '';
            } else {
                values.platform[index].splice(_index, 1);
            }
            values.site[index].splice(_index, 1);
            disableInfo[index].sensitiveLayer.platformSite.splice(_index, 1);
            this.props.form.setFieldsValue({ platform: values.platform })
            this.props.form.setFieldsValue({ site: values.site })
        }
        this.setState({
            disableInfo: disableInfo
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
            this.setState({ disableInfo: data.disableInfo || [] })
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
                this.setState({ disableInfo: data.disableInfo })
                if (data.disableInfo && data.disableInfo.length === 0) {
                    this.setState({ disableInfo: data.disableInfo }, this.addSensitiveLayer)
                } else {
                    this.setState({ disableInfo: data.disableInfo })
                    // 手动设置disableInfo组件表单值
                    if (data.disableInfo && data.disableInfo.length) {
                        this.manualOpertion(data)
                    }
                }
            }
        });
    }
    manualOpertion = (data) => {
        const values = this.props.form.getFieldsValue()
        const info = data.disableInfo
        const sensitiveLayerArr = info.map(item => item.sensitiveLayer.key + '')
        const platformArr = info.map(item => {
            item.sensitiveLayer.platformSite.map(platformSiteItem => platformSiteItem.platform.key + '')
        })
        const siteArr = info.map(item => {
            item.sensitiveLayer.platformSite.map(platformSiteItem => {
                if (platformSiteItem.site.length === 1 && !platformSiteItem.site[0].key) {
                    return []
                } else {
                    return platformSiteItem.site.map(siteObj => siteObj.key + '')
                }
            })
        })
        values.sensitiveLayer = sensitiveLayerArr
        values.platform = platformArr
        values.site = siteArr
        this.props.form.setFieldsValue({
            sensitiveLayer: values.sensitiveLayer,
            platform: values.platform,
            site: values.site
        })
    }
    renderHeader(title) {
        return (
            <Col span={24} className='title' >
                <span className='separate-line'></span>
                <span className='separate-header'>
                    {title}
                </span>
            </Col>
        )
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
    selectConditionType = (value) => {
        value === 'spu' ? this.setState({ conditionType: 'spu' }) : this.setState({ conditionType: 'chinessName' })
    }
    getSku = () => {
        // 获取Sku
        const spuParam = this.props.form.getFieldValue('spu')
        if (!spuParam) {
            message.error('请输入spu')
            return
        }
        const params = { spu: spuParam }
        getSku(params).then((result) => {
            if (result.sku && result.sku.length) {
                this.props.form.setFieldsValue({ sku: result.sku.join(',') })
            } else if (result.sku && result.sku.length === 0) {
                message.error('sku为空');
            } else {
                message.error(result.msg);
            }
        });
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
        const firstFormItems = [
            {
                label: '',
                key: 'aa',
                type: 'XSelect',
                formItemLayout: {
                    wrapperCol: {
                        span: 24,
                    },
                },
                placeholder: '请输入SPU',
                colSpan: 4,
                offsetSpan: 4,
                // style: { width: '110px' },
                otherProps: {
                    options: [
                        {
                            key: 'spu',
                            value: 'SPU'
                        },
                        {
                            key: 'chinessName',
                            value: '中文名称'
                        },
                    ],
                    onChange: this.selectConditionType
                },
                option: {
                    initialValue: 'spu',
                }
            },
            {
                label: '',
                key: this.state.conditionType === 'spu' ? 'spu' : 'chinessName',
                placeholder: this.state.conditionType === 'spu' ? '请输入spu' : '请输入中文名称',
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
                            max: 10,
                            message: '最多输入10个字符'
                        },
                    ],
                },

            },
            {
                label: '',
                key: 'bb',
                type: 'Button',
                colSpan: 4,
                formItemLayout: {
                    wrapperCol: {
                        offset: 2,
                        span: 20,
                    },
                },
                isHidden: this.state.conditionType === 'spu' ? false : true,
                children: '获取',
                otherProps: {
                    type: 'primary',
                    onClick: this.getSku,
                }
            },
        ]
        const secondFormItem = [
            {
                label: 'SKU',
                key: 'sku',
                type: 'TextArea',
                formItemLayout,
                placeholder: '请输入SKU',
                colSpan: 24,
                isHidden: this.state.conditionType === 'spu' ? false : true,
                option: {
                    rules: [
                        { required: true, message: '必填' },
                    ],
                },
                otherProps: {
                    disabled: true
                }
            },
            // {
            //     label: '注册国家',
            //     type: 'XSelect',
            //     key: 'registerCountryId',
            //     placeholder: '请输入注册国家',
            //     colSpan: 24,
            //     formItemLayout,
            //     style: { width: '200px' },
            //     option: {
            //         rules: [
            //             { required: true, message: '必填' },
            //         ],
            //     },
            //     otherProps: {
            //         allowClear: true,
            //         mode: "multiple",
            //         options: this.state.countryList,
            //         onChange: this.handleRegisterCountryChange,
            //     }
            // },
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
        const thirdFormItem = [
            {
                label: '来源',
                key: 'source',
                type: 'Input',
                formItemLayout,
                placeholder: '请输入来源',
                colSpan: 24,

            },
            {
                label: '备注',
                key: 'remarks',
                placeholder: '请输入备注',
                type: 'Input',
                colSpan: 24,
                formItemLayout,

            },
        ]

        return (
            <div className="conditionMenu-detail">
                <Row gutter={24}>
                    <Col span={24}>
                        {this.renderHeader('获取条件')}
                        {renderForm(firstFormItems, this.props.form)}
                        {this.renderHeader('获取结果')}
                        {renderForm(secondFormItem, this.props.form)}
                        <Disableinfo
                            mode="replace"
                            defaultItem={1}
                            getRef={this.props.getRef}
                            form={this.props.form}
                            setValue={this.state.disableInfo}
                        />
                        <FormItem
                            {...formItemLayout}
                            label="敏感原因"
                            required={true}
                        >
                            {
                                getSinsitiveReason.map((item, index) => {
                                    if (item.id !== 0 && item.id !== 4) {
                                        return (
                                            <CheckboxInput
                                                key={index}
                                                options={item}
                                                reason={[]}
                                                onChangeCheckbox={this.onChangeCheckbox}
                                            />
                                        )
                                    }
                                })
                            }

                        </FormItem>
                        {renderForm(thirdFormItem, this.props.form)}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(App);