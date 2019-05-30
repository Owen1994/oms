/**
 *作者: 唐峰
 *功能描述: 表格数据列表组件
 *参数说明:
 *时间: 2018/4/4 10:54
 */
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import Modalmodel  from '../components/Modalmodel'
import {
    Form,
    Button,
    Select,
    Radio,
    Table,
    Pagination,
    Spin,
    message,
    DatePicker,
    Menu,
    Icon,
    Dropdown,
} from 'antd'
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
import Functions from '../../../../components/functions'
import '../css/css.css'

const FormItem = Form.Item
const Option = Select.Option
import {levelOptions} from '../../../../util/options';
import { Link } from 'react-router-dom';
import * as config from "../../../../util/connectConfig";
import axios from "../../../../util/axios";
import {timestampFromat, datasaddkey, objTodata, getrangetime, functions} from '../../../../util/baseTool';
class Tablelist extends Component {

    constructor(props) {
        super(props);
    }


    state = {
        newChannelCode: '',
        delIndex: null,
        pagenum:1,
    }

    //表头
    columns = [{
        title: '渠道中文名称',
        dataIndex: 'channelCnname',
        width: 100,
    },
        {
            title: '渠道编号',
            dataIndex: 'channelNumber',
            width: 60,
        },

        {
            title: '渠道类型',
            width: 60,
            dataIndex: 'channelType',
            render:function(text, record, index){
                if(text == '1'){
                    return text = "邮政"
                }else if(text == '2'){
                    return text = "专线"
                }else if(text == '3'){
                    return text = "快递"
                }
            },
        },
        {
            title: '渠道分组',
            dataIndex: 'channelGroup',
            width: 60,
            render:function(text, record, index){
                if(text == '1'){
                    return text = "线上发货"
                }else if(text == '2'){
                    return text = "国内专线"
                }else if(text == '3'){
                    return text = "国外专线"
                }else if(text == '4'){
                    return text = "中国邮政"
                }else if(text == '5'){
                    return text = "外国邮政"
                }else if(text == '6'){
                    return text = "国际快递"
                }
            },

        },
        {
            title: '是否追踪',
            dataIndex: 'trackType',
            width: 60,
            render:function(text, record, index){
                if(text == '1'){
                    return text = "头程可追踪"
                }else if(text == '2'){
                    return text = "半程可追踪"
                }else if(text == '3'){
                    return text = "全程可追踪"
                }
            },
        },
        {
            title: '承运商名称',
            dataIndex: 'carrierName',
            width: 120,
        },{
            title: '渠道状态',
            dataIndex: 'channelIsAvailable',
            width: 60,
            render:function(text, record, index){
                if(text == '0'){
                    return text = "启用"
                }else if(text == '1'){
                    return text = "停用"
                }else{
                    return '渠道状态错误'
                }
            },
        },{
            title: '操作',
            width: 80,
            dataIndex: 'Operation',
            render: (text, record, index) => {
                const url = `/order/basicdata/channellist/channelsignall/?orderId=${record.channelNumber}`;
                const menu = (
                    <Menu>
                        <Menu.Item>
                            <Functions {...this.props} functionkey={"001-000005-000002-004"}>
                                <Link to={url+`&buttontype=2`} className={'viewbtn'} target="_blank">修改</Link>
                            </Functions>
                        </Menu.Item>
                        <Menu.Item>
                            <Functions {...this.props} functionkey={"001-000005-000002-005"}>
                                <a className={'viewbtn'} onClick={this.deletetablelist(record,index)}>删除</a>
                            </Functions>
                        </Menu.Item>

                    </Menu>);
                return (
                    <div className="actions-btns">
                        <Functions {...this.props} functionkey={"001-000005-000002-002"}>
                            <Link to={url+`&buttontype=1`} className={'viewbtn'} target="_blank">查看</Link>
                        </Functions>
                        <span className="margin-ss-left margin-ss-right v-line">|</span>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link">
                                更多 <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                );
            },
        }];

    componentDidMount() {

    }

    /**
     *作者: 唐峰
     *功能描述: 分页切换onchange事件
     *参数说明: @current 点击的当前页面值
     *          @pageSize   每一页显示数据的条数
     *时间: 2018/4/4 10:57
     */
    currentChange = (current,pageSize)=>{
        this.setState({
            pagenum:Number(current)
        })
        this.Paginatihandle(current,pageSize)
     }

