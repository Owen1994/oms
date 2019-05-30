import React from 'react';
import {
    Form,
    message,
} from 'antd/lib/index';
import '../../css/css.css';
import TableList from './TableList';
import SearchView from './SearchView';
import HasCoverDrawer from './HasCoverDrawer';
import ExportModal from './ExportModal';
import SkuCoverSearchModal from '@/components/SearchModal/SearchModal.js';
import { parseStrToArray } from "../../../../../util/StrUtil";
import { getHasCovereDefaultData } from '../../actions';

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
        hasCoverDrawerVisible: false,
        hasCoverSubData: undefined,
        exportModalVisible: false,
        arraySelectData: [],
    };

    /**
     * 第一次初始化视图,清空数据
     */
    componentDidMount() {
        this.props.getHasCovereDefaultData();
    }


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

        if (values.platform === undefined) {
            message.warning('需要选择平台，否则无法进行搜索');
            return;
        }

        if (values.coverNumOne === undefined && values.coverNumTwo !== undefined) {
            message.warning('第一个覆盖次数不能为空');
            return;
        }
        if (values.coverNumOne !== undefined && values.coverNumTwo === undefined) {
            message.warning('第二个覆盖次数不能为空');
            return;
        }

        let coverNum = undefined;
        if (values.coverNumOne !== undefined && values.coverNumTwo !== undefined) {
            if (values.coverNumOne > values.coverNumTwo) {
                message.warning('第二个覆盖次数必须大于等于第一个覆盖次数');
                return;
            } else {
                coverNum = [values.coverNumOne, values.coverNumTwo];
            }
        }

        const skuCodes = parseStrToArray(values.skuCodes);
        if (skuCodes.length >= 100) {
            message.warning('SKU不能超过100个');
            return false;
        }
        const params = {
            data: {
                pageNumber,
                pageData: pageSize,
                coverNum,
                platform: values.platform,
                siteCodes: values.siteCodes,
                skuCodes,
            }
        };

        this.props.getHasCoveredMainDataList(params);
    };

    /**
     * 显示已覆盖SKU抽屉子界面
     * @param record
     */
    showHasCoverDrawerSub = (record) => {
        this.setState({
            hasCoverDrawerVisible: true,
            hasCoverSubData: record,
        });
    };

    /**
     * 隐藏已覆盖SKU抽屉子界面
     */
    hiddenHasCoverDrawerSub = () => {
        this.setState({
            hasCoverDrawerVisible: false,
            hasCoverSubData: undefined,
        });
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
            hasCoverDrawerVisible,
            hasCoverSubData,
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
                    showHasCoverDrawerSub={this.showHasCoverDrawerSub}
                    showExportModal={this.showExportModal}
                />

                <HasCoverDrawer
                    visible={hasCoverDrawerVisible}
                    subData={hasCoverSubData}
                    hiddenHasCoverDrawerSub={this.hiddenHasCoverDrawerSub}
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
                    searchContent="skuCodes"
                />

            </div>
        );
    }
}

export default Form.create()(App);
