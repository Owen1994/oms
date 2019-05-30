import React from 'react';
import {
    Form,
    message,
    Row,
    Col
} from 'antd';
import Search from './Searchs';
import Sector from './Sectors';
import Table from './Tables';
import '../css/css.css';
import { filterSearchParams } from '../selectors/FormData';
import { downlodFile, fetchPost } from '../../../util/fetch';

/**
 *作者: chenlin
 *功能描述: PR首页
 *时间: 2018/10/27 11:55
 */
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            pageSize: 20,
        };
    }

    // 请求列表
    handleSearch = (pageNumber = 1, pageSize = 20) => {
        const data = this.props.form.getFieldsValue();
        const params = {};
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
        if(data.skuArr && data.skuArr.length > 0){
            data.skuArr = data.skuArr.split(/,|，/g);
        }

        delete data.paytime;

        params.data = data;
        this.setState({
            pageNumber,
            pageSize,
        });
        this.props.getAnalysiSkuList(params);
    };

    /**
     下载数据
     */
    onDownloadData = () => {
        const data = this.props.form.getFieldsValue();
        const params = {};
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

        if(data.skuArr && data.skuArr.length > 0){
            data.skuArr = data.skuArr.split(/,|，/g);
        }

        delete data.paytime;

        params.data = data;

        // 导出数据
        fetchPost('/oms/order/manage/motan/service/api/IOrderManageService/skuStatExport', params, 2)
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
            <div>
                <Search
                    {...this.props}
                    onSearch={this.handleSearch}
                    onDownloadData={this.onDownloadData}
                />
                <div className="gutter-example pms-prmanage analysissku">
                    <Row gutter={20}>
                        <Col span={12}>
                            <div className="analysissku_l">
                                <Sector
                                {...this.props}
                                />
                            </div>
                        </Col>
                        <Col span={12}>
                                <Table
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
