import React from 'react';
import {
    Form,
    message,
} from 'antd';
import SearchComponent from './Search';
import TableComponent from './Tables';
import ImportModal from '../../components/ImportModal';
import DisplayFieldsModal from './DisplayFieldsModal';
import { parseStrToArray } from '../../../../util/StrUtil';
import parseList from '../selectors/DisplayFieldsModal';
import {
    fetchPost,
} from '@/util/fetch';
import {
    EXPORT_SKU,
    GET_SHOW_FILED_LIST,
} from '../../constants/Api';
import Functions from '../../../../components/functions';
import PopConfirm from '../../../../common/components/confirm';


const actionKeys = ['011-000001-000001-002', '011-000001-000001-003', '011-000001-000001-001'];

class App extends React.Component {
    oldTimestamp = 0; // 导出1分钟控制

    minute = 60 * 1000; // 1分钟

    state = {
        pageData: 20,
        pageNumber: 1,
        warehouseType: 1,
        displayFieldsVisible: false,
        filterColumns: [],
        exportLoading: false,
    }

    componentDidMount() {
        this.loadFields().then((result) => {
            this.setState({ fields: result, filterColumns: result.filter(item => item.fieldValue) });
            this.onSearch();
        });
    }

    // 请求
    loadFields = () => {
        let data = {};
        data = { data: { warehouseType: 1 } };
        return fetchPost(GET_SHOW_FILED_LIST, data, 2)
            .then((result) => {
                if (result.state === '000001') {
                    // this.setState({
                    //     listCcheckbox: parseList(result.data),
                    // });
                    return parseList(result.data.filter(x => (x.fieldName !== 'SKU')));
                }
                return Promise.reject();
            });
    }

    onSearch = (pageNumber = 1, pageData = 20) => {
        const formData = { ...this.props.form.getFieldsValue() };
        if (!formData) {
            return;
        }
        if (formData.categoryOneName && formData.categoryOneName.length > 0) {
            formData.categoryOneName = formData.categoryOneName[0].categoryName;
        }
        if (formData.searchContent) {
            formData.searchContent = parseStrToArray(formData.searchContent);
            if (formData.searchContent.length >= 100) {
                message.warning('搜索内容不能超过100个');
                return false;
            }
        }
        if (formData.shelfDates && formData.shelfDates.length > 0) {
            formData.shelfDates = formData.shelfDates.map(time => new Date(time).getTime());
        } else {
            delete formData.shelfDates;
        }
        // 库存搜索
        if (formData.comparisonQuantity) {
            formData.comparisonQuantity = formData.comparisonQuantity;
            formData.quantitys = [formData.quantitysone];
            delete formData.quantitysone;
        } else {
            delete formData.quantitysone;
        }
        if (formData.comparisonQuantity === 4) {
            formData.comparisonQuantity = formData.comparisonQuantity;
            if ((formData.quantitysMin || formData.quantitysMin === 0) && (formData.quantitysMax || formData.quantitysMax === 0)) {
                formData.quantitys = [formData.quantitysMin, formData.quantitysMax];
                delete formData.quantitysMin;
                delete formData.quantitysMax;
            } else {
                message.warning('库存搜索介于不能为空');
                return false;
            }
        }
        const warehouseType = this.state.warehouseType;
        const params = {
            data: {
                ...formData,
                warehouseType,
                mainWarehouse: formData.mainWarehouse ? formData.mainWarehouse[0].toString() : '',
                todayState: formData.todayState ? formData.todayState[0].toString() : '',
                pageData,
                pageNumber,
            },
        };
        this.props.getSkuList(params);
        this.setState({
            pageData,
            pageNumber,
        });
    }

