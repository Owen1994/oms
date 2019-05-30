import React from 'react';
import qs from 'qs';
import {
    Form,
    Button,
    Tabs,
} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
import ChannelInfo from './newchannelinfo';
import WareHouseInfo from './newwarehouseinfo';
import SignInfo from './newsigninfo';
import ThirdInfo from './newthirdinfo';
import NewChannelDetail from './newchanneldetail';
import TruckingConfig from './truckingconfig';
import '../css/css.css'
import {fetchPost} from "util/fetch";
import { closeCurrentPage } from 'util/baseTool';
// import ChannelLog from './channellog';

class App extends React.Component{
    state = {
        loading: false,
        channelCountryArr: [],
        developingCountryArr: [],
        outLineCountriesArr: [],
        buttonType: 0,
    };
    componentDidMount() {
        // 获取浏览器url参数
        const locationArr = window.location.href.split('?');
        let paramsObj = locationArr.length > 1 ? qs.parse(locationArr[1]) : {};
        const orderId = paramsObj['orderId'] ? paramsObj['orderId'] : null;
        const buttonType = paramsObj['buttontype'] ? paramsObj['buttontype'] : null;
        this.setState({ buttonType });
        if(orderId) {
            const data = {
                data: { newChannelCode: orderId }
            };
            fetchPost('/oms/order/manage/motan/service/api/IOrderManageService/getLogisticsChannelDetail', data)
                .then(res => {
                    if(res && res.state === '000001'){
                        const { setFieldsValue } = this.props.form;
                        const { channel } = res.data;
                        if (res.data.wareHouse) {
                            res.data.wareHouse = res.data.wareHouse.map((item) => {
                                item.warehouseCodes = [
                                    {id: item.warehouseCode, name: item.warehouseCodeName }
                                ]
                                return item;
                            })
                        }
                        if (res.data.sign) {
                            res.data.sign = res.data.sign.map((item) => {
                                item.platforms = [
                                    {id: item.platform, name: item.platformName }
                                ]
                                item.dispatchCountrys = [
                                    {id: item.dispatchCountryCode, name: item.dispatchCountry }
                                ]
                                item.toCountrys = [
                                    {id: item.toCountry, name: item.toCountryName}
                                ]
                                return item;
                            })
                        }
                        this.props.getNewChannelInfoAction(res.data);
                        if (buttonType === "2") {
                            const channelCountryArr = [{
                                id: channel.channelCountry,
                                name: channel.channelCountryName
                            }];
                            const developingCountryArr = [{
                                id: channel.developingCountry,
                                name: channel.developingCountryName
                            }];
                            const outLineCountriesArr = [{
                                id: channel.outLineCountries,
                                name: channel.outLineCountriesName
                            }];
                            this.setState({
                                channelCountryArr,
                                developingCountryArr,
                                outLineCountriesArr,
                            });
                            setFieldsValue({
                                'channel[isAvailable]': Number(channel.isAvailable),
                                'channel[newChannelCode]': channel.newChannelCode,
                                'channel[channelCnName]': channel.channelCnName,
                                'channel[channelEnName]': channel.channelEnName,
                                'channel[companyCarrierCode]': channel.companyCarrierCode,
                                'channel[companyCarrierName]': channel.companyCarrierName,
                                'channel[channelWebSite]': channel.channelWebSite,
                                'channel[channelType]': channel.channelType,
                                'channel[channelGroup]': channel.channelGroup,
                                'channel[trackingType]': channel.trackingType,
                                'channel[channelCountry]': channel.channelCountry,
                                'channel[developingCountryObj]': channel.developingCountry,
                                'channel[outLineCountriesObj]': channel.outLineCountries,
                                'channel[shortestLength]': channel.shortestLength,
                                'channel[longestLength]': channel.longestLength,
                                'channel[channelMaxWeight]': channel.channelMaxWeight,
                                'channel[channelLogisticsAttr]': channel.channelLogisticsAttr,
                                'channel[extendInfo]': channel.extendInfo,
                            })
                        }
                    }
                })
        }

    }

