import React from 'react'
import Search from './search'
import Tablelist from './tablelist'
import {
    Form,
    message,
} from 'antd'
import AddModal from './modal'
import AddModal2 from './modal2'
import '../css/index.css'
import Functions from '../../../../components/functions'


class App extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
        modalVisible: false,
        modalVisible2: false,
    };

    componentDidMount() {
        this.handleSubmit();
    }

    //页面数据初始化
    handleSubmit = (page = 1, pageSize = 20) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.pageNumber = page;
                values.pageData = pageSize;
                values.importStatus = values.importStatus[0];
                this.setState({
                    pageNumber: page,
                    pageData: pageSize
                })
                values.siteId = parseInt(values.siteId);
                this.props.queryPartList(values);
            }
        });
    };
    //打开导入弹窗
    openModal = () => {
        this.setState({
            modalVisible: true,
        });
    };
    //打开采集弹窗
    openModal2 = () => {
        this.setState({
            modalVisible2: true,
        });
    };
    //关闭导入弹窗
    closeModal = () => {
        this.setState({
            modalVisible: false,
        });
    };
    //关闭采集弹窗
    closeModal2 = () => {
        this.setState({
            modalVisible2: false,
        });
    };

    render() {
        const {
            pageData,
            pageNumber,
            modalVisible,
            modalVisible2,
        } = this.state;
        return (
            <Functions {...this.props} isPage={true} functionkey="008-000001-000005-001">
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
                        openModal2={this.openModal2}
                    />
                    <AddModal
                        title={"导入"}
                        visible={modalVisible}
                        closeModal={this.closeModal}
                        handleSubmit={this.handleSubmit}
                    />
                    <AddModal2
                        title={"采集"}
                        visible={modalVisible2}
                        closeModal={this.closeModal2}
                        handleSubmit={this.handleSubmit}
                    />
                </div>
            </Functions>
        )
    }
}

export default Form.create()(App)