    handleExport = () => {
        const downloadsNumber = this.props.data.total; // 下载条数
        const formData = { ...this.props.form.getFieldsValue() };
        if (!formData) {
            return;
        }
        if (formData.categoryOneName && formData.categoryOneName.length > 0) {
            formData.categoryOneName = formData.categoryOneName[0].categoryName;
        }
        if (formData.searchContent) {
            formData.searchContent = parseStrToArray(formData.searchContent);
            if (formData.searchContent.length >= 100) {
                message.warning('搜索内容不能超过100个');
                return false;
            }
        }
        if (formData.shelfDates && formData.shelfDates.length > 0) {
            formData.shelfDates = formData.shelfDates.map(time => new Date(time).getTime());
        } else {
            delete formData.shelfDates;
        }

        // 库存搜索
        if (formData.comparisonQuantity) {
            formData.comparisonQuantity = formData.comparisonQuantity;
            formData.quantitys = [formData.quantitysone];
            delete formData.quantitysone;
        } else {
            delete formData.quantitysone;
        }
        if (formData.comparisonQuantity === 4) {
            formData.comparisonQuantity = formData.comparisonQuantity;
            if ((formData.quantitysMin || formData.quantitysMin === 0) && (formData.quantitysMax || formData.quantitysMax === 0)) {
                formData.quantitys = [formData.quantitysMin, formData.quantitysMax];
                delete formData.quantitysMin;
                delete formData.quantitysMax;
            } else {
                message.warning('库存搜索介于不能为空');
                return false;
            }
        }

        const warehouseType = this.state.warehouseType;
        const params = {
            data: {
                ...formData,
                warehouseType,
                mainWarehouse: formData.mainWarehouse ? formData.mainWarehouse[0].toString() : '',
                todayState: formData.todayState ? formData.todayState[0].toString() : '',
            },
        };
        if (Date.now() - this.oldTimestamp < this.minute) {
            this.onConfirm(params);
        } else if (downloadsNumber > 300000) {
            PopConfirm('是否确认跳转异步队列并生成任务？', '', () => this.onConfirm(params));
        } else {
            this.onConfirm(params);
        }
    }

    // 确认弹窗
    onConfirm = (params) => {
        this.setState({ exportLoading: true });
        fetchPost(EXPORT_SKU, params).then((result) => {
            this.setState({ exportLoading: false });
            if (result.state === '000001') {
                this.oldTimestamp = Date.now();
                window.location.href = '/basicdata/syncqueue/syncqueue/';
            } else if (result.state === '000000') {
                message.warning(result.msg);
            }
        });
    }

    handleImport = () => {
        this.setState({ visible: false });
    }

    handleFieldsOk = (filterColumns = []) => {
        this.setState({
            filterColumns,
        });
    }

    render() {
        const {
            pageData,
            pageNumber,
            visible,
            displayFieldsVisible,
            warehouseType,
            filterColumns,
            fields,
            exportLoading,
        } = this.state;
        return (
            <Functions {...this.props} isPage functionkey="011-000001-000001-001">
                <div className="newCluenk">
                    <SearchComponent
                        {...this.props}
                        warehouseType={warehouseType}
                        onSearch={() => this.onSearch()}
                    />
                    <TableComponent
                        actionKeys={actionKeys}
                        onExportSku={this.handleExport}
                        onImportSku={this.handleImport}
                        {...this.props}
                        exportLoading={exportLoading}
                        onSearch={this.onSearch}
                        filterColumns={filterColumns}
                        pageData={pageData}
                        pageNumber={pageNumber}
                        showImportModal={() => { this.setState({ visible: true }); }}
                        displayFieldsModal={() => { this.setState({ displayFieldsVisible: true }); }}
                    />
                    <ImportModal
                        visible={visible}
                        warehouseType={warehouseType}
                        onCancel={() => { this.setState({ visible: false }); }}
                        onSubmit={this.handleImport}
                    />
                    <DisplayFieldsModal
                        visible={displayFieldsVisible}
                        warehouseType={warehouseType}
                        handleFieldsOk={this.handleFieldsOk}
                        fields={fields}
                        onSearch={() => this.onSearch()}
                        onCancel={() => { this.setState({ displayFieldsVisible: false }); }}
                    />
                </div>
            </Functions>
        );
    }
}

export default Form.create()(App);
