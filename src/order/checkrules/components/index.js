import React from 'react'
import {
    Form,
    message,
} from 'antd'
import Search from './search'
import Tablelist from './tablelist'
import AddModal from './modal'
import '../css/index.css'
import Functions from '../../../components/functions'
import $ from "../../../components/jqueryfilter";

/**
 *作者: 陈文春
 *功能描述: 订单审单规则
 *时间: 2018年10月22日16:08:32
 */
class App extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
        modalVisible: false,
        ruleId: undefined,
    };

    componentDidMount() {
        this.handleSubmit();
    }

    //请求授权列表数据
    handleSubmit = (page = 1, pageSize = 20) => {
        let values = this.props.form.getFieldsValue();
        values.isEnabled = values.isEnabled[0];
        values.platformId = values.platformId[0];
        values.pageNumber = page;
        values.pageData = pageSize;
        this.setState({
            pageNumber: page,
            pageData: pageSize
        });
        this.props.queryCheckRulesList(values);
    };
    //打开弹窗
    openModal = (ruleId) => {
        this.setState({
            modalVisible: true,
            ruleId
        });
    };
    //关闭弹窗
    closeModal = () => {
        this.setState({
            modalVisible: false,
            ruleId: undefined
        });
    };

    render() {
        const {
            pageData,
            pageNumber,
            modalVisible,
            ruleId,
        } = this.state;
        return (
            // <Functions {...this.props} isPage={true} functionkey="001-000004-000006">
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
                        visible={modalVisible}
                        closeModal={this.closeModal}
                        handleSubmit={this.handleSubmit}
                        filterTableaction={this.props.filterTableaction}
                        filtertable={this.props.filtertable}
                        ruleId={ruleId}
                    />
                </div>
            // </Functions>
        )
    }
}

export default Form.create()(App)