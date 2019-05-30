import React, { Component } from 'react';
import { Row, Col, Form, message } from 'antd';

import { UPLOAD_URL } from '../../../../constants/Api'
// import { GET_VERSIONPOOL_DETAIL2 } from "../constants";
import { path } from '../../../configs';

import renderForm from '../../../common/utils/render-form';
import { fetchPost } from '../../../../util/fetch';
import { timestampFromat } from '../../../../utils';

class App extends Component {
    state = {
        dynamicColumn: [],
        dataList: [],
    }
    componentDidMount() {
        if (this.props.item) {
            let params = {}
            params.id = this.props.item.versionId
            fetchPost(path.irp + 'GetVersionRepositoryDetail2/getVersionRepositoryDetail', params).then(data=>{
                if(data && data.state === "000001"){
                    const dataObj = data.data
                    dataObj.addTime = timestampFromat(dataObj.addTime , 'yyyy-mm-dd hh:MM:ss')
                    dataObj.editTime = timestampFromat(dataObj.editTime , 'yyyy-mm-dd hh:MM:ss')
                    this.props.form.setFieldsValue({
                        addTime: dataObj.addTime,
                        additions: dataObj.additions,
                        editions: dataObj.editions,
                        editTime: dataObj.editTime,
                        productName: dataObj.productName,
                        skuExample: dataObj.skuExample,
                        intellectualCode: dataObj.intellectualCode,
                        obligee: dataObj.obligee,
                        version: dataObj.version,
                        remarks: dataObj. remarks,
                        versionPic: dataObj.versionPic,
                    })
                    if (dataObj.disableInfo) {
                        this.dynamicRenderTabelHeader(dataObj.disableInfo.platform)
                        this.setState({dataList: dataObj.disableInfo.platformSiteSensitive})
                    }
                } else {
                    message.error('操作失败.')
                }
            })
        }
    }
    dynamicRenderTabelHeader(data) {
        let fixedColumnHeader =  {
            title: '站点\\平台',
            dataIndex: 'site',
        }
        let columnHeaders = [fixedColumnHeader]
        if (!data.length) return
        data.forEach(item => {
            let dynamicColumn = {
                title: item, 
                dataIndex: item, 
                render: (text, record, index) => {
                    return (
                        <div>
                            {
                                text? text: '/'
                            }
                        </div>
                    );
            }}
            columnHeaders.push(dynamicColumn)
        });
        this.setState({dynamicColumn: columnHeaders})
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
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16,
            },
        }
    
        const tabelFormItemLayout = {
            labelCol: {
                span: 2,
            },
            wrapperCol: {
                span: 24,
            },
        }
        const firstFormItems = [
            {
                label: '版权名称',
                key: 'productName',
                type: 'Text',
                colSpan: 8,
                formItemLayout,
                otherProps: {
                }
            },
            {
                label: '示例SKU',
                type: 'Text',
                key: 'skuExample',
                colSpan: 8,
                formItemLayout,
                style: { width: '200px' },
                otherProps: {
                }
            },
            {
                label: '知产代码',
                key: 'intellectualCode',
                type: 'Text',
                formItemLayout,
                colSpan: 8,
                otherProps: {
                }
            },
            {
                label: '版权号',
                key: 'version',
                formItemLayout,
                type: 'Text',
                colSpan: 8,
                otherProps: {
                }
            },
            {
                label: '权利人',
                key: 'obligee',
                type: 'Text',
                colSpan: 8,
                formItemLayout,
                otherProps: {
                }
            },
            {
                label: '备注',
                key: 'remarks',
                type: 'Text',
                colSpan: 8,
                formItemLayout,
                otherProps: {
                }
            },
            {
                label: '禁售信息',
                key: 'aa',
                formItemLayout: tabelFormItemLayout,
                type: 'Table',
                colSpan: 24,
                className:"mb15",
                otherProps: {
                    size: "small",
                    bordered: true,
                    columns: this.state.dynamicColumn,
                    dataSource: this.state.dataList,
                    rowKey: (record, index) => (index),
                    pagination: false
                }
            },
            {
                label: '实物图片',
                key: 'versionPic',
                type: 'PhotoUpload',
                colSpan: 24,
                formItemLayout: tabelFormItemLayout,
                option: {
                    rules: [
                        { required: true, message: '必填' },
                    ],
                },
                otherProps: {
                    action: UPLOAD_URL,
                    readonly: true      
                },
            },
        ]
        const twoAverageItemLayout = {
            labelCol: {
                span: 5,
            },
            wrapperCol: {
                span: 16,
            },
        }
        const secondFormItems = [
            {
                label: '添加人员',
                key: 'additions',
                formItemLayout: twoAverageItemLayout,
                type: 'Text',
                colSpan: 12,
            },
            {
                label: '添加时间',
                key: 'addTime',
                formItemLayout: twoAverageItemLayout,
                type: 'Text',
                colSpan: 12,
            },
        ]
        const thirdFormItems = [
            {
                label: '最新修改人',
                key: 'editions',
                formItemLayout: twoAverageItemLayout,
                type: 'Text',
                colSpan: 12,
            },
            {
                label: '最新修改时间',
                key: 'editTime',
                formItemLayout: twoAverageItemLayout,
                type: 'Text',
                colSpan: 12,
            },
        ]
        
        return (
            <div className="data-version-detail2">
                <Row gutter={24}>
                    <Col span={24}>
                        {this.renderHeader('基本信息')}
                        { renderForm(firstFormItems, this.props.form) }
                        {this.renderHeader('日志信息')}
                        { renderForm(secondFormItems, this.props.form) }
                        { renderForm(thirdFormItems, this.props.form) }

                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(App);