/**
 * 作者: pzt
 * 描述: 模板管理页
 * 时间: 2018/7/27 15:52
 **/
import React from 'react';
import { Form } from 'antd';
import Search from '../Search';
import Table from './table';
import ModelModel from './modalModel';
import NewModalModel from './newModalModel'
import Functions from '../../../../../components/functions'
import { filterParams, strTrim } from "../../../../../util/baseTool";
import Add from './addModel';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            pageSize: 20,
            visible: false,
            newVisible: false,
            item: undefined,   // 选中的条目
            addVisible: false,
            saleAccount: '',
        };
    }
    componentDidMount() {
        this.handleSearch();
    }

    // 供子组件调用的方法，用于改变最外层状态
    getStateChange = (obj) => {
        this.setState(obj)
    }

    // 新增
    add = (data) => {
        const { type, saleAccount } = data;
        const { history } = this.props;
        const params = {
            addVisible: false,
        }
        if (type === 1) {
            history.push(`/publish/template/describeTemplate?saleAccount=${saleAccount || ''}`)
        } else {
            params.newVisible = true;
            params.saleAccount = saleAccount;
        }
        this.setState(params)
    }

    //请求列表
    handleSearch = (pageNumber, pageSize) => {
        pageNumber = pageNumber ? pageNumber : 1;
        pageSize = pageSize ? pageSize : 20;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let params = filterParams(values);
                params["pageNumber"] = pageNumber;
                params["pageData"] = pageSize;
                if (values.templateName) {
                    params["templateName"] = strTrim(values.templateName);
                }
                const filters = { ...this.state.params, ...params }
                this.setState({
                    params: filters,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                })
                this.props.getDescriptionTemplate(params);
            }
        });
    }

    edit = (record) =>{
        const { history } = this.props;
        const { type=1 ,saleAccount = '',tempId='' } = record;
        if(type === 1){
            history.push(`/publish/template/describeTemplate?saleAccount=${saleAccount}&tempId=${tempId}`)
        }else {
            this.setState({
                item:tempId,
                visible: true
            })
        }
    }

    render() {
        const { pageSize, pageNumber, visible, newVisible, item, addVisible, saleAccount } = this.state;
        const paginationData = {
            pageSize: pageSize,
            pageNumber: pageNumber,
        };

        return (
            <Functions {...this.props} isPage={true} functionkey="008-000001-000002-001">
                <div className="pbh-tle-list_container">
                    <div>
                        <Search {...this.props}
                                onSearch={this.handleSearch}
                                getStateChange={this.getStateChange}
                                hasSite={false}
                        />
                    </div>
                    <div>
                        <Table {...this.props}
                               onSearch={this.handleSearch}
                               paginationData={paginationData}
                               getStateChange={this.getStateChange}
                               toggleModalNew={() => this.setState({ addVisible: true })}
                               toggleModal={this.edit}
                        />
                    </div>
                    <NewModalModel
                        newVisible={newVisible}
                        saleAccount={saleAccount}
                        onSearch={this.handleSearch}
                        getStateChange={this.getStateChange}
                        handleAddItem={this.handleAddItem}
                        onCancel={() => this.setState({
                            newVisible: false
                        })}
                    />
                    <ModelModel
                        visible={visible}
                        onSearch={this.handleSearch}
                        getStateChange={this.getStateChange}
                        handleAddItem={this.handleAddItem}
                        item={item}
                        onCancel={() => this.setState({
                            visible: false
                        })}
                    />
                    <Add
                        visible={addVisible}
                        onCancel={() => this.setState({ addVisible: false, saleAccount: '' })}
                        handleOk={this.add}
                    />

                </div>
            </Functions>
        )
    }
}

export default Form.create()(App)
