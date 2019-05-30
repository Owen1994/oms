import React from 'react';
import {
    Button,
    Table,
    Menu,
    Dropdown,
    Icon,
    Pagination,
    Tooltip
} from 'antd';
import PropTypes from 'prop-types';
import { parseProjectState } from '../../../selector'
import { timestampFromat } from '../../../../util/baseTool'
import Functions from '../../../../components/functions'
import { pageSize } from '../../constants'
import PopConfirm from '../../../common/components/confirm'
import { DELETE_ITEM_API , SUBMIT} from '../constants/Api'
import { fetchPost } from '../../../../util/fetch'

export default class TableList extends React.Component {
    state = {
        columnWidth:30,
        selectedRowKeys: [],
        personSelectVisible: false
    }
    columns = [{
        title: '立项申请编码',
        dataIndex: 'hotsellCode',
        width: 85
    }, {
        title: '项目流信息',
        dataIndex: 'projectflowInfo',
        width: 100,
        render: (text, record) =>
            <div>
                <p>{text}</p>
                <p>({record.projectflowCode})</p>
            </div>
    }, {
        title: '分类',
        dataIndex: 'classify1',
        width: 120,
        render: (text, record) =>
            <div className="bisection bisection-classify">
                {record.classify1 ? <p><span>一级：</span>{record.classify1}</p> : null}
                {record.classify2 ? <p><span>二级：</span>{record.classify2}</p> : null}
                {record.classify3 ? <p><span>三级：</span>{record.classify3}</p> : null}
            </div>,
    }, {
        title: '市场最低价',
        dataIndex: 'sellPrice',
        width: 80,
        render: (text, record) =>
            <div>
                {text ? <p><span>售价：</span>{text}</p> : null}
                {record.sellLink ? <p><a target="_blank" href={record.sellLink}>打开链接</a></p> : null}
            </div>,
    }, {
        title: '热销最低价',
        dataIndex: 'hotsellPrice',
        width: 80,
        render: (text, record) =>
            <div>
                {text ? <p><span>售价：</span>{text}</p> : null}
                {record.hotsellLink1 ? <p><a target="_blank" href={record.hotsellLink1}>打开链接1</a></p> : null}
                {record.hotsellLink2 ? <p><a target="_blank" href={record.hotsellLink2}>打开链接2</a></p> : null}
            </div>,
    }, {
        title: '销售',
        dataIndex: 'salesman',
        width: 120,
        render: (text, record) => 
                    <div className="text-left">
                        <p  className="nowrap"><span>预估成本：</span>{record.procurementPrice}</p>
                        <p  className="nowrap"><span>销售员：</span>{text}</p>
                        <p className="nowrap"><span>生成时间：</span>{timestampFromat(record.createTime)}</p>
                    </div>
      },{
        title: '开发人员',
        dataIndex: 'developer',
        width: 105,
        render: (text, record) =>
        // bisection bisection-developer
            <div  className="text-left">
                {record.developDirector ? <p><span>开发总监：</span>{record.developDirector}</p> : null}
                {record.developManager ? <p><span>开发经理：</span>{record.developManager}</p> : null}
                {text ? <p><span>开发专员：</span>{text}</p> : null}
            </div>,
    }, {
        title: '状态',
        dataIndex: 'state',
        width: 60,
        render: (text, record) =>
            <div>
                {parseProjectState(text)}
            </div>
    }, {
        title: '备注',
        width:80,
        dataIndex: 'remark',
        render: (text) =>
            <Tooltip placement="bottom" title={text}>
                <div className="remark-nowarp">
                    {text}
                </div>
            </Tooltip>
    }, {
        title: '操作',
        width: 50,
        dataIndex: 'permissions',
        render: (items = [], record) => {
            let menuItems = items.map(item => {
                if (item.code === 'view') {
                    return <Tooltip placement="left" title={"查看当前数据的审核记录"}>
                            <a onClick={() => this.props.showModal('logModalVisible', record)}
                                style={{ marginLeft: '10px' }}>
                                审核记录
                                </a>
                        </Tooltip>
                } else if (item.code === 'audit') {
                    return <a onClick={() => this.props.showModal('reviewModalVisible', record)}
                            style={{ marginLeft: '10px' }}>
                            审核
                                </a>
                } else if (item.code === 'dispatch') {
                    return <a onClick={() => this.props.showModal('selectPersonModalVisible', record)}
                            style={{ marginLeft: '10px' }}>
                            分派
                                </a>
                } else if (item.code === 'update') {
                    return <Tooltip placement="left" title={"手动修改当前数据"}>
                            <a onClick={() => this.props.showModal('addModalVisible', record, '编辑热销申请')}
                                style={{ marginLeft: '10px' }}>
                                编辑
                                </a>
                        </Tooltip>
                } else if (item.code === 'delete') {
                    return <Tooltip placement="left" title={"删除当前数据，已删除数据会存入删除日志中"}>
                            <a onClick={() => PopConfirm('是否确认要删除？', '', () => this.handleDel(record))}
                                style={{ marginLeft: '10px' }}>
                                删除
                                </a>
                        </Tooltip>
                }else if (item.code === 'submit') {
                    return <Tooltip placement="left" title={"提交前，允许修改当前数据；提交后，当前数据进入待销售主管审核，不允许再次修改"}>
                            <a onClick={() => PopConfirm('是否确认提交？', '', () => this.handleSubmit(record))}
                                style={{ marginLeft: '10px' }}>
                                提交
                                </a>
                        </Tooltip>
                }
            })
            menuItems = menuItems.filter(v=>v)
            if(items.length === 1) return menuItems[0]
            const menu = (
                <Menu>
                    {menuItems.map((v,k)=>{
                        return <Menu.Item key={k}>
                                    {v}
                                </Menu.Item>
                    })}
                </Menu>);
            return (
                <div>
                    {items.length > 0 ? <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link">
                            更多
                            <Icon type="down" />
                        </a>
                    </Dropdown>
                        : null
                    }
                </div>
            )
        }
    }
    ];

