import React, {Component} from 'react';
import {render} from 'react-dom';

import {
    Row,
    Col,
    Table,
    Tag,
} from 'antd'
const CheckableTag = Tag.CheckableTag;
import '../css/css.css'

import * as config from "../../../util/connectConfig";
import axios from "../../../util/axios";
import { datasaddkey} from '../../../util/baseTool';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import'echarts/lib/component/title';
import"echarts/lib/component/legendScroll";

const tagsFromServer = ['今天', '本周', '本月'];
class Tablelist extends Component {
    constructor(props) {
        super(props);
    }
    state ={
        selectedTags:'今天',
        selectSku:'昨日'
    };

    formItemLayout = {
        labelCol: {span: 7},
        wrapperCol: {span: 17}
    };

    columns = [
        {
            title: '排名',
            dataIndex: 'sid',
            className: 'textalign',
            render: (text, record, index) => ++index
        },{
            title: 'SKU',
            className: 'textalign',
            dataIndex: 'sku',
        },{
            title: '数量',
            className: 'textalign',
            dataIndex: 'number',
        }
    ];

    /**
     *作者: 唐勇
     *功能描述:  页面加载初始化加载数据
     *参数说明:
     *时间: 2018/5/15 10:30
     */
    componentDidMount() {
        var myChartlis = echarts.init(document.getElementById('echarts_lis')); //环比数据图形容器
        var myChart = echarts.init(document.getElementById('echarts_all')); //实时走势图形容器
        this.realdata(myChart,0); //实时走势
        this.ringdata(myChartlis); //环比数据
        /**
        *作者: 唐勇
        *功能描述: 浏览器改变resize事件重新加载echarts图形
        *参数说明:
        *时间: 2018/4/16 11:00
        */
        window.addEventListener("resize", function () {
            myChart.resize();
            myChartlis.resize();
        });

        /**
        *作者: 唐勇
        *功能描述: 左侧菜单栏伸缩按钮绑定点击事件
        *参数说明:
        *时间: 2018/4/16 11:00
        */
        // document.querySelector('.icft20 ').addEventListener("click", function () {
        //     setTimeout(() => {
        //         myChart.resize();
        //         myChartlis.resize();
        //     }, 500);
        //
        // });

    }

