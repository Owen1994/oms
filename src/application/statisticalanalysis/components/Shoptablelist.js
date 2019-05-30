import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import Modalmodel from '../../../components/modalmodel'
import {
    Form,
    Button,
    Select,
    Row,
    Col,
    Table,
    Pagination,
    Spin,
    message,
    Divider,
    Modal,
    Menu,
    Icon,
    Dropdown,
    DatePicker,
    Tag
} from 'antd'
import '../css/css.css'
import {Link} from 'react-router-dom';
const FormItem = Form.Item
const Option = Select.Option
const CheckableTag = Tag.CheckableTag;
const RangePicker = DatePicker.RangePicker;

import {timestampFromat, datasaddkey, functions} from '../../../util/baseTool';

import * as config from '../../../util/connectConfig'
import axios from '../../../util/axios'
import {levelOptions} from "../../../util/options";

const tagsFromServer = ['按月', '按日'];
class Shoptablelist extends Component {
    constructor(props) {
        super(props);
    }
    state={
        sort:false,
        orderField:"",
        isAsc:"",
    }
    columns = [
        {
            title: '销售账号',
            dataIndex: 'shopAccount',
        },
        {
            title: '预计索赔金额',
            dataIndex: 'estimatedAmount',
            sorter:true
        },
        {
            title: '实际索赔金额',
            dataIndex: 'actualAmount',
            sorter: true,
        },
        {
            title: 'ASIN数',
            dataIndex: 'asin',
            sorter: true,
        },
        {
            title: '索赔信数',
            dataIndex: 'reimLetterCount',
            sorter: true,
        },{
            title: '索赔成功数',
            dataIndex: 'reimOkCount',
            sorter: true,
        },{
            title: '索赔成功率',
            dataIndex: 'reimOkRate',
            sorter: true,
        },{
            title: '未赔偿数',
            dataIndex: 'reimNotdoneCount',
            sorter: true,
        }
    ];
    componentDidMount() {

    }

    /**
     *作者: 唐勇
     *功能描述: 分页功能
     *参数说明:1.page 当前页码 2.pageSize：多少条数据
     *时间: 2018/6/26 9:00
     */
    Paginatihandle = (page, pageSize) => {
        const newibjringing={}
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values);
            if(values.shopAccountKeyWordname==""||values.shopAccountKeyWordname==undefined)
            {
                newibjringing.lstShopAccount=[]
            }else{
                newibjringing.lstShopAccount=values.shopAccountKeyWordname.split(",")
            }
            newibjringing.pageNumber=page;
            newibjringing.pageData=pageSize;
            newibjringing.startDay=values.orderTime[0]._i
            newibjringing.endDay=values.orderTime[1]._i

            if(this.state.sort){
                newibjringing.orderField=this.state.orderField;
                newibjringing.isAsc=this.state.isAsc;
            }
            this
                .props
                .ringingdataajax({
                    key: 'data',
                    value: newibjringing
                })

        });

    }
    sorter= (pagination, filters, sorter) =>{
        this.props.form.validateFieldsAndScroll((err, values) => {
            const newibjringing = {}
            if(values.shopAccountKeyWordname==""||values.shopAccountKeyWordname==undefined)
            {
                newibjringing.lstShopAccount=[]
            }else{
                newibjringing.lstShopAccount=values.shopAccountKeyWordname.split(",")
            }
            newibjringing.startDay = values.orderTime[0]._i
            newibjringing.endDay =values.orderTime[1]._i
            newibjringing.pageNumber = 1
            newibjringing.pageData = 20
            if (sorter.order) {
                let orderField;
                this.setState({sort: true});
                if (sorter.field == "estimatedAmount") {
                    orderField = 'estimated_amount'
                } else if (sorter.field == "actualAmount") {
                    orderField = 'actual_amount'
                } else if (sorter.field == "asin") {
                    orderField = 'asin_count'
                } else if (sorter.field == "reimLetterCount") {
                    orderField = 'reim_letter_count'
                } else if (sorter.field == "reimOkCount") {
                    orderField = 'reim_ok_count'
                } else if (sorter.field == "reimOkRate") {
                    orderField = 'reim_ok_rate'
                } else if (sorter.field == "reimNotdoneCount") {
                    orderField = 'reim_notdone_count'
                }
                newibjringing.orderField = orderField
                newibjringing.isAsc = sorter.order == 'ascend' ? 1 : 0
                this.setState({orderField: orderField, isAsc: sorter.order == 'ascend' ? 1 : 0});
            } else {
                this.setState({sort: false});
            }
            this
                .props
                .ringingdataajax({
                    key: 'data',
                    value: newibjringing
                })
        });
    }
    render() {
        const {data} = this.props.claimreportmodule;
        const newdata = datasaddkey(data);
        const columns = this.columns;
        return (
            <div className="statisttable">
                <Spin spinning={this.props.claimreportmodule.loading} delay={500} tip="Loading...">
                    <Table key={'data'} columns={columns} dataSource={newdata} bordered  onChange={this.sorter}
                           pagination={false}/>
                </Spin>
                <Pagination
                    showTotal={total => `共 ${total} 条`} showTitle
                    pageSizeOptions={levelOptions('分页显示条数')}
                    showSizeChanger showQuickJumper={{goButton: true}}
                    current={this.props.Paginationmodel.current}
                    defaultCurrent={1} onShowSizeChange={this.Paginatihandle}
                    total={this.props.Paginationmodel.total}
                    pageSize={this.props.Paginationmodel.pageSize}
                    onChange={this.Paginatihandle}/>
            </div>
        );
    }
}

export default Shoptablelist