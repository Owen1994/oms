import React from 'react';
import {
    Form,
    message,
} from 'antd';
import '../css/css.css';
import TableList from './TableList';
import SearchView from './SearchView';
import HandleDetailModal from './HandleDetailModal';

import SearchModal from "../../../components/SearchModal";
import HandleNPModal from './HandleNPModal';
import ModifyNPModal from './ModifyNPModal';

import { parseStrToArray } from "../../../../util/StrUtil";
import CGallery from "../../../../components/cgallery";
import { angentPicUrl } from '../../../../util/baseTool';
import {
    fetchPost,
} from '@/util/fetch';

import { EXPORT_NONE_PRODUCT_LISTS } from '../constants/Api';

/**
 *作者: zhengxuening
 *功能描述: 三无产品
 *时间: 2019/02/21 09:00
 */
class App extends React.Component {
    state = {
        pageNumber: 1,
        pageSize: 20,
        searchModalVisible: false,
        imgs: undefined,
        handleNPModalVisible: false,
        item: {},
        handleDetailModalVisible: false,
        modifyNPModalVisible: false,
    };

    /**
     * 第一次初始化视图,加载数据
     */
    componentDidMount() {
        this.loadData(1, 20);
    }

    /**
     * 清除表单数据
     */
    resetFields = () => {
        this.props.form.resetFields();
    };

    /**
     * 加载列表数据
     * @param pageNumber
     * @param pageSize
     */
    loadData = (pageNumber, pageSize) => {
        if (!pageNumber) {
            pageNumber = this.state.pageNumber;
        }
        if (!pageSize) {
            pageSize = this.state.pageSize;
        }
        this.setState({
            pageNumber,
            pageSize,
        });

        const values = { ...this.props.form.getFieldsValue() };
        const consignee = (values.consignee.length === 1) ? values.consignee[0].code : values.consignee;
        const searchContents = parseStrToArray(this.props.form.getFieldValue('searchContents'));
        if (searchContents.length >= 10) {
            message.warning('搜索内容不能超过10个');
            return false;
        }
        if (values.consignee) {
            if (values.consignee[0].code === 2) {
                if (!values.consigneeContents) {
                    message.warning("收货人不能为空!");
                    return false;
               }
            }
        }
        
        this.props.getMainDataList({
            data: {
                ...values,
                searchContents,
                consignee,
                pageNumber,
                pageData: pageSize,
            },
        });
    };

    handleClose = () => {
        this.setState({
            imgs: undefined,
        });
    };

    showHandleNPModal = (state, item) => {
        this.setState({
            handleNPModalVisible: state,
            item,
        })
    };

    showHandleDetailModal = (state, item) => {
        this.setState({
            handleDetailModalVisible: state,
            item,
        })
    };

    showModifyNPModal = (state, item) => {
        this.setState({
            modifyNPModalVisible: state,
            item,
        })
    };

    showImages = (items) => {

        let arrayImage = [];
        for (let i = 0; i < items.length; i++) {
            arrayImage.push({src: angentPicUrl(items[i])})
        }

        this.setState({
            imgs: arrayImage,
        })
    };

    // 数据导出
    handleExport  = () => {
        const values = { ...this.props.form.getFieldsValue() };
        const consignee = (values.consignee.length === 1) ? values.consignee[0].code : values.consignee;
        const searchContents = parseStrToArray(this.props.form.getFieldValue('searchContents'));
        if (searchContents.length >= 10) {
            message.warning('搜索内容不能超过10个');
            return false;
        }

        if (values.consignee) {
            if (values.consignee[0].code === 2) {
                if (!values.consigneeContents) {
                    message.warning("收货人不能为空!");
                    return false;
               }
            }
        }

        const  params = {
            data:{
                ...values,
                consignee,
                searchContents,
            }

        };
        fetchPost(EXPORT_NONE_PRODUCT_LISTS, params, 2)
        .then((result) => {
            if (result.state === '000001') {
                message.success(result.msg);
                setTimeout(() => {
                    window.open('/pms/importexportmanage/importexportlist/', '_blank');
                }, 1000);
            }
        });
    };

    render() {
        const {
            pageNumber,
            pageSize,
            searchModalVisible,
            imgs,
            handleNPModalVisible,
            item,
            handleDetailModalVisible,
            modifyNPModalVisible,
        } = this.state;

        return (
            <div className="yks-erp-search_order">
                <SearchView
                    {...this.props}
                    onSearch={this.loadData}
                    resetFields={this.resetFields}
                    showModal={() => this.setState({
                        searchModalVisible: true,
                    })}
                />

                <SearchModal
                    {...this.props}
                    visible={searchModalVisible}
                    onCancel={() => this.setState({
                        searchModalVisible: false,
                    })}
                    onSearch={this.loadData}
                />

                <TableList
                    {...this.props}
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    loadData={this.loadData}
                    showHandleNPModal={this.showHandleNPModal}
                    showModifyNPModal={this.showModifyNPModal}
                    showHandleDetailModal={this.showHandleDetailModal}
                    showImages={this.showImages}
                    handleExport={this.handleExport}
                />

                <CGallery
                    handleClose={this.handleClose}
                    imgs={imgs}
                />

                <HandleNPModal
                    visible={handleNPModalVisible}
                    item={item}
                    showModal={this.showHandleNPModal}
                    loadData={this.loadData}
                />

                <ModifyNPModal
                    visible={modifyNPModalVisible}
                    item={item}
                    showModal={this.showModifyNPModal}
                    loadData={this.loadData}
                />

                <HandleDetailModal
                    visible={handleDetailModalVisible}
                    item={item}
                    showModal={this.showHandleDetailModal}
                />

            </div>
        );
    }
}

export default Form.create()(App);
