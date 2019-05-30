import React from 'react';
import Search from './Search';
import TableList from './TableList';
import EditItemModal from './EditItemModal';
import { Form,message } from 'antd';
import "../css/css.css"
import { post } from '../../../../util/axios';
import {CONFIRM_AUDIT_API} from "../../../constants/Api"
import ReviewModal from '../../../common/components/ReviewModal';
import ReviewLogModal from '../../../common/components/ReviewLogModal';
import {filterParams, replaceAllSpace} from "../../../../util/baseTool"


class App extends React.Component {

    state = {
        pageData: 20,
        pageNumber: 1,
        editModalVisible: false,
        reviewModalVisible: false,
        reviewLogModalVisible: false,
        item: {}
    }
    reviewSubmit = (record)=>{
        const {id} = record;
        const params = {
            "bizId": [id],
            "comment": "",
            "formId": "NpsSample",
            "auditResult": 1
        }
        post(CONFIRM_AUDIT_API, params).then(data => {
            if(data.state==='000001'){
                message.success(data.msg)
                this.handleSubmit()
            }
        })
    }
    handleSubmit = (pageNumber, pageData) => {
        this.props.form.validateFields((err, values) => {
            if(!err) {
                const params = filterParams(values);
                if(pageNumber) {
                    params.pageNumber = pageNumber;
                    this.setState({
                        pageNumber
                    })
                }else{
                    params.pageNumber = this.state.pageNumber;
                }
                if(pageData) {
                    params.pageData = pageData;
                    this.setState({
                        pageData
                    })
                } else {
                    params.pageData = this.state.pageData;
                }
                if(params.searchContent){
                    params.searchContent = replaceAllSpace(params.searchContent)
                }
                const filters = {...params}
                this.props.getSpecimenList(filters);
            }
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
        this.handleSubmit()
    }
    render(){
        const {
            pageData, 
            pageNumber,
            editModalVisible, 
            item, 
            reviewModalVisible,
            reviewLogModalVisible
        } = this.state;
        return (
            <div>
                <Search
                    {...this.props}
                    handleSubmit={this.handleSubmit}
                />
                <TableList
                    data={this.props.datas}
                    pageData={pageData}
                    pageNumber={pageNumber}
                    reviewSubmit={this.reviewSubmit}
                    showModel={this.showModel}
                    handleSubmit={this.handleSubmit}
                />
                <EditItemModal
                    item={item}
                    visible={editModalVisible}
                    handleSubmit={this.handleSubmit}
                    handleCancel={() => this.setState({editModalVisible: false})}
                />
                <ReviewModal
                    visible={reviewModalVisible}
                    id={item&&item.id}
                    formId='NpsSample'
                    handleOk={() => {
                        this.handleSubmit();
                        this.setState({reviewModalVisible: false})
                    }}
                    handleCancel={() => this.setState({reviewModalVisible: false})}
                />
                <ReviewLogModal
                    className="npd-review-log"
                    visible={reviewLogModalVisible}
                    id={item&&item.id}
                    formId='NpsSample'
                    handleCancel={() => this.setState({reviewLogModalVisible: false})}
                />
            </div>
        )
    }
}

export default Form.create()(App)