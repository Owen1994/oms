import React, {Component} from 'react' //在文件头部从 react 的包当中引入了 React 和 React.js 的组件父类 Component。写 React.js 组件，必须引入这两个东西。
import {render} from 'react-dom' //ReactDOM 可以帮助我们把 React 组件渲染到页面上去
import {connect} from 'react-redux'
import Modalmodel from '../components/Modalmodel'
import {
    Form,
    Input,
    Button,
    Select,
    Row,
    Col,
    Radio,
    DatePicker,
    Checkbox,
    Icon
} from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
import {levelOptions} from '../../../util/options';
import {platformsearchaction} from "../actions";
import {closehandle, selectValues} from '../../../util/baseTool';
import echarts from "echarts/lib/echarts";
import * as config from "../../../util/connectConfig";
import axios from "../../../util/axios";
class Condition extends Component {

    constructor(props) {
        super(props);
    }

    state={

    }
    hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

    formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }


    handleSubmit= (e) => {
        const or = typeof e == 'object' ? true : false
        or && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            let shopAccountKeyWordname = this.props.form.getFieldValue('shopAccountKeyWordname');
            if (shopAccountKeyWordname === undefined || shopAccountKeyWordname == [""]) {
                shopAccountKeyWordname = [];
            } else {
                shopAccountKeyWordname = shopAccountKeyWordname.split(',');
            }

            this.props.baseInfoForm({shopname: shopAccountKeyWordname});

            const newobj = {}
            newobj.lstShopAccount = shopAccountKeyWordname

            this
                .props
                .dataoverviewajax({
                    key: 'data',
                    value: newobj
                });

            let myChartlis = echarts.init(document.getElementById('statisiconecharts')); //环比数据图形容器
            let xaxisselectedTags = this.props.Infos.xaxisselectedTags;
            if (xaxisselectedTags == '预计索赔金额') {
                xaxisselectedTags = 1
            } else if (xaxisselectedTags == '实际索赔金额') {
                xaxisselectedTags = 2
            } else if (xaxisselectedTags == 'ASIN数') {
                xaxisselectedTags = 3
            } else if (xaxisselectedTags == '索赔信数') {
                xaxisselectedTags = 4
            } else if (xaxisselectedTags == '索赔成功数') {
                xaxisselectedTags = 5
            } else if (xaxisselectedTags == '索赔成功率') {
                xaxisselectedTags = 6
            } else if (xaxisselectedTags == '未赔偿数') {
                xaxisselectedTags = 7
            }
            let timetab = this.props.Infos.timetab;

            this.claimdata(myChartlis, xaxisselectedTags, timetab);

            const newibjringingasin = {}
            newibjringingasin.lstShopAccount = shopAccountKeyWordname
            newibjringingasin.pageNumber = 1
            newibjringingasin.pageData = 20
            newibjringingasin.startDay = values.orderTime[0]._i
            newibjringingasin.endDay = values.orderTime[1]._i
            if(this.props.Infos.tabs==1){
                this
                    .props
                    .ringingdataajax({
                        key: 'data',
                        value: newibjringingasin
                    })
            }else if(this.props.Infos.tabs==2){
                this
                    .props
                    .ringsitedataajax({
                        key: 'data',
                        value: newibjringingasin
                    })
            }else if(this.props.Infos.tabs==3)
            {
                this
                    .props
                    .ringasindataajax({
                        key: 'data',
                        value: newibjringingasin
                    })
            }
        })
    }
    claimdata= (myChartlis,tablist,timetab) => {
        var tablist=tablist;
        const newobjClaim = {}
        let url="";
        this.props.form.validateFieldsAndScroll((err, values) => {
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
    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const dataoverv=this.props.dataoverviewmodule.data;
        return (
            <div>
                <div className="newCluenk statisticalanalysistop">
                    <div className="content">
                        <div className="statisicontop">
                            <div className='statisiconleft'></div>
                            <div className='statisiconright'>店铺信息</div>
                        </div>
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                        <div className="statisiconwordname">
                            {<FormItem {...this.formItemLayout}
                                       label="销售账号" className='ant-xs-row'
                            >
                                {getFieldDecorator('shopAccountKeyWordname', {
                                        rules: [{required: false, message: '请选择销售账号'}],
                                    },
                                )(
                                    <Input readOnly placeholder={`请选择销售账号`}
                                           onClick={selectValues({
                                               obj: this,
                                               url: '/arm/motan/service/api/IArmService/searchMyShopAccount',
                                               title: '销售账号',
                                               name: 'shopAccountKeyWordname',
                                               id: 'shopAccountKeyWordnameId',
                                               type:'multiple',
                                               num:10
                                           })}
                                           maxLength="100"/>

                                )}
                                {getFieldDecorator('shopAccountKeyWordnameId')(
                                    <Input readOnly maxLength="100" type="hidden"/>
                                )}

                                <Icon type="close-circle" className={'commonClose'} onClick={(e) => {
                                    closehandle(e, this)
                                }}/>
                            </FormItem>}
                        </div>
                        <div className="typebtn" >
                            <Button type="primary" htmlType="submit" >
                                搜索
                            </Button>
                        </div>
                        </Form>
                    </div>
                </div>
                <div className="newCluenk statisticalanalysisdata">
                    <div className="content">
                        <div className="statisicontop">
                            <div className='statisiconleft'></div>
                            <div className='statisiconright'>数据概况</div>
                        </div>
                        <div className="statisticaldatacen">
                            <Row>
                                <Col span={8}>
                                   <div className="datacentit">预计索赔总金额</div>
                                    <div className="datacentxt">
                                        <span>{dataoverv.estimatedAmount}</span> USD
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div className="datacentit">实际索赔总金额</div>
                                    <div className="datacentxt">
                                        {dataoverv.actualAmount} USD
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div className="datacentit">实际索赔总金额</div>
                                    <div className="datacentxt">
                                        {dataoverv.asinCount}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Condition