    componentWillUnmount() {
        // 组件卸载时清空reducer数据，避免新增页面出现详情页数据的bug
        this.props.getNewChannelInfoAction({
            channel: {},
            sign: [],
            wareHouse: [],
            mapping: [],
            trucking: [],
        });
    }
    // 保存(提交大表单)
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((erros, values) => {
            if(!erros){
                this.setState({
                    loading: true
                });
                let data = {};
                const { warehouseInfoData, signInfoData, thirdInfoData, truckingInfoData } = this.props;
                const wareHouse = warehouseInfoData.data;
                const sign = signInfoData.data;
                const mapping = thirdInfoData.data;
                const trucking = truckingInfoData.data;
                let developingCountryObj = values.channel.developingCountryObj;
                let outLineCountriesObj = values.channel.outLineCountriesObj;

                // 可发国家
                if (developingCountryObj === null) {
                    values.channel.developingCountry = null;
                    values.channel.developingCountryName = null;
                } else if (Array.isArray(developingCountryObj)){
                    values.channel.developingCountry = developingCountryObj[0].id;
                    values.channel.developingCountryName = developingCountryObj[0].name;
                } else if (developingCountryObj) {
                    values.channel.developingCountry = this.state.developingCountryArr[0].id;
                    values.channel.developingCountryName = this.state.developingCountryArr[0].name;
                } 
                // values.channel.developingCountry = developingCountryObj ? developingCountryObj[0].id : null;
                // values.channel.developingCountryName = developingCountryObj ? developingCountryObj[0].name : null;
              
                // 例外国家
                if (outLineCountriesObj === null) {
                    values.channel.outLineCountries = null;
                    values.channel.outLineCountriesName = null;
                } else if (Array.isArray(outLineCountriesObj)) {
                    values.channel.outLineCountries = outLineCountriesObj[0].id ;
                    values.channel.outLineCountriesName = outLineCountriesObj[0].name;
                } else if (outLineCountriesObj) {
                    values.channel.outLineCountries = this.state.outLineCountriesArr[0].id;
                    values.channel.outLineCountriesName = this.state.outLineCountriesArr[0].name;
                } 

                // values.channel.outLineCountries = outLineCountriesObj ? outLineCountriesObj[0].id : null;
                // values.channel.outLineCountriesName = outLineCountriesObj ? outLineCountriesObj[0].name : null;
                delete values.channel.developingCountryObj;
                delete values.channel.outLineCountriesObj;
                for(let i in values.channel) {
                    if( typeof values.channel[i] === 'string' ) {
                        values.channel[i] = values.channel[i].replace(/(\s*$)/g, "");
                    }
                }
                data = { ...values };
                data.wareHouse = wareHouse;
                data.sign = sign;
                data.mapping = mapping;
                data.trucking = trucking;
                fetchPost('/oms/order/manage/motan/service/api/IOrderManageService/addOrUpdateLogisticsChannelDetail', { data }, 1)
                    .then(response => {
                        if(response.state == "000001"){
                            this.setState({
                                loading: false
                            });
                        }
                    })
            }
        });
    };

    //返回按钮
    returnprev = () => {
        this.props.history.goBack();
        closeCurrentPage();
    };

    render(){
        const {
            outLineCountriesArr,
            developingCountryArr,
            channelCountryArr,
            buttonType,
        } = this.state;

        return (
            <div className="newClue detail">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div className="newCluewk detailTab">
                        {
                            buttonType === "1" ? (
                                <div>
                                    <NewChannelDetail {...this.props} />
                                </div>)
                            : (<div>
                                <ChannelInfo
                                    {...this.props}
                                    channelCountryArr = {channelCountryArr}
                                    developingCountryArr = {developingCountryArr}
                                    outLineCountriesArr = {outLineCountriesArr}
                                />
                                <Tabs type="card" className="tabs table-border" defaultActiveKey="1">
                                    <TabPane tab="仓库信息" key="1">
                                        <WareHouseInfo {...this.props} />
                                    </TabPane>
                                    <TabPane tab="标记信息" key="2">
                                        <SignInfo {...this.props} />
                                    </TabPane>
                                    <TabPane tab="第三方信息" key="3">
                                        <ThirdInfo {...this.props} />
                                    </TabPane>
                                    <TabPane tab="跟踪号配置" key="4">
                                        <TruckingConfig {...this.props} />
                                    </TabPane>
                                </Tabs>
                             </div>)
                        }
                    </div>
                    {/* <ChannelLog {...this.props} /> */}
                    <div className="hover-btn text-right">
                        {
                            buttonType !== '1' ? 
                                <Button
                                    type="primary"
                                    loading={this.state.loading}
                                    htmlType="submit"
                                    className={'margin-ms-right'}
                                >
                                    保存
                                </Button>
                            : null
                        }
                        <Button
                            onClick={this.returnprev}
                        >
                            关闭
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}
export default Form.create()(App)