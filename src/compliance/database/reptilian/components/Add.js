import React, { Component } from 'react';
import { Input, Form, Select, Col  } from 'antd';
import Disableinfo from '../../../common/components/Disableinfo';

import { getIntellctualCode,
        getDisableInfoTabel } from '../../../common/request/index';

const FormItem = Form.Item;
const Option = Select.Option;

import { getPlatform, getCountry, getTrademark, active, grade } from '../../../data';

class Detail extends Component {
    state = {
        platform: [],   // 销售平台
        country: [],    // 国家
        trademark: [],
        intellectualCodeList: [],
        disableInfo: []
    };

    componentDidMount() {
        getPlatform().then((result) => {
            this.setState({ platform: result })
        });
        getCountry().then((result) => {
            this.setState({ country: result })
        });
        getTrademark().then((result) => {
            this.setState({ trademark: result })
        });
        getIntellctualCode().then((result) => {
            if (result.data.length) {
                const arr = [{ value: '0', label: '请选择' }]
                const newArr = arr.concat(result.data)
                this.setState({ intellectualCodeList: newArr })
            }
        });
        this.setState({
            disableInfo: [
                {
                    sensitiveLayer: {
                        label: "",
                        key: "",
                        platformSite: [
                            {
                                site: [
                                    
                                ],
                                platform: {
                                    label: "",
                                    key: ""
                                }
                            }
                        ]
                    }
                }
            ]
        })
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
        const values = this.props.form.getFieldsValue()
        let params = { intellectualCodeId: intellectualCodeId, registerCountryId: values.registerCountryId }
        getDisableInfoTabel(params).then((data) => {
            if (data.state = '000001') {
                if(!data.disableInfo || !data.disableInfo.length) {
                    this.setState({ disableInfo : data.disableInfo }, this.addSensitiveLayer) 
                    return
                }
                this.setState({ disableInfo : data.disableInfo })
                // 手动设置disableInfo组件表单值
                if (data.disableInfo && data.disableInfo.length) {
                    this.manualOpertion(data)
                }
            }
        });
    }
    handleRegisterCountryChange = (value) =>{
        if (!value.length) {
            // this.setState({disableInfo: []}, this.addSensitiveLayer)
            // this.props.form.setFieldsValue({intellectualCodeId: []})
            return
        }
        const values = this.props.form.getFieldsValue()
        if (!values.intellectualCodeId || values.intellectualCodeId === '0') return
        let params = { intellectualCodeId: values.intellectualCodeId, registerCountryId: value }
        getDisableInfoTabel(params).then((data) => {
            if (data.state = '000001') {
                if (data.disableInfo && data.disableInfo.length === 0) {
                    this.setState({ disableInfo : data.disableInfo }, this.addSensitiveLayer) 
                } else {
                    this.setState({ disableInfo : data.disableInfo })
                    // 手动设置disableInfo组件表单值
                    if (data.disableInfo && data.disableInfo.length) {
                        this.manualOpertion(data)
                    }
                }
            }
        });
    }
    manualOpertion = (data)=> {
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
            site: values.site})
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
    render() {
        const { getFieldDecorator } = this.props.form;
        const { intellectualCodeList, country, trademark } = this.state;

        const formItemLayout = {
            style:{marginBotton:"15px"},
            labelCol: { span: 4 },
            wrapperCol: { span: 12 },
        };

        return (
            <div className="reptilian-detail">
                <Form>
                {this.renderHeader('获取条件')}
                    <FormItem
                        {...formItemLayout}
                        label="权利人"
                    >
                        {getFieldDecorator('obligee',{
                            rules: [
                                { max: 200, message: '最多输入200个字符' },
                            ],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="注册国家"
                    >
                        {getFieldDecorator('registerCountryId')(
                            <Select
                                mode="multiple"
                                placeholder="请选择注册国家"
                                allowClear
                                showSearch
                                onChange={this.handleRegisterCountryChange}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {
                                    country.map((item, index) => {
                                        if (item.id !== 0) {
                                            return (
                                                <Option key={index} value={item.key + ''}>{item.value}</Option>
                                                )
                                        }
                                    })


                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="活跃状态"
                    >
                        {getFieldDecorator('activeState', {
                            initialValue: 1,
                        })(
                            <Select placeholder="请选择">
                                {
                                    active.map((item, index) => {
                                        if (item.id !== 0) {
                                            return (
                                                <Option key={index} value={item.id}>{item.name}</Option>
                                            )
                                        }
                                    })


                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="商标商品分类"
                    >
                        {getFieldDecorator('trademarkType')(
                            <Select
                                mode="multiple"
                                placeholder="请选择"
                                allowClear
                                showSearch
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {
                                    trademark.map((item, index) => {
                                        if (item.id !== 0) {
                                            return (
                                                <Option key={index} value={item.id}>{item.name}</Option>
                                            )
                                        }
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="商标词"
                    >
                        {getFieldDecorator('sensitive')(
                            <Input />
                        )}
                    </FormItem>
                    {this.renderHeader('知产代码')}
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
                                        
                                        <Option key={index} value={item.value}>{item.label}</Option>
                                    ))
                                }
                            </Select>
                        )}  
                    </FormItem>
                    <Disableinfo
                        {...this.props}
                        disableInfo={this.state.disableInfo}
                        addSensitiveLayer={this.addSensitiveLayer}
                        addPlatformSite={this.addPlatformSite}
                        remove={this.remove}
                    /> 
                </Form>
            </div>
        );
    }
}

export default Form.create()(Detail);