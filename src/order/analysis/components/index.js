/**
 * 订单 - 业绩看板 - 订单分析
 */
import React from 'react';
import {
    Form,
    message,
    Row,
    Col,
} from 'antd';
import Search from './Searchs';
import Listcontent from './Listcontent';
import TablesAccount from './TablesAccount';
import TabelCountry from './TabelCountry';
import '../css/css.css';
import moment from 'moment';
import { filterSearchParams } from '../selectors/FormData';
import { downlodFile, fetchPost } from '../../../util/fetch';

class App extends React.Component {

    state = {
        pageNumber: 1,
        pageSize: 20,
    };

    componentDidMount() {
        this.setDefaultTime();
    }

    // 设置默认时间
    setDefaultTime = () => {
        let end = moment().endOf('day').valueOf();
        let start = moment().subtract(0, 'day').startOf('day').valueOf();
        let momentData = [moment(start), moment(end)] || [];
    };

    // 请求列表
    handleSearch = (pageNumber = 1, pageSize = 20) => {
        const data = { ...this.props.form.getFieldsValue() };

        const params = { };
        filterSearchParams(data);
        if (!data.platformCode) {
            message.warning("平台不能为空");
            return false;
        }
        if (data.payDt) {
            const middleTime = 90 * 24 * 60 * 60 * 1000;
            if (data.payDt[1].valueOf() - data.payDt[0].valueOf() >= middleTime) {
                message.warning('付款时间不能超过90天');
                return false;
            }
        } else {
            message.warning("付款时间不能为空");
        }
        data.pageNumber = pageNumber;
        data.pageData = pageSize;
        params.data = data;
        this.setState({
            pageNumber,
            pageSize,
        });
        this.props.getAnalysisList(params);
    };

    /**
      下载数据
     */
    onDownloadData = () => {
        const data = { ...this.props.form.getFieldsValue() };

        const params = { };
        filterSearchParams(data);
        if (!data.platformCode) {
            message.warning("平台不能为空");
            return false;
        }
        if (data.payDt) {
            const middleTime = 90 * 24 * 60 * 60 * 1000;
            if (data.payDt[1].valueOf() - data.payDt[0].valueOf() >= middleTime) {
                message.warning('付款时间不能超过90天');
                return false;
            }
        } else {
            message.warning("付款时间不能为空");
        }

        params.data = data;

        fetchPost('/oms/order/manage/motan/service/api/IOrderManageService/orderStatExport', params, 2)
            .then((result) => {
                if (result.state === '000001') {
                    window.location.href="/order/basicdata/importexportrecords/";
                }
            });
    };

    render() {
        const {
            pageSize,
            pageNumber,
        } = this.state;
        const paginationData = {
            pageSize,
            pageNumber,
        };
        return (
            <div className="pms-prmanage pms-analysis yks-erp-search_order">
                <Search
                    {...this.props}
                    onSearch={this.handleSearch}
                    onDownloadData={this.onDownloadData}
                />
                <div className="pms-listcontent breadcrumb">
                    <Listcontent {...this.props}/>
                </div>
                <div className="pms-table">
                    <Row gutter={20}>
                        <Col span={12}>
                            <TablesAccount
                                {...this.props}
                                onSearch={this.handleSearch}
                                paginationData={paginationData}
                            />
                        </Col>
                        <Col span={12}>
                            <TabelCountry
                                {...this.props}
                                onSearch={this.handleSearch}
                                paginationData={paginationData}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
export default Form.create()(App);
