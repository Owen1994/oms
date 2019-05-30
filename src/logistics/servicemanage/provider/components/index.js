import React from 'react';
import { Form } from 'antd';
import SearchComponent from './Search';
import TablesComponent from './Tables';
import EditModal from './EditModal';

/**
 *作者: 黄建峰
 *功能描述: 轨迹查询
 *时间: 2018/12/10 10:45
 */
class App extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
        visible: false,
    }

    componentDidMount() {
        this.handleSearch();
    }

    handleSearch = (pageNumber=1, pageData=20) => {
        this.setState({
            pageNumber,
            pageData,
        });
        const formData = { ...this.props.form.getFieldsValue() };
        formData.channelState = formData.channelState[0];
        // formData.packageState = formData.packageState[0];
        // formData.packageType = formData.packageType[0];
        this.props.loadDataList({ data: { ...formData, pageNumber, pageData } });
    };

    handleOk = () => {
        this.setState({
            visible: false,
            item: undefined,
        });
        this.handleSearch(this.state.pageNumber, this.state.pageData);
    };

    handleCancel = () => {
        this.setState({
            visible: false,
            item: undefined,
        });
    };

    render(){
        const { pageData, pageNumber, visible, item={} } = this.state;

        return (
            <div className="lgt-container">
                <SearchComponent
                    {...this.props}
                    onSearch={this.handleSearch}
                />
                <TablesComponent
                    {...this.props}
                    onSearch={this.handleSearch}
                    pageNumber={pageNumber}
                    pageData={pageData}
                    showModal={(item) => {
                        this.setState({
                            visible: true,
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
            </div>
        )
    }
}
export default Form.create()(App);
