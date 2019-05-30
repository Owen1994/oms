import React from 'react';
import {
    Drawer,
    Form,
} from 'antd';
import PlanSearch from './PlanSearch';
import PlanTable from './PlanTable';
import PlanDetailTable from './detial/PlanDetailTable';

/**
 * 盘点计划列表
 */
class PlanPage extends React.Component {
    state = {
        pageNumber: 1,
        pageData: 100,
        visible: false,
        detailsParams: {},
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
        const {
            inventoryTime, warehouseCode, reviewStatus, inventoryStatus,
        } = values;
        this.props.queryPartList({
            data: {
                pageNumber,
                pageData,
                ...values,
                inventoryTime: inventoryTime && inventoryTime.map(item => item.valueOf()),
                warehouseCode: warehouseCode && warehouseCode[0],
                inventoryStatus: inventoryStatus && inventoryStatus[0],
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

    showDrawer = (inventoryNumber) => {
        this.setState({
            visible: true,
            detailsParams: {
                inventoryNumber,
            },
        });
    };

    render() {
        const { pageNumber, pageData } = this.state;
        return (
            <div>
                <PlanSearch
                    onSearchListener={this.onSearchListener}
                    {...this.props}
                />
                <PlanTable
                    pageNumber={pageNumber}
                    pageData={pageData}
                    onChangeListener={this.loadData}
                    {...this.props}
                    showDrawer={this.showDrawer}
                />
                <Drawer
                    title="盘点计划详情"
                    placement="right"
                    onClose={() => {
                        this.setState({
                            visible: false,
                        });
                    }}
                    width="auto"
                    visible={this.state.visible}
                >
                    <PlanDetailTable
                        planDetailParts={this.props.planDetailParts}
                        planDetailLoadingState={this.props.planDetailLoadingState}
                        queryDetailsPartList={this.props.queryDetailsPartList}
                        detailsParams={this.state.detailsParams}
                    />
                </Drawer>
            </div>
        );
    }
}

export default Form.create()(PlanPage);
