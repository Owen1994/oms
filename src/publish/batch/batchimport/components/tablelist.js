import React from 'react'

import {
    Button,
    Icon,
    Table,
    Spin,
    Pagination,
} from 'antd'

import Functions from '../../../../components/functions'
import {
    timestampFromat,
    datasaddkey
} from "../../../../util/baseTool"
import {levelOptions} from '../../../../util/options';

export default class Tablelist extends React.Component {
    statusMap = {
        1:"待处理",
        2:"处理中",
        3:"已完成",
    }
    columns = ()=>{
        return this.columns =  [
            {
                title: '文件名',
                dataIndex: 'fileName',
                width:100,
                key: 'fileName',
                render:(text, record, index)=>{
                    return (
                        <a className="breakwrod" target="_blank" href={record.filePath}>{text}</a>
                    )
                }
            }, 
            {
                title: '账号信息',
                key: 'account',
                width:100,
                render:(text, record, index)=>{
                    return (
                        <div className="publish-batch-table-account">
                            <p><span>销售账号：</span>{record.account}</p>
                            <p style={{textIndent:"2em"}}><span>站点：</span>{record.site}</p>
                            <p style={{textIndent:"2em"}}><span>平台：</span>{record.platform}</p>
                        </div>
                    )
                }
            }, 
            {
                title: 'SKU数量',
                dataIndex: 'totalSkuNum',
                width:60,
                key: 'totalSkuNum',
            }, 
            {
                title: '导入信息',
                key: 'operator',
                width:120,
                render:(text, record, index)=>{
                    return (<div className="publish-batch-table-info">
                        <p><span>导入人员：</span>{record.creator}</p>
                        <p><span>导入时间：</span>{record.beginTime ? timestampFromat(Number(record.beginTime),0) : "--"}</p>
                    </div>)
                }
            }, 
            {
                title: '处理信息',
                key: 'status',
                width:120,
                render:(text, record, index)=>{
                    return (<div className="publish-batch-table-dispose">
                        <p style={{textIndent:"2em"}}><span>处理状态：</span>{this.statusMap[record.status]}</p>
                        <p><span>处理完成时间：</span>{record.endTime ? timestampFromat(Number(record.endTime),0) : "--"}</p>
                    </div>)
                }
            }, 
            {
                
                title: '处理结果信息',
                key: 'importResult',
                width:100,
                dataIndex: 'importResult',
                render:(text, record, index)=>{
                    try {
                        text = JSON.parse(text) || {}
                    }catch(err){
                        text = {}
                    }
                    var failed =text&&text.error?<span>{text.error}</span> : text&&text.failUrl?(<a href={text.failUrl}>下载</a>) : "--" ;
                    return (<div className="publish-batch-table-result">
                                <p><span>成功数量：</span>{text.successCount >= 0 ? text.successCount : "--"}</p>
                                <p><span>失败数量：</span>{(text.failCount !== undefined ) ? text.failCount : "--"}</p>
                                <p className="breakwrod"><span>失败原因：</span>{failed}</p>
                            </div>)
                }
            },  
        ];
    }
    Paginatihandle = (page, pageSize)=>{
        var {getListActionAsync,paramsData} = this.props
        var params = paramsData
        params.pageNumber = page
        params.pageData = pageSize
        getListActionAsync(params)
    }
    formatHandle = (arr)=>{
        var str = "null";
        var line = "--";
        arr.forEach((v,k)=>{
            v.key = v.id
            Object.keys(v).forEach(val=>{
                if(!v[val] || v[val] === str ){
                    if(val === 'endTime' || val === "beginTime"){
                        v[val] = null  
                    }else {
                        v[val] = line
                    }
                }
            })
        })
        console.log("formatHandle",arr)
        return arr
    }
    render(){
        
        var {listData,loadingData,paramsData,modalShow,getList} = this.props
        var {total,list} = listData
        this.formatHandle(list)
        var { pageNumber,pageData} = paramsData
        var columns = typeof this.columns == "function" ? this.columns():this.columns;

        var table = (
            <Spin spinning={loadingData} delay={500} tip="Loading...">
                    <Table 
                    bordered={true}
                    size="small"
                    dataSource={list}
                    pagination=  {false} 
                    columns={columns} />
                    <Pagination
                    showTotal={total => `共 ${total} 条`}
                    pageSizeOptions={levelOptions('分页显示条数')}
                    showSizeChanger 
                    showQuickJumper={{goButton: true}}
                    current={pageNumber}
                    defaultCurrent={1} 
                    onShowSizeChange={this.Paginatihandle}
                    total={total}
                    pageSize={pageData}
                    onChange={this.Paginatihandle}/>
            </Spin>
        )
        var buttons = (
            <div className="publish-batch-tablewrap-btns">
                <Button onClick={()=>getList()} className="pull-right">
                    <span>刷新</span>
                </Button>
                <Functions {...this.props} functionkey="008-000004-000001-002">
                    <Button onClick={modalShow} className="pull-right margin-sm-right">
                        <Icon type="download" />
                        <span>导入</span>
                    </Button>
                </Functions>
            </div>
        )
        return (
            <div className="publish-batch-tablewrap">
                {buttons}
                {table}
            </div>
        )
    }

}