import React from 'react';
import {
    Form, Tabs,
} from 'antd';
import '../css/index.css';
import Search from './Search';
import TableList from './TableList';

const TabPane = Tabs.TabPane;

/**
 * 批次管理
 */
class App extends React.Component {
    state = {
        pageNumber: 1,
        pageData: 50,
        // queryType: '1',
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
        const {
            warehouseCode,
            priority,
            searchType,
            searchContent,
            queryType,
        } = this.props.form.getFieldsValue();
        this.props.queryPartList({
            data: {
                priority: priority[0] || '',
                warehouseCode: warehouseCode[0] || '',
                searchType,
                searchContent,
                queryType,
                pageNumber,
                pageData,
            },
        });
    };

    handleTabChange = (value) => {
        // this.setState({
        //     queryType: value || '1',
        // });
        this.props.form.setFieldsValue({
            queryType: value,
        });
        this.loadData();
    };

    /**
     * 搜索监听
     */
    onSearchListener = () => {
        this.loadData(this.state.pageNumber, this.state.pageData);
    };

    render() {
        const { pageNumber, pageData } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="wms-batchmanage wms-tabs">
                {getFieldDecorator('queryType', {
                    initialValue: '1',
                })(
                    <Tabs type="card" onChange={this.handleTabChange}>
                        <TabPane tab="采购" key="1" />
                        <TabPane tab="包材" key="2" />
                        <TabPane tab="样品" key="3" />
                        <TabPane tab="退货" key="4" />
                    </Tabs>,
                )}
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
