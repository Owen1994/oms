import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions, {claimdatalistaction} from '../actions'
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
import echarts from 'echarts/lib/echarts' //以下是按需加载echarts模块
import 'echarts/lib/chart/bar';   //按需加载饼图
import 'echarts/lib/chart/line';   //按需加载饼图
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/toolbox';
import'echarts/lib/component/title';
import"echarts/lib/component/legendScroll";

import {timestampFromat, datasaddkey, functions} from '../../../util/baseTool';

import * as config from '../../../util/connectConfig'
import axios from '../../../util/axios'
import {levelOptions} from "../../../util/options";
import moment from "moment/moment";

const tagsFromServer = ['按月', '按日'];
const tabxaxisServer =['预计索赔金额','实际索赔金额','ASIN数','索赔信数','索赔成功数','索赔成功率','未赔偿数']
class Tablelist extends Component {
    constructor(props) {
        super(props);
    }

    state={
        selectedTags:'按月',
        xaxisselectedTags:'预计索赔金额',
        formts:"YYYY-MM"
    }

    componentDidMount() {
        var myChartlis = echarts.init(document.getElementById('statisiconecharts')); //环比数据图形容器
        this.claimdata(myChartlis,'1','按月','1')
    }
    claimdata= (myChartlis,tablist,timetab,v) => {

        var tablist=tablist;
        const newobjClaim = {}
        let url="";
        if(v=='1'){
            const time = {}
            let myDate = new Date();
            let y = myDate.getFullYear();
            let m = myDate.getMonth();
            m = m < 10 ? ('0' + m) : m;
            m = m < 1 ? 1 : m
            time.endtime = y + "-" + m;
            time.starttime = y + "-" + '01'
            this.props.timeaction({data: time});
            newobjClaim.startMonth = time.starttime;
            newobjClaim.endMonth = time.endtime;
            newobjClaim.lstShopAccount = [];

        }else{

            this.props.form.validateFieldsAndScroll((err, values) => {
                console.log(values);
                if(timetab=="按月"){
                    newobjClaim.startMonth = values.datatime[0]._i
                    newobjClaim.endMonth = values.datatime[1]._i
                }else{
                    newobjClaim.startDay =values.datatime[0]._i
                    newobjClaim.endDay =values.datatime[1]._i
                }

                if(values.shopAccountKeyWordname==""||values.shopAccountKeyWordname==undefined)
                {
                    newobjClaim.lstShopAccount=[]
                }else{
                    newobjClaim.lstShopAccount=values.shopAccountKeyWordname.split(",")
                }
            })

        }

        if(timetab=="按月"){
            url=`${config.api_url}/arm/motan/service/api/IArmService/getStatShopAccountByMonth`;
        }else{
            url=`${config.api_url}/arm/motan/service/api/IArmService/getStatShopAccountByDay`;
        }
        axios.post(url, newobjClaim)
            .then(response => {

                if (response.status == 200) {
                    if (response.data.state == '000001') {
                        let datalist = response.data.data;
                        let seriesdata = [];
                        let seriesdataname;
                        let xdatasx = [];
                        for (var i = 0; i < datalist.length; i++) {
                            if (tablist == "1") {
                                seriesdata.push(datalist[i].estimatedAmount);
                                xdatasx.push(datalist[i].monthStr);
                                seriesdataname='预计索赔金额';
                            }else if(tablist == "2"){
                                seriesdata.push(datalist[i].actualAmount);
                                xdatasx.push(datalist[i].monthStr);
                                seriesdataname='实际索赔金额';
                            }else if(tablist == "3"){
                                seriesdata.push(datalist[i].asinCount);
                                xdatasx.push(datalist[i].monthStr);
                                seriesdataname='ASIN数';
                            }else if(tablist == "4"){
                                seriesdata.push(datalist[i].reimLetterCount);
                                xdatasx.push(datalist[i].monthStr);
                                seriesdataname='索赔信数';
                            }else if(tablist == "5"){
                                seriesdata.push(datalist[i].reimOkCount);
                                xdatasx.push(datalist[i].monthStr);
                                seriesdataname='索赔成功数';
                            }else if(tablist == "6"){
                                seriesdata.push(datalist[i].reimOkRate);
                                xdatasx.push(datalist[i].monthStr);
                                seriesdataname='索赔成功率';
                            }else if(tablist == "7"){
                                seriesdata.push(datalist[i].reimNotdoneCount);
                                xdatasx.push(datalist[i].monthStr);
                                seriesdataname='未赔偿数';
                            }
                        }

                        myChartlis.setOption({
                            tooltip: {
                                trigger: 'axis',  //触发类型
                                axisPointer: {    //指示器的快捷方式
                                    animation: false
                                }
                            },
                            toolbox: {
                                feature: {
                                    magicType: {show: true, type: ['line', 'bar']},
                                },
                                right: '80px'
                            },
                            xAxis: [{
                                type: 'category', //目类轴 必须设置data
                                data: xdatasx
                            }],
                            yAxis: [{
                                type: 'value' //数值轴  连续数据
                            }],
                            series: [
                                {
                                    name: seriesdataname,
                                    type: 'bar',
                                    barWidth:8,
                                    data: seriesdata
                                },
                            ]
                        });

                    }
                }
            });
    }


