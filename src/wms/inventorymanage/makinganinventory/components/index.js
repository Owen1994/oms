import React from 'react';
import {
    Form, Tabs,
} from 'antd';
import { TAB_TITLES } from '../constants/table';
import PlanPage from './table/plan/index';

const TabPane = Tabs.TabPane;

/**
 * 库存盘点
 */
class App extends React.Component {
    state = {
        pageNumber: 1,
        pageData: 100,
        selectKey: '0',
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
        const { inventoryTime, warehouseCode, reviewStatus } = values;
        this.props.queryPartList({
            data: {
                pageNumber,
                pageData,
                ...values,
                inventoryTime: inventoryTime && inventoryTime.map(item => item.valueOf()),
                warehouseCode: reviewStatus && warehouseCode[0],
                reviewStatus: reviewStatus && reviewStatus[0],
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
        const { selectKey } = this.state;
        return (
            <div className="wms-makinganinventory wms-tabs">
                <Tabs defaultActiveKey={selectKey} type="card" onChange={this.tabChange}>
                    {/* <TabPane tab={TAB_TITLES[0]} key="0"> */}
                    {/* <Search */}
                    {/* onSearchListener={this.onSearchListener} */}
                    {/* {...this.props} */}
                    {/* /> */}
                    {/* <TableList */}
                    {/* pageNumber={pageNumber} */}
                    {/* pageData={pageData} */}
                    {/* onChangeListener={this.loadData} */}
                    {/* {...this.props} */}
                    {/* /> */}
                    {/* </TabPane> */}
                    <TabPane tab={TAB_TITLES[0]} key="0">
                        <PlanPage
                            {...this.props}
                        />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Form.create()(App);
