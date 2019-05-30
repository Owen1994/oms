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
class Sitetablelist extends Component {
    constructor(props) {
        super(props);
    }
    state={
        sitesort:false,
        siteorderField:"",
        siteisAsc:"",
    }

    columns = [
        {
            title: '站点',
            dataIndex: 'siteCode',
        },
        {
            title: '预计索赔金额',
            dataIndex: 'estimatedAmount',
            sorter: true,
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
        // const newibjringingbysite={}
        // newibjringingbysite.lstShopAccount=[];
        // newibjringingbysite.startDay=this.props.rankingtimemodule.data.starttime
        // newibjringingbysite.endDay=this.props.rankingtimemodule.data.endtime
        // newibjringingbysite.pageNumber=1
        // newibjringingbysite.pageData=20
        //
        // this
        //     .props
        //     .ringsitedataajax({
        //         key: 'data',
        //         value: newibjringingbysite
        //     })

    }
    Paginatihandle = (page, pageSize) => {
        const newibjringingbysite={}
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(values.shopAccountKeyWordname==""||values.shopAccountKeyWordname==undefined)
            {
                newibjringingbysite.lstShopAccount=[]
            }else{
                newibjringingbysite.lstShopAccount=values.shopAccountKeyWordname.split(",")
            }
            newibjringingbysite.pageNumber=page;
            newibjringingbysite.pageData=pageSize;
            newibjringingbysite.startDay=values.orderTime[0]._i
            newibjringingbysite.endDay=values.orderTime[1]._i

            if(this.state.sitesort){
                newibjringingbysite.orderField=this.state.siteorderField;
                newibjringingbysite.isAsc=this.state.siteisAsc;
            }
            this
                .props
                .ringsitedataajax({
                    key: 'data',
                    value: newibjringingbysite
                })

        });
    }
    sorter= (pagination, filters, sorter) =>{
        const newibjringingbysite={}
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(values.shopAccountKeyWordname==""||values.shopAccountKeyWordname==undefined)
            {
                newibjringingbysite.lstShopAccount=[]
            }else{
                newibjringingbysite.lstShopAccount=values.shopAccountKeyWordname.split(",")
            }
            newibjringingbysite.startDay = values.orderTime[0]._i
            newibjringingbysite.endDay =values.orderTime[1]._i
            newibjringingbysite.pageNumber = 1
            newibjringingbysite.pageData = 20
            if (sorter.order) {
                let orderField;
                this.setState({sitesort: true});
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
                newibjringingbysite.orderField = orderField
                newibjringingbysite.isAsc = sorter.order == 'ascend' ? 1 : 0
                this.setState({siteorderField: orderField, siteisAsc: sorter.order == 'ascend' ? 1 : 0});
            } else {
                this.setState({sitesort: false});
            }
            this
                .props
                .ringsitedataajax({
                    key: 'data',
                    value: newibjringingbysite
                })
        });
    }
    render() {
        const {data} = this.props.rankingbysitemodule
        const newdata = datasaddkey(data);
        const columns = this.columns;
        return (
            <div className="statisttable">
                <Spin spinning={this.props.claimreportmodule.loading} delay={500} tip="Loading...">
                    <Table key={'data'} columns={columns} dataSource={newdata} bordered onChange={this.sorter}
                           pagination={false}/>
                </Spin>
                <Pagination
                    showTotal={total => `共 ${total} 条`} showTitle
                    pageSizeOptions={levelOptions('分页显示条数')}
                    showSizeChanger showQuickJumper={{goButton: true}}
                    current={this.props.Paginationsitemodel.current}
                    defaultCurrent={1} onShowSizeChange={this.Paginatihandle}
                    total={this.props.Paginationsitemodel.total}
                    pageSize={this.props.Paginationsitemodel.pageSize}
                    onChange={this.Paginatihandle}/>
            </div>
        );
    }
}

export default Sitetablelist