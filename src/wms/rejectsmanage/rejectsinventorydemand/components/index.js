import React from 'react';
import {
    Form,
} from 'antd';
import '../css/index.css';
import '../../../common/css/index.css';
import Functions from '../../../../components/functions';
import Search from './Search';
import Tablelist from './Tablelist';

class App extends React.Component {
    state = {
        pageNumber: 1,
        pageData: 50,
        searchCondition: {},
    }

    componentDidMount() {
        this.handleSubmit();
    }

    // 请求仓储异常数据列表
    handleSubmit = (page = 1, pageSize = 50) => {
        const filter = this.props.form.getFieldsValue();
        filter.pageNumber = page;
        filter.pageData = pageSize;
        // filter.warehouseCode = filter.warehouseCode ? filter.warehouseCode[0] : '';
        // filter.badType = filter.badType ? filter.badType[0] : '';
        // filter.productHandling = filter.productHandling ? filter.productHandling[0] : '';
        // filter.treatmentPlan = filter.treatmentPlan ? filter.treatmentPlan[0] : '';
        // if (filter.qualityInspectionTime) {
        //     filter.qualityInspectionTime = [new Date(filter.qualityInspectionTime[0]).getTime(), new Date(filter.qualityInspectionTime[1]).getTime()];
        // } else {
        //     delete filter.qualityInspectionTime;
        // }
        // if (filter.processingDate) {
        //     filter.processingDate = [new Date(filter.processingDate[0]).getTime(), new Date(filter.processingDate[1]).getTime()];
        // } else {
        //     delete filter.processingDate;
        // }
        filter.searchType = '1';
        if (!filter.searchContent) {
            delete filter.searchContent;
            delete filter.searchType;
        }

        this.setState({
            pageNumber: page,
            pageData: pageSize,
            searchCondition: filter,
        });
        this.props.queryRejectsList({ data: filter });
    };

    render() {
        const {
            pageData,
            pageNumber,
            searchCondition,
        } = this.state;
        return (
            <Functions {...this.props} isPage functionkey="012-000004-000001-001">
                <div>
                    <Search
                        {...this.props}
                        handleSubmit={this.handleSubmit}
                    />
                    <Tablelist
                        {...this.props}
                        pageData={pageData}
                        pageNumber={pageNumber}
                        handleSubmit={this.handleSubmit}
                        searchCondition={searchCondition}
                    />
                </div>
            </Functions>
        );
    }
}

export default Form.create()(App);
