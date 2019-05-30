import React from 'react';
import {
    Form,
} from 'antd';
import Search from './Search';
import TableList from './TableList';
import '../css/index.css';

/**
 * 样品记录
 */
class App extends React.Component {
    state = {
        pageNumber: 1,
        pageData: 100,
    };

    /**
     * 加载列表数据
     * @param pageNumber
     * @param pageData
     */
    loadData = (pageNumber, pageData) => {
        if (!pageNumber) {
            pageNumber = this.state.pageNumber;
        }
        if (!pageData) {
            pageData = this.state.pageData;
        }
        this.setState({
            pageNumber,
            pageData,
        });
        const values = this.props.form.getFieldsValue();
        const { requestTime } = values;
        this.props.queryPartList({
            data: {
                pageNumber,
                pageData,
                ...values,
                requestTime: requestTime && requestTime.map(item => item.valueOf()),
            },
        });
    };


    /**
     * 搜索监听
     */
    onSearchListener = () => {
        this.loadData(this.state.pageNumber, this.state.pageData);
    };

    render() {
        const { pageNumber, pageData } = this.state;
        return (
            <div className="wms-samplerecord">
                <Search
                    onSearchListener={this.onSearchListener}
                    {...this.props}
                />
                <TableList
                    pageNumber={pageNumber}
                    pageData={pageData}
                    onChangeListener={this.loadData}
                    {...this.props}
                />
            </div>
        );
    }
}

export default Form.create()(App);
