import React from 'react';
import {
    Form,
} from 'antd';
import Search from './Search';
import TableList from './TableList';

/**
 * 出库
 */
class Index extends React.Component {
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
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { rangeTime } = values;
                this.props.queryOutStockList({
                    data: {
                        pageNumber,
                        pageData,
                        ...values,
                        rangeTime: rangeTime && rangeTime.map(t => t.valueOf()),
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
            <div>
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

export default Form.create()(Index);
