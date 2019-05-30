import React from 'react';
import {
    Form,
} from 'antd';
import SearchComponent from './Search';
import TableList from './TableList';
import SettingModal from './SettingModal';
import { strTrim } from '../../../../util/baseTool';
import Functions from '@/components/functions';

/**
 * 拣货员管理
 */
class App extends React.Component {
    state = {
        pageNumber: 1,
        pageData: 100,
        record: {},
        settingModalVisible: false,
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
        if (filters.name) {
            filters.name = strTrim(filters.name);
        }
        // filters.warehouseCode = filters.warehouseCode ? filters.warehouseCode[0] : null;
        filters.pageNumber = pageNumber;
        filters.pageData = pageData;
        this.setState({
            pageNumber,
            pageData,
        });
        this.props.queryPickerList({ data: { ...filters } });
    };

    // 打开设置拣货组弹窗
    onSetting = (record) => {
        this.setState({
            record,
            settingModalVisible: true,
        });
    }

    closeModal = () => {
        this.setState({
            settingModalVisible: false,
            record: {},
        });
    }

    render() {
        const {
            pageNumber,
            pageData,
            record,
            settingModalVisible,
        } = this.state;

        return (
            <Functions {...this.props} isPage functionkey="012-000005-000003-001">
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
                        onSetting={this.onSetting}
                    />
                    <SettingModal
                        record={record}
                        pageNumber={pageNumber}
                        pageData={pageData}
                        handleSubmit={this.handleSubmit}
                        visible={settingModalVisible}
                        closeModal={this.closeModal}
                    />
                </div>
            </Functions>
        );
    }
}

export default Form.create()(App);
