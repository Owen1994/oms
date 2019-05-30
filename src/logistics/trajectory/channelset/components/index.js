import React from 'react';
import { Form } from 'antd';
import SearchComponent from './Search';
import TablesComponent from './Tables';
import LogModal from './LogModal';
import EditModal from './EditModal';
import { SET_CHANNEL_STATUS } from '../constants/Api';
import { fetchPost } from '../../../../util/fetch';

/**
 *作者: 黄建峰
 *功能描述: 渠道设置
 *时间: 2018/12/10 10:45
 */
class App extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
        logModalVisible: false,
        settingModalVisible: false,
    }

    componentDidMount() {
        this.onSearch();
    }

    onSearch = (pageNumber=1, pageData=20) => {
        this.setState({
            pageNumber,
            pageData,
        });
        const formData = {...this.props.form.getFieldsValue()};
        formData.state = formData.state[0];
        this.props.loadDataList({
            data: {
                ...formData,
                pageNumber,
                pageData,
            }
        });
    };

    handleModal = (type, item) => {
        this.setState({
            [type]: true,
            item
        });
    };

    handleCancel = () => {
        this.setState({
            logModalVisible: false,
            settingModalVisible: false,
            item: undefined
        });
    };

    handleOK = () => {
        this.setState({
            logModalVisible: false,
            settingModalVisible: false,
            item: undefined
        });
        this.onSearch();
    };

    handleUpdateState = (record, state) => {
        const data = {
            key: record.key,
            state,
        }
        fetchPost(SET_CHANNEL_STATUS, { data }, 1)
            .then((result) => {
                if (result.state === '000001') {
                    const { pageData, pageNumber } = this.state;
                    this.onSearch(pageNumber, pageData);
                }
            });
    }

    render(){
        const {
            pageData,
            pageNumber,
            logModalVisible,
            item,
            settingModalVisible,
        } = this.state;
        return (
            <div>
                <SearchComponent
                    {...this.props}
                    onSearch={this.onSearch}
                />
                <TablesComponent
                    {...this.props}
                    pageNumber={pageNumber}
                    pageData={pageData}
                    onSearch={this.onSearch}
                    showModal={this.handleModal}
                    onUpdateState={this.handleUpdateState}
                />
                <LogModal
                    visible={logModalVisible}
                    item={item}
                    onCancel={this.handleCancel}
                />
                <EditModal
                    visible={settingModalVisible}
                    item={item}
                    onCancel={this.handleCancel}
                    onOk={this.handleOK}
                />
            </div>
        )
    }
}
export default Form.create()(App);
