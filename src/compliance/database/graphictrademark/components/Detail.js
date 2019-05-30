import React, { Component } from 'react';
import { Row, Col, Form, message } from 'antd';

import { UPLOAD_URL } from '../../../../constants/Api'
import { getFigureCategory, 
         getTrademark, 
         getCountry, 
         getIntellctualCode,
         getDisableInfoTabel,
         getChildFigureCategory } from '../../../common/request/index';
         
import renderForm from '../../../common/utils/render-form';

import Disableinfo from '../../../common/components/Disableinfo';

// import { GET_FIGURELOGO_DETAIL } from "../constants";
import { fetchPost } from '../../../../util/fetch';
import { path } from '../../../configs';

import '../css/index.css';

class App extends Component {
    state = {
        categoryList: [],
        trademarkList: [],
        countryList: [],
        intellectualCodeList: [],
        disableInfo: [],
        firstCategoryList:[]
    }
    componentDidMount() {
        // 获取图形分类
        getFigureCategory().then((result) => {
            if(result.data && result.data.length) {
                const categoryArr = []
                result.data.forEach(item => {
                    const obj = {}
                    obj.value = item.figureCategoryId
                    obj.label = item.figureCategoryName
                    obj.isLeaf = !item.children
                    categoryArr.push(obj)
                })
                this.setState({categoryList: categoryArr, firstCategoryList: categoryArr})
            }
        });
        // 获取商标商品分类
        getTrademark().then((result) => {
            this.setState({ trademarkList: result.data })
        });
        // 获取注册国家
        getCountry().then((result) => {
            this.setState({ countryList: result.data })
        });
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
                ]
            })
        }
    }
    getDetail() {
        if (this.props.item.figureLogoId) {
            let params = {}
            params.figureLogoId = this.props.item.figureLogoId
            fetchPost(path.irp + 'GetFigureLogoPoolDetail/getFigureLogoPoolDetail', params).then(data=> {
                if(data && data.state === "000001"){
                    const dataObj = data.data
                    if (dataObj.intellectualCodeId) {
                        dataObj.intellectualCodeId = dataObj.intellectualCodeId + ''
                    } else {
                        dataObj.intellectualCodeId =  '0'
                    }
                    if (dataObj.registerCountryId) {
                        dataObj.registerCountryId = dataObj.registerCountryId.map(item=> item + '')
                    }
                    if (dataObj.logoGoodCategoryId) {
                        dataObj.logoGoodCategoryId = dataObj.logoGoodCategoryId.map(item=> item + '')
                    }
                    if (dataObj.figureCategoryIds) {
                        if (dataObj.figureCategoryIds.figureCategoryLine) {
                            this.finishCategoryList(dataObj.figureCategoryIds.figureCategoryLine, dataObj.figureCategoryIds.ids)
                        }
                    }
                    
                    this.props.form.setFieldsValue({
                        figureLogoPic: dataObj.figureLogoPic,
                        logoGoodCategoryId: dataObj.logoGoodCategoryId,
                        registerCountryId: dataObj.registerCountryId,
                        intellectualCodeId: dataObj.intellectualCodeId,
                        logoNo: dataObj.logoNo,
                        obligee: dataObj.obligee,
                        sensitiveReason: dataObj.sensitiveReason,
                    })
                    if (data.data.disableInfo) {
                        this.setState({disableInfo: data.data.disableInfo})
                    }
                } else {
                    message.error('操作失败.')
                }
            })
        }
    }
    // 补全分类数据下拉框
    finishCategoryList = (categoryList, ids)=> {
        if (categoryList && categoryList.length && ids && ids.length) {
            const firstIds = this.state.firstCategoryList.map(
                item => item.value + ''
            )
            if (firstIds.indexOf(ids[0]) !== -1 ) {
                const index = firstIds.indexOf(ids[0]) 
                this.state.categoryList[index] = categoryList[0]
                this.setState({categoryList: this.state.categoryList}, ()=> {
                    this.props.form.setFieldsValue({figureCategoryIds: ids})
                })
            }
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
        const values = this.props.form.getFieldsValue()
        let params = { intellectualCodeId: intellectualCodeId, countryId: values.registerCountryId }
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
    handleRegisterCountryChange = (value) =>{
        if (!value.length) {
            return
        }
        const values = this.props.form.getFieldsValue()
        if (!values.intellectualCodeId || values.intellectualCodeId === '0') return
        let params = { intellectualCodeId: values.intellectualCodeId, countryId: value }
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
    loadCascaderData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        // 获取图形分类
        const params = {}
        params.parentId = targetOption.value
        getChildFigureCategory(params).then((result) => {
            if(result.data && result.data.length) {
                const categoryArr = []
                result.data.forEach(item => {
                    const obj = {}
                    obj.value = item.figureCategoryId
                    obj.label = item.figureCategoryName
                    obj.isLeaf = !item.children
                    categoryArr.push(obj)
                })
                targetOption.children = categoryArr;
                this.setState({categoryList: this.state.categoryList})
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
                label: '图形商标',
                key: 'figureLogoPic',
                type: 'PhotoUpload',
                colSpan: 24,
                formItemLayout,
                option: {
                    rules: [
                        { required: true, message: '必填' },
                    ],
                },
                otherProps: {
                    action: UPLOAD_URL,        
                },
            },
            {
                label: '图形分类',
                type: 'Cascader',
                key: 'figureCategoryIds',
                colSpan: 24,
                formItemLayout,
                placeholder: '请输入图形图标分类',
                style: { width: '200px' },
                otherProps: {
                    options: this.state.categoryList,
                    loadData: this.loadCascaderData,
                    popupClassName: 'data-graph-mark-cascader'
                }
            },
            {
                label: '商标商品分类',
                type: 'XSelect',
                key: 'logoGoodCategoryId',
                colSpan: 24,
                formItemLayout,
                placeholder: '请输入商标商品分类',
                style: { width: '200px' },
                otherProps: {
                    mode: "multiple",
                    options: this.state.trademarkList,
                    configKey: 'id',
                    configValue: 'name',
                },
                option: {
                    rules: [
                        { required: true, message: '必填' },
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
                label: '商标号',
                key: 'logoNo',
                type: 'Input',
                formItemLayout,
                placeholder: '请输入商标号',
                colSpan: 24,
            },
            {
                label: '权利人',
                key: 'obligee',
                placeholder: '请输入权利人',
                type: 'Input',
                colSpan: 24,
                formItemLayout,
                option: {
                    rules: [
                        { required: true, message: '必填' },
                    ],
                },
            },
            {
                label: '敏感原因',
                key: 'sensitiveReason',
                formItemLayout,
                placeholder: '请输入敏感原因',
                type: 'Input',
                colSpan: 24,
            },
        ]
        return (
            <div className="data-graph-detail">
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