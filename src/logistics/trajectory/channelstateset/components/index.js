import React from 'react';
import { Form } from 'antd';
import SearchComponent from './Search';
import TablesComponent from './Tables';
import EditModal from './EditModal';
import LogModal from './LogModal';
import KeyWordModal from './KeyWordModal';
import '../css.css';

/**
 *作者: 黄建峰
 *功能描述: 渠道设置
 *时间: 2018/12/10 10:45
 */
class App extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
        visible: false,
        visibleLog: false,
        visibleKeyWord: false,
    };

    componentDidMount() {
        this.onSearch();
    }

    onSearch = (pageNumber=1, pageData=20) => {
        this.setState({
            pageNumber,
            pageData,
        });
        const formData = {...this.props.form.getFieldsValue()};
        formData.trajectoryState = formData.trajectoryState[0];
        this.props.loadDataList({data: {...formData}});
    };

    handleOk = () => {
        this.setState({
            visible: false,
            visibleLog: false,
            visibleKeyWord: false,
            item: undefined,
        });
        this.onSearch();
    };

    handleCancel = () => {
        this.setState({
            visible: false,
            visibleLog: false,
            visibleKeyWord: false,
            item: undefined,
        });
    };

    render(){
        const { pageData, pageNumber, visible, visibleLog, visibleKeyWord, item = {} } = this.state;
        return (
            <div>
                <SearchComponent
                    {...this.props}
                    onSearch={this.onSearch}
                />
                <TablesComponent
                    {...this.props}
                    pageNumber={pageNumber}
                    pageData={pageData}
                    onSearch={this.onSearch}
                    showModal={(item) => {
                        this.setState({
                            visible: true,
                            item,
                        })
                    }}
                    showLogModal={(item) => {
                        this.setState({
                            visibleLog: true,
                            item,
                        })
                    }}
                    showKeyWordModal={(item) => {
                        this.setState({
                            visibleKeyWord: true,
                            item,
                        })
                    }}
                />
                <EditModal
                    visible={visible}
                    item={item}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                />
                <LogModal
                    visible={visibleLog}
                    item={item}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                />
                <KeyWordModal
                    visible={visibleKeyWord}
                    keyword={item.conversionKeyWord}
                    onCancel={this.handleCancel}
                />
            </div>
        )
    }
}
export default Form.create()(App);
