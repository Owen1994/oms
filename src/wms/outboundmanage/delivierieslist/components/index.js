import React from 'react';
import {
    Form,
} from 'antd';
import Search from './Search';
import TableList from './TableList';
import '../css/index.css';

/**
 * 发货列表
 */
class App extends React.Component {
    state = {
        pageNumber: 1,
        pageData: 50,
    };

    componentDidMount() {
        this.loadData();
    }

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
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {
                    payTime,
                    // orderType,
                    // shipWarehouse,
                    deliverTime,
                } = values;
                this.props.queryPartList({
                    data: {
                        pageNumber,
                        pageData,
                        ...values,
                        payTime: payTime.map(item => item.valueOf()),
                        deliverTime: deliverTime.map(item => item.valueOf()),
                        // orderType: orderType && orderType[0],
                        // shipWarehouse: shipWarehouse && shipWarehouse[0],
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
            <div className="wms-delivierieslist">
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
