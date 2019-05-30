/**
 *作者: 魏洁(唐峰)
 *功能描述: 订单管理--全部订单--父组件
 *参数说明:
 *时间: 2018/5/28 10:14
 */
import React, {Component} from 'react';
import {
    Form, Alert,
} from 'antd';

import '../css/css.css';
import Tablelist from './Tablelist';
import Search from './Search';
import { getGangeGimes, strTrim } from 'util/baseTool';
import SearchValues from '@/components/searchValues/containers/App';
import OrderCommonSearchModal from '@/components/SearchModal/SearchModal.js';
import { fetchPost } from 'util/fetch';

class UserForm extends Component {

    state = {
        visible: false, // 搜索类型批量输入弹窗
        visible2: false,    // 销售账号批量输入弹窗
        paramePlatformId: '',
        dicSaleAccount: [],
        orderState: [{code: '', name: '全部'}],
    };

    componentDidMount() {
        this.handleDefaultSaleAccount();
        setTimeout(()=> {
            const searchParams = this.filterSearchParams();
            this.getStatus(searchParams);
        }, 500);
    }

    // 初始化平台
    handleDefaultSaleAccount = () => {
        const data = {searchColumn: 'name', pageData: 50, pageNumber: 1 };
        fetchPost('/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform', data, 2)
            .then(result => {
                if (result.state === '000001') {
                    this.setState({
                        dicSaleAccount: result.data,
                        paramePlatformId: result.data ? (result.data.length > 0 ? result.data[0].id : '') : '',
                    });
                    this.handleSearch();
                } else {
                    this.handleSearch();
                }
            })
    };

    // 搜索
    handleSearch = (pageNumber=1, pageData=20) => {
        const values = this.filterSearchParams(pageNumber, pageData);
        this.props.tablemodelaction({ selectedRowKeys: [] });
        this.props.fetchPosts({key: 'data', value: values});

    }

    filterSearchParams = (pageNumber=1, pageData=20) => {
        const values = this.props.form.getFieldsValue();
        // 搜索类型/搜索内容
        if (!values.searchContent) {
            delete values.searchType;
            delete values.searchContent;
        } else {
            values.searchContent = values.searchContent.replace(/[\n]/g, ',').replace(/[\s]/g, '');
        }
        // 销售账号
        if(values.saleAccountId && !Array.isArray(values.saleAccountId)){
            values.saleAccountId = values.saleAccountId.split(',');
        }
        for (let i in values) {
            if (values[i]) {
                // 付款时间
                if (i === 'range-time' ) {
                    if(values[i] && values[i].length){
                        const arr = getGangeGimes(values[i])
                        values['paymentStartTime'] = arr[0] ? arr[0] : '';
                        values['paymentEndTime'] = arr[1] ? arr[1] : '';
                    }
                    delete values['range-time'];
                }
                // 抓单时间
                if(i === 'grabTime'){
                    if (values[i] && values[i].length > 0){
                        values[i] = getGangeGimes(values[i]);
                    } else {
                        delete values.grabTime;
                    }
                }
            }
        }
        // 海神订单
        values.clickFarmingType = values.clickFarmingType[0];
        // 是否为合并订单
        values.isCombination = values.isCombination[0];
        // 订单状态
        if(values.orderStateId[0] || values.orderStateId[0] === 0){
            values.orderStateId = values.orderStateId[0];
        }else{
            delete values.orderStateId;
        }
        values.pageNumber = pageNumber;
        values.pageData = pageData;
        return values;
    };

    // 重置
    onReset = () => {
        this.props.form.resetFields();
        this.setState({
            paramePlatformId: ''
        })
    };

    // 销售平台参数
    handleChange = (value) => {
        this.setState({ paramePlatformId: value }, () => {
            const searchParams = this.filterSearchParams();
            searchParams.platformId = value;
            this.getStatus(searchParams);
        })
    };

    // 请求订单状态数据
    getStatus = (searchParams = {}) => {
        fetchPost('/oms/order/manage/motan/ICompanyOrderManageApi/getOrderListState', searchParams, 2)
            .then(result => {
                if(result.state === '000001'){
                    this.updateStatus(result.data);
                }
            })
    };

    // 更新订单状态数据
    updateStatus = (data) => {
        this.setState({ orderState: [{code: '', name: '全部'}] });
        data.map(v => {
            const name = v.isShow ? `${v.status}(${v.count})` : `${v.status}`;
            this.setState(prevState => ({
                orderState: [...prevState.orderState, {code: v.id, name: name}]
            }));
        });
    }
    
    // 销售账号批量输入弹窗取消
    handleBatchCancel = () => {
        const { getFieldValue, setFieldsValue, resetFields } = this.props.form;
        const batchModalVal = getFieldValue('textAreaVal');
        let inputVal = '';
        if(batchModalVal){
            inputVal = strTrim(batchModalVal).replace(/\n/g, ',');
        }
        this.setState({ visible2: false });
        setFieldsValue({
            saleAccountId: inputVal
        });
        resetFields(['textAreaVal']);
    }

    // 销售账号批量输入弹窗打开
    openBatchModal =() => {
        const { getFieldValue, setFieldsValue } = this.props.form;
        let inputVal = getFieldValue('saleAccountId');
        let batchModalVal = '';
        if(inputVal){
            if (Array.isArray(inputVal)){
                inputVal = inputVal.join(',');
            }
            batchModalVal = inputVal.replace(/(^,*)|(,*$)/g, '').replace(/,/g, '\n');
        }
        this.setState({
            visible2: true,
        });
        setFieldsValue({
            textAreaVal: batchModalVal
        });
    }
    render() {
        const {
            visible,
            visible2,
            paramePlatformId,
            dicSaleAccount,
            orderState,
        } = this.state;
        const ifShowNotice = parseInt(sessionStorage.getItem('orderNotice')) === 1;

        return (
        <div className="newClue order-list">
            {
                ifShowNotice ? (
                    <Alert
                        style={{marginBottom: 4}}
                        message="公告：OMS发货流程：平台订单▶订单管理▶包裹订单▶老ERP/汇总分仓▶发货完成。Wish,Mymall平台，请在平台单号内输入交易号查询！同交易号在结尾加上01，02类推！"
                        type="warning"
                        showIcon
                        closable
                        onClose={() => {
                            sessionStorage.removeItem('orderNotice');
                        }}
                    />
                ) : null
            }
            <div className="newCluewk">
                 <Search
                    {...this.props}
                    onSearch={this.handleSearch}
                    handleChange={this.handleChange}
                    paramePlatformId={paramePlatformId}
                    onReset={this.onReset}
                    toggleModal={() => this.setState({
                        visible: true,
                    })}
                    toggleModal2={this.openBatchModal}
                    dicSaleAccount={dicSaleAccount}
                    getStatus={this.getStatus}
                    orderState={orderState}
                    filterSearchParams={this.filterSearchParams}
                />
                <OrderCommonSearchModal
                    {...this.props}
                    visible={visible}
                    onCancel={() => this.setState({
                        visible: false,
                    })}
                    onSearch={this.handleSearch}
                    searchContent="searchContent"
                    // count={1000}
                />
                <OrderCommonSearchModal
                    {...this.props}
                    visible={visible2}
                    onCancel={this.handleBatchCancel}
                    searchContent="textAreaVal"
                    count={100}
                />
                <Tablelist
                    {...this.props}
                    onSearch={this.handleSearch}
                    filterSearchParams={this.filterSearchParams}
                />
                <SearchValues {...this.props} />
            </div>
        </div>);
    }
}


export default Form.create()(UserForm);
