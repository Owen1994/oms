import React from 'react'
import Search from './search'
import Tablelist from './tablelist'
import {
    Form,
    message,
} from 'antd'
import AddModal from './modal'
import AddModal1 from './modal1'
import '../css/index.css'
import Functions from '../../../../components/functions'


class App extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
        modalVisible: false,    //新增弹窗
        modalVisible1: false,   //编辑弹窗
        ruleId: '',
    };

    //页面数据初始化
    componentDidMount() {
        this.handleSubmit();
    }

    //列表数据查询
    handleSubmit = (page = 1, pageSize = 20) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.pageNumber = page
                values.pageData = pageSize
                this.setState({
                    pageNumber: page,
                    pageData: pageSize
                });
                this.props.queryRuleList(values);
            }
        });
    }

    //打开新增弹窗
    openModal = () => {
        this.setState({
            modalVisible: true,
        });
    }

    //打开编辑弹窗
    openModal1 = (e, record) => {
        this.setState({
            modalVisible1: true,
            ruleId: record.ruleId,
        });
    }

    //关闭弹窗
    closeModal = (type) => {    //type 1为关闭新增弹窗，2为关闭编辑弹窗
        type === 1 ? this.setState({modalVisible: false}) : this.setState({modalVisible1: false});
    }

    render() {
        const {
            pageData,
            pageNumber,
            modalVisible,
            modalVisible1,
            ruleId,
        } = this.state;
        return (
            <Functions {...this.props} isPage={true} functionkey="008-000002-000004-001">
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
                        openModal1={this.openModal1}
                    />
                    <AddModal
                        title={"新增"}
                        visible={modalVisible}
                        closeModal={this.closeModal}
                        handleSubmit={this.handleSubmit}
                    />
                    <AddModal1
                        title={"编辑"}
                        visible={modalVisible1}
                        closeModal={this.closeModal}
                        ruleId={ruleId}
                        handleSubmit={this.handleSubmit}
                    />
                </div>
            </Functions>
        )
    }
}

export default Form.create()(App)