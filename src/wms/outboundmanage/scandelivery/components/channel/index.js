import React, { Component } from 'react';
import { Form } from 'antd';
import TableList from './TableList';
import Search from './Search';

/**
 * 渠道合并
 */
class Index extends Component {
    state = {
        pageNumber: 1,
        pageData: 50,
    };

    componentDidMount() {
        this.loadData();
    }

    /**
     * 加载列表数据
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
        this.props.channelPartList({
            data: {
                pageNumber,
                pageData,
                ...values,
            },
        });
    };


    /**
     * 搜索监听
     */
    onSearchListener = () => {
        this.loadData();
    };

    render() {
        const { pageNumber, pageData } = this.state;
        return (
            <div>
                <Search
                    {...this.props}
                    onSearchListener={this.onSearchListener}
                />
                <TableList
                    pageNumber={pageNumber}
                    pageData={pageData}
                    {...this.props}
                    loadData={this.loadData}
                />
            </div>
        );
    }
}

export default Form.create()(Index);
