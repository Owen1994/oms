import React, {Component} from 'react';

import {
    Form, Tabs, Alert,
} from 'antd';

import '../css/css.css';
import Search from './Search';
import Tablelist from './Tablelist';
import SearchValues from '@/components/searchValues/containers/App';
import { pageCache, functions,getGangeGimes, strTrim } from "util/baseTool";
import OrderCommonSearchModal from '@/components/SearchModal/SearchModal.js';
import { fetchPost } from 'util/fetch';

const TabPane = Tabs.TabPane;

class UserForm extends Component {

     state = {
        visible: false,
        visible2: false,    // 销售账号批量输入弹窗
        paramePlatformId: '',
        exceptionType: [{code: '', name: '全部'}],
     }
    componentDidMount() {
        if (!functions(this, '001-000002-000002-001')) {
            return false
        }
        this.handleSearch();
        setTimeout(()=> {
            const params = this.filterSearchParams();
            this.getStatus(params);
        }, 500);
    }

    onChange = (key) => {
        this.props.tablemodelaction({active: key})
    }


    // 搜索
    handleSearch = (pageNumber=1, pageData=20) => {
        const params = this.filterSearchParams(pageNumber, pageData);
        this.props.tablemodelaction({ selectedRows: [], selectedRowKeys: [] });
        this.props.fetchPosts({key: 'data', value: params});
    }

    filterSearchParams = (pageNumber=1, pageData=20) => {
        this.setState({
            pageNumber,
            pageData
        });
        const values = this.props.form.getFieldsValue();
        values.isException = 1;
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
        // 付款时间
        if (values['range-time']) {
            const arr = getGangeGimes(values['range-time']);
            values['paymentStartTime'] = arr[0] ? arr[0] : '';
            values['paymentEndTime'] = arr[1] ? arr[1] : '';
            delete values['range-time'];
        }
        // 抓单时间
        if (values['grabTime'] && values['grabTime'].length > 0) {
            values['grabTime'] = getGangeGimes(values['grabTime']);
        } else {
            delete values['grabTime'];
        }
        // 海神订单
        values.clickFarmingType = values.clickFarmingType[0];
        // 是否为合并订单
        values.isCombination = values.isCombination[0];
        // 异常类型
        if(values.exceptionType && values.exceptionType[0]){
            values.exceptionType = values.exceptionType[0];
        }else{
            delete values.exceptionType;
        }
        values.pageNumber = pageNumber;
        values.pageData = pageData;
        return values;
    }
    // 重置
    onReset = () => {
        this.props.form.resetFields();
        this.setState({
            paramePlatformId: ''
        })
    }

    // 销售平台参数
    handleChange = (value) => {
        this.setState({ paramePlatformId: value }, () => {
            const params = this.filterSearchParams();
            params.platformId = value;
            this.getStatus(params);
        })
    }
    // 请求订单状态数据
    getStatus = (params = {}) => {
        fetchPost('/oms/order/manage/motan/ICompanyOrderManageApi/getExceptionOrderListState', params, 2)
            .then(result => {
                if(result.state === '000001'){
                    this.updateStatus(result.data);
                }
            })
    };

    // 更新订单状态数据
    updateStatus = (data) => {
        this.setState({ exceptionType: [{code: '', name: '全部'}] });
        data.map(v => {
            const name = v.isShow ? `${v.status}(${v.count})` : `${v.status}`;
            this.setState(prevState => ({
                exceptionType: [...prevState.exceptionType, {code: v.id, name: name}]
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
            pageNumber,
            pageData,
            exceptionType,
        } = this.state;
        const ifShowNotice = parseInt(sessionStorage.getItem('orderNotice')) === 1 ? true : false;
        return (
            <div className="newClue newClueTitle">
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
                        onSearch={this.handleSearch}
                        handleChange={this.handleChange}
                        paramePlatformId={paramePlatformId}
                        {...this.props}
                        onReset={this.onReset}
                        toggleModal={() => this.setState({
                            visible: true,
                        })}
                        toggleModal2={this.openBatchModal}
                        getStatus={this.getStatus}
                        exceptionType={exceptionType}
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
                        onSearch={this.handleSearch}
                        pageNumber={pageNumber}
                        pageData={pageData}
                        {...this.props}
                        filterSearchParams={this.filterSearchParams}
                    />
                    <SearchValues {...this.props} />
                </div>
            </div>
        );
    }
}

export default Form.create()(UserForm);