    /**
     *作者: 唐勇
     *功能描述: 环比数据
     *参数说明:
     *时间: 2018/4/17 10:00
     */
    ringdata= (myChartlis) => {
        const newobj = {
            platformId:''
        };
        axios.post(`${config.api_url}/oms/order/manage/motan/IIndexPageApi/getYesterdayAndTodayOrderSellerData`,newobj)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.state === '000001') {
                        let todaydata=[];
                        let yesterday=[];
                        todaydata[0]=response.data.data.orderNumber.today;
                        todaydata[1]=response.data.data.sale.today;
                        todaydata[2]=response.data.data.priceSingle.today;
                        yesterday[0]=response.data.data.orderNumber.yesterday;
                        yesterday[1]=response.data.data.sale.yesterday;
                        yesterday[2]=response.data.data.priceSingle.yesterday;

                        //环比数据
                        myChartlis.setOption({
                            title: {
                                text: '环比数据',
                                x: '5%',
                                top:'25px',
                            },
                            legend: {
                                data:['今日','昨日'],
                                x: '5%',
                                y:'-5px;'
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    animation: false
                                }
                            },
                            xAxis: {
                                type: 'category',
                                //show:false,
                                splitLine: { //是否显示分割线
                                    show: false
                                },
                                axisTick: { //是否显示坐标轴刻度
                                    show: false
                                },
                                axisLabel:{ //是否显示刻度标签
                                    show:true
                                },
                                axisLine:{ //是否显示坐标轴线
                                    show : false
                                },
                                data : ['订单数','销售额','客单价'],
                            },
                            yAxis:{
                                type:'value',
                                show:false,
                                splitLine: {
                                    show: false
                                },
                                axisTick: {
                                    show: false
                                },
                                axisLabel:{
                                    show:false
                                },
                                axisPointer:{
                                    show:false
                                },

                                splitNumber:1
                            },
                            series: [
                                {
                                    itemStyle: {
                                        normal: {
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                offset: 0, color: '#FF8261'},
                                                {
                                                    offset: 1, color: '#FFBF90'
                                                }], false)
                                        }

                                    },
                                    name:'今日',
                                    type:'bar',
                                    barWidth:32,
                                    data:todaydata
                                },
                                {
                                    itemStyle: {
                                        normal: {
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                offset: 0, color: '#9FC4FA'},
                                                {
                                                    offset: 1, color: '#C2C3F6'
                                                }], false)
                                        }

                                    },
                                    name:'昨日',
                                    type:'bar',
                                    barWidth:32,
                                    data:yesterday
                                }
                            ]
                        });

                        this.props.ringDataaction({data:{orderNumber:yesterday[0],sale:yesterday[1],priceSingle:yesterday[2],updateTime:response.data.data.updateTime}})
                    }
                }
            }).catch(e => {
            console.log(e);
        });
    };

    /**
     *作者: 唐勇
     *功能描述: 实时走势数据方法
     *参数说明:
     *时间: 2018/4/17 10:00
     */
    realdata= (myChart,i) => {
        const newobj = {
            platformId:'',
            dateSelection:i
        };
        axios.post(`${config.api_url}/oms/order/manage/motan/IIndexPageApi/getSellerDataTrend`,newobj)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.state === '000001') {
                        let xAxis=response.data.data.xAxis;
                        let xAxisdata=[];
                        let trendSale=response.data.data.trendSale;
                        let trendOrderNumber=response.data.data.trendOrderNumber;
                        for(let i=0;i<xAxis;i++)
                        {
                            xAxisdata.push(i+1);
                        }

                        myChart.setOption({
                            title: {
                                text: '实时走势',
                                x: '5%',
                                top:'-5px',

                            },
                            tooltip: {
                                trigger: 'axis',  //触发类型
                                axisPointer: {    //指示器的快捷方式
                                    animation: false
                                }
                            },
                            legend: {
                                data:['销售额','订单数'],
                                x: '5%',
                                y:'25px;'
                            },
                            xAxis : [{
                                type : 'category', //目类轴 必须设置data
                                data :xAxisdata,
                            }],
                            yAxis : [{
                                type : 'value' //数值轴  连续数据
                            }],
                            series : [{
                                itemStyle: { //线条样式
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0, color: '#C2C3F6'  },
                                            {

                                                offset: 1, color: '#9FC4FA'
                                            }], false),
                                        barBorderRadius: [8, 8, 0, 0],

                                    },
                                },
                                name:'销售额',
                                type:'bar',
                                barWidth:8,
                                data:trendSale
                            },
                                {
                                    itemStyle: {
                                        normal: {
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                offset: 0, color: '#FF8361 '},
                                                {
                                                    offset: 1, color: '#FFBF90'
                                                }], false),
                                            barBorderRadius: [8, 8, 0, 0],
                                        }

                                    },
                                    name:'订单数',
                                    type:'bar',
                                    barWidth:8,
                                    data:trendOrderNumber
                                }]
                        });
                    }
                }
            }).catch(e => {
            console.log(e);
        });
    };

    /**
    *作者: 唐勇
    *功能描述:  点击今天,本周,本月,本年触发事件
    *参数说明:1.tag 代表点击的值名称
    *时间: 2018/4/17 10:00
    */
    handleChange(tag) {
        const { selectedTags } = this.state;
        this.setState({ selectedTags: tag});
        var myChart = echarts.init(document.getElementById('echarts_all'));
        switch(tag){
            case '本周':
                return this.realdata(myChart,1);
                break;
            case '本月':
                return this.realdata(myChart,2);
                break;
            case '本年':
                return this.realdata(myChart,3);
                break;
            default:
                return this.realdata(myChart,0);
                break;
        }
    }
    /**
     *作者: 唐勇
     *功能描述:  本月SKU排行数据列表
     *参数说明:
     *时间: 2018/5/15 10:00
     */
    monthSku(){
        const newobj = {
            platformId:''
        };
        axios.post(`${config.api_url}/oms/order/manage/motan/IIndexPageApi/getCurrentMonthSkuTop`,newobj)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.state === '000001') {
                        this.props.yesterdaySkuaction({data:response.data.data})
                    }
                }
            }).catch(e => {
            console.log(e);
        });
    };

    /**
     *作者: 唐勇
     *功能描述:  昨日SKU排行数据列表
     *参数说明:
     *时间: 2018/5/15 10:00
     */
    newyestdaySku(){
        const newobj = {
            platformId:''
        };
        axios.post(`${config.api_url}/oms/order/manage/motan/IIndexPageApi/getYesterdaySkuTop`,newobj)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.state === '000001') {
                        this.props.yesterdaySkuaction({data:response.data.data})
                    }
                }
            }).catch(e => {
            console.log(e);
        });
    };

    /**
     *作者: 唐勇
     *功能描述:  SKU排行切换
     *参数说明:
     *时间: 2018/5/15 10:00
     */
    handleChangeSKU(tag){
        this.setState({ selectSku: tag});
        switch(tag){
            case '昨日':
                return this.newyestdaySku();
            break;
            case '本月':
                return this.monthSku();
                break;
        }

    };

    render() {
        const data=this.props.yesterdaySkumodel.data;
        var newdata= datasaddkey(data);
        const columns = this.columns;
        const { selectedTags } = this.state;
        const ringdata=this.props.ringdataAllmodel.data;
        return (
            <div >
                <div className="gutter-example">
                    <Row gutter={16}>
                        <Col className="gutter-row" span={18}>
                            <div className="gutter-box overhiden">
                                <Col span={1}>
                                </Col>
                                 <Col span={22}>
                                    <Col span={4}>
                                        <div className='tit-icon'>
                                            <img src={require('../img/1-1.png')} width='46' height='46'/>
                                        </div>
                                        <div className='tit-txt' >
                                            <span>昨日总订单(笔)</span>
                                            <div className='mt5'>
                                                {ringdata.orderNumber?ringdata.orderNumber:0}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={1}>
                                    </Col>
                                    <Col span={4}>
                                        <div className='tit-icon'>
                                            <img src={require('../img/1-2.png')} width='46' height='46'/>
                                        </div>
                                        <div className='tit-txt' >
                                            <span>昨日销售额($)</span>
                                            <div className='mt5'>
                                                {ringdata.sale?ringdata.sale:0}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={1}>
                                    </Col>
                                    <Col span={4}>
                                        <div className='tit-icon'>
                                            <img src={require('../img/1-3.png')} width='46' height='46'/>
                                        </div>
                                        <div className='tit-txt' >
                                            <span>昨日客单价($)</span>
                                            <div className='mt5'>
                                                {ringdata.priceSingle?ringdata.priceSingle:0}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={1}>
                                    </Col>
                                    <Col span={4}>
                                        <div className='tit-icon'>
                                            <img src={require('../img/1-4.png')} width='46' height='46'/>
                                        </div>
                                        <div className='tit-txt' >
                                            <span>本月总订单(笔)</span>
                                            <div className='mt5'>
                                                {this.props.orderdeailallmodel.data.monthallOrder?this.props.orderdeailallmodel.data.monthallOrder:0}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={1}>
                                    </Col>
                                    <Col span={4}>
                                        <div className='tit-icon'>
                                            <img src={require('../img/1-5.png')} width='46' height='46'/>
                                        </div>
                                        <div className='tit-txt' >
                                            <span>本月销售额($)</span>
                                            <div className='mt5'>
                                                {this.props.orderdeailallmodel.data.monthSale?this.props.orderdeailallmodel.data.monthSale:0}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={1}>
                                    </Col>
                                </Col>
                                <Col span={1}>
                                </Col>

                            </div>

                            <div className="gutter-box mt20">
                                {/* Echarts start*/}
                                <Row gutter={24}>
                                    <Col className="gutter-row" span={24}>
                                    <div className="gutter-box overflow-hidden position-relative">
                                        <div className='echarts_all'  id='echarts_all'>

                                        </div>

                                        <div className='echarts_tab'>
                                            {tagsFromServer.map(tag => (
                                                <CheckableTag
                                                    key={tag}
                                                    checked={selectedTags==tag}
                                                    onChange={checked => this.handleChange(tag)}
                                                >
                                                    {tag}
                                                </CheckableTag>
                                            ))}
                                        </div>

                                    </div>
                                    </Col>
                                </Row>
                                {/* Echarts end*/}
                            </div>
                             {/* 环比数据列表数据 start*/}
                            <div className="gutter-box mt20">
                                <Row gutter={24}>
                                    <Col className="gutter-row" span={24}>
                                        <div className="gutter-box overflow-hidden">
                                            <div className='echarts_lis' id='echarts_lis'>

                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            {/* 环比数据列表数据 end*/}
                            <div className="gutter-box mt20">
                                <div className="order-index-tit">今日订单执行</div>
                                <Row gutter={24}>
                                    <Col className="gutter-row" span={24}>
                                        <div className="gutter-box overflow-hidden">
                                        <Col span={24}>
                                            <Col span={4}>
                                            </Col>
                                            <Col span={4}>
                                                <div className='tit-txt' >
                                                    <span>已支付订单</span>
                                                    <div className='mt5'>
                                                        {this.props.orderdeailallmodel.data.paidOrder?this.props.orderdeailallmodel.data.paidOrder:0}
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col span={1}>
                                            </Col>

                                            <Col span={4}>
                                                <div className='tit-txt' >
                                                    <span>已取消订单</span>
                                                    <div className='mt5'>
                                                        {this.props.orderdeailallmodel.data.cancelledOrder?this.props.orderdeailallmodel.data.cancelledOrder:0}
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col span={1}>
                                            </Col>


                                            <Col span={4}>
                                                <div className='tit-txt' >
                                                    <span>异常订单</span>
                                                    <div className='mt5'>
                                                        {this.props.orderdeailallmodel.data.abnormalOrder?this.props.orderdeailallmodel.data.abnormalOrder:0}
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col span={1}>
                                            </Col>
                                            <Col span={4}>
                                                <div className='tit-txt' >
                                                    <span>分仓订单</span>
                                                    <div className='mt5'>
                                                        { this.props.orderdeailallmodel.data.shipped?this.props.orderdeailallmodel.data.shipped:0}
                                                    </div>
                                                </div>
                                            </Col>
                                            </Col>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col className="gutter-row gutter-right" span={6}>
                            <div className="gutter-box">
                                <div className='rt_tab'>
                                    <Col span={2}></Col>
                                    <Col span={9}>
                                    <CheckableTag
                                        key={'data'}
                                        checked={this.state.selectSku=='昨日'}
                                        onChange={checked => this.handleChangeSKU('昨日')}
                                        className='tabsku'
                                    >
                                        昨日SKU排行
                                    </CheckableTag>
                                    </Col>
                                    <Col span={2}></Col>
                                    <Col span={9}>
                                        <CheckableTag
                                            key={'data'}
                                            checked={this.state.selectSku=='本月'}
                                            onChange={checked => this.handleChangeSKU('本月')}
                                            className='tabsku'
                                        >
                                           本月SKU排行
                                        </CheckableTag>
                                    </Col>
                                </div>
                                <div className="rt_tit">
                                    SKU销量排行TOP
                                </div>
                                <div className=' rt_txt'>
                                    <Table key={'Skudata'} columns={columns} dataSource={newdata} bordered pagination={false}/>
                                </div>
                            </div>

                        </Col>

                    </Row>
                </div>
            </div>
        );
    }
}

export default Tablelist
