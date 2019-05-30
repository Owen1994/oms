import React from 'react';
import {
    Form,
} from 'antd';
import '../../../../common/css/index.css';
import Functions from '../../../../../components/functions';
import Search from './Search';
import Tablelist from './Tablelist';

class App extends React.Component {
    state = {
        pageNumber: 1,
        pageData: 50,
    };

    componentDidMount() {
        this.handleSubmit();
    }

    // 请求仓储异常数据列表
    handleSubmit = (page = 1, pageSize = 50) => {
        const filter = this.props.form.getFieldsValue();
        filter.pageNumber = page;
        filter.pageData = pageSize;
        // filter.warehouseCode = filter.warehouseCode ? filter.warehouseCode[0] : '';
        // filter.errorState = filter.errorState ? filter.errorState[0] : '';
        // filter.errorType = filter.errorType ? filter.errorType[0] : '';
        // filter.treatmentPlan = filter.treatmentPlan ? filter.treatmentPlan[0] : '';
        this.setState({
            pageNumber: page,
            pageData: pageSize,
        });
        this.props.queryExceptionList({ data: filter });
    };

    render() {
        const {
            pageData,
            pageNumber,
        } = this.state;
        return (
            <Functions {...this.props} isPage functionkey="012-000003-000001-001">
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
                    />
                </div>
            </Functions>
        );
    }
}

export default Form.create()(App);
