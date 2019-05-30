/**
 * 作者: pzt
 * 描述: 模板管理页
 * 时间: 2018/7/27 15:52
 **/
import React from 'react';
import { Form } from 'antd';
import Search from '../Search';
import Table from './table';
import NewModalModel  from './newModalModel'
import Functions from '../../../../../components/functions'
import {filterParams,strTrim} from "../../../../../util/baseTool";


class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            pageSize: 20,
            visible: false,
            item: undefined     // 选中的条目
        };
    }
    componentDidMount(){
        this.handleSearch();
    }

    // 供子组件调用的方法，用于改变最外层状态
    getStateChange = (obj) => {
        this.setState(obj)
    }



    //请求列表
    handleSearch = (pageNumber, pageSize) => {
        pageNumber = pageNumber ? pageNumber : 1;
        pageSize = pageSize ? pageSize : 20;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let  params = filterParams(values);
                params["pageNumber"] = pageNumber;
                params["pageData"] = pageSize;
                if(values.templateName){
                    params["templateName"] = strTrim(values.templateName);
                }
                const filters = { ...this.state.params, ...params}
                this.setState({
                    params: filters,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                })
                this.props.getReturnTemplate(params);
            }
        });
    }

    render(){
        const { pageSize,pageNumber,visible,item} = this.state;
        const paginationData = {
            pageSize: pageSize,
            pageNumber: pageNumber,
        };
        return(
            <Functions { ...this.props } isPage={true} functionkey="008-000001-000002-011">
                 <div className="pbh-tle-list_container">
                    <div>
                        <Search {...this.props}
                                onSearch={this.handleSearch}
                                hasSite={true}
                        />
                    </div>
                    <Table {...this.props}
                           onSearch={this.handleSearch}
                           paginationData={paginationData}
                           newToggleModal={(record) => this.setState({
                               visible: true,
                               item: record,
                           })}
                    />
                    <NewModalModel
                        onSearch={this.handleSearch}
                        visible={visible}
                        item={{
                            plsProfileId: item,
                            profileId: null,
                            site: null,
                            sellerId: null
                        }}
                        onCancel={() => this.setState({
                            visible: false,
                            item: undefined,
                        })}
                    />
                </div>
            </Functions>
        )
    }
}

export default Form.create()(App)
