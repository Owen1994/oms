import React from 'react'
import {
    Button,
    Spin,
    Table,
    Pagination,
    message,
    Tooltip,
    Dropdown,
    Menu,
    Icon,
} from 'antd'
import PopConfirm from '../../../../common/components/confirm';
import {fetchPost} from '../../../../util/fetch';
import * as API from '../../../common/constants/Api'
import Functions from '../../../../components/functions'

export default class Tablelist extends React.Component {
    columns = [
        {
            title: '档案ID',
            dataIndex: 'autoPartsId',
            align: 'center',
            width: 100,
        },
        {
            title: '档案名称',
            dataIndex: 'autoPartsName',
            align: 'center',
            width: 100,
            render: (text, record, index) => {
                return (
                    <div className={"hover-show-all"} style={{maxWidth: 120}}>
                        <Tooltip placement={"top"} title={record.autoPartsName}>
                            {record.autoPartsName}
                        </Tooltip>
                    </div>
                )
            }
        },
        {
            title: '站点及eBay分类',
            // dataIndex: 'creator',
            align: 'center',
            render: (text, record, index) => {
                return (
                    <div className="part-ebayClassify">
                        <div className="part-clear">
                            <div className="part-title">站点：</div>
                            <div className="part-content">{record.siteName}</div>
                        </div>
                        <div className="part-clear">
                            <div className="part-title">ebay分类：</div>
                            <div className="part-content2">{record.fullCategoryName}</div>
                        </div>
                    </div>
                )
            }
        },
        {
            title: '处理人员及时间',
            // dataIndex: 'createdTime',
            align: 'center',
            width: 220,
            render: (text, record, index) => {
                return (
                    <div>
                        <div className="part-clear">
                            <div className="part-title">处理人员：</div>
                            <div className="part-content">{record.creator}</div>
                        </div>
                        <div className="part-clear">
                            <div className="part-title">处理时间：</div>
                            <div className="part-content">{record.createdTime}</div>
                        </div>
                    </div>
                )
            }
        },
        {
            title: '处理状态',
            dataIndex: 'importStatus',
            align: 'center',
            width: 80,
            render: (text, record, index) => {
                if (text === '处理失败') {
                    return (
                        <span style={{color: 'red'}}>{record.importStatus}</span>
                    )
                } else {
                    return (
                        <span>{record.importStatus}</span>
                    )
                }

            }
        },
        {
            title: '处理失败原因',
            dataIndex: 'importRslt',
            align: 'center',
            render: (text, record, index) => {
                return (
                    record.importRslt === '--' ? '--' :
                        <Tooltip placement='top' title={record.importRslt}>
                            <p className="hover-show-all" style={{maxWidth: 150}}>
                                {record.importRslt}
                            </p>
                        </Tooltip>
                )
            }
        },
        {
            title: '操作',
            align: 'center',
            width: 100,
            render: (text, record, index) => {
                return (
                    <div>
                        <Functions {...this.props} functionkey="008-000001-000005-005">
                            {record.ifOutport ? <a href={record.excelUrl}
                                                   style={{display: 'inline-block', marginRight: 10}}>导出</a> : ""}
                        </Functions>
                        <Functions {...this.props} functionkey="008-000001-000005-006">
                            {record.ifDelete ? <a onClick={() => PopConfirm('是否确认要删除？', '', () => {
                                this.delRule([record.autoPartsCode.toString()])
                            })}>删除</a> : ""}
                        </Functions>
                    </div>
                )
            }
        },
    ];
    //删除
    delRule = (autoPartsCode) => {
        fetchPost(API.DELETE_PART_LIST, {autoPartsCodeArr: autoPartsCode}, 1)
            .then(result => {
                if (result.state === '000001') {
                    this.props.handleSubmit();
                    this.clearSelected();
                }
            })
    };
    //批量删除
    delRules = (selectedRows) => {
        if (selectedRows.length === 0) {
            message.error('请先选择数据');
            return;
        } else {
            if (selectedRows.some(item => item.importStatus === '处理中')) {
                message.error('仅能删除处理成功或者处理失败对应的数据');
                return;
            } else {
                let codeArr = selectedRows.map(item => item.autoPartsCode);
                PopConfirm('确认是否删除？', '', () => this.delRule(codeArr));
            }
        }
    };
    //选择分页时，清除选择项
    rowSelection = {
        columnWidth: 30,
        selectedRowKeys: [],
        selectedRows: [],
        onChange: (selectedRowKeys, selectedRows) => {
            this.rowSelection.selectedRowKeys = selectedRowKeys
            this.rowSelection.selectedRows = selectedRows
            this.setState({})
        }
    };
    // 清除 selectedRowKeys
    clearSelected = () => {
        this.rowSelection.selectedRowKeys = []
        this.rowSelection.selectedRows = []
        this.setState({})
    };

    render() {
        const {data, pageNumber, pageData, handleSubmit, loadingState, openModal, openModal2} = this.props;
        const total = data.total;

        const menu = (
            <Menu>
                <Menu.Item>
                    <Functions {...this.props} functionkey="008-000001-000005-004">
                        <span onClick={() => this.delRules(this.rowSelection.selectedRows)}>批量删除</span>
                    </Functions>
                </Menu.Item>
            </Menu>)
        return (
            <div className="part-tablelist">
                <div className="overflow-hidden" style={{marginBottom: 10}}>
                    <div className="pull-right">
                        <Functions {...this.props} functionkey="008-000001-000005-002">
                            <Button icon="download" onClick={openModal} style={{marginRight: 10}}>数据导入</Button>
                        </Functions>
                        <Functions {...this.props} functionkey="008-000001-000005-003">
                            <Button icon="edit" onClick={openModal2}>采集</Button>
                        </Functions>
                    </div>
                    <div className="pull-left">
                        <Dropdown overlay={menu}>
                            <Button>批量操作<Icon type="down" /></Button>
                        </Dropdown>
                    </div>
                </div>
                <div className="part-table">
                    <Spin spinning={loadingState}>
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={data.data}
                            pagination={false}
                            rowKey={(record, index) => (index)}
                            rowSelection={this.rowSelection}
                        />
                    </Spin>
                </div>
                <div className="pagination">
                    <Pagination className="pull-right"
                                showTotal={total => `共 ${total} 条`}
                                showSizeChanger                             // 是否可以改变 pageSize
                                current={pageNumber}
                                showQuickJumper={{goButton: true}}        // 是否可以快速跳转至某页
                                total={total}                               // 数据总数
                                pageSize={pageData}                         // 每页条数
                                onChange={handleSubmit}                     // 页码改变的回调，参数是改变后的页码及每页条数
                                onShowSizeChange={handleSubmit}             // pageSize 变化的回调
                                // size="small"
                    />
                </div>
            </div>
        )
    }
}