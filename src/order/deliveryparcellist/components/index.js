/**
 * 作者: 陈林
 * 描述: 包裹订单 - 全部包裹页面 - 父组件
 * 时间: 2018/4/18 0018 下午 8:38
 **/
import React, {Component} from 'react';
import {
    Form, message, Alert,
} from 'antd';
import '../css/index.css';
import Search from './NewSearch';
import Tablelist from './Tablelist';
import { setPageCache, getPageCache } from 'util/PageCache';
import { filterSearchParams, revertFormPageCache } from '../selectors';
import OrderCommonSearchModal from '@/components/SearchModal/SearchModal.js';
import { fetchPost } from 'util/fetch';
import { strTrim } from 'util/baseTool';

class UserForm extends Component {

     state = {
        visible: false,
        visible2: false,    // 销售账号批量输入弹窗
        paramePlatformId: '', // 销售平台ID
        dicSaleAccount: [],
        warehouseState: [{code: '', name: '全部'}],
        pageNumber:1,
        pageData: 20,
     };

    componentDidMount() {
        this.handleDefaultSaleAccount();
        setTimeout(()=> {
            const params = this.filterParams();
            this.getStatus(params);
        }, 800);
    }

    // 设置当前用户默认平台
    handleDefaultSaleAccount = () => {
        const data = {};
        fetchPost('/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform', data, 2)
            .then(result => {
                if (result.state === '000001') {
                    this.setState({
                        dicSaleAccount: result.data,
                    })
                    this.getPageCache();
                } else {
                    this.getPageCache();
                }
            })
    };

    // 恢复缓存条件
    getPageCache = () => {
        getPageCache().then((params) => {
            if (params && params.formData) {
                const result = revertFormPageCache(params);
                if(result.formData['range-time']){
                    this.props.form.setFieldsValue({'range-time': result.momentData});
                    delete result.formData['range-time'];
                } else if(result.formData['grabTime']){
                    this.props.form.setFieldsValue({'grabTime': result.momentData});
                    delete result.formData['grabTime'];
                }
                this.props.form.setFieldsValue(result.formData);

                if(result.formData.platformName && result.formData.platformName.length > 0) {

                    if (Array.isArray(result.formData.platformName)) {
                        // 销售平台ID为销售账号的搜索条件之一，需恢复
                        this.setState({
                            paramePlatformId: result.formData.platformName[0].id,
                        });
                    } else {
                        // 销售平台ID为销售账号的搜索条件之一，需恢复
                        this.setState({
                            paramePlatformId: result.formData.platformName,
                        });
                    }

                }
            }
            this.handleSearch();
        });
    };

    // 搜索
    handleSearch = (pageNumber=1, pageData=20) => {
        const filter = this.filterParams(pageNumber, pageData);
        this.props.tablemodelaction({ selectedRowKeys: [] });
        this.props.fetchPosts({ key: 'data', value: filter });
    }

    filterParams = (pageNumber=1, pageData=20) => {
        this.setState({
            pageNumber,
            pageData
        });
        const values = this.props.form.getFieldsValue();

        // 付款时间
        if (values['range-time'] && values['range-time'].length > 0) {
            const middleTime = 90 * 24 * 60 * 60 * 1000;
            if (values['range-time'][1].valueOf() - values['range-time'][0].valueOf() >= middleTime) {
                message.warning('付款时间不能超过90天');
                return false;
            }
        }
        // 销售账号
        if(values.account && !Array.isArray(values.account)){
            values.account = values.account.split(',');
        }
        //设置搜索条件缓存
        setPageCache({ formData: values });
        filterSearchParams(values);

        values.pageNumber = pageNumber;
        values.pageData = pageData;
        if (values.account) {
            if(values.account.length === 0) {
                delete values.account
            }
        }

        // 删除审核/撤单弹窗中的三个参数
        delete values.auditStatus;
        delete values.revokeType;
        delete values.auditRemark;
        
        return values;
    };

    // 重置
    onReset = () => {
        this.props.form.resetFields();
        sessionStorage.clear();
        this.setState({
            paramePlatformId: ''
        })
    };

     // 销售平台参数
     handleChange = (value) => {
        if (value) {
            if (value.length === 0) {
                return false;
            }
            this.setState({
                paramePlatformId: value[0].id,
            }, () => {
                const params = this.filterParams();
                params.platformName = value[0].id;
                this.getStatus(params);
            })
        }
    }

    // 请求分仓状态数据
    getStatus = (params = {}) => {
        fetchPost('/oms/order/manage/motan/IPackageApi/getPackageListState', params, 2)
            .then(result => {
                if(result.state === '000001'){
                    this.updateStatus(result.data);
                }
            })
    };

    // 更新分仓状态数据
    updateStatus = (data) => {
        this.setState({ warehouseState: [{code: '', name: '全部'}] });
        data.map(v => {
            const name = v.isShow ? `${v.status}(${v.count})` : `${v.status}`;
            this.setState(prevState => ({
                warehouseState: [...prevState.warehouseState, {code: v.id, name: name}]
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
            account: inputVal
        });
        resetFields(['textAreaVal']);
    }

    // 销售账号批量输入弹窗打开
    openBatchModal =() => {
        const { getFieldValue, setFieldsValue } = this.props.form;
        let inputVal = getFieldValue('account');
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
            warehouseState,
            pageNumber,
            pageData,
        } = this.state;
        const ifShowNotice = parseInt(sessionStorage.getItem('orderNotice')) === 1;
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
                        dicSaleAccount={dicSaleAccount}
                        filterParams={this.filterParams}
                        getStatus={this.getStatus}
                        warehouseState={warehouseState}
                    />
                    <Tablelist
                        onSearch={this.handleSearch}
                        filterParams={this.filterParams}
                        pageNumber={pageNumber}
                        pageData={pageData}
                        {...this.props}
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
                </div>
        );
    }
}

export default Form.create()(UserForm);
