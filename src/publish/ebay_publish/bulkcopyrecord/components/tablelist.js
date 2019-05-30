/**
 * 作者: 陈文春
 * 描述: 批量复制列表table组件
 * 时间: 2018年9月3日08:33:16
 **/
import React from 'react'
import { Link } from 'react-router-dom'
import {
    Button,
    Spin,
    Table,
    Pagination,
    Tooltip,
} from 'antd'

export default class Tablelist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
        this.columns = [
            {
                title: '站点',
                dataIndex: 'siteCode',
                align: 'center',
            },
            {
                title: '账号信息',
                dataIndex: 'descSellerId',
                align: 'center',
                width:200,
            },
            {
                title: '待复制listing数',
                dataIndex: 'cpCount',
                align: 'center',
            },
            {
                title: '重复listing处理策略',
                dataIndex: 'duplicationStrategy',
                align: 'center',
            },
            {
                title: '复制信息',
                // dataIndex: 'creator',
                align: 'center',
                render: (text, record, index) => {
                    return (
                        <div className="record-create">
                            <div className="record-clear">
                                <div className="record-title">操作人员：</div>
                                <div className="record-content">{record.creator}</div>
                            </div>
                            <div className="record-clear">
                                <div className="record-title">操作时间：</div>
                                <div className="record-content">{record.createdTime}</div>
                            </div>
                        </div>
                    )
                }
            },
            {
                title: '处理状态',
                dataIndex: 'cpStatus',
                align: 'center',
                render: (text, record, index) => {
                    return (
                        <div className="record-create">
                            <div className="record-clear">
                                <div className="record-title" style={{ width: 100, textAlign: 'right' }}>处理状态：</div>
                                <div className="record-content">{text}</div>
                            </div>
                            <div className="record-clear">
                                <div className="record-title">处理完成时间：</div>
                                <div className="record-content">{record.finishTime}</div>
                            </div>
                        </div>
                    )
                }
            },
            {
                title: '复制结果',
                align: 'center',
                render: (text, record, index) => {
                    // "state":0 草稿箱
                    // "state":1 刊登中
                    // state: 2 刊登失败
                    // "state":3  正在销售
                    const json = JSON.parse(record.rsltMsgJson);
                    return (
                        <div className="record-create">
                            {record.rsltMsgJson ? (
                                <div className="record-clear">
                                    {json['草稿箱'] ? <p><a href="javascript:;" onClick={() => this.goTo(0, record.cpId)}>草稿箱</a>：{json['草稿箱']}</p> : null}
                                    {json['刊登中'] ? <p><a href="javascript:;" onClick={() => this.goTo(1, record.cpId)}>刊登中</a>：{json['刊登中']}</p> : null}
                                    <Tooltip placement={"bottom"} title={json['失败原因']}>
                                        <div className="hover-show-all" style={{ maxWidth: 200 }}>
                                            {json['失败原因'] ? <p>失败原因：{json['失败原因']}</p> : null}
                                        </div>
                                    </Tooltip>
                                </div>
                            ) : null}
                            {record.rsltUrl ? (
                                <div className="record-clear" style={{ textAlign: 'left', maxWidth: 200, wordBreak: 'break-all' }}>
                                    <p>侵权listing：<a href={record.rsltUrl}>下载</a></p>
                                </div>
                            ) : null}
                        </div>
                    )
                }
            },
            {
                title: '刊登结果',
                dataIndex: 'a',
                align: 'center',
                render: (text, record, index) => {
                    
                    // "state":0 草稿箱
                    // "state":1 刊登中
                    // state: 2 刊登失败
                    // "state":3  正在销售
                    try {
                        const json = JSON.parse(record.rsltMsgJson);
                        return (
                            <div className="record-create">
                                {json['已处理'] ? (
                                    <div className="record-clear">
                                        <p>已处理：{json['已处理']}</p>
                                        <p><a href="javascript:;" onClick={() => this.goTo(3, record.cpId)}>刊登成功</a>：{json['刊登成功']}</p>
                                        <p><a href="javascript:;" onClick={() => this.goTo(2, record.cpId)}>刊登失败</a>：{json['刊登失败']}</p>
                                    </div>
                                ) : '--'}
                            </div>
                        )
                    } catch (err) { }
                }
            },
        ]
    }

    goTo = (state, cpId) => {
        const { history } = this.props;
        localStorage.setItem("_cpId", JSON.stringify({ state, cpId }))
        history.push('/publish/listing/list/')
    }

    render() {
        const { data, pageNumber, pageData, handleSubmit, loadingState } = this.props;
        const total = data.total;
        return (
            <div className="record-tablelist">
                <div className="record-flashBtn">
                    <Button icon="redo" onClick={() => this.props.handleSubmit()}>刷新</Button>
                </div>
                <div className="record-table">
                    <Spin spinning={loadingState}>
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={data.data}
                            pagination={false}
                            rowKey={(record, index) => (index)}
                        />
                    </Spin>
                </div>
                <div className="pagination">
                    <Pagination className="pull-right"
                        showTotal={total => `共 ${total} 条`}
                        showSizeChanger                             // 是否可以改变 pageSize
                        current={pageNumber}
                        showQuickJumper={{ goButton: true }}       // 是否可以快速跳转至某页
                        total={total}                             // 数据总数
                        pageSize={pageData}                       // 每页条数
                        onChange={handleSubmit}                // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={handleSubmit}        // pageSize 变化的回调
                    // size="small"
                    />
                </div>
            </div>
        )
    }
}