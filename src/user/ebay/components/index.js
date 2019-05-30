import React from 'react'
import {
    Form,
    message,
} from 'antd'
import Search from './Search'
import Tablelist from './Tablelist'
import AddNewAuthorization from './AddModal'
import AuthorizationDetailModal from './DetailModal'
import '../css/index.css'
import Functions from '@/components/functions'

/**
 *作者: 陈文春
 *功能描述: ebay授权
 *时间: 2018年11月20日15:52:01
 */
class App extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
        addModalVisible: false,
        detailModalVisible: false,
        record: undefined,
    };

    componentDidMount() {
        this.handleSubmit();
    }

    //请求授权列表数据
    handleSubmit = (page = 1, pageSize = 20) => {
        let values = this.props.form.getFieldsValue();
        if (values.authState) {
            values.authState = values.authState[0] || values.authState[0] === 0 ? values.authState[0] : null;
        } else {
            delete values.authState;
        }
        if (values.tokenState) {
            values.tokenState = values.tokenState[0] || values.tokenState[0] === 0 ? values.tokenState[0] : null;
        } else {
            delete values.tokenState;
        }
        // values.authState = values.authState ? values.authState[0] : '';
        // values.tokenState = values.tokenState ? values.tokenState[0] : '';
        values.pageNumber = page;
        values.pageData = pageSize;
        this.setState({
            pageNumber: page,
            pageData: pageSize
        });
        this.props.queryAuthorizationList({data: values});
    };
    //打开弹窗
    openModal = (type, record) => {
        if(type === '1'){
            this.setState({
                addModalVisible: true
            });
        }else if(type === '2'){
            this.setState({
                detailModalVisible: true,
                record
            })
        }
    };
    //关闭弹窗
    closeModal = () => {
        this.setState({
            addModalVisible: false,
            detailModalVisible: false,
            record: undefined
        });
    };

    render() {
        const {
            pageData,
            pageNumber,
            addModalVisible,
            detailModalVisible,
            record,
        } = this.state;
        return (
            // <Functions {...this.props} isPage={true} functionkey="004-000002-000003-001">
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
                    <AddNewAuthorization
                        visible={addModalVisible}
                        closeModal={this.closeModal}
                        handleSubmit={this.handleSubmit}
                    />
                    <AuthorizationDetailModal
                        visible={detailModalVisible}
                        closeModal={this.closeModal}
                        handleSubmit={this.handleSubmit}
                        record={record}
                    />
                </div>
            // </Functions>
        )
    }
}

export default Form.create()(App)