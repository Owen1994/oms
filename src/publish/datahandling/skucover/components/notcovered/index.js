import React from 'react';
import {
    Form,
    message,
} from 'antd/lib/index';
import '../../css/css.css';
import TableList from './TableList';
import SearchView from './SearchView';
import ExportModal from './ExportModal';
import SkuCoverSearchModal from '@/components/SearchModal/SearchModal.js';

import { parseStrToArray } from '../../../../../util/StrUtil';
import { getNotCoveredDefaultData } from '../../actions';


/**
 *作者: zhengxuening
 *功能描述: SKU覆盖列表
 *时间: 2019/02/21 09:00
 */
class App extends React.Component {
    state = {
        pageNumber: 1,
        pageSize: 20,
        visible: false,
        exportModalVisible: false,
        arraySelectData: [],
    };

    /**
     * 第一次初始化视图,清空数据
     */
    componentDidMount() {
        this.props.getNotCoveredDefaultData();
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

        if (values.platformNot === undefined) {
            message.warning('需要选择平台，否则无法进行搜索');
            return;
        }

        const skuCodes = parseStrToArray(values.skuCodesNot);
        if (skuCodes.length >= 100) {
            message.warning('SKU不能超过100个');
            return false;
        }
        const params = {
            data: {
                pageNumber,
                pageData: pageSize,
                platform: values.platformNot,
                siteCodes: values.siteCodesNot,
                skuCodes,
                todayStates: values.todayStates,
            }
        };
        this.props.getNotCoveredMainDataList(params);
    };

    /**
     * 显示导出弹窗
     * @param record
     */
    showExportModal = (record) => {
        this.setState({
            exportModalVisible: true,
            arraySelectData: record,
        });
    };

    /**
     * 隐藏导出弹窗
     */
    hiddenExportModal = () => {
        this.setState({
            exportModalVisible: false,
            arraySelectData: [],
        });
    };


    render() {
        const {
            pageNumber,
            pageSize,
            visible,
            exportModalVisible,
            arraySelectData,
        } = this.state;
        return (
            <div>
                <SearchView
                    {...this.props}
                    onSearch={this.loadData}
                    resetFields={this.resetFields}
                    showModal={() => this.setState({
                        visible: true,
                    })}
                />

                <TableList
                    {...this.props}
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    loadData={this.loadData}
                    showExportModal={this.showExportModal}
                />

                <ExportModal
                    {...this.props}
                    visible={exportModalVisible}
                    hiddenExportModal={this.hiddenExportModal}
                    arraySelectData={arraySelectData}
                />

                <SkuCoverSearchModal
                    {...this.props}
                    visible={visible}
                    onCancel={() => this.setState({
                        visible: false,
                    })}
                    onSearch={this.loadData}
                    searchContent="skuCodesNot"
                />

            </div>
        );
    }
}

export default Form.create()(App);
