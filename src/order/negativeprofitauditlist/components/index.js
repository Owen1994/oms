/**
 * 描述: 包裹订单 - 待审核包裹页面
 * 时间: 2018/4/18 0018 下午 8:42
 **/
import React, {Component} from 'react'
import {
    Form, Tabs, message, Alert,
} from 'antd'
import Search from './Search';
import OrderCommonSearchModal from '@/components/SearchModal/SearchModal';
import Tablelist from './Tablelist';
import { CHECK_TYPE } from '../constants/Search';
import { strTrim } from "util/baseTool";
import {fetchPost} from "util/fetch";
import { setPageCache, getPageCache } from 'util/PageCache';
import { filterSearchParams, revertFormPageCache } from '../selectors';
import {
    GET_PLATFORM,
    GET_EXCEPTION_PACKAGE_COUNT
} from '../constants'
const TabPane = Tabs.TabPane;

class UserForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,     //批量搜索弹窗visible
            visible2: false,    // 销售账号批量输入弹窗
            paramePlatformId: '', // 销售平台ID
            checkState: [{code: '', name: '全部'}],
            pageNumber: 1,
            pageData: 20,
        }
    }

    componentDidMount() {
        //获取平台
        this.props.getCommonSelectData({url: GET_PLATFORM, key: 'platformId'});
        // 根据缓存数据重新加载页面
        this.reloadPageByCache();
        setTimeout(()=> {
            const params = this.filterParams();
            this.getStatus(params);
        }, 500);
    }

    // 根据缓存重新加载页面
    reloadPageByCache = () => {
        getPageCache().then((params) => {
            if(params){
                const stateData = params.stateData;
                let pageNumber = stateData.pageNumber, pageData = stateData.pageData;
                if (params.formData) {
                    const result = revertFormPageCache(params);
                    if(result.formData['range-time']){
                        this.props.form.setFieldsValue({'range-time': result.momentData});
                        delete result.formData['range-time'];
                    } else if(result.formData['grabTime']){
                        this.props.form.setFieldsValue({'grabTime': result.momentData});
                        delete result.formData['grabTime'];
                    }
                    this.props.form.setFieldsValue({'range-time': result.momentData})   // 默认时间恢复
                    this.props.form.setFieldsValue(result.formData);    // 搜索条件恢复成缓存中的条件
                }
                this.handleSearch(pageNumber, pageData);
            }else{
                this.handleSearch();
            }
        });
    }

    // 搜索
    handleSearch = (pageNumber=1, pageData=20) => {
        const filter = this.filterParams(pageNumber, pageData);
        this.props.tablemodelaction({ selectedRowKeys: [], selectedRows: [] });
        this.props.fetchPosts({ key: 'data', value: filter });
    }

    filterParams = (pageNumber=1, pageData=20) => {
        const values = this.props.form.getFieldsValue();
        if (values['range-time'] && values['range-time'].length > 0) {
            const middleTime = 90 * 24 * 60 * 60 * 1000;
            if (values['range-time'][1].valueOf() - values['range-time'][0].valueOf() >= middleTime) {
                message.warning('付款时间不能超过90天');
                return false;
            }
        }
        // 销售账号
        if(values.saleAccount && !Array.isArray(values.saleAccount)){
            values.saleAccount = values.saleAccount.split(',');
        }
        const stateData = {pageNumber, pageData};
        setPageCache({ formData: values, stateData });
        values.pageNumber = pageNumber;
        values.pageData = pageData;
        filterSearchParams(values);
        this.setState({
            pageNumber,
            pageData,
        });
        return values;
    }

    // 重置
    onReset = () => {
        this.props.form.resetFields();
        sessionStorage.clear();
        this.setState({
            paramePlatformId: ''
        })
    }

    // 销售平台参数，paramePlatformId有值时，销售账号搜索对应平台，无值时搜索全部账号
    handleChange = (value) => {
        if (value) {
            if (value.length === 0) {
                return false;
            }
            this.setState({
                paramePlatformId: value[0].id
            }, () => {
                const params = this.filterParams();
                params.platformId = value[0].id;
                this.getStatus(params);
            })
        }
    }

    // 请求订单状态数据
    getStatus = (params = {}) => {
        fetchPost('/oms/order/manage/motan/IPackageApi/getDeficitPackageListState', params, 2)
            .then(result => {
                if(result.state === '000001'){
                    this.updateStatus(result.data);
                }
            })
    };

    // 更新订单状态数据
    updateStatus = (data) => {
        this.setState({ checkState: [{code: '', name: '全部'}] });
        data.map(v => {
            const name = v.isShow ? `${v.status}(${v.count})` : `${v.status}`;
            this.setState(prevState => ({
                checkState: [...prevState.checkState, {code: v.id, name: name}]
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
            saleAccount: inputVal
        });
        resetFields(['textAreaVal']);
    }

    // 销售账号批量输入弹窗打开
    openBatchModal =() => {
        const { getFieldValue, setFieldsValue } = this.props.form;
        let inputVal = getFieldValue('saleAccount');
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
            checkState,
            pageNumber,
            pageData,
        } = this.state;
        const {
            Paginationmodel,
            tablemodel,
        } = this.props;
        const ifShowNotice = parseInt(sessionStorage.getItem('orderNotice')) === 1 ? true : false;
        return (
            <div className="newClue yks-erp-search_order">
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
                        handleChange={this.handleChange}
                        paramePlatformId={paramePlatformId}
                        onSearch={this.handleSearch}
                        onReset={this.onReset}
                        toggleModal={() => this.setState({
                            visible: true,
                        })}
                        toggleModal2={this.openBatchModal}
                        filterParams={this.filterParams}
                        getStatus={this.getStatus}
                        checkState={checkState}
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
                    <div className="margin-ms-top">
                        <Tablelist
                            {...this.props}
                            filterParams={this.filterParams}
                            onSearch={this.handleSearch}
                            trialFreightModal={this.handleTrialFreightModal}
                            pageNumber={pageNumber}
                            pageData={pageData}
                        />
                    </div>

                </div>
            </div>
        );
    }
}

export default Form.create()(UserForm);
