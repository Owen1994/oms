import React from 'react'
import {
    Form,
    message,
} from 'antd'
import '../css/index.css'
import Search from './search'
import Tablelist from './tablelist'
import AddModal from './modal'
import {fetchPost} from '../../../../util/fetch';
import * as API from '../../../common/constants/Api'
import Functions from '../../../../components/functions'

class App extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
        modalVisible: false,
        ruleId: '',
        item: '',
    }

    //页面数据初始化
    componentDidMount() {
        this.handleSubmit();
    }

    //数据请求
    handleSubmit = (page = 1, pageSize = 20) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.pageNumber = page;
                values.pageData = pageSize;
                this.setState({
                    pageNumber: page,
                    pageData: pageSize
                });
                this.props.queryUpdateList(values);
            }
        });
    }
    //打开弹窗
    openModal = (e, record) => {
        const or = typeof e === 'object' ? true : false;
        or && e.preventDefault();
        this.setState({
            modalVisible: true,
            ruleId: record ? record.ruleId : "",
            item: record
        });
    }
    //关闭弹窗
    closeModal = () => {
        this.setState({
            modalVisible: false,
        });
    }

    render() {
        const {
            pageData,
            pageNumber,
            modalVisible,
            ruleId,
            item,
        } = this.state;
        return (
            <Functions {...this.props} isPage={true} functionkey="008-000002-000005-001">
                <div>
                    <Search
                        {...this.props}
                        handleSubmit={this.handleSubmit}
                    />
                    <Tablelist
                        {...this.props}
                        pageData={pageData}
                        pageNumber={pageNumber}
                        handleSubmit={this.handleSubmit}
                        openModal={this.openModal}
                    />
                    <AddModal
                        title={ruleId ? "编辑" : "新增"}
                        visible={modalVisible}
                        closeModal={this.closeModal}
                        ruleId={ruleId}
                        item={item}
                        handleSubmit={this.handleSubmit}
                    />
                </div>
            </Functions>
        )
    }
}

export default Form.create()(App)