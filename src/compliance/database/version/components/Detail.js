import React, { Component } from 'react';
import { Row, Col, Form, message } from 'antd';

import { UPLOAD_URL } from '../../../../constants/Api'
import { getIntellctualCode,
         getDisableInfoTabel } from '../../../common/request/index';
         
import renderForm from '../../../common/utils/render-form';

import Disableinfo from '../../../common/components/Disableinfo-new';

// import { GET_VERSIONPOOL_DETAIL } from "../constants";
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
        if (this.props.item){
            this.getDetail()
        }
    }
    getDetail() {
        if (this.props.item.versionId) {
            let params = {}
            params.versionId = this.props.item.versionId
            fetchPost(path.irp + 'GetVersionRepositoryDetail/getVersionRepositoryDetail', params).then(data=> {
                if(data && data.state === "000001"){
                    const dataObj = data.data
                    if (dataObj.intellectualCodeId) {
                        dataObj.intellectualCodeId = dataObj.intellectualCodeId + ''
                    } else {
                        dataObj.intellectualCodeId = '0'
                    }
                    this.props.form.setFieldsValue({
                        productName: dataObj.productName,
                        skuExample: dataObj.skuExample,
                        intellectualCodeId: dataObj.intellectualCodeId,
                        version: dataObj.version,
                        obligee: dataObj.obligee,
                        remark: dataObj.remark,
                        versionPic: dataObj.versionPic,
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
    handleChange = (value)=> {
        if (value === '0') return
        this.postDisableInfoRequest(value)
    }
    postDisableInfoRequest = (intellectualCodeId) => {
        if (!intellectualCodeId) return
        let params = { intellectualCodeId: intellectualCodeId }
        getDisableInfoTabel(params).then((data) => {
            if (data.state = '000001') {
                this.setState({ disableInfo : data.disableInfo })
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
        const imageItemLayout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 20,
            },
        }
        const firstFormItems = [
            {
                label: '版权名称',
                key: 'productName',
                placeholder: '请输入版权名称',
                type: 'Input',
                colSpan: 24,
                formItemLayout,
                option: {
                    rules: [
                        { required: true, message: '必填' },
                        { max: 80, message: '最多输入80个字符' },
                    ],
                },
            },{
                label: '示例SKU',
                key: 'skuExample',
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
                label: '版权号',
                key: 'version',
                type: 'Input',
                formItemLayout,
                placeholder: '请输入版权号',
                colSpan: 24,
                option: {
                    rules: [
                        { max: 50, message: '最多输入50个字符' },
                    ],
                },
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
                        { max: 200, message: '最多输入200个字符' },
                    ],
                },
            },
            {
                label: '实物图片',
                key: 'versionPic',
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
            <div className="data-version-detail">
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