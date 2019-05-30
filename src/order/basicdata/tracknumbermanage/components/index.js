import React, { Component } from 'react';
import {
    Form,
} from 'antd';
import SearchComponent from './Search';
import Tablelist from "./tablelist";
import Importmodal from "./importmodal";
import Warehouserule from './warehouserule';
import '../css/css.css';
import OrderCommonSearchModal from '@/components/SearchModal/SearchModal.js';
class App extends Component {

    state = {
        importmodalvisible:false,
        ordervisible:false,
        solevisible:0,
        soleData:null,
        ordermodal:{
            title: "跟踪号抓取配置",
            ModalContent: '内容',
            visible: false,
            type: false,
        },
        searchModalVisible: false,
        pageNumber: 1,
        pageData: 20,
        staticData:{
            1:"targetCountry",
            2:"trackingNumber",
            3:"logisticsType",
            4:"sourceErpOrderId",
            5:"usedPlatformOrderId",
        },
    }

    componentWillMount(){
        this.props.getCommonSelectData({url: '/oms/order/manage/motan/IPackageApi/getLogisticsChannel', key: 'newChannelCode'});
        this.props.getCommonSelectData({url: '/oms/order/grab/motan/OrderBadgeApi/getListLogisticsService', key: 'newServiceCode'},false);
    }

    componentDidMount (){
        this.handleSubmit();
    }

    changeOrdermodal = (params) => {
        var {ordermodal} = this.state
        this.setState({
            ordermodal:{
                ...ordermodal,
                ...params
            }
        })
    }

    changeModal = (code,f) => {
        this.setState({
            [code]:f
        })
    }

    // 列表数据查询
    handleSubmit = (pageNumber = 1, pageData = 20) => {
        const filters = this.filterSearchParams(pageNumber, pageData);
        this.props.tableDataActionAsync(filters);
    }

    // 搜索参数过滤
    filterSearchParams = (pageNumber = 1, pageData = 20) => {
        const values = this.props.form.getFieldsValue();
        const params = {};
        const { staticData } = this.state;
        values.isUsed = values.isUsed[0];
        values.sourceType = values.sourceType[0];
        for(let k in values){
            if(values[k] !== undefined){
                params[k] = values[k]
            }
        }
        if(params.isUsed < 0) {
            delete params.isUsed;
        }
        if(params.sourceType < 0){
            params.sourceType = 2;
        }
        if(params.searchContent){
            params[staticData[params.searchType]] = params.searchContent.split(/\n/).map(v=>v.trim()).filter(v=>v).join(",")
        }
        delete params.searchType
        delete params.searchContent
        if(params.createDate){
            params.createStartDate = params.createDate[0].startOf('day').format("YYYY-MM-DD HH:mm:ss")
            params.createEndDate = params.createDate[1].endOf('day').format("YYYY-MM-DD HH:mm:ss")
            delete params["createDate"]
        }
        if(params.onlineDate){
            params.onlineStartDate = params.onlineDate[0].startOf('day').format("YYYY-MM-DD HH:mm:ss")
            params.onlineEndDate = params.onlineDate[1].endOf('day').format("YYYY-MM-DD HH:mm:ss")
            delete params["onlineDate"]
        }
        if(params.useDate){
            params.useStartDate = params.useDate[0].startOf('day').format("YYYY-MM-DD HH:mm:ss")
            params.useEndDate = params.useDate[1].endOf('day').format("YYYY-MM-DD HH:mm:ss")
            delete params["useDate"]
        }
        params.pageNumber = pageNumber;
        params.pageData = pageData;
        this.setState({
            pageNumber,
            pageData,
        });
        return params;
    }

    render() {
        const {
            importmodalvisible,
            ordermodal,
            searchModalVisible,
            pageNumber,
            pageData,
        } = this.state;
        return (
            <div>
                <SearchComponent
                    {...this.props}
                    toggleModal={() => this.setState({
                        searchModalVisible: true,
                    })}
                    handleSubmit={this.handleSubmit}
                />
                <OrderCommonSearchModal
                    {...this.props}
                    visible={searchModalVisible}
                    onCancel={() => this.setState({
                        searchModalVisible: false,
                    })}
                    onSearch={this.handleSubmit}
                    searchContent="searchContent"
               />
                <div className="margin-sm-top">
                    <Tablelist
                        {...this.props}
                        changeOrdermodal={this.changeOrdermodal}
                        changeModal= {this.changeModal}
                        handleSubmit={this.handleSubmit}
                        pageNumber={pageNumber}
                        pageData={pageData}
                        filterSearchParams={this.filterSearchParams}
                    />
                </div>
                <Importmodal
                    handleSubmit={this.handleSubmit}
                    importFileActionAcync={this.props.importFileActionAcync}
                    visible={importmodalvisible}
                    changeModal= {this.changeModal}
                />
                <Warehouserule
                    {...this.props}
                    changeOrdermodal={this.changeOrdermodal}
                    warehouserule={ordermodal}
                />
            </div>
        );
    }
}

export default Form.create()(App)
