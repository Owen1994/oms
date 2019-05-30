import React from 'react';
import {
    Form,
} from 'antd';
import Search from './search';
import Tablelist from './tablelist';
import { all } from '../../common/json';
import moment from 'moment';

import '../css/index.css';

class App extends React.Component {
    state = {
        activePlate: 'logistics',
    };

    componentDidMount() {
        const {
            queryPlatformListAsync,
            queryplateAsync,
        } = this.props;
        queryplateAsync()
            .then((result) => {
                const data = result && result[0];
                if (data && data.key) {
                    queryPlatformListAsync({
                        applicableTempId: data.key,
                    });
                    this.handleSubmit(undefined, undefined, data.key);
                }
            });
    }

    getPrams = () => {
        const {
            autoreplyDtailList,
        } = this.props;
        const {
            params,
        } = autoreplyDtailList;
        const filter = this.props.form.getFieldsValue();
        Object.keys(filter).forEach((key) => {
            const d = filter[key];
            if (d === undefined || d === '' || d === all.key) {
                delete filter[key];
            }
        });

        if (!filter.searchContent) {
            delete filter.searchType;
            delete filter.searchContent;
        }

        filter.pageNumber = params.pageNumber;
        filter.pageData = params.pageData;

        const shippingTimeRange = filter.shippingTimeRange;
        if (shippingTimeRange) {
            if (shippingTimeRange.length >= 2) {
                const startTime = shippingTimeRange[0].startOf('day').unix();
                const endTime = shippingTimeRange[1].endOf('day').unix();
                filter.shippingTimeRange = [startTime, endTime];
            } else {
                delete filter.shippingTimeRange;
            }
        }
        return filter;
    }

    // 请求列表数据
    handleSubmit = (page = 1, pageSize = 20, plate) => {
        const params = this.getPrams();
        const { activePlate } = this.state;
        if (page) {
            params.pageNumber = page;
        }
        if (pageSize) {
            params.pageData = pageSize;
        }
        if (plate) {
            params.plate = plate;
        } else {
            params.plate = activePlate;
        }
        this.props.queryList(params);
    };

    onReset = () => {
        const { configurationAction } = this.props;
        const { resetFields } = this.props.form;
        resetFields();
        configurationAction([]);
    }

    // 切换板块
    changeTab = (active) => {
        const {
            // getFieldsValue,
            // setFieldsValue,
            resetFields,
        } = this.props.form;
        // const { platformId } = getFieldsValue(['platformId']);
        // const immutable = getFieldsValue();
        resetFields();
        // setFieldsValue(immutable);
        // const newObj = { activePlate: active, searchParams: immutable };
        // let flag = true;
        // this.immutableData.map((item) => {
        //     if (item.activePlate === active) {
        //         setFieldsValue(item.searchParams);
        //         flag = false;
        //         return true;
        //     }
        //     return false;
        // });
        // if (flag) {
        //     this.immutableData.push(newObj);
        // }
        this.setState({
            activePlate: active,
        }, () => {
            this.handleSubmit(1, undefined, active);
        });
    }

    render() {
        const {
            autoreplyDtailList,
            platformList,
            form,
            configurationData,
            plateList,
            queryConfigurationAsync,
            sendAsync,
            getSendDetialAsync,
            getDetailAsync,
        } = this.props;
        const {
            params,
            list,
            loading,
            total,
        } = autoreplyDtailList;
        const {
            pageData,
            pageNumber,
        } = params;
        const {
            activePlate,
        } = this.state;
        return (
            <div className="yks-erp-search_order">
                <Search
                    {...this.props}
                    form={form}
                    platformList={platformList}
                    handleSubmit={this.handleSubmit}
                    onReset={this.onReset}
                    plateList={plateList}
                    configurationData={configurationData}
                    queryConfigurationAsync={queryConfigurationAsync}
                    changeTab={this.changeTab}
                    activePlate={activePlate}
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
                        sendAsync={sendAsync}
                        getSendDetialAsync={getSendDetialAsync}
                        getDetailAsync={getDetailAsync}
                    />
                </div>
            </div>
        );
    }
}

export default Form.create()(App);
