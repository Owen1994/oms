import React from 'react';
import '../css/style.css';
import Search from './Search.js';
import TableList from './TableList';
import { Form, Spin, message } from 'antd';
import AddHPApplyModal from './AddHPApplyModal';
import ExportModal from '../../../../common/components/export/export';
import { filterParams, replaceAllSpace,strTrim } from '../../../../util/baseTool';
import LogModal from '../../../common/components/ReviewLogModal';
import ReviewModal from '../../../common/components/ReviewModal';
import PersonSelectModal from '../../../common/components/PersonSelectModal';
import { USER_LIST_API } from '../../../constants/Api'
import { UPLOAD_URL } from '../../../../constants/Api'

import { ASSIGN_TASK_API } from '../constants/Api'
import { post } from '../../../../util/axios'
import { parseNetErrorToMsg, downloadUrl } from '../../../../util/baseTool'

class App extends React.Component {

    state = {
        searchFilters: {
            state: 0,
            pageData: 20,
            pageNumber: 1
        },
        addModalVisible: false,
        exportVisible: false,
        logModalVisible: false,
        reviewModalVisible: false,
        selectPersonModalVisible: false,
        item: null,
        ids:[]
    }

    handleSearchList = (pageNumber, pageSize) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let  params = filterParams(values);
                const searchFilters = this.state.searchFilters
                if(pageNumber) {
                    params.pageNumber = pageNumber;
                }else {
                    params.pageNumber = searchFilters.pageNumber
                }
                if(pageSize) {
                    params.pageData = pageSize;
                }else {
                    params.pageData = searchFilters.pageData;

                }
                if(params.searchContent){
                    params.searchContent = strTrim(params.searchContent)
                }
                const filters = { ...this.state.searchFilters, ...params}
                this.setState({
                    searchFilters: {
                        pageNumber:filters.pageNumber,
                        pageData:filters.pageData
                    }
                })
                this.props.getHotNpdApplyList(filters);
            }
        });
    }

    componentDidMount(){
        this.handleSearchList();
        this.props.form.setFieldsValue({
            state: 0
        })
    }

    resetFields = () => {
        this.props.form.setFieldsValue({
            searchType:"1",
            searchContent:""
        });
    }
    onUploadChange = () => {
        message.success('数据导入成功')
        this.handleSearchList()
    }
    // 导入源数据配置
    exportConfig = {
        downloadUrl: downloadUrl('/download/npd/hot_apply.xlsx'),   // 模板下载地址
        uploadUrl: UPLOAD_URL,  // 文件导入网关接口
        uploadCheckUrl: '/pim/motan/service/api/IPimService/importNpsHotProductApply',  // 文件校验接口
        confirmUrl: '', // 文件数据入库接口
        params: {
            uploadType: 2,  // 导入接口类型 1 为源数据导入， 2 为 FBA海外仓数据
            stepInfo: ["数据准备", "数据验证", "导入结果"],
        },         // 下载模板的请求参数
    }
    
    render(){
        const data = this.props.datas;
        const { pageData, pageNumber } = this.state.searchFilters;
        const {
            addModalVisible,
            exportVisible,
            logModalVisible,
            addTitle,
            item,
            reviewModalVisible,
            selectPersonModalVisible,
        } = this.state;
        const loading = this.props.loadState.loading
        return (
            <div className="npd-pd-hna_container">
                <Search
                    {...this.props}
                    searchFilters={this.state.searchFilters}
                    handleSubmit={this.handleSearchList}
                    resetFields={this.resetFields}
                />
                <Spin spinning={loading} delay={500} tip="Loading...">
                    <TableList
                        {...this.props}
                        data={data}
                        pageData={pageData}
                        pageNumber={pageNumber}
                        handleSubmit={this.handleSearchList}
                        showModal={(type, item, title, ids) => this.setState({
                            [type]: true,
                            item,
                            addTitle: title,
                            ids
                        })}
                    />
                </Spin>
                <AddHPApplyModal
                    key='AddHPApplyModal'
                    item={item}
                    title={addTitle}
                    handleSubmit={this.handleSearchList}
                    visible={addModalVisible}
                    handleCancel={() => this.setState({addModalVisible: false})}
                />
                <ExportModal
                    className="npd-export"
                    title="导入热销申请"
                    visible={exportVisible}
                    onCancel={() => this.setState({exportVisible: false})}
                    uploadConfig={this.exportConfig}
                    onUploadChange={this.onUploadChange}
                />
                <LogModal
                    className="npd-review-log"
                    visible={logModalVisible}
                    id={item&&item.id}
                    formId='NpsHotProductApply'
                    handleCancel={() => this.setState({logModalVisible: false})}
                />
                <ReviewModal
                    visible={reviewModalVisible}
                    id={item&&item.id}
                    formId='NpsHotProductApply'
                    handleOk={this.handleSearchList}
                    handleCancel={() => this.setState({reviewModalVisible: false})}
                />
                <PersonSelectModal
                    url={USER_LIST_API}
                    title="分派开发专员"
                    labelDesc="开发专员:"
                    visible={selectPersonModalVisible}
                    handleConfirm={(type, userName) => {
                        if(type===1) {
                            const item = this.state.item;
                            // 执行分配专员
                            const params = {
                                developer: userName,
                                list: item?[item.id]:this.state.ids
                            }
                            post(ASSIGN_TASK_API, params).then(data => {
                                parseNetErrorToMsg(data);
                                if(data.state==='000001') {
                                    this.handleSearchList();
                                }
                            })
                        }
                        this.setState({selectPersonModalVisible: false})
                    }}
                />
            </div>
        )
    }
}

export default Form.create()(App)