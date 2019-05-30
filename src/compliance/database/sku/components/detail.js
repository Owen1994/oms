import React, { Component } from 'react';
import { Row, Col, Form, message } from 'antd';

// import { GET_SENSITIVESKUDETAIL_DETAIL2 } from "../constants";
import { path } from "../../../configs";
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
            fetchPost(path.irp + 'GetSensitiveSkuDetail2/getSensitiveSkuDetail', params).then(data=>{
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
                        sku: dataObj.sku,
                        intellectualCode: dataObj.intellectualCode,
                        isSensitive: dataObj.isSensitive,
                        sensitiveReason: dataObj.sensitiveReason,
                        remarks: dataObj.remarks,
                        source: dataObj.source,
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
                label: 'SKU',
                type: 'Text',
                key: 'sku',
                colSpan: 8,
                formItemLayout,
                style: { width: '200px' },
                otherProps: {
                }
            },
            {
                label: '是否敏感',
                type: 'Text',
                key: 'isSensitive',
                colSpan: 8,
                formItemLayout,
                style: { width: '200px' },
                otherProps: {
                }
                
            },
            {
                label: '知产代码',
                type: 'Text',
                key: 'intellectualCode',
                colSpan: 8,
                formItemLayout,
                style: { width: '200px' },
                otherProps: {
                }
            },
            {
                label: '来源',
                key: 'source',
                type: 'Text',
                colSpan: 8,
                formItemLayout,
                otherProps: {
                }
            },
            {
                label: '敏感原因',
                type: 'Text',
                key: 'sensitiveReason',
                colSpan: 8,
                formItemLayout,
                style: { width: '200px' },
                otherProps: {
                }
            },
            {
                label: '备注',
                key: 'remarks',
                formItemLayout,
                type: 'Text',
                colSpan: 8,
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
            },]
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
            <div className="sensitive-sku-detail2">
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