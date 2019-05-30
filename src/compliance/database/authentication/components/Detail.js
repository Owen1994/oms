import React, { Component } from 'react';
import { Row, Col, Form } from 'antd';

import { getIntellctualCode,
         getDisableInfoTabel } from '../../../common/request/index';
         
import renderForm from '../../../common/utils/render-form';

import Disableinfo from '../../../common/components/Disableinfo-new';

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
    handleChange = (value)=> {
        if (value === '0') return
        this.postDisableInfoRequest(value)
    }
    postDisableInfoRequest = (intellectualCodeId) => {
        if (!intellectualCodeId) return
        let params = { intellectualCodeId: intellectualCodeId }
        getDisableInfoTabel(params).then((data) => {
            if (data.state = '000001') {
                this.setState({ disableInfo : data.disableInfo || [] })
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
                        { max: 200, message: '最多输入200个字符' },
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
                        { max: 1000, message: '最多输入1000个字符' },
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
                        mode="replace"
                        defaultItem={1}
                        getRef={this.props.getRef}
                        form={this.props.form}
                        setValue={this.state.disableInfo}
                    />
                    { renderForm(secondFormItem, this.props.form) }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(App);