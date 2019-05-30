import React, { Component } from 'react';
import { Row, Col, Form, message, Select } from 'antd';
import PlatFormSite from './platFormSite';
import BaseinfoCategory from './baseinfoCategory';

import renderForm from '../../../common/utils/render-form';

import { getReviewer } from '../../../common/request/index';
import {
    GET_REVIEWERSETTING_DETAIL,
    getReviewType
} from "../constants";

import { fetchPost } from '../../../../util/fetch';
import { debounce } from '../../../../util/baseTool';
import { path } from '../../../configs';

import '../css/index.css';

class App extends Component {
    state = {
        // 审核人员后台一次性返回， 前端截取
        reviewer: [],
        originReviewer: [],
        reviewTypeValue: 0,
        platformInfo: [],
        categoryInfo: []
    }
    uid = 0
    componentDidMount() {
        if (this.props.item && this.props.item.reviewerSettingId) {
            this.getDetail()
        } else {
            getReviewer().then((result) => {
                if (result && result.length) {
                    this.setState({
                        reviewer: result.splice(0, 20),
                        originReviewer: result
                    })
                }
            });
            this.setState({
                platformInfo: [
                    {
                        platform: [],
                        site: []
                    }
                ]
            })
            this.setState({
                categoryInfo: [
                    {
                        id: ++this.uid,
                        firstCategory: [],
                        secondCategory: []
                    }
                ]
            })
        }
    }

    getDetail() {
        if (this.props.item && this.props.item.reviewerSettingId) {
            let params = {}
            params.reviewerSettingId = this.props.item.reviewerSettingId
            params.reviewType = this.props.item.reviewType
            fetchPost(GET_REVIEWERSETTING_DETAIL, params).then(data => {
                if (data && data.state === "000001") {
                    const dataObj = data.data
                    this.props.form.setFieldsValue({
                        reviewType: dataObj.reviewType,
                        reviewer: dataObj.reviewer,
                    })
                    if (dataObj.category && dataObj.category.length) {
                        this.setState({
                            categoryInfo: dataObj.category.map(v => {
                                v.id = ++this.uid;
                                v.firstCategory = Number(v.firstCategory)
                                return v
                            })
                        })
                    }
                    if (dataObj.platformInfo && dataObj.platformInfo.length) {
                        this.setState({
                            platformInfo: dataObj.platformInfo.map(v => {
                                v.platform = Number(v.platform)
                                return v

                            })
                        })
                    }
                } else {
                    message.error('操作失败.')
                }
            })
        }
    }
    handleChange = (e) => {
        if (e.target && e.target.value) {
            const values = e.target.value
            this.setState({ reviewTypeValue: values })

            const params = { reviewTypeValue: values }
            getReviewer(params).then((result) => {
                if (result && result.length) {
                    this.setState({
                        reviewer: result.splice(0, 20),
                        originReviewer: result
                    })
                }
            });
        }
    }

    handleReviewSettingTypeChange = (value) => {
        this.setState({ reviewTypeValue: value })
    }
    addPlatformInfo = () => {
        const platform = {
            platform: [],
            site: []
        }
        this.state.platformInfo.push(platform)
        this.setState({ platformInfo: this.state.platformInfo })
    }
    remove = (index) => {
        const { platformInfo } = this.state;
        const values = this.props.form.getFieldsValue()
        // 覆盖表单值
        if (index === values.platform.length - 1) {
            values.platform[values.platform.length - 1] = []
        } else {
            values.platform.splice(index, 1);
        }
        values.site.splice(index, 1);
        platformInfo.splice(index, 1);
        this.props.form.setFieldsValue({ platform: values.platform, site: values.site })
        platformInfo.forEach((item, index) => {
            item.platform = values.platform[index]
        })
    };
    addCategory = () => {
        const category = {
            id: ++this.uid,
            firstCategory: [],
            secondCategory: []
        }
        this.state.categoryInfo.push(category)
        this.setState({ categoryInfo: this.state.categoryInfo })
    }
    removeCategory = (index) => {
        // debugger;
        const { categoryInfo } = this.state;
        for (let i = 0; i < categoryInfo.length; i++) {
            if (categoryInfo[i].id === index) {
                categoryInfo.splice(i, 1);
            }
        }
        const values = this.props.form.getFieldsValue()
        // 覆盖表单值
        values.firstCategory.splice(index, 1, undefined);
        values.secondCategory.splice(index, 1, undefined);
        this.props.form.setFieldsValue({ firstCategory: values.platform, secondCategory: values.site })
    }
    render() {
        const { originReviewer, categoryInfo } = this.state;
        const { item } = this.props;
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 12,
            },
        }
        const firstFormItems = [
            {
                label: '审核类型',
                type: this.props.item ? 'Text' : 'RadioGroup',
                key: 'reviewType',
                placeholder: '请选择审核类型',
                colSpan: 24,
                formItemLayout,
                style: { width: '200px' },
                option: {
                    initialValue: 1,
                    rules: [
                        { required: !this.props.item, message: '必填' },
                    ],
                },
                otherProps: !this.props.item ? {
                    options: getReviewType,
                    onChange: this.handleChange,
                } : {}
            },
            {
                label: '审核人员',
                type: this.props.item ? 'Text' : 'XSelect',
                key: 'reviewer',
                placeholder: '请选择审核人员',
                colSpan: 24,
                formItemLayout,
                style: { width: '200px' },
                option: {
                    rules: [
                        { required: !this.props.item, message: '必填' },
                    ],
                },
                otherProps: !this.props.item ? {
                    options: this.state.reviewer,
                    labelInValue: true,
                    configKey: 'enName',
                    configValue: 'cnName',
                    allowClear: true,
                    showSearch: true,
                    filterOption: false,
                    onSearch: debounce((value) => {
                        if (!value) return;
                        const arr = []
                        for (let i = 0; i < originReviewer.length; i++) {
                            let data = originReviewer[i];
                            if ((data.cnName && data.cnName.indexOf(value) !== -1) ||
                                (data.enName && data.enName.indexOf(value) !== -1)) {
                                arr.push(data);
                                if (arr.length >= 20) {
                                    break;
                                }
                            }

                        }
                        this.setState({
                            reviewer: arr
                        })
                    })
                } : {}
            },
        ]
        return (
            <div className="data-review-setting-detail">
                <Row gutter={24}>
                    <Col span={24}>
                        {renderForm(firstFormItems, this.props.form)}
                        {this.state.reviewTypeValue === 2 ||
                            item && item.reviewerSettingId && item.reviewType == "2" ?
                            <PlatFormSite {...this.props}
                                platformInfo={this.state.platformInfo}
                                addPlatformSite={this.addPlatformInfo}
                                remove={this.remove} /> :
                            <BaseinfoCategory
                                form={this.props.form}
                                categoryInfo={this.state.categoryInfo}
                                addCategory={this.addCategory}
                                remove={this.removeCategory} />
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(App);