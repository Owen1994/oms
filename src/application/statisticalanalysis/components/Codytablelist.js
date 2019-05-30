import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import Modalmodel from '../../../components/modalmodel'
import {
    Form,
    Tabs,
    Select,
    DatePicker,
} from 'antd'
import '../css/css.css'
const TabPane = Tabs.TabPane;
const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;
import * as config from '../../../util/connectConfig'
import axios from '../../../util/axios'
import Shoptablelist from './Shoptablelist';
import Sitetablelist from './Sitetablelist';
import Asintablelist from './Asintablelist';
import moment from "moment/moment";

class Codytablelist extends Component {
    constructor(props) {
        super(props);
    }
    state={
        tabs:1
    }
    componentDidMount() {

    }
    orderTimeonchange= (data,dateString) =>{
        this.props.form.setFieldsValue({orderTime:[moment(dateString[0]),moment(dateString[1])]});
        let dataStrings={}
        dataStrings.starttime=dateString[0]
        dataStrings.endtime=dateString[1]
        this.props.rankingtimeaction({data:dataStrings})
        this.props.form.validateFieldsAndScroll((err, values) => {
            const newibjringingasin = {}
            if(values.shopAccountKeyWordname==""||values.shopAccountKeyWordname==undefined)
            {
                newibjringingasin.lstShopAccount=[]
            }else{
                newibjringingasin.lstShopAccount=values.shopAccountKeyWordname.split(",")
            }
            newibjringingasin.startDay = values.orderTime[0]._i
            newibjringingasin.endDay = values.orderTime[1]._i
            newibjringingasin.pageNumber = 1
            newibjringingasin.pageData = 20
            if(this.state.tabs==1){
                this
                    .props
                    .ringingdataajax({
                        key: 'data',
                        value: newibjringingasin
                    })
            }else if(this.state.tabs==2){
                this
                    .props
                    .ringsitedataajax({
                        key: 'data',
                        value: newibjringingasin
                    })
            }else if(this.state.tabs==3)
            {
                this
                    .props
                    .ringasindataajax({
                        key: 'data',
                        value: newibjringingasin
                    })
            }

        });
    }
    onChange= (activeKey) => {
        this.props.baseInfoForm({tabs:activeKey});
        this.setState({ tabs: activeKey});
        this.props.form.validateFieldsAndScroll((err, values) => {
            const newibjringingasin = {}
            if(values.shopAccountKeyWordname==""||values.shopAccountKeyWordname==undefined)
            {
                newibjringingasin.lstShopAccount=[]
            }else{
                newibjringingasin.lstShopAccount=values.shopAccountKeyWordname.split(",")
            }
            newibjringingasin.startDay = this.props.rankingtimemodule.data.starttime
            newibjringingasin.endDay = this.props.rankingtimemodule.data.endtime
            newibjringingasin.pageNumber = 1
            newibjringingasin.pageData = 20
            if(activeKey==1){
                this
                    .props
                    .ringingdataajax({
                        key: 'data',
                        value: newibjringingasin
                    })
            }else if(activeKey==2){
                this
                    .props
                    .ringsitedataajax({
                        key: 'data',
                        value: newibjringingasin
                    })
            }else if(activeKey==3)
            {
                this
                    .props
                    .ringasindataajax({
                        key: 'data',
                        value: newibjringingasin
                    })
            }

        });
    }
    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        var rangingstart=moment(this.props.rankingtimemodule.data.starttime);
        var rangingend=moment(this.props.rankingtimemodule.data.endtime);
        return (
            <div className="newCluenk statisicontabs">
                <div className="content">
                    <div className="statisicontop">
                        <div className='statisiconleft'></div>
                        <div className='statisiconright'>索赔排名</div>
                        <div className="statisicontim">
                            <div className="timtit">日期</div>
                            <div className="timelis">
                                <FormItem {...this.formItemLayout}>
                                    {getFieldDecorator('orderTime', {rules: [{required: false}],initialValue:[rangingstart,rangingend]
                                    },)(
                                        <RangePicker onChange={this.orderTimeonchange}/>
                                    )}
                                </FormItem>
                            </div>
                        </div>
                        <div className="statisiconmon">
                            金额单位：USD
                        </div>
                    </div>
                </div>
                <Tabs type="card" className='typeCard'  onChange={this.onChange}>
                    <TabPane tab="按店铺" key="1">
                        <Shoptablelist {...this.props} />
                    </TabPane>
                    <TabPane tab="按站点" key="2">
                        <Sitetablelist {...this.props} />
                    </TabPane>
                    <TabPane tab="按ASIN" key="3">
                        <Asintablelist {...this.props} />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Codytablelist