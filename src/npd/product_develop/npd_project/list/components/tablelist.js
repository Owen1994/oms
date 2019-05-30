import React from 'react'
import {
    Link
} from 'react-router-dom';

import {
    Button,
    Modal,
    Tooltip,
    Popover,
    Icon,
    Table,
    Menu,
    Dropdown,
    Spin,
    Pagination,
    Form,
} from 'antd'
import Functions from '../../../../../components/functions'
import {
    timestampFromat,
    popUpImage
} from "../../../../../util/baseTool"
import {
    ntsTypes,
} from "../../common/json"
import states from "../../../../constants/state"
import {levelOptions} from '../../../../../util/options';

export default class Tablelist extends React.Component {
    columns = ()=>{
        return this.columns =  [
            {
                title: '热销申请号',
                dataIndex: 'hotcode',
                width:130,
                key: 'hotcode',
                render:(text, record, index)=>{
                    return (
                        <div className="bisection bisection-hotcode">
                            <p  className="nowrap"><span>立项单号：</span>{record.projectCode}</p>
                            <p className="nowrap"><span>热销申请号：</span>{record.hotsellCode}</p>
                        </div>
                    )
                }
            }, 
            {
                title: '产品信息',
                dataIndex: 'info',
                width:150,
                key: 'info',
                render:(text, record, index)=>{
                    return (
                        <div className="npd-project-tablewrap-info">
                            <div onClick={()=>popUpImage(record.image.url)} className="npd-project-tablewrap-info-img">
                                <img src={record.image && record.image.url} alt=""/>
                            </div>
                            <div className="npd-project-tablewrap-info-content">
                                <div>
                                    <label>中文名称：</label>
                                    <span>{record.chineseName}</span>
                                </div>
                                <div>
                                    <label>业务综合成本：</label>
                                    <span>{record.costing}</span>
                                </div>
                            </div>
                        </div>
                    )
                }
            }, 
            {
                title: '最佳销量链接',
                dataIndex: 'sellBestLink',
                width:50,
                key: 'sellBestLink',
                render:(text, record, index)=>{
                    return <a href={text} target="_blank">打开链接</a>
                }
            }, 
            {
                title: '开发理由',
                dataIndex: 'reason',
                width:70,
                key: 'reason',
                render:(text, record, index)=>{
                    if(!text) return null
                    var str 
                    if(text.length <= 10){
                        str = text.slice(0,10)
                    }else {
                        str = text.slice(0,10) + "..."
                    }

                    return (<Tooltip placement="left" title={text}>
                                <span>{str}</span>
                            </Tooltip>)
                }
            }, 
            {
                title: '新品类型',
                dataIndex: 'ntsType',
                width:50,
                key: 'ntsType',
                render:(text, record, index)=>{
                    return <span>{ntsTypes[text]}</span>
                }
            }, 
            {
                title: '项目流信息',
                width:70,
                render:(text, record, index)=>{
                    return record.projectflowInfo +"(" + record.projectflowCode +")"
                }
            }, 
            {
                title: '状态',
                // dataIndex: 'state',
                width:100,
                key: 'state',
                render:(text, record, index)=>{
                    return  <div className="text-left">
                                <p><span>立项状态：</span>{states[record.state]}</p>
                                <p><span>绑定状态：</span>{states[record.bindState]}</p>
                            </div>
                }
            },  
            // {
            //     title: '绑定状态',
            //     dataIndex: 'bindState',
            //     width:50,
            //     key: 'bindState',
            //     render:(text, record, index)=>{
            //         return <span>{states[text]}</span>
            //     }
            // }, 
            {
                title: '新增时间',
                dataIndex: 'time',
                width:110,
                key: 'time',
                render:(text, record, index)=>{
                    return (
                        <div className="text-left">
                            <p  className="nowrap"><span>开发员：</span>{record.developer}</p>
                            <p className="nowrap"><span>新增时间：</span>{timestampFromat(record.createTime)}</p>
                        </div>
                        
                    )
                }
            }, 
            {
                title: '操作',
                dataIndex: 'permissions',
                width:50,
                key: 'permissions',
                render: (text, record, index) => {
                    if(!text) return null
                    var list = text.map( v=>v.code )
                    var arr = ["detail","submit","update","audit","delete","bind","sample"]
                    list = list.filter(v=>arr.includes(v))
                    return this.getHandleBtn(list,record)
                },
            }
        ];
    }
    handleBtn = {
        // 详情
        detail:(record)=>{
            var url = "/npd/pd/project/project_detail/?id=" + record.id
            return (<Tooltip placement="left" title={"查看立项单详情明细"}>
                        <Link to={url}>查看</Link>
                    </Tooltip>)
        },
        // 提交
        submit:(record)=>{
            return (<Tooltip placement="left" title={"提交前，允许修改当前数据；提交后，当前数据进入待开发经理审核，不允许再次修改"}>
                        <a href="javascript:;" onClick={()=>this.soleHandle(1,record)}>提交</a>
                    </Tooltip>)
        },
        // 修改
        update:(record)=>{
            var url = "/npd/pd/project/project_detail_edit/?id=" + record.id
            return (<Tooltip placement="left" title={"手动修改当前数据"}>
                        <Link to={url}>修改</Link>
                    </Tooltip>)
        },
        // 审核
        audit:(record)=>{
            var url = "/npd/pd/project/review/?id=" + record.id
            return (<Tooltip placement="left" title={"审核通过，则进入下一流程；审核不通过，则进入驳回状态，需重新修改再提交"}>
                        <Link to={url}>审核</Link>
                    </Tooltip>)
        },
        // 删除
        delete:(record)=>{
            return (<Tooltip placement="left" title={"删除当前数据，已删除数据会存入删除日志中"}>
                        <a href="javascript:;" onClick={()=>this.soleHandle(2,record)}>删除</a>
                    </Tooltip>)
        },
        // 绑定供应商
        bind:(record)=>{
            var url = "/npd/pd/project/bindvendor/?id=" + record.id
            return (
                <Tooltip placement="left" title={"绑定一家或多家能够提供该新品的供应商"}>
                    <Link to={url}>绑定供应商</Link>
                </Tooltip>)
        },
        // 对样
        sample:(record)=>{
            var url = "/npd/pd/project/check_specimen/?id=" + record.id
            return (<Tooltip placement="left" title={"针对能够提供新品的供应商，生成样品单，数据进入样品列表"}>
                        <Link to={url}>对样</Link>
                    </Tooltip>)
        }
    }
    // 提交 1   删除 2 
    soleHandle = (type,record)=>{
        var {changeSoleData} = this.props;
        if(type === 1 && record.ntsType === 1 && record.chineseName === undefined){
            return message.warning("当前热销引入数据需先修改后再提交")
        }
        changeSoleData(type,record)
    }
    getHandleBtn = (arr,record)=>{
        if(!arr || arr.length == 0)return null
        var btns = arr.map(v=>{
            var value = this.handleBtn[v]
            if(typeof value == "function"){
                value = value(record)
            }
            return value
        })
        if(arr.length == 1){
             return btns[0]
        }else {
            var menuItems = btns.map((v,k)=>{
                return (
                    <Menu.Item key={k}>
                        {v}
                    </Menu.Item>
                )
            })
            var menu = (<Menu>{menuItems}</Menu>)
            return  <div className="actions-btns">
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link">
                                更多 <Icon type="down"/>
                            </a>
                        </Dropdown>
                    </div>
        }
    }
    Paginatihandle = (page, pageSize)=>{
        var {tableDataActionAsync,npdProjecListData,clearSelected} = this.props
        var params = npdProjecListData.params
        params.pageNumber = page
        params.pageData = pageSize
        clearSelected()
        tableDataActionAsync(params)
    }
    createHandle = ()=>{
        var {history} = this.props;
        history.push("/npd/pd/project/create/")
    }

