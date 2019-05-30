/**
 * 作者: 陈林
 * 描述: 库存价格队列列表组件
 * 时间: 2018/7/30 0030 下午 3:14
 * @param
 **/
import React,{ Component } from 'react'
import { Button,Table,Pagination,Spin,Modal,Icon, Menu, Dropdown, message, } from 'antd';
import Functions from '../../../../../components/functions/index'
import '../../css/css.css'
import PopConfirm from "../../../../../common/components/confirm";
import {fetchPost} from "../../../../../util/fetch";
import {DESCRIPTION_TEMPLATE_DETAIL} from "../../constants/DescribeApi";
const confirm = Modal.confirm
const { SubMenu } = Menu;


const style = {
    center:{
        width:'230px',
        textAlign:'left',
        margin:'0 auto'
    }
}

class table extends Component{

    state = {
        dataList:[],
        visible: false,
        itemsName: null,
        pageSize: 20,
        pageNumber: 1,
        selectedRowKeys:[]
    }
   columns = [
        {
            title: '模板名称',
            dataIndex: 'name',
        }, {
            title: '销售账号',
            dataIndex: 'saleAccount',
        }, 
        // {
        //     title: '站点',
        //     dataIndex: 'siteCode',
        // },
        {
            title: '设计方案',
            dataIndex: 'type',
            render:(t)=>{
                return t === 1 ?'系统模板':'HTML自定义'
            }
        },
        {
            title: '添加人员/添加时间',
            dataIndex: 'additions',
            render:(t,r)=>{
                return <div>
                        <div style={style.center}>添加人员：{r.additions}</div>
                        <div style={style.center}>添加时间：{r.addTime}</div>
                    </div>
            }
        },
        {
            title: '最新修改人员/最新修改时间',
            dataIndex: 'editions',
            render:(t,r)=>{
                return <div>
                        <div style={style.center}>最新修改人员：{r.editions}</div>
                        <div style={style.center}>最新修改时间：{r.editTime}</div>
                    </div>
            }
        },
        {
            title: '操作',
            dataIndex: 'resultInformation',
            key: 'resultInformation',
            render: (text, record) => (
                <div className="lgt-customs_set_btns">
                    <Functions { ...this.props } functionkey="008-000001-000002-005">
                        <span className="modify" onClick={() => this.props.toggleModal(record)}>编辑</span>
                    </Functions>
                    <Functions { ...this.props } functionkey="008-000001-000002-004">
                        <span className="margin-ss-left modify"
                              onClick={() => PopConfirm('是否确认要删除？', '', () => this.onConfirm(record))}
                        >删除</span>
                    </Functions>
                </div>
            ),
        }
    ];




    handleAddItem= () => {
        this.setState({
            visible:false
        })
    }

    // 供子组件调用的方法，用于改变最外层状态
    getStateChange = (obj) => {
        this.setState(obj)
    }

    componentWillReceiveProps(nextProps) {
        const datas = nextProps.describeData;
        const prevDatas = this.props.describeData;
        if(datas !== prevDatas){
            this.setState({
                selectedRowKeys:[]
            })
        }
    }

    onConfirm = (record) => {
        let tempId = this.state.selectedRowKeys;
        if(record.tempId === null || record.tempId === undefined){
            if(tempId.length === 0){
                message.warning("请先选择数据！");
                return false
            }
        }
        tempId = record.tempId ?  [record.tempId] : tempId;
        fetchPost(DESCRIPTION_TEMPLATE_DETAIL, {tempId:tempId}, 1)
            .then(result => {
                if(result.state === '000001') {
                    this.props.onSearch()
                }
            })
    }


    render(){
        const {selectedRowKeys} = this.state;
        const { loadingState,onSearch } = this.props;
        const { data,total } = this.props.describeData;
        const dataList = data ;
        const {pageNumber, pageSize} = this.props.paginationData;
        const rowSelection = {
            selectedRowKeys: selectedRowKeys,
            onChange: (selectedRowKeys) => {
                this.setState({
                    selectedRowKeys: selectedRowKeys
                })
            },
        };
        const menu = (
            <Menu>
                <Menu.Item>
                    <span  onClick={() => {
                        PopConfirm('是否确认要删除？', '', () => this.onConfirm({ tempId:null}))
                    }}>删除</span>
                </Menu.Item>
            </Menu>
        );
        return(
            <div className="gallery-table breadcrumb margin-ms-top padding-sm">
                <div className="overflow-hidden">
                    <div className="pull-right">
                        <Functions {...this.props} functionkey="008-000001-000002-002">
                            <Button onClick={() => this.props.toggleModalNew()}>
                                <Icon type="plus" />
                                  新增
                            </Button>
                        </Functions>
                    </div>
                    <div className="pull-left">
                        <Functions {...this.props} functionkey="008-000001-000002-003">
                            <Dropdown overlay={menu}>
                                <Button>批量操作<Icon type="down" /></Button>
                            </Dropdown>
                        </Functions>
                    </div>
                </div>
                <div className="margin-ss-top">
                    <Spin spinning={loadingState.describeLoadingState} delay={500} tip="Loading...">
                        <Table
                            columns={this.columns}
                            dataSource={ dataList }
                            onChange={this.props.sorter}
                            pagination={false}
                            bordered={true}
                            size="small"
                            rowSelection={rowSelection}
                        />
                        <Pagination
                            showTotal={total => `共 ${total} 条`}
                            pageSizeOptions={['20', '30', '40', '50']}
                            showSizeChanger
                            showQuickJumper={{goButton: true}}
                            current={pageNumber}
                            defaultCurrent={1}
                            onShowSizeChange={onSearch}
                            total={total}
                            pageSize={pageSize}
                            onChange={onSearch}
                        />
                    </Spin>
                </div>
            </div>
        )
    }
}

export default table
