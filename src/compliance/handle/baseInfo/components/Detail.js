import React, { Component } from 'react';
import { Row, Col, Form } from 'antd';

import { getIntellctualCode,
         getDisableInfoTabel } from '../../../common/request/index';
         
import renderForm from '../../../common/utils/render-form';

import Disableinfo from '../../../common/components/Disableinfo';

// import { GET_AUTHENTICATION_DETAIL } from "../constants";
import { fetchPost } from '../../../../util/fetch';
import { path } from '../../../configs';

import '../css/index.css';

import { getSensitiveLayer } from '../../../common/constants';

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
        if (this.props.item){
            this.getDetail()
        } else {
            this.setState({
                disableInfo: [
                    {
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
                    }
                ],
            })
        }
    }
    getDetail() {
        if (this.props.item.platformAuthenticationId) {
            let params = {}
            params.platformAuthenticationId = this.props.item.platformAuthenticationId
            fetchPost(path.irp + 'GetPlatformAuthenticationPoolDetail/getPlatformAuthenticationPoolDetail', params).then(data=> {
                if(data && data.state === "000001"){
                    const dataObj = data.data
                    // 知产代码下拉框值类型转化
                    if (dataObj.intellectualCodeId) {
                        dataObj.intellectualCodeId = dataObj.intellectualCodeId + ''
                    } else {
                        dataObj.intellectualCodeId = '0'
                    }
                    this.props.form.setFieldsValue({
                        addTime: dataObj.addTime,
                        additions: dataObj.additions,
                        editions: dataObj.editions,
                        editTime: dataObj.editTime,
                        englishName: dataObj.englishName,
                        chineseName: dataObj.chineseName,
                        authenticationProject: dataObj.authenticationProject,
                        intellectualCodeId: dataObj.intellectualCodeId,
                        remark: dataObj.remark,
                    })
                    if (dataObj.disableInfo) {
                        this.setState({disableInfo: dataObj.disableInfo})
                    }
                } else {
                    message.error('操作失败.')
                }
            })
        }
    }
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
        if(type === 'sensitiveLayer'){
            values.sensitiveLayer.splice(index, 1);
            values.platform.splice(index, 1);
            values.site.splice(index, 1);
            this.props.form.setFieldsValue({sensitiveLayer: values.sensitiveLayer})
            this.props.form.setFieldsValue({platform: values.platform})
            this.props.form.setFieldsValue({site: values.site})
            disableInfo.splice(index, 1);
        }
        if(type === 'platformSite'){
            // 覆盖表单值
            if (_index === values.platform[index].length - 1) {
                values.platform[index][values.platform[index].length - 1] = '';
            } else {
                values.platform[index].splice(_index, 1);
            } 
            values.site[index].splice(_index, 1);
            disableInfo[index].sensitiveLayer.platformSite.splice(_index, 1);
            this.props.form.setFieldsValue({platform: values.platform})
            this.props.form.setFieldsValue({site: values.site})
        }
        this.setState({
            disableInfo: disableInfo
        })
    }
    handleChange = (value)=> {
        if (value === '0') return
        this.postDisableInfoRequest(value)
    }
    postDisableInfoRequest = (intellectualCodeId) => {
        if (!intellectualCodeId) return
        let params = { intellectualCodeId: intellectualCodeId }
        getDisableInfoTabel(params).then((data) => {
            if (data.state = '000001') {
                if(!data.disableInfo || !data.disableInfo.length) {
                    this.setState({ disableInfo : data.disableInfo }, this.addSensitiveLayer) 
                    return
                }
                this.setState({ disableInfo : data.disableInfo })
                // 手动设置disableInfo组件表单值
                if (data.disableInfo && data.disableInfo.length) {
                    const values = this.props.form.getFieldsValue()
                    const info = data.disableInfo
                    const sensitiveLayerArr = info.map(item => item.sensitiveLayer.key + '')
                    const platformArr = info.map(item => {
                        return item.sensitiveLayer.platformSite.map(platformSiteItem => platformSiteItem.platform.key + '')
                    })
                    const siteArr = info.map(item => {
                       return item.sensitiveLayer.platformSite.map(platformSiteItem => {
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
                        site: values.site})
                }
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
                label: '英文名称',
                key: 'englishName',
                type: 'Input',
                formItemLayout,
                placeholder: '请输入英文违禁品名',
                colSpan: 24,
                option: {
                    rules: [
                        { max: 50, message: '最多输入50个字符' },
                        { required: true, message: '必填' },
                    ],
                },
            },
            {
                label: '中文名称',
                key: 'chineseName',
                placeholder: '请输入中文违禁品名',
                type: 'Input',
                colSpan: 24,
                formItemLayout,
                option: {
                    rules: [
                        { max: 50, message: '最多输入80个字符' },
                        { required: true, message: '必填' },
                    ],
                },
            },
            {
                label: '认证项目',
                key: 'authenticationProject',
                type: 'Input',
                formItemLayout,
                placeholder: '请输入认证项目',
                colSpan: 24,
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
                label: '备注',
                key: 'remark',
                formItemLayout,
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
            <div className="data-anthentication-detail">
                <Row gutter={24}>
                    <Col span={24}>
                    { renderForm(firstFormItems, this.props.form) }
                    <Disableinfo
                        {...this.props}
                        disableInfo={this.state.disableInfo}
                        addSensitiveLayer={this.addSensitiveLayer}
                        addPlatformSite={this.addPlatformSite}
                        remove={this.remove}
                    /> 
                    { renderForm(secondFormItem, this.props.form) }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(App);