import React from 'react';
import {
    Form,
    message,
} from 'antd';
import SearchView from './SearchView';
import '../css/css.css';
import TableList from './TableList';
import RacquetModal from './RacquetModal';
import SearchModal from '../../../components/SearchModal';
import { getTimeStamp } from '../../../../compliance/utils';
import { parseStrToArray } from '../../../../util/StrUtil';
import OrderModifyModal from './OrderModifyModal';
import SyncSupplierModal from './SyncSupplierModal';
import ImportCom from './ImportCom';
import {UPLOAD_URL, IMPORT_MERCHANDISERS} from '../constants/Api';
import { fetchPost } from "../../../../util/fetch";
import { fetchUpload } from '../../../../util/fetch';
/**
 *作者: huangjianfeng
 *功能描述: 采购单查询
 *时间: 2018/10/11 15:55
 */
class App extends React.Component {
    state = {
        pageNumber: 1,
        pageSize: 20,
        listOrderNumber: [],
        modifyModalVisible: false,
        syncSupplierModalVisible: false,
        racquetModalVisible: false,
        racquetData: undefined,
        searchModalVisible: false,
        importFileVisible: false,
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
        const printTimes = values.printTimes ? values.printTimes.map(t => getTimeStamp(t)) : [];
        const creationTime = values.creationTime ? values.creationTime.map(t => getTimeStamp(t)) : [];
        const purchaseState = values.purchaseState === '全部' ? 0 : values.purchaseState;
        const searchContents = parseStrToArray(values.searchContents);
        const payType = values.payType === "全部" ? 0 : values.payType;
        if (searchContents.length >= 10) {
            message.warning('搜索内容不能超过10个');
            return false;
        }
        this.props.getOrderQueryList({
            data: {
                ...this.props.form.getFieldsValue(),
                purchaseState,
                pageNumber,
                printTimes,
                creationTime,
                pageData: pageSize,
                searchContents,
                payType,
            },
        });
    };

    /**
     * 显示或关闭批量修改跟单员弹框
     */
    showOrCloseModifyModal = (modalState, listOrderNumber) => {
        this.setState({
            modifyModalVisible: modalState,
            listOrderNumber,
        });
    };

    /**
     * 显示或关闭批量同步供应商账号
     */
    showOrCloseSyncSupplierModal = (modalState, listOrderNumber) => {
        this.setState({
            syncSupplierModalVisible: modalState,
            listOrderNumber,
        });
    };

    /**
     * 显示或关闭网拍弹框
     */
    showOrCloseRacquetModal = (modalState, racquetData) => {
        this.setState({
            racquetModalVisible: modalState,
            racquetData,
        });
    };

    resetFields = () => {
        this.props.form.resetFields();
    };

    
   
    // 导入更换供应商
    httpImportResults = (fileList) => {
        if (!fileList) {
            message.warning('请添加文件后再继续操作!');
            return;
        }
        fetchUpload(UPLOAD_URL, fileList).then(result => {
            if (result.state === '000001' && result.data && result.data.length) {
                const data = result.data[0];
                const parameter = {
                    data: {
                        name: data.filename,
                        url: data.path
                    }
                };

                fetchPost(IMPORT_MERCHANDISERS, parameter, 1).then((result1) => {
                    if (result1.state === '000001') {
                        this.setState({
                            importFileVisible: false,
                        });
                        window.open('/pms/importexportmanage/importexportlist/', '_blank');
                    }
                });
            } else {
                message.error(result.msg);
            }
        }).catch(error => console.log(error))
    }


    render() {
        const {
            pageNumber,
            pageSize,
            modifyModalVisible,
            syncSupplierModalVisible,
            listOrderNumber,
            racquetModalVisible,
            racquetData,
            searchModalVisible,
            importFileVisible
        } = this.state;
        return (
            <div className="pms-order-query yks-erp-search_order">
                <SearchView
                    {...this.props}
                    onSearch={this.loadData}
                    resetFields={this.resetFields}
                    showModal={() => this.setState({
                        searchModalVisible: true,
                    })}
                />

                <TableList
                    {...this.props}
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    loadData={this.loadData}
                    showOrCloseModifyModal={this.showOrCloseModifyModal}
                    showOrCloseRacquetModal={this.showOrCloseRacquetModal}
                    showOrCloseSyncSupplierModal={this.showOrCloseSyncSupplierModal}
                    showImport={() => {
                        this.setState({
                            importFileVisible: true,
                        });
                    }}
                />
                 <ImportCom
                    visible={importFileVisible}
                    onCancel={() => this.setState({
                        importFileVisible: false,
                    })}
                    onOK={this.httpImportResults}
                    {...this.props}
                />
                <OrderModifyModal
                    visible={modifyModalVisible}
                    listOrderNumber={listOrderNumber}
                    loadData={this.loadData}
                    showOrCloseModifyModal={this.showOrCloseModifyModal}
                />

                <RacquetModal
                    visible={racquetModalVisible}
                    racquetData={racquetData}
                    loadData={this.loadData}
                    showOrCloseRacquetModal={this.showOrCloseRacquetModal}
                />

                <SyncSupplierModal
                    visible={syncSupplierModalVisible}
                    listOrderNumber={listOrderNumber}
                    loadData={this.loadData}
                    showOrCloseSyncSupplierModal={this.showOrCloseSyncSupplierModal}
                />

                <SearchModal
                    {...this.props}
                    visible={searchModalVisible}
                    onCancel={() => this.setState({
                        searchModalVisible: false,
                    })}
                    onSearch={this.loadData}
                />
            </div>
        );
    }
}

export default Form.create()(App);