    /**
     *作者: 唐峰
     *功能描述: 点击分页后的回调函数
     *参数说明: @current    点击的当前页面值
     *          @pageSize 每一页显示数据的条数
     *          @fetchPosts() 数据请求
     *          @tablemodelaction() 触发表格模块action
     *时间: 2018/4/4 10:57
     */
    Paginatihandle = (current, pageSize=20) => {
        const newobj = {...this.props.form.getFieldsValue(), pageNumber: current, pageData: pageSize}
        for (var k in newobj){
            if(newobj[k] === undefined || newobj[k] === ""){
                delete newobj[k]
            }
        }
        this.props.fetchPosts({
            key: 'data',
            value: newobj
        });
        this.props.tablemodelaction({selectedRowKeys: []});
        this.props.menudataaction({pageCache:{...this.props.menuInfos.pageCache,[`${location.pathname}${location.search}`]:newobj}});
    }

    /**
     *作者: 唐峰
     *功能描述: 删除按钮事件
     *参数说明: @record  当前一条表格数据的集合{}
     *          @index  索引
     *时间: 2018/4/4 10:59
     */
    deletetablelist=(record, index)=>() => {
        this.props.modalmodelaction({visible2: true,})  
        this.setState({
            newChannelCode: record.channelNumber,
            delIndex: index,
        });
    }

    /**
     *作者: 唐峰
     *功能描述: 点击删除按钮后弹窗上 确认按钮事件
     *参数说明:
     *时间: 2018/4/4 11:08
     */
    ModalhandleOk= () => {
        const pramsObj = {
            newChannelCode:'',
        }
        pramsObj['newChannelCode']= String(this.state.newChannelCode);
        let delIndex = this.state.delIndex;
        let tableData = this.props.tablemodel.data;
        tableData.splice(delIndex, 1);
        axios.post(`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/deleteConfigRuleChannel`, pramsObj)
                .then(response => {
                    if (response.status == 200) {
                        if(response.data.state=='000001'){
                            message.success(response.data.msg || '成功!');
                            let tableData = this.props.tablemodel;
                            this.props.modalmodelaction({
                                visible2: false,
                                confirmLoading: false,
                            });
                            this.props.fetchPosts({key: 'data', value:newobj})
                        }
                        else{
                            message.error(response.data.msg);
                        }

                    }
                }).catch(e => {
                console.log(e)
        })
    }

    /**
     *作者: 唐峰
     *功能描述: 点击删除按钮后弹窗上 取消按钮事件
     *参数说明:
     *时间: 2018/4/4 11:08
     */
    ModalhandleCancel = (value) => () => {
        this.props.modalmodelaction({[value]: false})
    }

    

    render() {

        const {data} = this.props.tablemodel;
        const newdata = datasaddkey(data);
        const columns = this.columns;
        const urlAdd = `/order/basicdata/channellist/channelsignall/`;
        
        return (
                <div className="newCluenk">
                    <div className="channellist-optionBtn">
                        <Functions {...this.props} functionkey={"001-000005-000002-003"}>
                            <Link to={urlAdd} className="ant-btn ant-link"><Icon type="plus"/> 新增渠道</Link>
                        </Functions>
                    </div>
                    <div className="content">
                        <Spin spinning={this.props.tablemodel.loading} delay={500} tip="Loading...">
                            <Table columns={columns} dataSource={newdata} bordered
                                pagination={false} />
                        </Spin>
                        <Pagination
                            showTotal={total => `共 ${total} 条`}  //用于显示数据总量和当前数据顺序
                            pageSizeOptions={levelOptions('分页显示条数')} //指定每页可以显示多少条
                            showSizeChanger                         //是否可以改变 pageSize
                            showQuickJumper={{goButton: true}}      //是否可以快速跳转至某页
                            current={this.props.Paginationmodel.current}    //当前页数
                            onShowSizeChange={this.Paginatihandle}      //pageSize 变化的回调
                            total={this.props.Paginationmodel.total}    //数据总数
                            pageSize={this.props.Paginationmodel.pageSize} //每页条数
                            onChange={this.currentChange}              //页码改变的回调，参数是改变后的页码及每页条数
                        />
                    </div>
                    <Modalmodel  
                        {...{
                            ...this.props.modalmodel,
                            visible: this.props.modalmodel.visible2,
                            ModalText: '确认删除吗?',
                        }}
                        onOk={this.ModalhandleOk}
                        onCancel={this.ModalhandleCancel('visible2')}/>
                </div>
        );
    }
}

export default Tablelist
