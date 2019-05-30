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
        this.onSearch();
    }

    // 列表
    onSearch = (pageNumber = 1, pageData = 20) => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.isEnabled = values.isEnabled[0];
                values.platformCode = values.platformCode[0];
                for(let i in values){
                    if(!values[i] && values[i] !==0){
                        delete values[i];
                    }
                }
                values.pageNumber = pageNumber;
                values.pageData = pageData;
                this.props.queryChannelExceptionList( {data: values} );
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
        return(
            <div>
                <div className="yks-erp-search_order">
                    <Search
                        {...this.props}
                        onSearch={this.onSearch}
                    />
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
                />
            </div>
        )
    }
}

export default Form.create()(App);