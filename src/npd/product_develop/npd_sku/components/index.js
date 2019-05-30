import React from 'react';
import Search from './Search';
import TableList from './TableList';
import { Form, message } from 'antd';
import ReviewModal from '../../../common/components/ReviewModal';
import ReviewLogModal from '../../../common/components/ReviewLogModal';
import Export from '../../../../common/components/export/export';
import { filterParams, replaceAllSpace, downloadUrl } from '../../../../util/baseTool';
import { UPLOAD_URL } from '../../../../constants/Api';

class App extends React.Component {

    state = {
        pageData: 20,
        pageNumber: 1,
        reviewModalVisible: false,
        reviewLogModalVisible: false,
        exportVisible: false,
        item: {}
    }
    handleSubmit = (pageNumber, pageData) => {
        this.props.form.validateFields((err, fieldsValue) => {
            if(err){
                return ;
            }
            let fdValue = filterParams(fieldsValue);
            if(fdValue.isNtsRecord===-1){
                delete fdValue.isNtsRecord
            }
            let filtersData = {  ...fdValue};
            if(pageNumber) {
                filtersData.pageNumber = pageNumber
                this.setState({
                    pageNumber
                })
            }else {
                filtersData.pageNumber = this.state.pageNumber;
            }
            if(pageData) {
                filtersData.pageData = pageData
                this.setState({
                    pageData
                })
            }else {
                filtersData.pageData = this.state.pageData
            }
            if(filtersData.searchContent){
                filtersData.searchContent = replaceAllSpace(filtersData.searchContent)
            }
            this.props.getSkuList(filtersData);
        })
    }
    showModel = (item, name) => {
        this.setState({
            item,
            [name]: true,
        })
    }
    componentDidMount() {
        this.props.form.setFieldsValue({
            state: 0
        })
        this.handleSubmit();
    }
    // 导入源数据配置
    exportConfig = {
        downloadUrl: downloadUrl('/download/npd/SKU_import.xlsx'),   // 模板下载地址
        uploadUrl: UPLOAD_URL,  // 文件导入网关接口
        uploadCheckUrl: '/pim/motan/service/api/IPimService/importSku',  // 文件校验接口
        confirmUrl: "", // 文件数据入库接口
        params: {
            uploadType: 2,  // 导入接口类型 1 为源数据导入， 2 为 FBA海外仓数据
            stepInfo: ["数据准备", "数据验证", "导入结果"],
        },         // 下载模板的请求参数
    }
    onUploadChange = (params) => {
        // console.log(params)
        this.handleSubmit();
        message.success('数据导入成功')
    }
    
    render(){
        const { 
            pageData, 
            pageNumber,
            item, 
            reviewModalVisible,
            reviewLogModalVisible,
            exportVisible
        } = this.state;
        const data = this.props.data;
        return (
            <div>
                <Search
                    {...this.props}
                    handleSubmit={this.handleSubmit}
                />
                <TableList
                    {...this.props}
                    data={data}
                    pageData={pageData}
                    pageNumber={pageNumber}
                    showModel={this.showModel}
                    handleSubmit={this.handleSubmit}
                />
                <ReviewModal
                    showComment={false}
                    visible={reviewModalVisible}
                    id={item&&item.id}
                    formId='skuAuditWorkflow'
                    handleSubmit={this.handleSubmit}
                    handleOk={() =>  this.setState({reviewModalVisible: false})}
                    handleCancel={() => this.setState({reviewModalVisible: false})}
                />
                <ReviewLogModal
                    visible={reviewLogModalVisible}
                    className={"npd-review-log"}
                    id={item&&item.id}
                    formId='skuAuditWorkflow'
                    handleCancel={() => this.setState({reviewLogModalVisible: false})}
                />
                <Export
                    className="npd-export"
                    title="导入热销申请"
                    visible={exportVisible}
                    onCancel={() => this.setState({exportVisible: false})}
                    uploadConfig={this.exportConfig}
                    uploadCancel = {() => this.setState({exportVisible: false})}
                    onUploadChange={this.onUploadChange}
                />
            </div>
        )
    }
}

export default Form.create()(App)
