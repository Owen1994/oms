import React, { Component } from 'react';
import { Form } from 'antd';
import TableList from './TableList';
import Search from './Search';

/**
 * 集货称重
 */
class Index extends Component {
    /**
     * 加载列表数据
     */
    loadData = () => {
        this.props.form.validateFields(['weighingTime', 'searchType', 'channel', 'searchContent', 'warehouseCode'], (err, values) => {
            if (!err) {
                const { weighingTime } = values;
                this.props.weighingPartList({
                    data: {
                        ...values,
                        weighingTime: weighingTime.map(item => item.valueOf()),
                    },
                });
            }
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
                />
            </div>
        );
    }
}

export default Form.create()(Index);
