import React from 'react';
import {
    Form,
} from 'antd';
import '../css/index.css';
import { parseSearchParams, parseCacheTimeData } from '../selectors';
import { setPageCache, getPageCache } from 'util/PageCache';
import Search from './NewSearch';
import Tabcomponent from './Tabs';
import Tablelist from './Tablelist';
import GrabModal from './GrapModal';
import MarkModal from './MarkModal';
import OrderCommonSearchModal from '@/components/SearchModal/SearchModal.js';

class App extends React.Component {
    state = {
        visible: false,
        pageNumber: 1,
        pageData: 20,
        activeKey: -1,
        grabModalVisible: false,
        markModalVisible: false,
        detailModalVisible: false,
        platformOrderNumber: undefined,
    }

    componentDidMount() {
        getPageCache().then((params) => {
            let pageNumber = 1, pageData = 20;
            if (params && params.formData) {
                let res = parseCacheTimeData(params.formData);
                this.props.form.setFieldsValue(res);    // 搜索条件恢复
                this.setState({ activeKey: res.tabState }); // tab页签恢复
                pageNumber = res.pageNumber;
                pageData = res.pageData;
            }
            this.handleSubmit(pageNumber, pageData);
            this.props.queryMymallTabState();
        })
    }

    //请求mymall订单列表数据
    handleSubmit = (page = 1, pageSize = 20) => {
        const filter = this.filterSearchParams(page, pageSize);
        this.props.queryTableList({data: filter});
    }

    filterSearchParams = (page = 1, pageSize = 20) => {
        let filter = this.props.form.getFieldsValue();
        filter.pageNumber = page;
        filter.pageData = pageSize;
        filter.tabState = parseInt(this.state.activeKey);
        parseSearchParams(filter);
        setPageCache({ formData: filter });
        this.setState({
            pageNumber: page,
            pageData: pageSize,
        });
        return filter;
    };

    //打开弹窗
    openModal = (type, platformOrderNumber) => {
        if(type === '1'){
            this.setState({
                grabModalVisible: true,
                markModalVisible: false,
                platformOrderNumber: undefined,
            });
        }else if(type === '2'){
            this.setState({
                grabModalVisible: false,
                markModalVisible: true,
                platformOrderNumber
            });
        }
    };

    //关闭弹窗
    closeModal = () => {
        this.setState({
            grabModalVisible: false,
            markModalVisible: false,
            platformOrderNumber: undefined
        });
    };

    // 重置
    onReset = () => {
        this.props.form.resetFields();
    }

    //标签页改变，存储activeKey
    handleTabsChange = (activeKey) => {
        this.setState({activeKey}, ()=>{
            // this.props.form.resetFields();
            this.handleSubmit();
        });

    }

    render() {
        const {
            visible,
            pageData,
            pageNumber,
            grabModalVisible,
            markModalVisible,
            platformOrderNumber,
            activeKey,
        } = this.state;
        return (
            <div className="newClue">
                <Search
                    {...this.props}
                    onSearch={this.handleSubmit}
                    onReset={this.onReset}
                    toggleModal={() => this.setState({
                        visible: true,
                    })}
                />
                <div className="breadcrumb margin-top">
                    <Tabcomponent
                        {...this.props}
                        handleTabsChange={this.handleTabsChange}
                        activeKey={activeKey}
                        />
                    <Tablelist
                        {...this.props}
                        pageData={pageData}
                        pageNumber={pageNumber}
                        onSearch={this.handleSubmit}
                        openModal={this.openModal}
                        filterSearchParams={this.filterSearchParams}
                    />
                </div>
                <OrderCommonSearchModal
                    {...this.props}
                    visible={visible}
                    onCancel={() => this.setState({
                        visible: false,
                    })}
                    onSearch={this.handleSubmit}
                    searchContent="searchContent"
                    // count={1000}
                />
                <GrabModal
                    visible={grabModalVisible}
                    closeModal={this.closeModal}
                    handleSubmit={this.handleSubmit}
                />
                <MarkModal
                    visible={markModalVisible}
                    closeModal={this.closeModal}
                    handleSubmit={this.handleSubmit}
                    platformOrderNumber={platformOrderNumber}
                    pageData={pageData}
                    pageNumber={pageNumber}
                />
            </div>
        );
    }
}

export default Form.create()(App);
