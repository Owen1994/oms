import React from 'react';
import {
    Form,
    message,
} from 'antd';
import '../css/css.css';
import TableList from './TableList';
import SearchView from './SearchView';
import HandleDPModal from './HandleDPModal';
import HandleDPTwoModal from './HandleDPTwoModal';
import HandleDetailModal from './HandleDetailModal';
import ModifyDPModal from './ModifyDPModal';
import ModifyDPTwoModal from './ModifyDPTwoModal';
import CarouselModal from "./CarouselModal";
import CGallery from "../../../../components/cgallery";
import SearchModal from "../../../components/SearchModal";
import { getTimeStamp } from "../../../../compliance/utils";
import { parseStrToArray } from "../../../../util/StrUtil";
import { angentPicUrl } from '../../../../util/baseTool';
import { EXPORT_COMMON_PRODUCT_LISTS } from "../constants/Api";

import {
    fetchPost,
} from '@/util/fetch';
/**
 *作者: zhengxuening
 *功能描述: 普通产品
 *时间: 2019/02/21 09:00
 */
class App extends React.Component {
    state = {
        pageNumber: 1,
        pageSize: 20,
        searchModalVisible: false,
        handleDPModalVisible: false,
        handleDPTwoModalVisible: false,
        item: {},
        imgs: undefined,
        handleDetailModalVisible: false,
        midifyDPModalVisible: false,
        modifyDPTwoModalVisible: false,
        carouselModalVisible: false,
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
        const qualityInspectionTime = values.qualityInspectionTime ? values.qualityInspectionTime.map(t => getTimeStamp(t)) : [];
        const searchContents = parseStrToArray(this.props.form.getFieldValue('searchContents'));
        if (searchContents.length >= 10) {
            message.warning('搜索内容不能超过10个');
            return false;
        }

        this.props.getMainDataList({
            data: {
                ...values,
                qualityInspectionTime,
                searchContents,
                pageNumber,
                pageData: pageSize,
            },
        });
    };

    showHandleDPModal = (state, item) => {
        if (item.handleTypeCode === 'QUALIFIED_EXCEED') {
            this.setState({
                handleDPTwoModalVisible: state,
                item,
            })
        } else {
            this.setState({
                handleDPModalVisible: state,
                item,
            })
        }

    };

    showHandleDetailModal = (state, item) => {
        this.setState({
            handleDetailModalVisible: state,
            item,
        })
    };
    // 查看图片
    carouselModal = (item) => {
        this.setState({
            carouselModalVisible: true,
            item
        })
    }
    // 关闭图片
    carouselModalClose = () =>{
        this.setState({
            carouselModalVisible: false,
        })
    }

    showModifyDPModal = (state, item) => {
        if (item.handleTypeCode === 'QUALIFIED_EXCEED') {
            this.setState({
                modifyDPTwoModalVisible: state,
                item,
            })
        } else {
            this.setState({
                midifyDPModalVisible: state,
                item,
            })
        }

    };


    // 查看图片事件
    showImages = (items) => {
        let arrayImage = [];
        for (let i = 0; i < items.length; i++) {
            arrayImage.push({src: angentPicUrl(items[i])})
        }

        this.setState({
            imgs: arrayImage,
        })
    };

    // 关闭图片事件
    handleClose = () => {
        this.setState({
            imgs: undefined,
        });
    };

    // 数据导出
    handleExport = () => {
        const values = { ...this.props.form.getFieldsValue() };
        const qualityInspectionTime = values.qualityInspectionTime ? values.qualityInspectionTime.map(t => getTimeStamp(t)) : [];
        const searchContents = parseStrToArray(this.props.form.getFieldValue('searchContents'));
        if (searchContents.length >= 10) {
            message.warning('搜索内容不能超过10个');
            return false;
        }

        const  params = {
            data:{
                ...values,
                qualityInspectionTime,
                searchContents,
            }

        };

        fetchPost(EXPORT_COMMON_PRODUCT_LISTS, params, 2)
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
            handleDPModalVisible,
            handleDPTwoModalVisible,
            item,
            imgs,
            handleDetailModalVisible,
            midifyDPModalVisible,
            modifyDPTwoModalVisible,
            carouselModalVisible,
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
                    showHandleDPModal={this.showHandleDPModal}
                    showModifyDPModal={this.showModifyDPModal}
                    showHandleDetailModal={this.showHandleDetailModal}
                    handleExport={this.handleExport}
                    carouselModal={this.carouselModal}
                />

                <CGallery
                    handleClose={this.handleClose}
                    imgs={imgs}
                />

                <HandleDPModal
                    visible={handleDPModalVisible}
                    item={item}
                    showModal={this.showHandleDPModal}
                    loadData={this.loadData}
                />

                <HandleDPTwoModal
                    visible={handleDPTwoModalVisible}
                    item={item}
                    showModal={this.showHandleDPModal}
                    loadData={this.loadData}
                />

                <ModifyDPModal
                    visible={midifyDPModalVisible}
                    item={item}
                    showModal={this.showModifyDPModal}
                    loadData={this.loadData}
                />

                <ModifyDPTwoModal
                    visible={modifyDPTwoModalVisible}
                    item={item}
                    showModal={this.showModifyDPModal}
                    loadData={this.loadData}
                />

                <HandleDetailModal
                    visible={handleDetailModalVisible}
                    item={item}
                    showModal={this.showHandleDetailModal}
                />
                <CarouselModal 
                    carouselModalClose={this.carouselModalClose}
                    visible={carouselModalVisible}
                    item={item}
                    showImages={this.showImages}
                />    
            </div>
        );
    }
}

export default Form.create()(App);
