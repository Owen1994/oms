import React from 'react'
import {
    Link
} from 'react-router-dom';

import Functions from '../../../../../components/functions'
import {
    Button,
    Modal,
    Icon,
    Tooltip,
    message,
    Table,
    Menu,
    Dropdown,
    Spin,
    Pagination,
    Form,
} from 'antd'
const confirm = Modal.confirm;
const FormItem = Form.Item;
import {
    datasaddkey,
    filterParams,
    popUpImage,
    timestampFromat
} from "../../../../../util/baseTool"
import {
    ntsTypes,
} from "../../common/json"

import states from "../../../../constants/state"
import {levelOptions} from '../../../../../util/options';

export default class Tablelist extends React.Component {
    state = {
        visible:false,
        data:{}
    }
    columns = ()=>{
        return this.columns =  [
            {
                title: '关联单号',
                dataIndex: 'code',
                width:130,
                key: 'code',
                render:(text, record, index)=>{
                    return (
                        <div>
                            <div className="npd-handover-tablewrap-code">
                                <label>立项单：</label>
                                <span>{record.projectCode}</span>
                            </div>
                            <div className="npd-handover-tablewrap-code">
                                <label>样品单：</label>
                                <span>{record.sampleCode}</span>
                            </div>
                            <div className="npd-handover-tablewrap-code">
                                <label>交接单：</label>
                                <span>{record.deliverCode}</span>
                            </div>
                        </div>
                    )
                }
            }, 
            {
                title: '新品信息',
                dataIndex: 'info',
                width:150,
                key: 'info',
                render:(text, record, index)=>{
                    return (
                        <div className="npd-handover-tablewrap-info">
                            <div onClick={()=>popUpImage(record.imageUrl && record.imageUrl.url)} className="npd-handover-tablewrap-info-img">
                                <img src={record.imageUrl && record.imageUrl.url} alt=""/>
                            </div>
                            <div className="npd-handover-tablewrap-info-content">
                                <div>
                                    <label>spu：</label>
                                    <span>{record.spu}</span>
                                </div>
                                <div>
                                    <label>新品名称：</label>
                                    <span>{record.chineseName}</span>
                                </div>
                            </div>
                        </div>
                    )
                }
            }, 
            {
                title: '项目流信息',
                dataIndex: 'projectflowInfo',
                width:100,
                key: 'projectflowInfo',
                render:(text, record )=>{
                    return <span>{record.projectflowInfo + "(" +record.projectflowCode +")"}</span>
                }
            }, 
            {
                title: '新品类型',
                dataIndex: 'ntsType',
                width:60,
                key: 'ntsType',
                render:(text, record, index)=>{
                    return <span>{ntsTypes[text]}</span>
                }
            }, 
            {
                title: '交接状态',
                dataIndex: 'state',
                width:60,
                key: 'state',
                render:(text, record, index)=>{
                    return <span>{states[text]}</span>
                }
            }, 
            {
                title: '开发人员',
                width:120,
                key: 'developer',
                render:(text, record,)=>{
                    return  <div>
                                <div className="npd-handover-tablewrap-developer">
                                    <label>开发人员：</label>
                                    <span>{record.developer}</span>
                                </div>
                                <div className="npd-handover-tablewrap-developer">
                                    <label>产权专员：</label>
                                     <span>{record.propertyRightAttache}</span>
                                </div>
                                <div className="npd-handover-tablewrap-developer">
                                    <label>物流专员：</label>
                                     <span>{record.logisticsAttache}</span>
                                </div>
                            </div>
                }
            }, 
            // {
            //     title: '开发人员',
            //     dataIndex: 'developer',
            //     width:50,
            //     key: 'developer'
            // }, 
            // {
            //     title: '产权专员',
            //     dataIndex: 'propertyRightAttache',
            //     width:50,
            //     key: 'propertyRightAttache'
            // }, 
            // {
            //     title: '物流专员',
            //     dataIndex: 'logisticsAttache',
            //     width:50,
            //     key: 'logisticsAttache'
            // }, 
            {
                title: '添加信息',
                dataIndex: 'time',
                width:110,
                key: 'time',
                render:(text, record, index)=>{
                    return (
                        <div>
                            <div className="npd-handover-tablewrap-time">
                                <label>添加人：</label>
                                <span>{record.addPeople}</span>
                            </div>
                            <div className="npd-handover-tablewrap-time">
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
                    var arr = ["detail","submit","update","audit"]
                    list = list.filter(v=>arr.includes(v))
                    return this.getHandleBtn(list,record)
                },
            }
        ];
    }
    handleBtn = {
        // 详情
        detail:(record)=>{
            var url = "/npd/pd/handover/project_detail/?id=" + record.id
            return (<Tooltip placement="left" title={"查看交接单详情明细"}>
                        <Link to={url}>查看</Link>
                    </Tooltip>)
        },
        // 提交
        submit:(record)=>{
            return (<Tooltip placement="left" title={"提交前，允许修改当前数据；提交后，当前数据进入待开发总监审核，不允许再次修改"}>
                        <a href="javascript:;" onClick={()=>this.soleHandle([record])}>提交</a>
                    </Tooltip>)
        },
        // 修改
        update:(record)=>{
            var url = "/npd/pd/handover/project_detail_edit/?id=" + record.id
            return (<Tooltip placement="left" title={"允许勾选多行相同状态的数据进行统一审核"}>
                        <Link to={url}>修改</Link>
                    </Tooltip>)
        },// 审核
        audit:(record)=>{
            // 1 审核   其余
            // 2 待产权确认 5001
            // 3 待物流确认 4001
            var state = record.state
            var text ;
            if(state == 5001){
                text = "待产权确认"
            }else if(state == 4001){
                text = "待物流确认"
            }else {
                text = "审核"
            }
            var url ="/npd/pd/handover/review/?id=" + record.id
            
            return (<Tooltip placement="left" title={"审核"}>
                        <Link to={url}>{text}</Link>
                    </Tooltip>)
            
        },
    }
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
    Paginatihandle = (page, pageSize)=>{
        var {tableDataActionAsync,npdProjecListData,clearSelected} = this.props
        var params = npdProjecListData.params
        params.pageNumber = page
        params.pageData = pageSize
        clearSelected()
        tableDataActionAsync(params)
    }
    soleHandle = (value)=>{
        this.setState({
            visible:true,
            data:{
                auditResult:1,
                bizId:value.map(v=>v.id),
                comment:"",
                formId:"NpsProductDelivery"
            }
        })
    }
    handleOk = ()=>{
        var { data } = this.state;
        var { comReviewActionAsync } = this.props;
        comReviewActionAsync(data)
        .then(result=>{
            if(result){
                this.cancel()
                message.success(result.msg)
                var {tableDataActionAsync,npdProjecListData,clearSelected} = this.props
                var params = npdProjecListData.params
                clearSelected()
                tableDataActionAsync(params)
            }
        })
    }
    cancel = ()=>{
        this.setState({
            visible:false,
            data:{}
        })
    }
    render(){
        var {npdProjecListData,loading,rowSelection,showModal} = this.props
        var {total,list,params} = npdProjecListData
        var { pageNumber,pageData} = params
        var {visible} = this.state
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
                        <Functions {...this.props} functionkey="005-000002-000004-001">
                            <Tooltip placement="right" title={"允许勾选多行待提交数据，进行批量提交操作"}>
                                <div style={{fontSize:"12px"}} onClick={()=>showModal(1)} className="margin-ms-right">批量提交</div>
                            </Tooltip>
                        </Functions>
                    </Menu.Item>
                    <Menu.Item key={2}>
                        <Functions {...this.props} functionkey="005-000002-000004-002">
                            <Tooltip placement="right" title={"允许勾选多行相同状态的数据进行统一审核"}>
                                <div style={{fontSize:"12px"}} onClick={()=>showModal(2)} className="margin-ms-right">批量审核</div>
                            </Tooltip>
                        </Functions>
                    </Menu.Item>
                </Menu>
        )
        var batchDom = (
            <div className="npd-handover-batch-btns">
                <Dropdown overlay={batchMenu}>
                    <Button>
                        批量操作 <Icon type="down"/>
                    </Button>
                </Dropdown>
            </div>
        )
        var buttons = (
            <div className="npd-handover-tablewrap-btns">
                {batchDom}
            </div>
        )
        return (
            <div className="npd-handover-tablewrap">
                {buttons}
                {table}
                
                <Modal
                    title={`提交`}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.cancel}>
                    <div>是否确认提交</div>
                </Modal>
            </div>
        )
    }

}