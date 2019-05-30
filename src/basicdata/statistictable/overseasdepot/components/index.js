import React from 'react';
import {
    Form,
    message,
} from 'antd';
import SearchComponent from '../../components/Search';
import TableComponent from '../../components/Tables';
import ImportModal from '../../components/ImportModal';
import { parseStrToArray } from '../../../../util/StrUtil';
import Functions from '../../../../components/functions';
import {
    EXPORT_SKU,
} from '../../constants/Api';
import {
    fetchPost,
} from '@/util/fetch';
import PopConfirm from '../../../../common/components/confirm';

const actionKeys = ['011-000001-000002-002', '011-000001-000002-003'];

class App extends React.Component {
    oldTimestamp = 0; // 导出1分钟控制

    minute = 60 * 1000; // 1分钟

    state = {
        pageData: 20,
        pageNumber: 1,
        warehouseType: 2,
        exportLoading: false,
    }

    componentDidMount() {
        this.onSearch();
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
            PopConfirm('是否确认跳转异步队列并生产任务？', '', () => this.onConfirm(params));
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

    render() {
        const {
            pageData,
            pageNumber,
            visible,
            warehouseType,
            exportLoading,
        } = this.state;
        return (
            <Functions {...this.props} isPage functionkey="011-000001-000002-001">
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
                        onSearch={this.onSearch}
                        pageData={pageData}
                        exportLoading={exportLoading}
                        pageNumber={pageNumber}
                        showImportModal={() => { this.setState({ visible: true }); }}
                    />
                    <ImportModal
                        visible={visible}
                        warehouseType={warehouseType}
                        onCancel={() => { this.setState({ visible: false }); }}
                        onSubmit={this.handleImport}
                    />
                </div>
            </Functions>
        );
    }
}

export default Form.create()(App);
