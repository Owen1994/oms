import React from 'react';
import {
    Form,
    message,
} from 'antd';
import '../css/css.css';
import TableList from './TableList';
import SearchView from './SearchView';
import SearchModal from '../../../components/SearchModal';
// import { getTimeStamp } from '../../../../compliance/utils';
import { parseStrToArray } from '../../../../util/StrUtil';
import { fetchPost } from '../../../../util/fetch';
import { getTimeStamp } from '../../../../util/moment';
import {
    AL_Update_Order_Api,
    AL_Dissolution_Order_Api,
    AL_Export_Order_Api,
    AL_Export_Logistics_Info_Api,
    AL_Create_Payment_Document_Api,
} from '../constants/Api';


/**
 *作者: huangjianfeng
 *功能描述: 采购单查询
 *时间: 2018/10/11 15:55
 */
class App extends React.Component {
    state = {
        pageNumber: 1,
        pageSize: 20,
        searchModalVisible: false,
        orderLoading: false,
    };

    /**
     * 第一次初始化视图,加载数据
     */
    componentDidMount() {
        this.loadData(1, 20);
    }

    /**
     * 清除表单数据
     */
    resetFields = () => {
        this.props.form.resetFields();
    };

    /**
     * 加载列表数据
     * @param pageNumber
     * @param pageSize
     */
    loadData = (pageNumber, pageSize) => {
        if (!pageNumber) {
            pageNumber = this.state.pageNumber;
        }
        if (!pageSize) {
            pageSize = this.state.pageSize;
        }
        this.setState({
            pageNumber,
            pageSize,
        });
        const values = { ...this.props.form.getFieldsValue() };
        const purchaseTimes = values.purchaseTimes ? values.purchaseTimes.map(t => getTimeStamp(t)) : [];
        const searchContents = parseStrToArray(this.props.form.getFieldValue('searchContents'));
        if (searchContents.length >= 10) {
            message.warning('搜索内容不能超过10个');
            return false;
        }

        this.props.getMainDataList({
            data: {
                ...values,
                purchaseTimes,
                searchContents,
                pageNumber,
                pageData: pageSize,
            },
        });
    };

    /**
     * 批量更新
     * @param keys
     */
    httpBatchUpdate = (keys) => {
        this.setState({
            orderLoading: true,
        })
        fetchPost(AL_Update_Order_Api, {data:{keys}}, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.loadData();
                    this.setState({
                        orderLoading: false,
                    })
                } else {
                    this.setState({
                        orderLoading: false,
                    })
                }
            });
    };

    /**
     * 批量创建付款计划单
     * @param keys
     */
    httpCreatePlanOrder = (keys) => {
        this.setState({
            orderLoading: true,
        })
        fetchPost(AL_Create_Payment_Document_Api, {data:{keys}}, 1)
            .then((result) => {
                this.loadData();
                setTimeout(()=>{
                        this.setState({
                            orderLoading: false,
                        })
                },2000);
            });
    };

    /**
     * 更新订单
     * @param key
     */
    httpUpdateOrder = (key) => {
        fetchPost(AL_Update_Order_Api, {data:{keys: key}}, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.loadData();
                }
            });
    };

    /**
     * 解除订单
     * @param key
     */
    httpDissolutionOrder = (key) => {
        fetchPost(AL_Dissolution_Order_Api, {data:{key}}, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.loadData();
                }
            });
    };

    /**
     * 导出订单
     */
    httpExportOrder = () => {

        const values = { ...this.props.form.getFieldsValue() };
        const purchaseTimes = values.purchaseTimes ? values.purchaseTimes.map(t => getTimeStamp(t)) : [];
        const searchContents = parseStrToArray(this.props.form.getFieldValue('searchContents'));
        if (searchContents.length >= 10) {
            message.warning('搜索内容不能超过10个');
            return false;
        }
        const data = {
            data: {
                ...values,
                purchaseTimes,
                searchContents,
            }
        };
        fetchPost(AL_Export_Order_Api, data, 1)
            .then((result) => {
                if (result.state === '000001') {
                    window.open('/pms/importexportmanage/importexportlist/', '_blank');
                }
            });
    };

    /**
     * 导出物流信息
     */
    httpExportLogisticsInfo = () => {
        const values = { ...this.props.form.getFieldsValue() };
        const purchaseTimes = values.purchaseTimes ? values.purchaseTimes.map(t => getTimeStamp(t)) : [];
        const searchContents = parseStrToArray(this.props.form.getFieldValue('searchContents'));
        if (searchContents.length >= 10) {
            message.warning('搜索内容不能超过10个');
            return false;
        }
        const data = {
            data: {
                ...values,
                purchaseTimes,
                searchContents,
            }
        };
        fetchPost(AL_Export_Logistics_Info_Api, data, 1)
            .then((result) => {
                if (result.state === '000001') {
                    window.open('/pms/importexportmanage/importexportlist/', '_blank');
                }
            });
    };


    render() {
        const {
            pageNumber,
            pageSize,
            searchModalVisible,
            orderLoading,
        } = this.state;
        return (
            <div className="yks-erp-search_order">
                <SearchView
                    {...this.props}
                    onSearch={this.loadData}
                    resetFields={this.resetFields}
                    showModal={() => this.setState({
                        searchModalVisible: true,
                    })}
                />

                <SearchModal
                    {...this.props}
                    visible={searchModalVisible}
                    onCancel={() => this.setState({
                        searchModalVisible: false,
                    })}
                    onSearch={this.loadData}
                />

                <TableList
                    {...this.props}
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    loadData={this.loadData}
                    httpBatchUpdate={this.httpBatchUpdate}
                    httpCreatePlanOrder={this.httpCreatePlanOrder}
                    httpUpdateOrder={this.httpUpdateOrder}
                    httpDissolutionOrder={this.httpDissolutionOrder}
                    httpExportOrder={this.httpExportOrder}
                    httpExportLogisticsInfo={this.httpExportLogisticsInfo}
                    orderLoading={orderLoading}
                />

            </div>
        );
    }
}

export default Form.create()(App);
