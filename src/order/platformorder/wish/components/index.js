import React from 'react'
import {
    Form,
    message,
} from 'antd'
import Tabcomponent from './tabs'
import Search from './search'
import Tablelist from './tablelist'
import GrabModal from './grapmodal'
import MarkModal from './markmodal'
import DetailModal from './detailmodal'
import '../css/index.css'
import Functions from '@/components/functions'
import OrderCommonSearchModal from '@/components/SearchModal/SearchModal.js';
import { getUrlParams } from 'util/baseTool';

/**
 *作者: 陈文春
 *功能描述: Wish订单
 *时间: 2018年10月23日11:22:22
 */
class App extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
        grabModalVisible: false,
        markModalVisible: false,
        detailModalVisible: false,
        orderId: undefined,
        activeKey: '0',
        visible: false
    };

    componentDidMount() {
        this.handleSubmit();
        this.props.queryWishOrderTabState();    //页签状态

        // 订单定位跳转到wish订单打开wish详情弹框逻辑
        const orderId = getUrlParams(location.href).orderId;
        if (orderId) {
            this.openModal('3', orderId);
        }
    
    }

    //请求wish订单列表数据
    handleSubmit = (page = 1, pageSize = 20) => {
        let filter = this.props.form.getFieldsValue();
        // const filter = filterParams(values);
        filter.pageNumber = page;
        filter.pageData = pageSize;
        filter.tabState = parseInt(this.state.activeKey);
        filter.onLineState = filter.onLineState ? filter.onLineState[0] : 0;
        filter.orderType = filter.orderType ? filter.orderType[0] : -1;
        if(filter.paymentTime && filter.paymentTime.length > 0){
            filter.paymentTime = [new Date(filter.paymentTime[0]).getTime(), new Date(filter.paymentTime[1]).getTime()];
        }
        if(filter.grabTime && filter.grabTime.length > 0){
            filter.grabTime = [new Date(filter.grabTime[0]).getTime(), new Date(filter.grabTime[1]).getTime()];
        }
        if(filter.tagState){
            if(filter.tagState[0] === -1){
                delete filter.tagState;
            }else{
                filter.tagState = filter.tagState[0].toString();
            }
        }
        this.setState({
            pageNumber: page,
            pageData: pageSize
        });
        this.props.queryWishOrderList(filter);
    };
    //打开弹窗
    openModal = (type, orderId) => {
        if(type === '1'){
            this.setState({
                grabModalVisible: true,
                markModalVisible: false,
                detailModalVisible: false,
                orderId: undefined,
            });
        }else if(type === '2'){
            this.setState({
                grabModalVisible: false,
                markModalVisible: true,
                detailModalVisible: false,
                orderId
            });
        }else if(type === '3'){
            this.setState({
                grabModalVisible: false,
                markModalVisible: false,
                detailModalVisible: true,
                orderId
            });
        }

    };
    //关闭弹窗
    closeModal = () => {
        this.setState({
            grabModalVisible: false,
            markModalVisible: false,
            detailModalVisible: false,
            orderId: undefined
        });
    };
    //标签页改变，存储activeKey
    handleTabsChange = (activeKey) => {
        if(activeKey === '2'){
            this.props.queryWishOrderTagState({tabId: activeKey});    //页签改变为2时重新请求标记状态
        }
        this.setState({activeKey}, ()=>{
            this.props.form.resetFields();
            this.handleSubmit();
        });
    }

    // 重置
    onReset = () => {
        this.props.form.resetFields();
        sessionStorage.clear();
    }

    render() {
        const {
            pageData,
            pageNumber,
            grabModalVisible,
            markModalVisible,
            detailModalVisible,
            orderId,
            activeKey,
            visible
        } = this.state;
        return (
            <Functions {...this.props} isPage={true} functionkey="001-000001-000003-001">
                <div>
                    <Search
                        {...this.props}
                        handleSubmit={this.handleSubmit}
                        onReset={this.onReset}
                        activeKey={activeKey}
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
                        searchContent="searchContent"
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
                        />
                    </div>
                    <GrabModal
                        visible={grabModalVisible}
                        closeModal={this.closeModal}
                        handleSubmit={this.handleSubmit}
                        // sellerId={sellerId}
                    />
                    <MarkModal
                        visible={markModalVisible}
                        closeModal={this.closeModal}
                        handleSubmit={this.handleSubmit}
                        orderId={orderId}
                    />
                    <DetailModal
                        visible={detailModalVisible}
                        closeModal={this.closeModal}
                        handleSubmit={this.handleSubmit}
                        orderId={orderId}
                    />
                </div>
            </Functions>
        )
    }
}

export default Form.create()(App)
