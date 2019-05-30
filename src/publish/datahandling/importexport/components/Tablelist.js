/**
 * 作者: pzt
 * 描述: 速卖通列表页表格组件
 * 时间: 2018/4/18 18:26
 **/
import React, { Component } from 'react'
import { handleStatus, taskTypeStatus, fileTypeStatus, fileResultStatus, platformMap } from '../constants/index'

import {
    Button,
    Table,
    Pagination,
    Spin,
    Modal,
} from 'antd'
import '../css/css.css'
import {
    timestampFromat,
} from '../../../../util/baseTool';
import Shunt from '@/components/stateless/shunt'
import { fetchPost, downlodFile } from '../../../../util/fetch';

const confirm = Modal.confirm;

class Tablelist extends Component {
    formItemLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 }
    }

    state = {
        modalVisible: false,
        numberVisible: false,
        orderId: null,
        productId: null
    }

    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 30,
            render: (t, r, i) => {
                const { tablemodel } = this.props
                const {
                    pageData, pageNumber
                } = tablemodel.params;
                return pageNumber === 1 ? i + 1 : pageData * (pageNumber - 1) + i + 1
            }
        },
        {
            title: '文件名称',
            dataIndex: 'fileName',
            key: 'fileName',
            width: 70,
        },
        {
            title: '任务信息',
            dataIndex: 'fileType',
            key: 'fileType',
            width: 120,
            render: (text, record) => {
                let fileType = fileTypeStatus.find(v => v.id == record.fileType);
                let taskType = taskTypeStatus.find(v => v.id == record.taskType);
                return <div>
                    <Shunt title='平台' content={platformMap[record.platform] || "--"} />
                    <Shunt title='任务类型' content={fileType ? fileType.name : '--'} />
                    <Shunt title='任务模块' content={taskType ? taskType.name : '--'} />
                </div>
            }
        },
        {
            title: '创建信息',
            dataIndex: 'creator',
            key: 'creator',
            width: 130,
            render: (text, record) => {
                const time = record.createdTime ? timestampFromat(Number(record.createdTime), 2) : "--"
                return <div>
                    <Shunt title='创建人' content={text} />
                    <Shunt title='创建时间' content={time} />
                </div>
            }
        },
        {
            title: '处理信息',
            dataIndex: 'finishTime',
            key: 'finishTime',
            width: 130,
            render: (text, record) => {
                let { soldOutInfo, fileType } = record
                let execTime
                if (fileType !== 4 || !soldOutInfo) {
                    execTime = '--'
                } else {
                    execTime = soldOutInfo.executeTime ? timestampFromat(soldOutInfo.executeTime, 2) : "--"
                }
                const finishTime = record.finishTime ? timestampFromat(Number(record.finishTime), 2) : "--"

                return <div>
                    <Shunt title='执行时间' content={execTime} />
                    <Shunt title='完成时间' content={finishTime} />
                </div>
            }
        },
        {
            title: '状态',
            dataIndex: 'fileStatus',
            key: 'fileStatus',
            width: 50,
            render: text => {
                let data = handleStatus.find(v => v.code == text);
                return data ? data.name : '--'
            }
        },
        {
            title: '结果',
            dataIndex: 'fileResult',
            key: 'fileResult',
            width: 100,
            render: (text, record) => {
                let { soldOutInfo, fileType, fileResult } = record
                if (fileType !== 4 && !soldOutInfo) {
                    const state = fileResultStatus.find(v => v.id === fileResult)
                    return state ? state.name : '--'
                }
                if (typeof soldOutInfo !== 'object') {
                    soldOutInfo = {}
                }
                const { sum, success, fails } = soldOutInfo
                const processField = soldOutInfo.process
                return <div>
                    <Shunt title='已处理' content={`${processField}/${sum}`} />
                    <Shunt title='成功' content={success} />
                    <Shunt title='失败' content={fails} />
                </div>
            }
        },
        {
            title: '操作',
            dataIndex: 'Operation',
            key: 'Operation',
            width: 80,
            render: (text, record, index) => {
                let btn = [];
                switch (record.fileStatus) {
                    case 1:
                        btn.push(<a onClick={() => this.cancleExportTask(record.id)} href="javascript:;">取消</a>)
                        break;
                    case 2:
                        if (record.fileType === 4) {
                            btn.push(<a onClick={() => this.breakExportTask(record.id)} href="javascript:;">中断</a>)
                            if (record.fileResultPath) {
                                btn.push(<a className="margin-sm-left" type="down" target="_blank" href={record.fileResultPath}>下载结果</a>)
                            }
                        }
                        if (record.fileType === 3) {
                            btn.push(<Button type="primary" icon="download" loading={record.downloading} onClick={() => this.handleDownload(index, record)}>
                                下载文件
                              </Button>)
                        }
                        break;
                    case 3:
                        if (record.fileResultPath) {
                            btn.push(<a type="down" target="_blank" href={record.fileResultPath}>下载结果</a>)
                        }
                        break;
                    case 5:
                        if (record.fileResultPath) {
                            btn.push(<a type="down" target="_blank" href={record.fileResultPath}>下载结果</a>)
                        }
                }
                return btn
            },
        }
    ];

    handleDownload = (index, record) => {
        this.props.updateList({ index, key: 'downloading', value: true });
        fetchPost('/pls/ebay/motan/service/api/IEbayService/downloadForSync', { data: { id: record.id } }, 1)
            .then((result) => {
                this.props.updateList({ index, key: 'downloading', value: false });
                if (result.state === '000001' && result.data.url) {
                    downlodFile(result.data.url);
                }
            });
    }

    cancleExportTask = (id) => {
        confirm({
            title: '提示',
            content: '确定取消当前任务？',
            onOk: () => {
                this.props.cancleExportTaskAsync({ data: { id } })
                    .then(res => {
                        if (res) {
                            this.Paginatihandle()
                        }
                    })
            },
        });
    }

    breakExportTask = (id) => {
        confirm({
            title: '提示',
            content: '确定中断当前任务？',
            onOk: () => {
                this.props.breakExportTaskAsync({ data: { id, soldOutInterrupt: 1 } })
                    .then(res => {
                        if (res) {
                            this.Paginatihandle()
                        }
                    })
            },
        });
    }


    Paginatihandle = (page, pageSize) => {
        const { getParams, getList } = this.props;
        const value = getParams();
        if (page) {
            value.pageData = pageSize
            value.pageNumber = page
        }
        getList(value)
    }

    render() {
        const { columns } = this;
        const { tablemodel } = this.props
        const {
            list,
            total,
            params,
            loading
        } = tablemodel
        return (
            <div>
                <div className="newCluenk margin-sm-top">
                    <div className="content">
                        <Spin spinning={loading} delay={500} tip="Loading...">
                            <Table
                                columns={columns}
                                dataSource={list}
                                pagination={false}
                                className="table-smtlist"
                                bordered={true}
                            />
                        </Spin>
                        <Pagination
                            showTotal={total => `共 ${total} 条`}
                            pageSizeOptions={['20', '30', '40', '50']}
                            showSizeChanger
                            showQuickJumper={{ goButton: true }}
                            current={params.pageNumber}
                            defaultCurrent={1}
                            onShowSizeChange={this.Paginatihandle}
                            total={total}
                            pageSize={params.pageData}
                            onChange={this.Paginatihandle} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Tablelist
