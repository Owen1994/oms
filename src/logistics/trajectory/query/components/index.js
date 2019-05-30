import React from 'react';
import { Form } from 'antd';
import { parseStrToArray } from '../../../../util/StrUtil';
import { fetchPost, downlodFile } from '../../../../util/fetch';
import SearchComponent from './Search';
import TablesComponent from './Tables';
import DetailModal from './DetailModal';
import { TRAJECTORY_EXPORT } from '../constants/Api';
import SearchModal from '@/components/SearchModal/SearchModal.js';

/**
 *作者: 黄建峰
 *功能描述: 轨迹查询
 *时间: 2018/12/10 10:45
 */
class App extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
        exportLoading: false,
        searchModalVisible: false,
    };

    componentDidMount() {
        this.handleSearch();
    }

    getSearchParams = () => {
        const formData = { ...this.props.form.getFieldsValue() };
        formData.packageState = formData.packageState[0];
        formData.packageType = formData.packageType[0];
        formData.trajectoryState = formData.trajectoryState[0];
        if (formData.searchContents) {
            formData.searchContents = parseStrToArray(formData.searchContents);
        }
        if (formData.payTimes) {
            formData.payTimes = formData.payTimes.map(time => time.valueOf());
        }
        if (formData.sendTimes) {
            formData.sendTimes = formData.sendTimes.map(time => time.valueOf());
        }
        return formData;
    };

    handleExportSku = () => {
        this.setState({exportLoading: true});
        const data = this.getSearchParams();
        fetchPost(TRAJECTORY_EXPORT, {data}, 2).then((result) => {
            this.setState({exportLoading: false});
            if (result.state === '000001') {
                downlodFile(result.url);
            }
        });
    };

    handleSearch = (pageNumber=1, pageData=20) => {
        this.setState({
            pageNumber,
            pageData,
        });
        const formData = this.getSearchParams();
        this.props.loadDataList({ data: { ...formData, pageNumber, pageData } });
    };

    render(){
        const {
            pageData,
            pageNumber,
            visible,
            item,
            exportLoading,
            searchModalVisible,
        } = this.state;

        return (
            <div>
                <SearchComponent
                    {...this.props}
                    onSearch={this.handleSearch}
                    toggleModal={() => {
                        this.setState({ searchModalVisible: true });
                    }}
                />
                <SearchModal
                    {...this.props}
                    visible={searchModalVisible}
                    onCancel={() => {
                        this.setState({ searchModalVisible: false });
                    }}
                    onSearch={this.handleSearch}
                    searchContent="searchContents"
                />
                <TablesComponent
                    {...this.props}
                    onSearch={this.handleSearch}
                    pageNumber={pageNumber}
                    pageData={pageData}
                    exportLoading={exportLoading}
                    onExportSku={this.handleExportSku}
                    showModal={(item) => {
                        this.setState({
                            visible: true,
                            item,
                        })
                    }}
                />
                <DetailModal
                    visible={visible}
                    item={item}
                    onCancel={() => {
                        this.setState({
                            visible: false,
                            item: undefined,
                        })
                    }}
                />
            </div>
        )
    }
}
export default Form.create()(App);