    handleDel = (item) => {
        fetchPost(DELETE_ITEM_API, { id: item.id }, 1).then(data => {
            if (data.state === '000001') {
                this.props.handleSubmit();
            }
        })
    }
    handleSubmit = (item) => {
        fetchPost(SUBMIT, { 
            auditResult:1,
            bizId:[item.id],
            comment:"",
            formId:"NpsHotProductApply",
        }, 1).then(data => {
            if (data.state === '000001') {
                this.props.handleSubmit();
            }
        })
    }
    render() {
        const { data, pageData, pageNumber, handleSubmit } = this.props;
        const total = data ? data.total : 0;
        const rowSelection = {
            columnWidth: 30,
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys
                })
            }
        };
        return (
            <div>
                <div className='margin-sm-top clear white padding-sm'>
                    <Functions {...this.props} functionkey="005-000002-000001-002">
                        <Tooltip placement="bottom" title={"勾选多行待分派数据，统一分派给某个专员；分派完，当前所选数据完结，并生成多个立项单号"}>
                            <Button onClick={() => this.props.showModal('selectPersonModalVisible', undefined, undefined, this.state.selectedRowKeys)}>批量分派</Button>
                        </Tooltip>
                    </Functions>
                    <Functions {...this.props} functionkey="005-000002-000001-003">
                        <Tooltip placement="bottom" title={"销售批量申请引入热销新品"}>
                            <Button className='pull-right' icon="download" onClick={() => this.props.showModal('exportVisible')} style={{ marginLeft: '20px' }}>导入</Button>
                        </Tooltip>
                    </Functions>
                    <Functions {...this.props} functionkey="005-000002-000001-001">
                        <Tooltip placement="bottom" title={"销售申请引入热销新品"}>
                            <Button className='pull-right' icon="plus" onClick={() => this.props.showModal('addModalVisible', undefined, '新增热销申请')}>新增</Button>
                        </Tooltip>
                    </Functions>
                </div>
                <div className='white padding-notop-10'>
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        rowSelection={rowSelection}
                        dataSource={data.list}
                        pagination={false}
                    />
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={pageSize}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        current={pageNumber}
                        defaultCurrent={1} onShowSizeChange={handleSubmit}
                        total={total}
                        pageSize={pageData}
                        onChange={handleSubmit} />
                </div>
            </div>
        )
    }
}

TableList.propTypes = {
    data: PropTypes.object.isRequired,
    pageData: PropTypes.number.isRequired,
    pageNumber: PropTypes.number.isRequired
}