import React from 'react';
import { Table, Button, message, Pagination, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Functions from '../../../../components/functions';
import { timestampFromat } from '../../../../util/baseTool'
import { pageSize,ntsTypes,notarize } from '../../constants'


export default class App extends React.Component {
    state = {
        selectedRowKeys: [],
        selectedRows:[]
    }
    columns = [ {
        title: '单号',
        width: 140,
        render: (text, record) =>
            <div  className="text-left">
                <p><span>跟踪号：</span>{record.trackingCode}</p>
                <p><span>立项单：</span>{record.projectCode}</p>
                <p><span>交接单：</span>{record.deliverCode}</p>
            </div>,
    }, {
        title: '产品信息',
        width: 135,
        render:(text,record)=>{
            return (<div className="text-left">
                        <p><span>SPU：</span>{record.spu}</p>
                        <p><span>新品名称：</span>{record.chineseName}</p>
                    </div>)
        }
    }, {
        title: '项目流信息',
        dataIndex: 'projectflowInfo',
        width: 90,
        render:(text, record) => {
            return (<div className="text-left">
                        <p>{record.projectFlowName}</p>
                        <p>({text})</p>
                    </div>)

        }
    }, {
        title: '供应商信息',
        width: 135,
        render: (text, record) =>
            <div className="text-left">
                <p><span>意向编码：</span>{record.supplierCode}</p>
                <p><span>名称：</span>{record.supplierName}</p>
            </div>,
    }, {
        title: '新品类型',
        dataIndex: 'ntsType',
        width: 60,
        render:(text)=>{
            return ntsTypes[text]
        }
    }, {
        title: '建档信息',
        // dataIndex: 'isNtsRecord',
        width: 100,
        render:(text,record)=>{
            return  <div className="text-left">
                        <p><span>新品建档：</span>{notarize[record.isNtsRecord]}</p>
                        <p><span>供应商建档：</span>{notarize[record.isSupplierRecord]}</p>
                    </div>
        }
        
    }, 
    // {
    //     title: '供应商建档',
    //     dataIndex: 'isSupplierRecord',
    //     width: 50,
    //     render:(text)=>{
    //         return notarize[text]
    //     }
    // },
    {
        title: '已申请下单',
        dataIndex: 'recordState',
        width: 50,
        render:(text)=>{
            return notarize[text]
        }
    }, {
        title: '计划单号',
        dataIndex: 'planCode',
        width: 90,
    }, {
        title: '开发时间',
        width: 120,
        render: (text, record) => 
                    <div className="text-left">
                        <p><span>开发员：</span>{record.developer}</p>
                        <p><span>新增时间：</span>{timestampFromat(record.createTime)}</p>
                    </div>,
      },{
        title: '操作',
        dataIndex: 'permissions',
        width: 60,
        render: (text, record) => {
            if(text && text.length){
                return (
                    <Tooltip placement="left" title={"开发员申请首单采购，数据进入首单申请列表"}>
                        <a href="javascript:;" onClick={()=>this.setData(record)}>首单申请</a>
                    </Tooltip>
                )
            }
            return null
        }
    }
    ];
    setData = (record)=>{
        sessionStorage.setItem("npd_track",JSON.stringify([record]))
        this.props.history.push("/npd/pd/track/apply/");
    }
    handleToApplyPage = () => {
        let selectedRows = this.state.selectedRows;
        let len = selectedRows.length;
        if (len < 1) {
            return message.warning('请选择合并项');
        }else if(len > 1){
            let first = selectedRows[0];
            for(let i=1;i<len;i++){
                let d = selectedRows[i];
                if( first.projectflowInfo !== d.projectflowInfo ||
                    first.supplierCode !== d.supplierCode ||
                    first.developer !== d.developer ){
                        return message.warning("合并项需供应商，项目流和开发者都相同才能操作")
                }
            }
        }
        sessionStorage.setItem("npd_track",JSON.stringify(selectedRows))
        this.props.history.push("/npd/pd/track/apply/")
    }

    render() {
        const { data, pageData, pageNumber, handleSubmit } = this.props;
        const total = data ? data.total : 0;
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            selectedRows: this.state.selectedRows,
            getCheckboxProps:function(record){
                if(record && record.permissions) return {}
                return {
                    disabled:true
                }
            },
            columnWidth:30,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        };
        return (
            <div>
                <div className='margin-sm-top white'>
                    <div className='padding-sm'>
                        <Functions {...this.props} functionkey="005-000002-000006-001">
                            <Tooltip placement="bottom" title={"供应商、项目流和开发相同，支持合并首单申请"}>
                                <Button onClick={this.handleToApplyPage}>合并首单申请</Button>
                            </Tooltip>
                        </Functions>
                    </div>
                    
                    <div className='padding-notop-10'>
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
            </div>
        )
    }
}

App.propTypes = {
    data: PropTypes.object.isRequired,
    pageData: PropTypes.number.isRequired,
    pageNumber: PropTypes.number.isRequired
}