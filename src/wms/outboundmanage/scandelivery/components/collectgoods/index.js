import React, { Component } from 'react';
import {
    Form,
} from 'antd';
import TableList from './TableList';
import Search from './Search';
import './css/index.css';


/**
 * 集货袋合并
 */
class Index extends Component {
    componentDidMount() {
        this.loadData();
    }

    /**
     * 加载列表数据
     */
    loadData = () => {
        const values = this.props.form.getFieldsValue();
        this.props.collectGoodsPartList({
            data: {
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
        return (
            <div>
                <Search
                    {...this.props}
                    onSearchListener={this.onSearchListener}
                />
                <TableList
                    {...this.props}
                    loadData={this.loadData}
                />
            </div>
        );
    }
}

export default Form.create()(Index);
