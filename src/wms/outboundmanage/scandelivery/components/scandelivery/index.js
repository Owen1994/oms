import React from 'react';
import {
    Form,
} from 'antd';
import Search from './Search';
import TableList from './TableList';
import '../../css/index.css';


/**
 * 扫描发运
 */
class Index extends React.Component {
    /**
     * 加载列表数据
     * @param pageNumber
     * @param pageData
     */
    loadData = () => {
        const values = this.props.form.getFieldsValue();
        this.props.scanDeliveryPartList({
            data: {
                ...values,
            },
        });
    };

    render() {
        return (
            <div>
                <Search
                    onSearchListener={this.loadData}
                    {...this.props}
                />
                <TableList
                    onChangeListener={this.loadData}
                    {...this.props}
                />
            </div>
        );
    }
}

export default Form.create()(Index);
