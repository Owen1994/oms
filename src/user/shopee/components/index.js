import React from 'react'
import {
    Form
} from 'antd'
import Search from './Search'
import SearchModal from './SearchModal'
import Tablelist from './Tablelist'

class App extends React.Component {

    state = {
        visible:false
    }

    componentDidMount() {
        let value = this.getParams();
        this.getList(value)
    }

    getList = (params) => {
        const { getJoomAuthListAsync } = this.props;
        return getJoomAuthListAsync({ data: params })
    };

    getParams = () => {
        const { authorizations } = this.props;
        const { getFieldsValue } = this.props.form;
        const { params } = authorizations;
        const values = getFieldsValue();
        if(!values.searchContent){
            delete values.searchType
            delete values.searchContent
        }else {
            values.searchContent = values.searchContent.split(/\s/).filter(v=>v)
        }
        if(values.authorizationStatus){
            values.authorizationStatus = values.authorizationStatus[0]
        }
        if(values.tokenStatus){
            values.tokenStatus = values.tokenStatus[0]
        }
        if(values.authorizationStatus === 2){
            delete  values.tokenStatus
        }
        values.pageNumber =  params.pageNumber
        values.pageData =  params.pageData
        return values
    }

    onReset=()=>{
        this.props.form.resetFields()
    }

    render() {
        const {
            visible
        } = this.state
        const {
            getList,
            getParams,
        } = this;
        const {
            form,
            authorizations,
            refreshAuthAsync,
            deleteAuthAsync,
            setJoomAuthorizationEnabledDisable
        } = this.props;
        return (
            <div className="yks-erp-search_order">
                <Search
                    form={form}
                    onReset={this.onReset}
                    toggleModal={() => this.setState({
                        visible: true,
                    })}
                    getList={getList}
                    getParams={getParams}
                />
                <Tablelist
                    {...this.props}
                    authorizations={authorizations}
                    refreshAuthAsync={refreshAuthAsync}
                    deleteAuthAsync={deleteAuthAsync}
                    form={form}
                    getList={getList}
                    setJoomAuthorizationEnabledDisable={setJoomAuthorizationEnabledDisable}
                    getParams={getParams}
                />
                
                <SearchModal
                    visible={visible}
                    onCancel={() => this.setState({
                        visible: false,
                    })}
                    getList={getList}
                    getParams={getParams}
                    form={form}
                />
            </div>
        )
    }
}

export default Form.create()(App)
