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
import { setPageCache, getPageCache, delPageCache } from 'util/PageCache';
import '../css/index.css'
import OrderCommonSearchModal from '@/components/SearchModal/SearchModal.js';

/**
 *作者: 陈文春
 *功能描述: shopee订单
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
        activeKey: undefined,
        visible: false,
        showCache: {}
    };

    componentDidMount() {
        getPageCache().then(result => {
            if (result) {
                let showCache = {};
                // let exclude = ['pageData',"pageNumber"]
                Object.keys(result).forEach(v => {
                    // if (exclude.includes(v)) return;
                    switch (v) {
                        case "createType":
                        case "deliveryType":
                            return showCache[v] = [result[v]];
                        case "siteCode":
                            return showCache[v] = [{ key: result[v] }];
                        case "searchContent":
                            return showCache[v] = result[v].join('\n')
                        default:
                            showCache[v] = result[v];
                    }
                })
                if (!showCache.type) {
                    showCache.type = -1;
                }
                let keys = Object.keys(showCache);
                let now = Date.now();
                const start = moment(now - 30 * 24 * 60 * 60 * 1000).startOf('day').valueOf();
                // const start1 = moment(now - 24 * 60 * 60 * 1000).startOf('day').valueOf();
                const end = moment(now).endOf('day').valueOf();
                if (keys.length === 4 && showCache.orderTime) {
                    if (showCache.orderTime[0] == start, showCache.orderTime[1] == end) {
                        delete showCache.orderTime
                    }
                } else if (keys.length === 5 && showCache.orderTime) {
                    let key = showCache.deliveryType || showCache.createType || showCache.siteCode
                    if (key && showCache.orderTime[0] == start, showCache.orderTime[1] == end) {
                        delete showCache.orderTime
                    }
                } else if (keys.length === 6 && showCache.orderTime && showCache.searchType && showCache.searchType === 1 && showCache.searchContent) {
                    if (showCache.orderTime[0] == start, showCache.orderTime[1] == end) {
                        delete showCache.orderTime
                    }
                }

                if (showCache.orderTime) {
                    showCache.orderTime = [moment(showCache.orderTime[0]), moment(showCache.orderTime[1])]
                }
                if (showCache.grapTime) {
                    showCache.grapTime = [moment(showCache.grapTime[0]), moment(showCache.grapTime[1])]
                }
                this.setState({
                    showCache
                })
                this.getList(result)
            } else {
                this.getList(this.getParams())
            }
        })

        this.props.getShopeeOrderTabAsync();    //页签状态
    }

    componentWillUnmount() {
        const { location } = this.props;
        let pathname = location && location.pathname
        delPageCache(pathname)
    }

    // 原型图
    // https://bjotwy.axshare.com/#g=1&p=shopee%E5%B9%B3%E5%8F%B0%E8%AE%A2%E5%8D%95%E5%88%97%E8%A1%A8
    getParams = () => {
        let filter = this.props.form.getFieldsValue();
        for (let k in filter) {
            if (filter[k] === undefined) delete filter[k]
        }
        let { params } = this.props.shopeeList;
        if (!filter.searchContent) {
            delete filter.searchType;
            delete filter.searchContent;
        } else {
            filter.searchContent = filter.searchContent.split(/\s/).filter(v => v);
        }
        //创建类型
        if (filter.createType[0] === -1) {
            delete filter.createType;
        } else {
            filter.createType = filter.createType[0];
        }
        //发货类型
        if (filter.deliveryType[0] === -1) {
            delete filter.deliveryType;
        } else {
            filter.deliveryType = filter.deliveryType[0];
        }
        // 抓单时间
        if (!filter.grapTime || !filter.grapTime.length) {
            delete filter.grapTime;
        } else {
            filter.grapTime = [
                filter.grapTime[0].startOf('day').valueOf(),
                filter.grapTime[1].endOf('day').valueOf()
            ];
        }
        //下单时间
        if (!filter.orderTime || !filter.orderTime.length) {
            delete filter.orderTime;
        } else {
            filter.orderTime = [
                filter.orderTime[0].startOf('day').valueOf(),
                filter.orderTime[1].endOf('day').valueOf()
            ];
        }

        let keys = Object.keys(filter)
        let now = Date.now();
        if(!keys.includes('orderTime') && !keys.includes('grapTime')){
            let year = filter.searchType === 2 ? 12 : 1;
            filter.orderTime = [
                moment(now - year * 30 * 24 * 60 * 60 * 1000).startOf('day').valueOf(),
                moment(now).endOf('day').valueOf()
            ]
        }
        // if (keys.length === 0) {
        //     filter.orderTime = [
        //         moment(now - 30 * 24 * 60 * 60 * 1000).startOf('day').valueOf(),
        //         moment(now).endOf('day').valueOf()
        //     ]
        // } else if (keys.length === 1) {
        //     let key = keys[0]
        //     if (key === 'deliveryType' || key === 'createType' || key === 'siteCode') {
        //         filter.orderTime = [
        //             moment(now - 30 *  24 * 60 * 60 * 1000).startOf('day').valueOf(),
        //             moment(now).endOf('day').valueOf()
        //         ]
        //     }
        // } else if (keys.length === 2) {
        //     if (filter.searchType && filter.searchType === 1 && filter.searchContent) {
        //         filter.orderTime = [
        //             moment(now - 30 * 24 * 60 * 60 * 1000).startOf('day').valueOf(),
        //             moment(now).endOf('day').valueOf()
        //         ]
        //     }
        // }
        filter.pageData = params.pageData;
        filter.pageNumber = params.pageNumber;
        filter.type = params.type;
        return filter
    }

    getList = (data) => {
        let { shopeeList, getShopeeOrderListAsync } = this.props;
        if (!data) {
            data = shopeeList.params
        }
        setPageCache(data)
        getShopeeOrderListAsync({ data })
    }

    onSearch = () => {
        let params = this.getParams();
        params.pageNumber = 1
        this.getList(params)
    }

    //打开弹窗
    openModal = (type, orderNumber) => {
        if (type === '1') {
            this.setState({
                grabModalVisible: true,
                markModalVisible: false,
                detailModalVisible: false,
                orderNumber: undefined,
            });
        } else if (type === '2') {
            this.setState({
                grabModalVisible: false,
                markModalVisible: true,
                detailModalVisible: false,
                orderNumber
            });
        } else if (type === '3') {
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
        let params = this.getParams();
        params.type = activeKey
        params.pageNumber = 1
        this.setState({
            activeKey
        })
        this.getList(params)
    }
    onReset = () => {
        const { resetFields } = this.props.form;
        this.setState({
            showCache: {}
        }, resetFields)

    }
    render() {
        const {
            getParams,
            getList
        } = this
        const {
            menuInfos
        } = this.props;
        const {
            grabModalVisible,
            markModalVisible,
            detailModalVisible,
            orderNumber,
            activeKey,
            visible,
            showCache
        } = this.state;
        const {
            params,
            total,
            loading,
            list
        } = this.props.shopeeList;
        const {
            pageData,
            pageNumber,
        } = params
        return (
            <div>
                <Search
                    {...this.props}
                    getParams={getParams}
                    getList={getList}
                    onReset={this.onReset}
                    showCache={showCache}
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
                    onSearch={this.onSearch}
                    searchContent="searchContent"
                    // count={1000}
                />
                <div className="margin-ms-top breadcrumb">
                    <Tabcomponent {...this.props} activeKey={activeKey} defaultActiveKey={showCache.type} handleTabsChange={this.handleTabsChange} />
                    <Tablelist
                        menuInfos={menuInfos}
                        pageData={pageData}
                        pageNumber={pageNumber}
                        total={total}
                        loading={loading}
                        list={list}
                        getParams={getParams}
                        getList={getList}
                        openModal={this.openModal}
                    />
                </div>

                <GrabModal
                    visible={grabModalVisible}
                    getList={getList}
                    closeModal={this.closeModal}
                />
                <MarkModal
                    visible={markModalVisible}
                    getList={getList}
                    closeModal={this.closeModal}
                    orderNumber={orderNumber}
                />
            </div>
        )
    }
}

export default Form.create()(App)
