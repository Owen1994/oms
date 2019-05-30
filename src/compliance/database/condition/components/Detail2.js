import React, { Component } from 'react';
import { Row, Col, Form, message } from 'antd';

// import { GET_CONDITIONMENU_DETAIL2 } from "../constants";

import renderForm from '../../../common/utils/render-form';
import { fetchPost } from '../../../../util/fetch';
import { timestampFromat } from '../../../../utils';
import { path } from '../../../configs';

class App extends Component {
    state = {
        dynamicColumn: [],
        dataList: [],
        isHasSpu: true
    }
    componentDidMount() {
        if (this.props.item) {
            let params = {}
            params.id = this.props.item.id
            fetchPost(path.irp + 'GetConditionMenuDetail2/getConditionMenuDetail', params).then(data=>{
                if(data && data.state === "000001"){
                    const dataObj = data.data
                    dataObj.addTime = timestampFromat(dataObj.addTime , 'yyyy-mm-dd hh:MM:ss')
                    dataObj.editTime = timestampFromat(dataObj.editTime , 'yyyy-mm-dd hh:MM:ss')
                    if (dataObj.sentiveReason && dataObj.sentiveReason.remarks && dataObj.sentiveReason.remarks.length) {
                        dataObj.sentiveReason  = dataObj.sentiveReason.remarks.join(","); 
                        this.props.form.setFieldsValue({
                            sentiveReason: dataObj.sentiveReason,
                        })
                    }
                    if (dataObj.spu) {
                        this.setState({isHasSpu: true})
                        this.props.form.setFieldsValue({spu: dataObj.spu})
                    } else {
                        this.setState({isHasSpu: false})
                        this.props.form.setFieldsValue({chineseName: dataObj.chineseName})
                    }
                    
                    this.props.form.setFieldsValue({
                        addTime: dataObj.addTime,
                        additions: dataObj.additions,
                        editions: dataObj.editions,
                        editTime: dataObj.editTime,
                        sku: dataObj.sku,
                        registerCountry: dataObj.registerCountry,
                        intellectualCode: dataObj.intellectualCode,
                        remarks: dataObj.remark,
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
            <Col span={24}  className='title' >
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
        const skuFormItemLayout = {
            labelCol: {
                span: 2,
            },
            wrapperCol: {
                span: 22,
            },
        }
        const firstFormItems = [
            {
                
                label: this.state.isHasSpu? 'SPU': '中文名称',
                key: this.state.isHasSpu? 'spu': 'chineseName',
                type: 'Text',
                formItemLayout,
                colSpan: 8,
                otherProps: {
                    maxStringLength: 10
                }
            },
        ]
        const secondFormItems = [
            {
                label: 'SKU',
                key: 'sku',
                type: 'Text',
                formItemLayout: skuFormItemLayout,
                colSpan: 24,
                style: { background: 'red' },
                otherProps: {
                    // maxStringLength: 10
                }
            },
        ]
        const thiridFormItems = [
            // {
            //     label: '注册国家',
            //     key: 'registerCountry',
            //     type: 'Text',
            //     formItemLayout,
            //     colSpan: 8,
            //     otherProps: {
            //         maxStringLength: 10
            //     }
            // },
            {
                label: '知产代码',
                key: 'intellectualCode',
                type: 'Text',
                formItemLayout,
                colSpan: 8,
                otherProps: {
                    maxStringLength: 10
                }
            },
            {
                label: '敏感原因',
                key: 'sentiveReason',
                type: 'Text',
                formItemLayout,
                colSpan: 8,
                otherProps: {
                    maxStringLength: 10
                }
            },
            {
                label: '来源',
                key: 'source',
                type: 'Text',
                formItemLayout,
                colSpan: 8,
                otherProps: {
                    maxStringLength: 10
                }
            },
            {
                label: '备注',
                key: 'remarks',
                type: 'Text',
                formItemLayout,
                colSpan: 8,
                otherProps: {
                    maxStringLength: 10
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
        const forthFormItems = [
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
        return (
            <div className="conditionMenu-detail2">
                <Row gutter={24}>
                    <Col span={24}>
                        {this.renderHeader('获取条件')}
                        { renderForm(firstFormItems, this.props.form) }
                        {this.renderHeader('获取结果')}
                        { renderForm(secondFormItems, this.props.form) }
                        { renderForm(thiridFormItems, this.props.form) }
                        {this.renderHeader('日志信息')}
                        { renderForm(forthFormItems, this.props.form) }

                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(App);