import React, { Component } from 'react';
import { Row, Col, Form, message, Pagination } from 'antd';
import Tableitem from '../../../../components/Tableitem';

// import { GET_AUTHENTICATION_DETAIL2 } from "../constants";

import renderForm from '../../../common/utils/render-form';
import { fetchPost } from '../../../../util/fetch';
import { timestampFromat } from '../../../../utils';
import { path, page } from '../../../configs';

import { config } from '../../../configs';
import { angentPicUrl } from '../../../../util/baseTool'

class App extends Component {
    state = {
        dataList: [],
        current: page.defaultCurrent,
        total: 0,
        pageSize: page.defaultPageSize
    }
    componentDidMount() {
        if (this.props.item) {
            let params = {}
            params.id = this.props.item.id
            fetchPost('/irp/api/baseInfoReview/Log/log', params).then(data => {
                if (data && data.state === "000001") {
                    const dataObj = data.data

                    this.props.form.setFieldsValue({
                        sku: dataObj.sku,
                    })
                    if (dataObj.data) {
                        this.setState({ total: dataObj.total })
                        this.setState({ dataList: dataObj.data })
                    }
                } else {
                    message.error('操作失败.')
                }
            })
        }
    }
    onHandelLogRequest = (pageNumber, pageData) => {
        let params = {}
        params['pageNumber'] = pageNumber || page.defaultCurrent;
        params['pageData'] = pageData || page.defaultPageSize;
        params.id = this.props.item.platformAuthenticationId
        fetchPost('/irp/api/baseInfoReview/Log/log', params).then(data => {
            if (data && data.state === "000001") {
                const dataObj = data.data
                this.props.form.setFieldsValue({
                    sku: dataObj.sku,
                })
                if (dataObj.data) {
                    // 分页赋值
                    this.setState({ total: dataObj.total })
                    this.setState({ dataList: dataObj.data })
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
            title: '背景图问题',
            dataIndex: 'backgroundPic',
            align: 'center',
            width: 150,
            render: (text, record) => {
                let defaultUrl = config.defaultImg;
                return (
                    <div className='disableInfo'>
                        {
                            Array.isArray(record.backgroundPic) ?
                                record.backgroundPic.map((item, index) => (
                                    <div>
                                        <img src={item.imgUrl ? angentPicUrl(item.imgUrl) : defaultUrl} width={45} height={45}
                                            onError={() => {
                                                item.imgUrl = defaultUrl
                                                this.forceUpdate()
                                            }}
                                        />
                                        <span>{item.imgDesc}</span>
                                    </div>)) : typeof (record.backgroundPic) === 'string' ?
                                    (<span>{record.backgroundPic}</span>) : (<span>--</span>)
                        }
                    </div>
                )
            }
        }, {
            title: '审核结果',
            dataIndex: 'reviewResult',
            align: 'center',
            width: 80
        }, {
            title: '原因',
            dataIndex: 'reason',
            align: 'center',
            width: 200,
            render: (text, record) => {
                let defaultUrl = config.defaultImg;
                return (
                    <div>
                        {
                            Array.isArray(record.reason) ?
                                record.reason.map((item, index) => (
                                    <div style={{minHeight:"20px"}}>
                                        <Tableitem
                                            title={item.name}
                                            content={item.content}
                                            left={70}
                                            right={110}
                                        />
                                    </div>)) : typeof (record.reason) === 'string' ?
                                    (<span>{record.reason}</span>) : (<span>--</span>)
                        }
                    </div>
                )
            }
        }, {
            title: '禁售信息',
            dataIndex: 'disableInfo',
            align: 'center',
            width: 200,
            render: (text, record) => {
                return (
                    <div className='disableInfo'>
                        {
                            record.disableInfo.map((item, index) => {
                                return (
                                    <Tableitem
                                        title={item.sensitiveLayer}
                                        content={item.platformSite}
                                        left={70}
                                        right={110}
                                    />
                                )
                            })
                        }
                    </div>
                )
            }
        }
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
            <div className="data-baseInfo-detail2">
                <div> SKU: {this.props.item.sku}</div>
                <Row gutter={24}>
                    <Col span={24}>
                        {renderForm(firstFormItems, this.props.form)}
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