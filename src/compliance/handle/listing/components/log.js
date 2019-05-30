import React, { Component } from 'react';
import { Row, Col, Form, message, Pagination } from 'antd';
import Tableitem from '../../../../components/Tableitem';

// import { GET_AUTHENTICATION_DETAIL2 } from "../constants";

import renderForm from '../../../common/utils/render-form';
import { fetchPost } from '../../../../util/fetch';
import { timestampFromat } from '../../../../utils';
import { path, page } from '../../../configs';

import { config } from '../../../configs';
import { angentPicUrl} from '../../../../util/baseTool'

class App extends Component {
    state = {
        dataList: [],
        current: page.defaultCurrent,
        total: 0,
        pageSize: page.defaultPageSize
    }
    componentDidMount() {
        if (this.props.item) {
            let params = {
                pageData:20,
                pageNumber:1
            }
            params.id = this.props.item.id
            fetchPost('/irp/api/listingImageReview/Log/log', params).then(data=>{
                if(data && data.state === "000001"){
                    const dataObj = data.data
                    
                    this.props.form.setFieldsValue({
                        sku: dataObj.sku,
                    })
                    if (dataObj.data) {
                        this.setState({total: dataObj.total})
                        this.setState({dataList: dataObj.data})
                    }
                }else if(data && data.state === "000000"){
                    message.info(data.msg)
                }
            })
        }
    }
    onHandelLogRequest = (pageNumber, pageData)=>{
        let params = {}
        params['pageNumber'] = pageNumber || page.defaultCurrent;
        params['pageData'] = pageData || page.defaultPageSize;
        params.id = this.props.item.platformAuthenticationId
        fetchPost('/irp/api/baseInfoReview/Log/log', params).then(data=>{
            if(data && data.state === "000001"){
                const dataObj = data.data
                this.props.form.setFieldsValue({
                    sku: dataObj.sku,
                })
                if (dataObj.data) {
                    // 分页赋值
                    this.setState({total: dataObj.total})
                    this.setState({dataList: dataObj.data})
                }
            } else {
                message.error('操作失败.')
            }
        })
    }
    columns = [
        {
            title: '审核时间',
            dataIndex: 'reviewTime',
            align: 'center',
            width: 120,
            render: text => timestampFromat(text, 'yyyy-mm-dd hh:MM:ss')
        }, {
            title: '审核人员',
            dataIndex: 'reviewers',
            align: 'center',
            width: 80
        }, {
            title: '审核结果',
            dataIndex: 'reviewResult',
            align: 'center',
            width: 80
        }, {
            title: '侵权图片',
            dataIndex: 'infringementPic',
            align: 'center',
            width: 200,
            render: (text, record) => {
                let defaultUrl = config.defaultImg;
                return (
                    <div className='disableInfo'>
                         {
                           Array.isArray(record.infringementPic)? 
                           record.infringementPic.map ((item, index)=> (
                            <div className="text-left">
                                <img src={ item.imgUrl ? angentPicUrl(item.imgUrl) : defaultUrl} width={60} height={60} 
                                    onError={() => {
                                        item.imgUrl = defaultUrl
                                        this.forceUpdate()
                                    }}
                                />
                                <span style={{paddingLeft:"10px"}}>{item.imgDesc}</span>
                            </div>)) :  typeof(record.backgroundPic) === 'string'?
                            (<span>{record.backgroundPic}</span>) : (<span>--</span>)
                        }
                    </div>
                )
            }
        },  
    ]
    render() {
        const formItemLayout = {
            labelCol: {
                span: 3,
            },
            wrapperCol: {
                span: 21,
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
                label: '',
                key: 'aa',
                formItemLayout: tabelFormItemLayout,
                type: 'Table',
                colSpan: 24,
                otherProps: {
                    size: "small",
                    bordered: true,
                    columns: this.columns,
                    dataSource: this.state.dataList,
                    rowKey: (record, index) => (index),
                    pagination: false
                }
            },
        ]
        const { total, current, pageSize } = this.state;
        return (
            <div className="data-listing-review-detail2">
                <Row gutter={24}>
                    <Col span={24}>
                        { renderForm(firstFormItems, this.props.form) }
                    </Col>
                    <div className="pagination">
                        <Pagination
                            className="pull-right"
                            showTotal={total => `共 ${total} 条`}
                            pageSizeOptions={page.pageSizeOptions}      // 指定每页可以显示多少条
                            showSizeChanger                             // 是否可以改变 pageSize
                            defaultCurrent={page.defaultCurrent}        // 默认的当前页数
                            current={current}
                            showQuickJumper                             // 是否可以快速跳转至某页
                            total={total}                               // 数据总数
                            pageSize={pageSize}                         // 每页条数
                            onChange={this.onHandelLogRequest}                        // 页码改变的回调，参数是改变后的页码及每页条数
                            onShowSizeChange={this.onHandelLogRequest}                // pageSize 变化的回调
                        />
                    </div>
                </Row>
            </div>
        );
    }
}

export default Form.create()(App);