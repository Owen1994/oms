import React from 'react'
import {
    Form,
    message,
} from 'antd'
import Search from './Search'
import Tablelist from './Tablelist'
import AddOrUpdateModal from './AddModal'
import '../css/index.css'
import Functions from '@/components/functions'
import { parseValues } from '../selectors';

/**
 *作者: 陈文春
 *功能描述: MyMall授权
 *时间: 2018年12月27日14:57:55
 */
class App extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
        addModalVisible: false,
        sellerId: '',
    };

    componentDidMount() {
        this.handleSubmit();
    }

    //请求授权列表数据
    handleSubmit = (page = 1, pageSize = 20) => {
        let values = this.props.form.getFieldsValue();
        parseValues(values);
        values.pageNumber = page;
        values.pageData = pageSize;
        this.setState({
            pageNumber: page,
            pageData: pageSize
        });
        this.props.queryAuthorizationList({data: values});
    };
    //打开弹窗
    openModal = (sellerId) => {
        if(sellerId){
            this.setState({ sellerId });
        } else {
            this.setState({ sellerId: '' });
        }
        this.setState({ addModalVisible: true });
    };
    //关闭弹窗
    closeModal = () => {
        this.setState({
            addModalVisible: false,
            sellerId: '',
        });
    };

    render() {
        const {
            pageData,
            pageNumber,
            addModalVisible,
            sellerId,
        } = this.state;
        return (
            // <Functions {...this.props} isPage={true} functionkey="004-000002-000003-001">
            <div className="yks-erp-search_order">
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
                 <AddOrUpdateModal
                    sellerId={sellerId}
                    visible={addModalVisible}
                    closeModal={this.closeModal}
                    handleSubmit={this.handleSubmit}
                />
            </div>
            // </Functions>
        )
    }
}

export default Form.create()(App)