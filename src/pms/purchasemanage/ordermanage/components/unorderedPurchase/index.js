import React from 'react';
import {
    Form,
    message,
} from 'antd';
import Search from './Searchs';
import SearchModal from '../../../../components/SearchModal';
import TableList from './TableLists';
import { getTimeStamp } from '../../../../../util/moment';
import { parseStrToArray } from '@/util/StrUtil';
import { fetchPost } from '../../../../../util/fetch';
import ImportCom from './ImportCom';
import  { UPLOAD_URL, CHANGE_SUPPLIER,EXPORT_UNORDERED  } from '../../constants';
import { fetchUpload } from '../../../../../util/fetch';
/**
 *作者: huangjianfeng
 *功能描述: 跟单管理
 *时间: 2018/10/11 15:55
 */
class App extends React.Component {
    state = {
        visible: false,
        pageNumber: 1,
        pageSize: 20,
        importFileVisible: false,
    }
    componentDidMount () {
        this.handleSearch();
    }

     // 请求列表
     handleSearch = (pageNumber = 1, pageSize = 20) => {
        const data = { ...this.props.form.getFieldsValue() };
        data.oeEmployee = Array.isArray(data.oeEmployee) ? data.oeEmployee[0].key : data.oeEmployee

        if (data.purchaseDevelop) {
            data.purchaseDevelop = data.purchaseDevelop[0].key
        }

        if (data.searchContents) {
            data.searchContents = parseStrToArray(data.searchContents);
            if (data.searchContents.length >= 10) {
                message.warning('搜索内容不能超过10个');
                return false;
            }
            data.searchType = data.searchType;
        } else {
            delete data.searchType;
            delete data.searchContents;
        }

        if (data.demandTimes) {
            data.demandTimes = data.demandTimes.map(item => (
                getTimeStamp(item)
            ));
        }
        
        
        data.pageNumber = pageNumber;
        data.pageData = pageSize;
        this.setState({
            pageNumber,
            pageSize,
        });
        delete data.logisticsType;
        delete data.isPackageMaterial;
        this.props.getOrderManagementListAsync(data);
    }

    // 重置
    onReset = () => {
        this.props.form.resetFields();
    };

     // 导出事件
     showExport = () => {
        const data = { ...this.props.form.getFieldsValue() };

        data.oeEmployee = Array.isArray(data.oeEmployee) ? data.oeEmployee[0].key : data.oeEmployee;

        if (data.purchaseDevelop) {
            data.purchaseDevelop = data.purchaseDevelop[0].key
        }

        if (data.searchContents) {
            data.searchContents = parseStrToArray(data.searchContents);
            if (data.searchContents.length >= 10) {
                message.warning('搜索内容不能超过10个');
                return false;
            }
            data.searchType = data.searchType;
        } else {
            delete data.searchType;
            delete data.searchContents;
        }

        if (data.demandTimes) {
            data.demandTimes = (data.demandTimes).map(item => (
                item.valueOf()
            ));
        }
        const params = {
            data: {
                ...data,
            },
        };
        fetchPost(EXPORT_UNORDERED, params, 1).then((result) => {
            if (result.state === '000001') {
                message.success("导出成功！")
                setTimeout(()=> {
                    window.location.href = "/pms/importexportmanage/importexportlist/";
                }, 1000)
            }
        });
    }
    
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

                fetchPost(CHANGE_SUPPLIER, parameter, 1).then((result1) => {
                    if (result1.state === '000001') {
                        this.setState({
                            importVisible: false,
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
            pageSize,
            pageNumber,
            visible,
            importFileVisible
        } = this.state;
        return (
            <div className="unordered-purchase bgcfff">
                <Search
                   {...this.props}
                   toggleModal={() => this.setState({
                        visible: true,
                    })}
                    onReset={this.onReset}
                    onSearch={this.handleSearch}
                />
                <SearchModal
                    visible={visible}
                    onCancel={() => this.setState({
                        visible: false,
                    })}
                    onSearch={this.handleSearch}
                    {...this.props}
                />
                <TableList
                    {...this.props}
                    onSearch={this.handleSearch}
                    pageSize={pageSize}
                    pageNumber={pageNumber}
                    showExport={this.showExport}
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
            </div>
        );
    }
}

export default Form.create()(App);
