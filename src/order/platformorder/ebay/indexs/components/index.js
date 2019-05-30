import React from 'react'
import moment from 'moment';
import {
    Form,
} from 'antd'
import Tabcomponent from './tabs'
import Search from './search'
import Tablelist from './tablelist'
import GrabModal from './grapmodal'
import MarkModal from './markmodal'
import '../css/index.css';
import OrderCommonSearchModal from '@/components/SearchModal/SearchModal.js';

/**
 *作者: 陈文春
 *功能描述: ebay订单
 *时间: 2018年11月21日09:47:40
 */
class App extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
        grabModalVisible: false,
        markModalVisible: false,
        detailModalVisible: false,
        orderNumber: undefined,
        activeKey: '0',
        visible: false,
    };

    componentDidMount() {
        this.handleSubmit();
        this.props.queryEbayOrderTabState();    //页签状态
    }

    //请求ebay订单列表数据
    handleSubmit = (page = 1, pageSize = 20) => {
        const params = this.filterSearchParams(page, pageSize);
        this.props.queryEbayOrderList({data: params});
    }

    filterSearchParams = (page = 1, pageSize = 20) => {
        let filter = this.props.form.getFieldsValue();
        filter.pageNumber = page;
        filter.pageData = pageSize;
        filter.type = parseInt(this.state.activeKey);
        if(!filter.createType[0]){
            delete filter.createType;
        }else{
            filter.createType = filter.createType[0];     //创建类型
        }
        if(!filter.searchContents){
            delete filter.searchType;
            delete filter.searchContents;
        }else{
            filter.searchContents = filter.searchContents.split('\n');
        }
        //下单时间
        if(filter.orderTimes && filter.orderTimes.length > 0){
            filter.orderTimes = [new Date(filter.orderTimes[0]).getTime(), new Date(filter.orderTimes[1]).getTime()];
        } else {
            delete filter.orderTimes;
        }
        //付款时间
        if(filter.paymentTimes && filter.paymentTimes.length > 0){
            filter.paymentTimes = [new Date(filter.paymentTimes[0]).getTime(), new Date(filter.paymentTimes[1]).getTime()];
        } else {
            delete filter.paymentTimes;
        }
        //抓单时间
        if(filter.orderCacheTimes && filter.orderCacheTimes.length > 0){
            filter.orderCacheTimes = [new Date(filter.orderCacheTimes[0]).getTime(), new Date(filter.orderCacheTimes[1]).getTime()];
        } else {
            delete filter.orderCacheTimes;
        }
        this.setState({
            pageNumber: page,
            pageData: pageSize,
        });
        return filter;
    };
    //打开弹窗
    openModal = (type, orderNumber) => {
        if(type === '1'){
            this.setState({
                grabModalVisible: true,
                markModalVisible: false,
                detailModalVisible: false,
                orderNumber: undefined,
            });
        }else if(type === '2'){
            this.setState({
                grabModalVisible: false,
                markModalVisible: true,
                detailModalVisible: false,
                orderNumber
            });
        }else if(type === '3'){
            this.setState({
                grabModalVisible: false,
                markModalVisible: false,
                detailModalVisible: true,
                orderNumber
            });
        }

    };
    //关闭弹窗
    closeModal = () => {
        this.setState({
            grabModalVisible: false,
            markModalVisible: false,
            detailModalVisible: false,
            orderNumber: undefined
        });
    };
    //标签页改变，存储activeKey
    handleTabsChange = (activeKey) => {
        this.setState({activeKey}, ()=>{
            this.props.form.resetFields();
            this.handleSubmit();
        });

    }
    onReset = ()=>{
       const {resetFields, setFieldsValue} = this.props.form;
       resetFields();
       setFieldsValue({ orderTimes: [] });
    }
    render() {
        const {
            pageData,
            pageNumber,
            grabModalVisible,
            markModalVisible,
            detailModalVisible,
            orderNumber,
            activeKey,
            visible,
        } = this.state;
        return (
            <div>
                <Search
                    {...this.props}
                    handleSubmit={this.handleSubmit}
                    activeKey={activeKey}
                    onReset={this.onReset}
                    toggleModal={() => this.setState({
                        visible: true,
                    })}
                />
                <OrderCommonSearchModal
                    {...this.props}
                    visible={visible}
                    onCancel={() => this.setState({
                        visible: false,
                    })}
                    onSearch={this.handleSubmit}
                    searchContent="searchContents"
                    // count={1000}
                />
                <div className="margin-ms-top breadcrumb">
                    <Tabcomponent {...this.props} handleTabsChange={this.handleTabsChange} />
                    <Tablelist
                        {...this.props}
                        pageData={pageData}
                        pageNumber={pageNumber}
                        handleSubmit={this.handleSubmit}
                        openModal={this.openModal}
                        filterSearchParams={this.filterSearchParams}
                    />
                </div>

                <GrabModal
                    visible={grabModalVisible}
                    closeModal={this.closeModal}
                    handleSubmit={this.handleSubmit}
                />
                <MarkModal
                    visible={markModalVisible}
                    closeModal={this.closeModal}
                    handleSubmit={this.handleSubmit}
                    orderNumber={orderNumber}
                    pageData={pageData}
                    pageNumber={pageNumber}
                />
            </div>
        )
    }
}

export default Form.create()(App)
