import React from 'react';
import {
    Form,
} from 'antd';
import SearchComponent from './Search';
import TableList from './TableList';
import AddModal from './AddModal';
import { strTrim } from '../../../../util/baseTool';
import '../../../common/css/index.css';
import Functions from '@/components/functions';
/**
 * 容器管理
 */
class App extends React.Component {
    state = {
        pageNumber: 1,
        pageData: 50,
        addModalVisible: false,
    };

    componentDidMount() {
        this.handleSubmit();
    }

    /**
     * 加载列表数据
     * @param pageNumber
     * @param pageData
     */
    handleSubmit = (pageNumber = 1, pageData = 50) => {
        const filters = this.props.form.getFieldsValue();
        if (filters.containerNumber) {
            filters.containerNumber = strTrim(filters.containerNumber);
        }
        // filters.warehouseCode = filters.warehouseCode ? filters.warehouseCode[0] : null;
        filters.pageNumber = pageNumber;
        filters.pageData = pageData;
        this.setState({
            pageNumber,
            pageData,
        });
        this.props.queryPartList({ data: { ...filters } });
    };

    // 打开新增卡板弹窗
    openModal = () => {
        this.setState({
            addModalVisible: true,
        });
    }

    closeModal = () => {
        this.setState({
            addModalVisible: false,
        });
    }

    render() {
        const {
            pageNumber,
            pageData,
            addModalVisible,
        } = this.state;

        return (
            <Functions {...this.props} isPage functionkey="012-000005-000006-001">
                <div className="wms-checkinventory">
                    <SearchComponent
                        {...this.props}
                        handleSubmit={this.handleSubmit}
                    />
                    <TableList
                        {...this.props}
                        pageNumber={pageNumber}
                        pageData={pageData}
                        handleSubmit={this.handleSubmit}
                        openModal={this.openModal}
                    />
                    <AddModal
                        pageNumber={pageNumber}
                        pageData={pageData}
                        handleSubmit={this.handleSubmit}
                        visible={addModalVisible}
                        closeModal={this.closeModal}
                    />
                </div>
            </Functions>
        );
    }
}

export default Form.create()(App);
