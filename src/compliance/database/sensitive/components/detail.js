import React, { Component } from 'react';
import { Row, Col, Form, message } from 'antd';

import { UPLOAD_URL } from '../../../../constants/Api'
// import { GET_SENSITIVEDETAIL_DETAIL2 } from "../constants";
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
            params.id = this.props.item.id
            fetchPost(path.irp + 'GetSensitiveDetail2/getSensitiveDetail', params).then(data=>{
                if(data && data.state === "000001"){
                    const dataObj = data.data
                    dataObj.addTime = timestampFromat(dataObj.addTime , 'yyyy-mm-dd hh:MM:ss')
                    dataObj.editTime = timestampFromat(dataObj.editTime , 'yyyy-mm-dd hh:MM:ss')
                    this.props.form.setFieldsValue({
                        addTime: dataObj.addTime,
                        additions: dataObj.additions,
                        editions: dataObj.editions,
                        editTime: dataObj.editTime,
                        country: dataObj.country,
                        figureCatagory: dataObj.figureCatagory,
                        figureLogoPic: dataObj.figureLogoPic,
                        intellectualCode: dataObj.intellectualCode,
                        obligee: dataObj.obligee,
                        sensitiveReason: dataObj.sensitiveReason,
                        trademark: dataObj.trademark,
                        trademarkNumber: dataObj.trademarkNumber,
                        remarks: dataObj.remarks,

                        image: dataObj.image,
                        source: dataObj.source,
                        useStatus: dataObj.useStatus  ,
                        wordMark: dataObj.wordMark,
                        activeStatus: dataObj.activeStatus,
                        imageCategory: dataObj.imageCategory,

                        isAuthorizations:dataObj.isAuthorizations,
                        infringementsEvading:dataObj.infringementsEvading,
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
        const imageItemLayout = {
            labelCol: {
                span: 2,
            },
            wrapperCol: {
                span: 16,
            },
        }
        const longItemLayout = {
            labelCol: {
                span: 10,
            },
            wrapperCol: {
                span: 12,
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
                label: '图片',
                key: 'image',
                type: 'PhotoUpload',
                colSpan: 24,
                formItemLayout: imageItemLayout,
                otherProps: {
                    action: UPLOAD_URL,
                    readonly: true,
                },
            },
        ]
        const secondeFormItems = [
            {
                label: '商标名',
                type: 'Text',
                key: 'wordMark',
                colSpan: 8,
                formItemLayout,
                style: { width: '200px' },
                otherProps: {
                }
            },
            {
                label: '使用状态',
                type: 'Text',
                key: 'useStatus',
                colSpan: 8,
                formItemLayout: longItemLayout,
                style: { width: '200px' },
                otherProps: {
                }
                
            },
            {
                label: '活跃状态',
                type: 'Text',
                key: 'activeStatus',
                colSpan: 8,
                formItemLayout,
                style: { width: '200px' },
                otherProps: {
                }
            },
            {
                label: '权利人',
                type: 'Text',
                key: 'obligee',
                colSpan: 8,
                longItemLayout,
                style: { width: '200px' },
                otherProps: {
                }
            },
            {
                label: '商标商品分类',
                key: 'trademark',
                type: 'Text',
                colSpan: 8,
                formItemLayout: longItemLayout,
                otherProps: {
                }
            },
            {
                label: '商标号',
                key: 'trademarkNumber',
                longItemLayout,
                type: 'Text',
                colSpan: 8,
                otherProps: {
                }
            },
            {
                label: '图片类别',
                key: 'imageCategory',
                formItemLayout,
                type: 'Text',
                colSpan: 8,
                otherProps: {
                }
            },
            {
                label: '注册国家',
                key: 'country',
                formItemLayout: longItemLayout,
                type: 'Text',
                colSpan: 8,
                otherProps: {
                }
            },
            {
                label: '知产代码',
                key: 'intellectualCode',
                formItemLayout,
                type: 'Text',
                colSpan: 8,
                otherProps: {
                }
            },
            {
                label: '是否授权',
                key: 'isAuthorizations',
                formItemLayout,
                type: 'Text',
                colSpan: 8,
                otherProps: {
                }
            },
            {
                label: '授权规避',
                key: 'infringementsEvading',
                formItemLayout: longItemLayout,
                type: 'Text',
                colSpan: 8,
                otherProps: {
                }
            },
            {
                label: '来源',
                key: 'source',
                formItemLayout,
                type: 'Text',
                colSpan: 8,
                otherProps: {
                }
            },
            {
                label: '备注',
                key: 'remarks',
                formItemLayout,
                type: 'Text',
                colSpan: 8,
                className:"mb15",
                otherProps: {
                }
            },
            {
                label: '禁售信息',
                key: 'aa',
                formItemLayout: tabelFormItemLayout,
                type: 'Table',
                colSpan: 24,
                otherProps: {
                    size: "small",
                    bordered: true,
                    columns: this.state.dynamicColumn,
                    dataSource: this.state.dataList,
                    rowKey: (record, index) => (index),
                    pagination: false
                }
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
            <div className="sensitive-detail2">
                <Row gutter={24}>
                    <Col span={24}>
                        {this.renderHeader('基本信息')}
                        { renderForm(firstFormItems, this.props.form) }
                        { renderForm(secondeFormItems, this.props.form) }
                        {this.renderHeader('日志信息')}
                        { renderForm(secondFormItems, this.props.form) }
                        { renderForm(thirdFormItems, this.props.form)}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(App);