import React, { Component } from 'react';
import { Table, Pagination, Spin, Modal, Icon } from 'antd';

import Options from './Options';
import { timestampFromat } from '../../../../util/moment';



class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgPreview: false,
            imgUrl: ""
        }
    }

    handleClick = (e) => {
        // console.log(e.target.previousElementSibling.children[0].currentSrc);
        const imgurl = e.target.previousElementSibling.children[0].currentSrc;
        this.setState({
            imgPreview: true,
            imgUrl: imgurl
        })
    }

    handleCancel = () => {
        this.setState({ imgPreview: false })
    }

    componentDidMount() {
        this.props.listFetch();
    };

    render() {
        const { data } = this.props.list_reducer;
        // const columns = this.columns;
        const columns = [
            {
                title: '序号',
                dataIndex: 'sno',
                // key: 'sno',
                align: 'center',
                width: 50,
                render: (text, record, index) => ++index + (this.props.paginationReducer.current - 1) * this.props.paginationReducer.pageSize
            }, {
                title: '意向供应商',
                dataIndex: 'vendors',
                key: 'vendors',
                // width: 130,
                render: (text, record) => {
                    return (
                        <div className="npd-supplier-table-col">
                            <div className="npd-clear">
                                <div className="npd-title2">编码：</div>
                                <div className="npd-content2">{record.vendorsCode}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title2">名称：</div>
                                <div className="npd-content2">{record.vendorsName}</div>
                            </div>
                        </div>
                    )
                }
            }, {
                title: '正式供应商',
                dataIndex: 'supplier',
                key: 'supplier',
                // width: 130,
                render: (text, record) => {
                    return (
                        <div className="npd-supplier-table-col">
                            <div className="npd-clear">
                                <div className="npd-title2">编码：</div>
                                <div className="npd-content2">{record.supplierCode}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title2">名称：</div>
                                <div className="npd-content2">{record.supplierName}</div>
                            </div>
                        </div>
                    )
                }
            }, {
                title: '联系人信息',
                dataIndex: 'contact',
                key: 'contact',
                width: 160,
                render: (text, record) => {
                    return (
                        <div className="npd-supplier-table-col">
                            <div className="npd-clear">
                                <div className="npd-title">联系人：</div>
                                <div className="npd-content">{record.contactName}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title">联系电话：</div>
                                <div className="npd-content">{record.contactTel}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title">qq：</div>
                                <div className="npd-content">{record.contactQQ}</div>
                            </div>
                        </div>
                    )
                }
            }, {
                title: '供应商地址',
                dataIndex: 'address',
                key: 'address',
                align: 'center',
                render: (text, record) => {
                    return (
                        <div style={{maxWidth: 130, margin: "0 auto", textAlign: 'left'}}>
                            {record.address}
                        </div>
                    )
                }
            }, {
                title: '是否建档',
                dataIndex: 'isArchiving',
                key: 'isArchiving',
                align: 'center',
                width: 70,
                render: (text, record) => {
                    return (
                        <div>
                            {
                                text === 1 ? "是" : "否"
                            }
                        </div>
                    )
                }
            }, {
                title: '附件一',
                dataIndex: 'attachment',
                key: 'attachment1',
                align: 'center',
                render: (text, record) => {
                    return( record.attachment[0]&&record.attachment[0].url ? (
                        <div className="npd-supplier-attachment1">
                            <div className="npd-supplier-img">
                                <img src={record.attachment[0].url} />
                            </div>
                            <Icon type="eye" className="npd-supplier-eye" style={{fontSize: 20, color: '#08c'}}  onClick={this.handleClick}/>
                            <Modal visible={this.state.imgPreview} footer={null} onCancel={this.handleCancel} >
                                <img alt="附件一" style={{ width: '100%' }} src={this.state.imgUrl} />
                            </Modal>
                        </div>
                    ) : null)
                }
            }, {
                title: '附件二',
                dataIndex: 'attachment',
                key: 'attachment2',
                align: 'center',
                render: (text, record) => {
                    return( record.attachment[1]&&record.attachment[1].url ? (
                        <div className="npd-supplier-table-col">
                            <div>
                                <a href={record.attachment[1].url} className="npd-supplier-url">{record.attachment[1].name}</a>
                            </div>
                        </div>
                    ) : null)
                }
            }, {
                title: '添加信息',
                dataIndex: 'createInfo',
                key: 'createInfo',
                align: 'center',
                width: 160,
                render: (text, record) => {
                    return (
        
                        <div className="npd-supplier-table-col">
                            <div className="npd-clear">
                                <div className="npd-title">添加人：</div>
                                <div className="npd-content">{record.createName}</div>
                            </div>
                            <div className="npd-clear">
                                <div className="npd-title">添加时间：</div>
                                <div className="npd-content">{timestampFromat(record.createTime, "yyyy-mm-dd hh:MM:ss")}</div>
                            </div>
                        </div>
                    )
                }
            }, {
                title: '操作',
                dataIndex: 'options',
                key: 'options',
                align: 'center',
                width: 60,
                render: (text, record) => {
                    return (
                        <Options {...this.props} item={record} dataFetch={this.props.dataFetch} />
                    )
                }
            }
        ]
        const { total, current, pageSize } = this.props.paginationReducer;
        const { listFetch } = this.props;
        return (
            <div>
                <div className="npd-supplier-table">
                    <Spin spinning={this.props.list_reducer.loading}>
                        <Table
                            bordered
                            size="small"
                            columns={columns}
                            dataSource={data}
                            pagination={false}
                            rowKey={(record, index) => (index)}
                        />
                    </Spin>
                </div>
                <div className="pagination">
                    <Pagination className="pull-right"
                        showTotal={total => `共 ${total} 条`}
                        showSizeChanger                             // 是否可以改变 pageSize
                        current={current}
                        showQuickJumper={{goButton:true}}                             // 是否可以快速跳转至某页
                        total={total}                             // 数据总数
                        pageSize={pageSize}                       // 每页条数
                        onChange={listFetch}                // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={listFetch}        // pageSize 变化的回调
                        // size="small"
                    />
                </div>
            </div>
        );
    }
}

export default List;
