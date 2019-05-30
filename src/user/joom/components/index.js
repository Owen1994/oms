import React from 'react'
import {
    Form
} from 'antd'
import Search from './Search'
import Tablelist from './Tablelist'

class App extends React.Component {

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
        if (values.account) {
            values.account = values.account[0].label;
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

    render() {
        const {
            getList,
            getParams
        } = this;
        const {
            form,
            authorizations,
            refreshAuthAsync,
            deleteAuthAsync,
            setJoomAuthorizationEnabledDisable
        } = this.props;
        return (
            <div>
                <Search
                    form={form}
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
            </div>
        )
    }
}

export default Form.create()(App)
