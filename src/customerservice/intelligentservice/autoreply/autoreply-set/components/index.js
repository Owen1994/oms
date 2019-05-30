import React from 'react';
import {
    Form,
} from 'antd';
import Search from './search';
import Tablelist from './tablelist';
import AddModal from './addModal';
import DetailModal from '../../common/detailModal';
import { all } from '../../common/json';
import '../css/index.css';

class App extends React.Component {
    state = {
        addModalVisible: false,
        detailModalVisible: false,
    };

    componentDidMount() {
        this.handleSubmit();
    }

    getPrams = () => {
        const { autoreplySetList } = this.props;
        const { params } = autoreplySetList;
        const filter = this.props.form.getFieldsValue();

        Object.keys(filter).forEach((key) => {
            if (filter[key] === undefined || filter[key] === '' || filter[key] === all.key) {
                delete filter[key];
            }
        });

        if (filter.ruleState && filter.ruleState[0] !== -1) {
            filter.ruleState = filter.ruleState[0];
        } else {
            delete filter.ruleState;
        }
        filter.pageNumber = params.pageNumber;
        filter.pageData = params.pageData;
        return filter;
    }

    // 请求ebay订单列表数据
    handleSubmit = (page = 1, pageSize = 20) => {
        const params = this.getPrams();
        if (page) {
            params.pageNumber = page;
        }
        if (pageSize) {
            params.pageData = pageSize;
        }
        this.props.queryList(params);
    };

    // 打开弹窗
    openModal = (type, record) => {
        //  1 新增 ； 2 编辑； 3 查看；
        const obj = {};
        if (type === 1) {
            obj.addModalVisible = true;
        } else if (type === 2) {
            obj.addModalVisible = true;
            obj.record = record;
        } else if (type === 3) {
            obj.detailModalVisible = true;
            obj.record = record;
        }
        this.setState(obj);
    };

    // 关闭弹窗
    closeModal = () => {
        this.setState({
            record: {},
            addModalVisible: false,
            detailModalVisible: false,
        });
    };

    onReset = () => {
        const { resetFields } = this.props.form;
        resetFields();
    }

    render() {
        const {
            addModalVisible,
            detailModalVisible,
            record,
        } = this.state;
        const {
            autoreplySetList,
            form,
            queryConfigurationAsync,
            getDetailAsync,
            toggleRuleAsync,
            getVariayeAsync,
            getLimitAsync,
        } = this.props;
        const {
            params,
            list,
            loading,
            total,
        } = autoreplySetList;
        const {
            pageData,
            pageNumber,
        } = params;
        return (
            <div className="yks-erp-search_order">
                <Search
                    {...this.props}
                    form={form}
                    handleSubmit={this.handleSubmit}
                    onReset={this.onReset}
                />
                <div className="margin-sm-top">
                    <Tablelist
                        {...this.props}
                        pageData={pageData}
                        pageNumber={pageNumber}
                        loading={loading}
                        list={list}
                        total={total}
                        handleSubmit={this.handleSubmit}
                        openModal={this.openModal}
                        toggleRuleAsync={toggleRuleAsync}
                    />
                </div>
                <AddModal
                    visible={addModalVisible}
                    closeModal={this.closeModal}
                    record={record}
                    handleSubmit={this.handleSubmit}
                    getDetailAsync={getDetailAsync}
                    queryConfigurationAsync={queryConfigurationAsync}
                    getVariayeAsync={getVariayeAsync}
                    getLimitAsync={getLimitAsync}
                />
                <DetailModal
                    visible={detailModalVisible}
                    record={record}
                    closeModal={this.closeModal}
                    getDetailAsync={getDetailAsync}
                    queryConfigurationAsync={queryConfigurationAsync}
                />
            </div>
        );
    }
}

export default Form.create()(App);