    render(){
        
        var {npdProjecListData,loading,rowSelection,review,showModal} = this.props
        var {total,list,params} = npdProjecListData
        var { pageNumber,pageData} = params
        var columns = typeof this.columns == "function" ? this.columns():this.columns;

        var table = (
            <Spin spinning={loading} delay={500} tip="Loading...">
                <div className="padding-notop-10">
                    <Table 
                    bordered={true}
                    size="small"
                    rowSelection={rowSelection}
                    dataSource={list}
                    pagination=  {false} 
                    columns={columns} />
                    <Pagination
                    showTotal={total => `共 ${total} 条`}
                    pageSizeOptions={levelOptions('分页显示条数')}
                    showSizeChanger 
                    showQuickJumper={{goButton: true}}
                    current={pageNumber}
                    defaultCurrent={1} onShowSizeChange={this.Paginatihandle}
                    total={total}
                    pageSize={pageData}
                    onChange={this.Paginatihandle}/>
                </div>
            </Spin>
        )
        var batchMenu = (
                <Menu>
                    <Menu.Item key={1}>
                        <Functions {...this.props} functionkey="005-000002-000002-002">
                            <Tooltip placement="right" title={"允许勾选多行待提交数据，进行批量提交操作"}>
                                <div style={{fontSize:"12px"}} onClick={()=>showModal(1)}>批量提交</div>
                            </Tooltip>
                        </Functions>
                    </Menu.Item>
                    <Menu.Item key={2}>
                        <Functions {...this.props} functionkey="005-000002-000002-003">
                            <Tooltip placement="right" title={"针对已锁定的立项单，批量分别生成新品交接单"}>
                                <div style={{fontSize:"12px"}} onClick={()=>showModal(2)}>批量生成交接单</div>
                            </Tooltip>
                        </Functions>
                    </Menu.Item>
                    <Menu.Item key={3}>
                        <Functions {...this.props} functionkey="005-000002-000002-004">
                            <Tooltip placement="right" title={"允许勾选多行相同状态的数据进行统一审核"}>
                                <div style={{fontSize:"12px"}} onClick={()=>showModal(3)}>批量审核</div>
                            </Tooltip>
                        </Functions>
                    </Menu.Item>
                </Menu>
        )
        var batchDom = (
            <div className="npd-project-batch-btns">
                <Dropdown overlay={batchMenu}>
                    <Button>
                        批量操作 <Icon type="down"/>
                    </Button>
                </Dropdown>
            </div>
        )
        var buttons = (
            <div className="npd-project-tablewrap-btns">
                {batchDom}
                <Functions {...this.props} functionkey="005-000002-000002-001">
                    <Tooltip placement="bottom" title={"开发申请自主引入新品"}>
                        <Button onClick={this.createHandle} className="pull-right">
                            <Icon type="plus" />
                            <span>新增</span>
                        </Button>
                    </Tooltip>
                </Functions>
            </div>
        )
        return (
            <div className="npd-project-tablewrap">
                {buttons}
                {table}
            </div>
        )
    }

}