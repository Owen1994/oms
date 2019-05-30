import React from 'react';
import {
    Form,
    Alert,
} from 'antd';
import '../css/index.css';
import Search from './Search';
import Tablelist from './Tablelist';
import OrderCommonSearchModal from '@/components/SearchModal/SearchModal';
import { setPageCache, getPageCache } from '@/util/PageCache';
import { filterSearchParams, revertFormPageCache } from '../selectors';

class App extends React.Component {
    state = {
        visible: false,     //批量搜索弹窗visible
        paramePlatformId: '', // 销售平台ID
        pageNumber: 1,
        pageData: 20,
    }

    componentDidMount() {
        this.handleSearch();
    }

    /**
     * 列表搜索
     */
    handleSearch = (pageNumber = 1, pageData = 20) => {
        const filter = this.filterParams(pageNumber, pageData);
        this.props.changeSelectedAction([]);    // 搜索时清空选中项
        this.props.queryTableList({ data: filter });
    }

    /**
     * 搜素参数筛选
     */
    filterParams = (pageNumber = 1, pageData = 20) => {
        const values = this.props.form.getFieldsValue();
        if (values['paymentTime'] && values['paymentTime'].length > 0) {
            const middleTime = 90 * 24 * 60 * 60 * 1000;
            if (values['paymentTime'][1].valueOf() - values['paymentTime'][0].valueOf() >= middleTime) {
                message.warning('付款时间不能超过90天');
                return false;
            }
        } else {
            delete values['paymentTime'];
        }
        values.pageNumber = pageNumber;
        values.pageData = pageData;
        this.setState({
            pageNumber,
            pageData,
        })
        filterSearchParams(values);
        // 删除撤单弹窗中的几个参数
        delete values.auditStatus;
        delete values.revokeType;
        delete values.auditRemark;
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
            })
        }
    }

    render() {
        const ifShowNotice = parseInt(sessionStorage.getItem('orderNotice')) === 1 ? true : false;
        const { 
            visible,
            paramePlatformId,
            pageNumber,
            pageData,
        } = this.state;
        return (
            <div className="yks-erp-search_order">
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
                    {...this.props}
                    onSearch={this.handleSearch}
                    onReset={this.onReset}
                    toggleModal={() => this.setState({
                        visible: true,
                    })}
                    handleChange={this.handleChange}
                    paramePlatformId={paramePlatformId}
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
                <div className="margin-ms-top">
                    <Tablelist 
                        {...this.props}
                        filterParams={this.filterParams}
                        onSearch={this.handleSearch}
                        pageNumber={pageNumber}
                        pageData={pageData}
                    />
                </div>
            </div>
        );
    }
}

export default Form.create()(App);
