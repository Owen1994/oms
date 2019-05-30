import React from 'react';
import {
    Form,
    message,
} from 'antd';
import Search from './Searchs';
import TableList from './Tables';
import SearchModal from '../../../../components/SearchModal';
import { parseStrToArray } from '@/util/StrUtil';
import { EXPORT_ABNORMAL_ORDER } from '../../constants';
import { fetchPost } from '../../../../../util/fetch';
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
    }
    componentDidMount () {
        this.handleSearch();
    }

     // 请求列表
     handleSearch = (pageNumber = 1, pageSize = 20) => {
        const data = { ...this.props.form.getFieldsValue() };
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

        data.pageNumber = pageNumber;
        data.pageData = pageSize;
        this.setState({
            pageNumber,
            pageSize,
        });
        delete data.oeEmployee;
        this.props.getorderManagementAbnormalOrderAsync(data);
    }


    // getList = (page, pageSize) => {
    //     const { getOrderManagementListAsync, orderManagementList } = this.props;
    //     const params = orderManagementList.params;
    //     if (page) {
    //         params.pageNumber = page;
    //         params.pageData = pageSize;
    //     }
    //     if (!params.oeEmployee) {
    //         params.oeEmployee = getLoginmsg().userName;
    //     }
    //     getOrderManagementListAsync(params);
    // }
    // 重置
    onReset = () => {
        this.props.form.resetFields();
    };

    // 导出事件
    showExport = () => {
        const data = { ...this.props.form.getFieldsValue() };
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
        delete data.oeEmployee;
        const params = {
            data: {
                ...data,
            },
        };
        fetchPost(EXPORT_ABNORMAL_ORDER, params, 1).then((result) => {
            if (result.state === '000001') {
                message.success("导出成功！")
                setTimeout(() => {
                    window.location.href = "/pms/importexportmanage/importexportlist/";
                }, 1000)
            }
        });
    }




    render() {
        const { 
            visible,
            pageNumber,
            pageSize,
        } = this.state;
        return (
            <div className="abnormal_order bgcfff">
                <Search 
                   {...this.props} 
                   toggleModal={() => this.setState({
                        visible: true,
                    })}
                    onSearch={this.handleSearch}
                    onReset={this.onReset}
                />
                <SearchModal 
                    visible={visible}
                    onCancel={() => this.setState({
                        visible: false,
                    })}
                    onSearch={this.handleSearch}
                    {...this.props} 
                />
                <TableList {...this.props} 
                    onSearch={this.handleSearch}
                    pageNumber={pageNumber}
                    pageSize={pageSize} 
                    showExport={this.showExport}   
                />
            </div>
        );
    }
}

export default Form.create()(App);
