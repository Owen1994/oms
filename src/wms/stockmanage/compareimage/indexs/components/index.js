import React from 'react';
import {
    Form,
} from 'antd';
import '../css/index.css';
import Search from './Search';
import TableList from './TableList';

/**
 * 对图
 */
class App extends React.Component {
    state = {
        pageNumber: 1,
        pageData: 50,
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
        this.props.form.validateFields(['cardNumber', 'sku'], (err, values) => {
            if (!err) {
                const { cardNumber, sku } = values;
                this.props.queryPartList({
                    data: {
                        sku,
                        cardNumber,
                        pageNumber,
                        pageData,
                    },
                });
            }
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
            <div className="wms-compareimage">
                <Search
                    {...this.props}
                    onSearchListener={this.onSearchListener}
                />
                <TableList
                    {...this.props}
                    pageNumber={pageNumber}
                    pageData={pageData}
                    onChangeListener={this.loadData}
                />
            </div>
        );
    }
}

export default Form.create()(App);
