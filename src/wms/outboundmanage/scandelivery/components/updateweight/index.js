import React, { Component } from 'react';
import { Form } from 'antd';
import TableList from './TableList';
import Search from './Search';


/**
 * 更新包裹重量
 */
class Index extends Component {
    /**
     * 加载列表数据
     */
    loadData = () => {
        const values = this.props.form.getFieldsValue();
        const { logisticsChannel, warehouseCode, scanTime } = values;
        this.props.updateWeightPartList({
            data: {
                ...values,
                logisticsChannel: logisticsChannel && logisticsChannel[0],
                warehouseCode: warehouseCode && warehouseCode[0],
                scanTime: scanTime && scanTime.map(t => t.valueOf()),
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
                    loadData={this.loadData}
                    {...this.props}
                />
            </div>
        );
    }
}

export default Form.create()(Index);
