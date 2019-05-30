import React from 'react'
import {
    Form,
    message,
} from 'antd'
import Search from './search'
import Tablelist from './tablelist'
import AuthorizationModal from './modal'
import '../css/index.css'
import Functions from '@/components/functions'

/**
 *作者: 陈文春
 *功能描述: Wish授权
 *时间: 2018年10月22日09:27:11
 */
class App extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
        modalVisible: false,
        sellerId: undefined,
    };

    componentDidMount() {
        this.handleSubmit();
    }

    //请求授权列表数据
    handleSubmit = (page = 1, pageSize = 20) => {
        let values = this.props.form.getFieldsValue();
        values.isEnabled = values.isEnabled[0];
        values.refreshRslt = values.refreshRslt[0];
        values.pageNumber = page;
        values.pageData = pageSize;
        this.setState({
            pageNumber: page,
            pageData: pageSize
        });
        this.props.queryAuthorizationList(values);
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         values.pageNumber = page;
        //         values.pageData = pageSize;
        //         this.setState({
        //             pageNumber: page,
        //             pageData: pageSize
        //         });
        //         this.props.queryAuthorizationList(values);
        //     }
        // });
    };
    //打开弹窗
    openModal = (sellerId) => {
        this.setState({
            modalVisible: true,
            sellerId
        });
    };
    //关闭弹窗
    closeModal = () => {
        this.setState({
            modalVisible: false,
            sellerId: undefined
        });
    };

    render() {
        const {
            pageData,
            pageNumber,
            modalVisible,
            sellerId,
        } = this.state;
        return (
            <Functions {...this.props} isPage={true} functionkey="004-000002-000002-001">
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
                    <AuthorizationModal
                        visible={modalVisible}
                        closeModal={this.closeModal}
                        handleSubmit={this.handleSubmit}
                        sellerId={sellerId}
                    />
                </div>
            </Functions>
        )
    }
}

export default Form.create()(App)