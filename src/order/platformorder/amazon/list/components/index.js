import React from 'react';
import { Form } from 'antd';
import SearchView from './Search';
import Tabs from './Tabs';
import TableList from './TableList';
import TagModal from './TagModal';
import GrabModal from './GrabModal';
import { fetchPost } from 'util/fetch';
import { Review_Amazon_Tabs_Api, Review_Sync_Order_Api, Review_If_Order_Marking_Api } from '../constants/Api';
import { parseStrToArray } from 'util/StrUtil';
import { getTimeStamp } from '@/compliance/utils';
import OrderCommonSearchModal from '@/components/SearchModal/SearchModal.js';
import BatchOptionModal from '@/components/BatchOptionModal/BatchOptionModal';
import { downloadUrl } from 'util/baseTool';

/**
 *作者: zhengxuening
 *功能描述: amazon订单列表
 *时间: 2018/12/14 10:00
 */
class App extends React.Component {
    state = {
        pageNumber: 1,
        pageData: 20,
        tagVisible: false,
        orderNumber: '',
        grabVisible: false,
        arrayTabs: [],
        tabsTag: 0,
        GrapSearchModalContent: '',
        ListSearchModalVisible: false,  // 列表搜索内容modal
    };

    componentDidMount() {
        this.handleAmazonTabsData();
    }

    /**
     * Http请求 Tabs数据请求
     */
    handleAmazonTabsData = () => {
        fetchPost(Review_Amazon_Tabs_Api, {}, 2)
            .then((result) => {
                if (result.state === '000001') {
                    this.setState({
                        arrayTabs: result.data,
                        tabsTag: result.data[0].id,
                    });
                    this.handleAmazonListData(1, 20, result.data[0].id);
                }
            });
    };


    /**
     * 加载列表数据
     * @param pageNumber
     * @param pageData
     * @param tag
     */
    handleAmazonListData = (pageNumber, pageData, tag) => {
        if (!pageNumber) {
            pageNumber = this.state.pageNumber;
        }
        if (!pageData) {
            pageData = this.state.pageData;
        }

        this.setState({
            pageNumber,
            pageData,
        });

        const data = this.props.form.getFieldsValue();
        const searchContents = parseStrToArray(data.searchContent);
        const grapTime = data.grapTime ? data.grapTime.map(t => getTimeStamp(t)) : undefined;
        const createTime = data.createTime ? data.createTime.map(t => getTimeStamp(t)) : undefined;
        this.props.queryAmazonList(
            {
                pageData,
                pageNumber,
                markInfo: data.markInfo,
                orderType: data.orderType,
                searchContent: searchContents.length !== 0 ? searchContents : undefined,
                searchType: data.searchType,
                grapTime,
                createTime,
                tabState: tag ? tag : this.state.tabsTag,
                shopNames: data.shopNames ? data.shopNames : undefined,
            }
        );
    };

    /**
     * Http请求 同步订单
     */
    handleAmazonSysOrder = (platformOrderNumber) => {
        fetchPost(Review_Sync_Order_Api, {platformOrderNumber}, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.handleAmazonTabsData();
                }
            });
    };

    /**
     * 判断订单是否能够标记
     * @param platformOrderNumber
     */
    handleAmazonTagOrder = (platformOrderNumber) => {
        const data = {
            platformOrderNumber: platformOrderNumber
        };
        fetchPost(Review_If_Order_Marking_Api, data, 2)
            .then((result) => {
                if (result.state === '000001') {
                    this.showOrCloseTagModal(true, platformOrderNumber);
                }
            });
    };

    /**
     * 切换Tabs Tag
     */
    switchTabsTag = (index) => {
        const tag = this.state.arrayTabs[index].id;
        this.setState({
            tabsTag: tag,
        },() => {
            this.props.form.resetFields();
            this.handleAmazonListData(1, 20, tag);
        })
    };

    /**
     * 显示或关闭订单抓取弹框
     */
    showOrCloseGrabModal = (modalState) => {
        this.setState({
            grabVisible: modalState,
            GrapSearchModalContent: '',
        });
    };

    /**
     * 显示或关闭标记跟踪号弹框
     */
    showOrCloseTagModal = (modalState, orderNumber) => {
        this.setState({
            orderNumber,
            tagVisible: modalState,
        });
    };

    render() {
        const {
            arrayTabs,
            pageNumber,
            pageData,
            grabVisible,
            orderNumber,
            tagVisible,
            GrapSearchModalContent,
            ListSearchModalVisible,
        } = this.state;
        return (
            <div>
                <SearchView
                    { ...this.props }
                    onSearch={this.handleAmazonListData}
                    toggleModal={() => {
                        this.setState({ ListSearchModalVisible: true });
                    }}
                />
                <div className="breadcrumb">
                    <Tabs
                        { ...this.props }
                        tabsData={arrayTabs}
                        handleTabsChange={this.switchTabsTag}
                    />
                    <TableList
                        { ...this.props }
                        pageNumber={pageNumber}
                        pageData={pageData}
                        loadData={this.handleAmazonListData}
                        sysOrder={this.handleAmazonSysOrder}
                        showGrabModal={this.showOrCloseGrabModal}
                        showTagModal={this.handleAmazonTagOrder}
                    />
                </div>
                <TagModal
                    visible={tagVisible}
                    orderNumber={orderNumber}
                    showModal={this.showOrCloseTagModal}
                />
                <GrabModal
                    visible={grabVisible}
                    showModal={this.showOrCloseGrabModal}
                    handleSubmit={this.handleAmazonTabsData}
                    toggleModalVisible={this.toggleModalVisible}
                    searchModalContent={GrapSearchModalContent}
                />
                <OrderCommonSearchModal
                    {...this.props}
                    visible={ListSearchModalVisible}
                    onCancel={() => {
                        this.setState({ ListSearchModalVisible: false });
                    }}
                    onSearch={this.handleAmazonListData}
                    searchContent="searchContent"
                    // count={1000}
                />
            </div>
        );
    }
}
export default Form.create()(App);
