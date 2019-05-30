import React from 'react';
import {
    Form,
} from 'antd';
import '../css/index.css';
import Search from './Search';
import Tablelist from './Tablelist';
import AddOrUpdateModal from './AddOrUpdateModal';

class App extends React.Component{
    state = {
        pageNumber: 1,
        pageData: 20,
        visible: false,
        id: '',
    }

    componentDidMount(){
        this.props.queryPlatformList();
        this.onSearch();
    }

    // 列表
    onSearch = (pageNumber = 1, pageData = 20) => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.isEnabled = values.isEnabled[0];
                values.platformCode = values.platformCode[0];
                if (!values.ruleName) {
                    delete values.ruleName;
                }
                values.pageNumber = pageNumber;
                values.pageData = pageData;
                this.props.querySkuReplacementList( {data: values} );
                this.setState({
                    pageNumber,
                    pageData,
                });
            }
        })
    }

    // 打开或关闭弹窗
    toggleModal = (bol, id) => {
        this.setState({
            visible: bol,
            id: id ? id : '',
        });
    }

    render(){
        const { pageNumber, pageData, visible, id } = this.state;
        const {
            actionData,
            addItem,
            delItem,
            modifyItem,
            editItem,
            saveItem,
            initItem,
            clearItem,
        } = this.props;
        return(
            <div>
                <div className="yks-erp-search_order">
                    <Search {...this.props} onSearch={this.onSearch} />
                </div>
                <Tablelist
                    {...this.props}
                    pageNumber={pageNumber}
                    pageData={pageData}
                    onSearch={this.onSearch}
                    toggleModal={this.toggleModal}
                />
                <AddOrUpdateModal
                    onSearch={this.onSearch}
                    pageNumber={pageNumber}
                    pageData={pageData}
                    visible={visible}
                    toggleModal={this.toggleModal}
                    id={id}
                    actionData={actionData}
                    addItem={addItem}
                    delItem={delItem}
                    modifyItem={modifyItem}
                    editItem={editItem}
                    saveItem={saveItem}
                    initItem={initItem}
                    clearItem={clearItem}
                />
            </div>
        )
    }
}

export default Form.create()(App);