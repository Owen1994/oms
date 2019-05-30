import React from 'react';
import {
    Form,
} from 'antd';
import SearchComponent from './Search';
import TableList from './TableList';
import AddModal from './AddModal';
import PlatformModal from './PlatformModal';
import ChannelModal from './ChannelModal';
import { strTrim } from '../../../../util/baseTool';
import Functions from '@/components/functions';

/**
 * 容器管理
 */
class App extends React.Component {
    state = {
        pageNumber: 1,
        pageData: 50,
        addModalVisible: false,
        platformModalVisible: false,
        channelModalVisible: false,
        priorityName: '',
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
        if (filters.priorityName) {
            filters.priorityName = strTrim(filters.priorityName);
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

    // 打开弹窗
    openModal = (type) => {
        switch (type) {
        case '平台': this.setState({ platformModalVisible: true, priorityName: '平台' }); break;
        case '渠道': this.setState({ channelModalVisible: true, priorityName: '渠道' }); break;
        default: this.setState({ addModalVisible: true }); break;
        }
    }

    closeModal = (type) => {
        switch (type) {
        case '平台': this.setState({ platformModalVisible: false, priorityName: '' }); break;
        case '渠道': this.setState({ channelModalVisible: false, priorityName: '' }); break;
        default: this.setState({ addModalVisible: false }); break;
        }
    }

    render() {
        const {
            pageNumber,
            pageData,
            addModalVisible,
            platformModalVisible,
            channelModalVisible,
            priorityName,
        } = this.state;

        return (
            <Functions {...this.props} isPage functionkey="012-000005-000009-001">
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
                    <PlatformModal
                        {...this.props}
                        visible={platformModalVisible}
                        closeModal={this.closeModal}
                        priorityName={priorityName}
                    />
                    <ChannelModal
                        {...this.props}
                        visible={channelModalVisible}
                        closeModal={this.closeModal}
                        priorityName={priorityName}
                    />
                </div>
            </Functions>
        );
    }
}

export default Form.create()(App);
