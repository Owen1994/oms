import React from 'react'
import {
    Link
} from 'react-router-dom';

import Functions from '../../../../../components/functions'
import {
    Button,
    Modal,
    Icon,
    message,
    Table,
    Menu,
    Dropdown,
    Spin,
    Pagination,
    Tooltip,
    Form,
} from 'antd'
import {
    timestampFromat,
} from "../../../../../util/baseTool"
import {levelOptions} from '../../../../../util/options';
import {
    remittances,
    states
} from "../../common/json"
import { parseProjectState } from '../../../../selector'

export default class Tablelist extends React.Component {
    state = {
        // 1 提交； 2 删除
        type:0,
        record:null,
    }
    getName = (id,data)=>{
        var i =0,l=data.length
        for(;i<l;i++){
            if(id === data[i].id) return data[i].name
        }
    }
    columns = [
        {
            title: '首单申请号',
            width:100,
            dataIndex: 'firstOrderNo',
            key: 'firstOrderNo',
        }, 
        {
            title: '供应商信息',
            dataIndex: 'supplierInfo',
            width:100,
            key: 'supplierInfo',
            render:(text, record, index)=>{
                return (
                    <div style={{textAlign:"left"}}>
                        <p>
                            <span  className="display-inline-block">供应商编码：</span>
                            <span className="display-inline-block">{record.supplierCode}</span>
                        </p>
                        <p>
                            <span  className="display-inline-block">供应商名称：</span>
                            <span className="display-inline-block">{record.supplierName}</span>
                        </p>
                    </div>
                )
            }
        }, 
        {
            title: 'SKU信息',
            dataIndex: 'skuInfo',
            width:120,
            key: 'skuInfo',
            render:(text, record, index)=>{
                return (
                    <div>
                        <div className="npd-fapply-tablewrap-code">
                            <label>SKU种数：</label>
                            <span>{record.skuCount}</span>
                        </div>
                        <div className="npd-fapply-tablewrap-code">
                            <label>总数量：</label>
                            <span>{record.totalNum}</span>
                        </div>
                        <div className="npd-fapply-tablewrap-code">
                            <label>采购总金额：</label>
                            <span>{record.totalFee}</span>
                        </div>
                        <div className="npd-fapply-tablewrap-code">
                            <label>总运费：</label>
                            <span>{record.grossFreight}</span>
                        </div>
                    </div>
                )
            }
        }, 
        {
            title: '付款方式',
            dataIndex: 'remittanceType',
            width:60,
            key: 'remittanceType',
            render:(text, record, index)=>{
                return <span>{remittances[text]}</span>
            }
        }, 
        {
            title: '仓库',
            dataIndex: 'warehouseName',
            width:100,
            key: 'warehouseName',
            // render:(text, record, index)=>{
            //     return (
            //         <div>
            //             <div className="npd-fapply-tablewrap-delivery">
            //                 <label>仓库：</label>
            //                 <span>{record.warehouseName}</span>
            //             </div>
            //         </div>
            //     )
            // }
        }, 
        {
            title: '项目流信息',
            dataIndex: 'projectFlowName',
            width:110,
            key: 'projectFlowName',
            render:(text, record, index)=>{
                if(!text) return null;
                return <span>{text + "("+ record.projectFlowCode +")" }</span>
            }
        }, 
        {
            title: '状态',
            dataIndex: 'state',
            width:100,
            key: 'state',
            render:(text, record, index)=>{
                return <span>{parseProjectState(text)}</span>
            }
        }, 
        {
            title: '创建信息',
            dataIndex: 'logisticsAttache',
            width:110,
            key: 'logisticsAttache',
            render:(text, record, index)=>{
                return (
                    <div>
                        <div className="npd-fapply-tablewrap-time">
                            <label>开发员：</label>
                            <span>{record.developer}</span>
                        </div>
                        <div className="npd-fapply-tablewrap-time">
                            <label>添加时间：</label>
                            <span>{timestampFromat(record.createTime)}</span>
                        </div>
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
                var arr = ["detail","submit","update","audit","delete"]
                list = list.filter(v=>arr.includes(v))
                return this.getHandleBtn(list,record)
            },
        },
    ];
    getHandleBtn = (arr,record)=>{
        if(arr.length == 0)return 
        var btns = arr.map(v=>{
            if(typeof this.handleBtn[v] == "function") return this.handleBtn[v](record)
            return this.handleBtn[v]
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
    handleBtn = {
        // 详情
        detail:(record)=>{
            var url = "/npd/pd/fapply/project_detail/?id=" + record.id
            return (<Tooltip placement="left" title={"查看首单详情明细"}>
                        <Link to={url}>查看</Link>
                    </Tooltip>)
        },
        // 提交
        submit:(record)=>{
            return (<Tooltip placement="left" title={"提交前，允许修改当前数据；提交后，当前数据进入审核节点，不允许再次修改"}>
                        <a href="javascript:;" onClick={()=>this.soleHandle(1,record)}>提交</a>
                    </Tooltip>)
        },
        // 修改
        update:(record)=>{
            var url = "/npd/pd/fapply/project_detail_edit/?id=" + record.id
            return (<Tooltip placement="left" title={"手动修改当前数据"}>
                        <Link to={url}>修改</Link>
                    </Tooltip>)
        },
        // 审核
        audit:(record)=>{
            var url = "/npd/pd/fapply/review/?id=" + record.id
            return (<Tooltip placement="left" title={"审核通过，则进入下一审核阶段；审核不通过，则进入驳回状态，重新修改再提交"}>
                        <Link to={url}>审核</Link>
                    </Tooltip>)
        },
        // 删除
        delete:(record)=>{
            return (<Tooltip placement="left" title={"删除当前数据，已删除数据会存入删除日志中"}>
                        <a href="javascript:;" onClick={()=>this.soleHandle(2,record)}>删除</a>
                    </Tooltip>)
        },
    }
    Paginatihandle = (page, pageSize)=>{
        var {tableDataActionAsync,npdListData,clearSelected} = this.props
        var params = npdListData.params
        params.pageNumber = page
        params.pageData = pageSize
        clearSelected()
        tableDataActionAsync(params)
    }
    soleHandle = (type,record)=>{
        this.setState({type,record})
    }
    cancel = ()=>{
        this.setState({type:0,record:null})
    }
    handleOk = ()=>{
        var {type,record} = this.state;
        var {comReviewActionAsync,deleteActionAsync,tableDataActionAsync,npdListData} = this.props;
        var params,handle;
        if(type == 1){
            handle = comReviewActionAsync
            params = {
                auditResult:1,
                bizId:[record.id],
                comment:"",
                formId:"firstOrderApplyProcess",
            }
        }else if(type == 2) {
            handle = deleteActionAsync
            params = {
                id:record.id,
            }
        }
        handle(params)
        .then(result=>{
            this.cancel()
            if(result){
                message.success(result.msg)
                var {params} = npdListData
                tableDataActionAsync(params)
            }
        })
        .catch(err => this.cancel())
    }
    render(){
        var { type } = this.state
        var {npdListData,loading,rowSelection,review, handleExportFirstApply} = this.props
        var {total,list,params} = npdListData
        var { pageNumber,pageData} = params

        var table = (
            <Spin spinning={loading} delay={500} tip="Loading...">
                <div className="padding-sm">
                    <Table 
                    bordered={true}
                    size="small"
                    rowSelection={rowSelection}
                    dataSource={list} 
                    pagination = {false}
                    columns={this.columns} />
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
        var buttons = (
            <div className="npd-fapply-tablewrap-btns">
                <Functions {...this.props} functionkey="005-000002-000008-001">
                    <Tooltip placement="bottom" title={"清空已选的搜索条件"}>
                        <Button onClick={review} className="margin-ms-right">批量审核</Button>
                    </Tooltip>
                </Functions>
                <Button onClick={handleExportFirstApply} className='pull-right margin-ss-left'>
                    <Icon type="download" /> 导出首单
                </Button>
            </div>
        )
        var text =type?type==1?"提交":"删除":""
        return (
            <div className="npd-fapply-tablewrap">
                {buttons}
                {table}
                <Modal
                    title={text}
                    visible={!!type}
                    onOk={this.handleOk}
                    onCancel={this.cancel}>
                    <div style={{textAlign:"center"}}>{"是否确认" + text}</div>
                </Modal>
            </div>
        )
    }

}