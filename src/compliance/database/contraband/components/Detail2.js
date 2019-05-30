import React, { Component } from 'react';
import { Row, Col, Form, message } from 'antd';

// import { path } from '../../../configs';

import renderForm from '../../../common/utils/render-form';
import { fetchPost } from '../../../../util/fetch';
import { timestampFromat } from '../../../../utils';
import { path } from '../../../configs';

class App extends Component {
    state = {
        dynamicColumn: [],
        dataList: [],
    }
    componentDidMount() {
        if (this.props.item) {
            let params = {}
            params.platformContrabandId = this.props.item.platformContrabandId
            fetchPost(path.irp + 'GetPlatformContrabandPoolDetail2/getPlatformContrabandPoolDetail', params).then(data=>{
                if(data && data.state === "000001"){
                    const dataObj = data.data
                    dataObj.addTime = timestampFromat(dataObj.addTime , 'yyyy-mm-dd hh:MM:ss')
                    dataObj.editTime = timestampFromat(dataObj.editTime , 'yyyy-mm-dd hh:MM:ss')
                    this.props.form.setFieldsValue({
                        addTime: dataObj.addTime,
                        additions: dataObj.additions,
                        editions: dataObj.editions,
                        editTime: dataObj.editTime,
                        image: dataObj.image,
                        englishContraband: dataObj.englishContraband,
                        chineseContraband: dataObj.chineseContraband,
                        associatedSku: dataObj.associatedSku,
                        intellectualCode: dataObj.intellectualCode,
                        productDesc: dataObj.productDesc,
                    })
                    if (dataObj.disableInfo) {
                        this.dynamicRenderTabelHeader(dataObj.disableInfo.platform)
                        this.setState({dataList: dataObj.disableInfo.platformSiteSensitive})
                    }
                } else {
                    message.error(data.msg)
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
        const longItemLayout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 14,
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
                label: '英文违禁品名',
                key: 'englishContraband',
                type: 'Text',
                formItemLayout: longItemLayout,
                colSpan: 8,
                otherProps: {
                }
            },
            {
                label: '中文违禁品名',
                key: 'chineseContraband',
                type: 'Text',
                colSpan: 8,
                formItemLayout: longItemLayout,
                otherProps: {
                }
            },
            {
                label: '知产代码',
                type: 'Text',
                key: 'intellectualCode',
                colSpan: 8,
                formItemLayout: longItemLayout,
                style: { width: '200px' },
                otherProps: {
                }
            },
            {
                label: '关联SKU',
                key: 'associatedSku',
                type: 'Text',
                formItemLayout: longItemLayout,
                className:"mb15",
                colSpan: 8,
                otherProps: {
                }
            },
            {
                label: '产品说明',
                key: 'productDesc',
                formItemLayout: longItemLayout,
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
            {
                label: '实物图片',
                key: 'image',
                type: 'PhotoUpload',
                colSpan: 24,
                formItemLayout: tabelFormItemLayout,
                otherProps: {
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
            <div className="contraband-detail2">
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