import React, { Component } from 'react';
import { Row, Col, Form, message } from 'antd';

import {
    getIntellctualCode,
    getDisableInfoTabel
} from '../../../common/request/index';

import renderForm from '../../../common/utils/render-form';
import { UPLOAD_URL } from '../../../../constants/Api'

// import Disableinfo from '../../../common/components/Disableinfo';
import Disableinfo from '../../../common/components/Disableinfo-new';

// import { GET_CONTRABAND_DETAIL } from "../constants";
import { fetchPost } from '../../../../util/fetch';
import { path } from '../../../configs';

import '../css/index.css';

class App extends Component {
    state = {
        intellectualCodeList: [],
        disableInfo: [],
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
        if (this.props.item) {
            this.getDetail()
        } 
    }
    getDetail() {
        if (this.props.item.platformContrabandId) {
            let params = {}
            params.platformContrabandId = this.props.item.platformContrabandId
            fetchPost(path.irp + 'GetPlatformContrabandPoolDetail/getPlatformContrabandPoolDetail', params).then(data => {
                if (data && data.state === "000001") {
                    const dataObj = data.data
                    if (dataObj.intellectualCodeId) {
                        dataObj.intellectualCodeId = dataObj.intellectualCodeId + ''
                    } else {
                        dataObj.intellectualCodeId = '0'
                    }
                    this.props.form.setFieldsValue({
                        englishContraband: dataObj.englishContraband,
                        chineseContraband: dataObj.chineseContraband,
                        image: dataObj.image,
                        associatedSku: dataObj.associatedSku,
                        intellectualCodeId: dataObj.intellectualCodeId,
                        productDesc: dataObj.productDesc,
                    })
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
        let params = { intellectualCodeId: intellectualCodeId }
        getDisableInfoTabel(params).then((data) => {
            if (data.state = '000001') {
                if (!data.disableInfo || !data.disableInfo.length) {
                    this.setState({ disableInfo: data.disableInfo }, this.addSensitiveLayer)
                    return
                }
                this.setState({ disableInfo: data.disableInfo })
                if (data.disableInfo && data.disableInfo.length) {
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
            }
        });
    }

    formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 12,
        },
    }
    imageItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 18,
        },
    }
    render() {
        const { formItemLayout, imageItemLayout } = this;
        const firstFormItems = [
            {
                label: '英文违禁品名',
                key: 'englishContraband',
                type: 'Input',
                formItemLayout,
                placeholder: '请输入英文违禁品名',
                colSpan: 24,
                option: {
                    rules: [
                        { max: 200, message: '最多输入200个字符' },
                        { required: true, message: '必填' },
                    ],
                },
            },
            {
                label: '中文违禁品名',
                key: 'chineseContraband',
                placeholder: '请输入中文违禁品名',
                type: 'Input',
                colSpan: 24,
                formItemLayout,
                option: {
                    rules: [
                        { max: 80, message: '最多输入80个字符' },
                        { required: true, message: '必填' },
                    ],
                },
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
                key: 'image',
                type: 'PhotoUpload',
                colSpan: 24,
                formItemLayout: imageItemLayout,
                otherProps: {
                    action: UPLOAD_URL,
                    maxLength: 5    
                },
            },
            {
                label: '关联SKU',
                key: 'associatedSku',
                type: 'TextArea',
                formItemLayout,
                placeholder: '请输入关联SKU',
                colSpan: 24,
                option: {
                    rules: [
                        { max: 2000, message: '最多输入2000个字符' },
                    ],
                },

            },
            {
                label: '产品说明',
                key: 'productDesc',
                formItemLayout,
                placeholder: '请输入产品说明',
                type: 'TextArea',
                colSpan: 24,
                option: {
                    rules: [
                        { max: 200, message: '最多输入200个字符' },
                    ],
                },
            },
        ]
        return (
            <div className="contraband-detail">
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