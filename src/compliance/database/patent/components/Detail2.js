import React, { Component } from 'react';
import { Row, Col, Form, message } from 'antd';

import { UPLOAD_URL } from '../../../../constants/Api'
import { GET_PATENTPOOL_DETAIL2 } from "../constants";
import { angentPicUrl} from '../../../../util/baseTool'

import renderForm from '../../../common/utils/render-form';
import { fetchPost } from '../../../../util/fetch';
import { timestampFromat } from '../../../../utils';
import { config } from '../../../configs';
import { path } from '../../../configs';

class App extends Component {
    state = {
        dynamicColumn: [],
        dataList: [],
        infoDataSource: []
    }
    infoColumns = [
        {
            title: '专利号',
            dataIndex: 'patentNumber',
            width: 100,
        },
        {
            title: '权利人',
            dataIndex: 'obligee',
            width: 100,
        }, 
        {
            title: '专利类型',
            dataIndex: 'patentType',
            align: 'center',
            width: 100,
        },	
        
        {
            title: '专利申请日期',
            dataIndex: 'patentApplyTime',
            width: 150,
            render: text => text && timestampFromat(text , 'yyyy-mm-dd')
        },
        {
            title: '专利过期日期',
            dataIndex: 'patentTime',
            width: 150,
            render: text => text && timestampFromat(text , 'yyyy-mm-dd')
        },
        {
            title: '优先权日期',
            dataIndex: 'priorityTime',
            width: 150,
            render: text => text && timestampFromat(text , 'yyyy-mm-dd')
        },
        // {
        //     title: '专利图片',
        //     dataIndex: 'patentPic',
        //     align: 'center',
        //     width: 150,
        //     render: (text, record) => {
        //         let defaultUrl = config.defaultImg;
        //         return (
        //             <span className='infoTabel'>
        //                 {   
        //                     record.patentPic.length?
        //                     record.patentPic.map(item=>(
        //                         <img key={item} style={{marginLeft: '6px'}} src={item ? angentPicUrl(item) : defaultUrl} width={58} height={50} 
        //                             onError={() => {
        //                                 record.patentPic = [defaultUrl]
        //                                 this.forceUpdate()
        //                         }}/>
        //                     )) : ''
        //                 }
        //             </span>
        //         )
        //     }
        // }, 
    ]
    componentDidMount() {
        if (this.props.item) {
            let params = {}
            params.id = this.props.item.id
            fetchPost(path.irp + 'GetPatentPoolDetail2/getPatentPoolDetail', params).then(data=>{
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
                        country: dataObj.country,
                        partantSummary: dataObj.partantSummary,
                        intellectualCode: dataObj.intellectualCode,
                        remarks: dataObj.remarks,
                        patentPic: dataObj.patentPic,
                        patentIllustrations: dataObj.patentIllustrations,
                        
                    })
                    if (dataObj.disableInfo) {
                        this.dynamicRenderTabelHeader(dataObj.disableInfo.platform)
                        this.setState({dataList: dataObj.disableInfo.platformSiteSensitive, infoDataSource: dataObj.patentInfo})
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
                label: '专利名称',
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
                otherProps: {
                }
            },
            {
                label: '专利摘要',
                key: 'partantSummary',
                formItemLayout,
                type: 'Text',
                colSpan: 8,
                className:"row-show",
                otherProps: {
                    maxStringLength:1,
                }
            },
            {
                label: '注册国家',
                type: 'Text',
                key: 'country',
                colSpan: 8,
                formItemLayout,
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
                key: 'patentPic',
                type: 'PhotoUpload',
                colSpan: 24,
                formItemLayout: tabelFormItemLayout,
                className:"mb15",
                otherProps: {
                    action: UPLOAD_URL,
                    readonly: true      
                },
            },
            {
                label: '专利信息',
                key: 'info',
                formItemLayout: tabelFormItemLayout,
                type: 'Table',
                colSpan: 24,
                className:"mb15",
                otherProps: {
                    size: "small",
                    bordered: true,
                    // scroll: {x: '960px'},
                    columns: this.infoColumns,
                    dataSource: this.state.infoDataSource,
                    rowKey: (record, index) => (index),
                    pagination: false,
                },
            },
            {
                label: '专利图片',
                key: 'patentIllustrations',
                type: 'PhotoUpload',
                colSpan: 24,
                formItemLayout: tabelFormItemLayout,
                className:"mb15",
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
            <div className="data-patent-detail2">
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