    tabechartsbtn=(tag)=>{
        this.setState({ selectedTags: tag});
        this.props.baseInfoForm({timetab:tag});
        var myChart = echarts.init(document.getElementById('statisiconecharts'));
        var xaxisselectedTags=this.state.xaxisselectedTags;
        if(xaxisselectedTags=='预计索赔金额'){
            xaxisselectedTags=1
        }else if(xaxisselectedTags=='实际索赔金额'){
            xaxisselectedTags=2
        }else if(xaxisselectedTags=='ASIN数'){
            xaxisselectedTags=3
        }else if(xaxisselectedTags=='索赔信数'){
            xaxisselectedTags=4
        }else if(xaxisselectedTags=='索赔成功数'){
            xaxisselectedTags=5
        }else if(xaxisselectedTags=='索赔成功率'){
            xaxisselectedTags=6
        }else if(xaxisselectedTags=='未赔偿数'){
            xaxisselectedTags=7
        }
        if(tag=="按月"){
            this.setState({formts:'YYYY-MM'});
            let times={}
            console.log(this.props.form.getFieldValue('datatime')[0]._i.length);
            if(this.props.form.getFieldValue('datatime')[0]._i.length==10){
                times.starttime=this.props.form.getFieldValue('datatime')[0]._i.substr(0, 7)
                times.endtime=this.props.form.getFieldValue('datatime')[1]._i.substr(0, 7)
            }else{
                times.starttime=this.props.form.getFieldValue('datatime')[0]._i
                times.endtime=this.props.form.getFieldValue('datatime')[1]._i
            }
            this.props.timeaction({data:times})
            this.props.form.setFieldsValue({datatime:[moment(times.starttime),moment(times.endtime)]});
            this.claimdata(myChart,xaxisselectedTags,'按月','0')
        }else{
           let times={}
            this.setState({formts:'YYYY-MM-DD'});

            if(this.props.form.getFieldValue('datatime')[0]._i.length==7){
                times.starttime=this.props.form.getFieldValue('datatime')[0]._i+'-01'
                times.endtime=this.props.form.getFieldValue('datatime')[1]._i+'-01'
            }else{
                times.starttime=this.props.form.getFieldValue('datatime')[0]._i
                times.endtime=this.props.form.getFieldValue('datatime')[1]._i
            }
            this.props.timeaction({data:times})
            this.props.form.setFieldsValue({datatime:[moment(times.starttime),moment(times.endtime)]});
            this.claimdata(myChart,xaxisselectedTags,'按日','0')
        }

    }
    tabxaxisbtn=(tag)=>{
        this.setState({ xaxisselectedTags: tag});
        this.props.baseInfoForm({xaxisselectedTags:tag});
        var myChart = echarts.init(document.getElementById('statisiconecharts'));
        var selectedTags=this.state.selectedTags;
        switch(tag){
            case '预计索赔金额':
                return  this.claimdata(myChart,'1',selectedTags,'0')
                break;
            case '实际索赔金额':
                return this.claimdata(myChart,'2',selectedTags,'0')
                break;
            case 'ASIN数':
                return this.claimdata(myChart,'3',selectedTags,'0')
                break;
            case '索赔信数':
                return this.claimdata(myChart,'4',selectedTags,'0')
                break;
            case '索赔成功数':
                return this.claimdata(myChart,'5',selectedTags,'0')
                break;
            case '索赔成功率':
                return this.claimdata(myChart,'6',selectedTags,'0')
                break;
            case '未赔偿数':
                return this.claimdata(myChart,'7',selectedTags,'0')
                break;
            default:
                return this.claimdata(myChart,'1',selectedTags,'0')
                break;
        }
    }
    datatimeonchange= (data,dateString) =>{
        var myChart = echarts.init(document.getElementById('statisiconecharts'));
        var xaxisselectedTags=this.state.xaxisselectedTags;
        if(xaxisselectedTags=='预计索赔金额'){
            xaxisselectedTags=1
        }else if(xaxisselectedTags=='实际索赔金额'){
            xaxisselectedTags=2
        }else if(xaxisselectedTags=='ASIN数'){
            xaxisselectedTags=3
        }else if(xaxisselectedTags=='索赔信数'){
            xaxisselectedTags=4
        }else if(xaxisselectedTags=='索赔成功数'){
            xaxisselectedTags=5
        }else if(xaxisselectedTags=='索赔成功率'){
            xaxisselectedTags=6
        }else if(xaxisselectedTags=='未赔偿数'){
            xaxisselectedTags=7
        }
        var selectedTags=this.state.selectedTags;

        this.props.form.setFieldsValue({datatime:[moment(dateString[0]),moment(dateString[1])]});
        this.claimdata(myChart,xaxisselectedTags,selectedTags,'0')
    }
    render() {
        const { selectedTags } = this.state;
        const { xaxisselectedTags } = this.state;
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        var starttime=moment(this.props.timemodule.data.starttime);
        var endtime=moment(this.props.timemodule.data.endtime);

        return (
            <div className="newCluenk statisiconmapall">
                <div className="content statisiconmaplist">
                    <div className="statisicontop">
                        <div className='statisiconleft'></div>
                        <div className='statisiconright'>索赔数据</div>
                    </div>
                    <div className="statisiconechartsall">
                        <div className="statisiconecharts" id="statisiconecharts">
                        </div>
                        <div className="statisecharts_lib">
                                <div className="lib_tab">
                                    {tagsFromServer.map(tag => (
                                        <CheckableTag
                                            key={tag}
                                            checked={selectedTags==tag}
                                            onChange={checked => this.tabechartsbtn(tag)}
                                        >
                                            {tag}
                                        </CheckableTag>
                                    ))}
                                </div>
                                <div className="lib_rq">日期：</div>
                                <div className="lib_time">
                                    <FormItem {...this.formItemLayout}>
                                        {getFieldDecorator('datatime', {rules: [{required: false}],initialValue:[starttime,endtime]
                                        },)(
                                            <RangePicker format={this.state.formts} onChange={this.datatimeonchange}/>
                                        )}
                                    </FormItem>
                                </div>
                        </div>
                        <div className="tabxaxis">
                            {tabxaxisServer.map(tag => (
                                <CheckableTag
                                    key={tag}
                                    checked={xaxisselectedTags==tag}
                                    onChange={checked => this.tabxaxisbtn(tag)}
                                >
                                    {tag}
                                </CheckableTag>
                            ))}
                        </div>
                        <div className="statismon">
                            金额：USD
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tablelist