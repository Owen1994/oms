import React from 'react';
import Search from './Search';
import TableList from './TableList';
import { Form } from 'antd';
import "../css/css.css"
import { filterParams, replaceAllSpace } from '../../../../util/baseTool';

class App extends React.Component {

    state = {
        pageData: 20,
        pageNumber: 1,
    }
    handleSubmit = (pageNumber, pageData) => {
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
              return;
            }
            let fdValue = filterParams(fieldsValue);
            let filtersData = { ...fdValue };
            if(pageNumber) {
                filtersData.pageNumber = pageNumber
                this.setState({
                    pageNumber
                })
            }else{
                filtersData.pageNumber = this.state.pageNumber
            }
            if(pageData) {
                filtersData.pageData = pageData
                this.setState({
                    pageData
                })
            }else{
                filtersData.pageData = this.state.pageData
            }
            if(filtersData.searchContent){
                filtersData.searchContent = replaceAllSpace(filtersData.searchContent)
            }

            this.props.getTrackList(filtersData);
        })
    }
    componentDidMount() {
        this.props.form.setFieldsValue({
            recordState: 0,
            ntsType: 0
        })
        this.handleSubmit();
    }
    render(){
        const {
            pageData, 
            pageNumber
        } = this.state;
        const data = this.props.data;
        return (
            <div>
                <Search
                    {...this.props}
                    handleSubmit={this.handleSubmit}
                />
                <TableList
                    {...this.props}
                    data={data}
                    pageData={pageData}
                    pageNumber={pageNumber}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        )
    }
}

export default Form.create()(App)