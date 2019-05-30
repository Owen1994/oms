/**
 * 作者: pzt
 * 描述: 模板管理-运输模板新增修改弹窗入口页
 * 时间: 2018/7/27 15:52
 **/
import React from 'react';
import { Form } from 'antd';
import Search from '../Search';
import Table from './table';
import Functions from '../../../../../components/functions'
import NewModalModelContatiner from '../../containers/newModalModel'
import { filterParams, strTrim } from "../../../../../util/baseTool";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            pageSize: 20,
            visible: false,
            newVisible: false,
            item: {
                plsProfileId: "",
                profileId: "",
                site: "",
                sellerId: null,
            }    // 选中的条目
        };
    }
    componentDidMount() {
        this.handleSearch();

    }

    //请求列表
    handleSearch = (pageNumber = 1, pageSize = 20) => {
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
                this.props.getTransportTemplate(params);
            }
        });
    }
    // 切换模板
    toggleTemp = (item) => {
        this.setState({
            item
        })
    }
    render() {
        const { pageSize, pageNumber, newVisible, visible, item } = this.state;
        const paginationData = {
            pageSize: pageSize,
            pageNumber: pageNumber,
        };
        return (
            <Functions {...this.props} isPage={true} functionkey="008-000001-000002-006">
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
                        toggleModal={(record) => this.setState({
                            item: record ? record : {
                                plsProfileId: "",
                                profileId: "",
                                site: "",
                                _isAdd: true,
                                sellerId: null,
                            },
                            visible: true
                        })}
                    />
                    <NewModalModelContatiner
                        isCopy
                        onSearch={this.handleSearch}
                        visible={visible}
                        toggleTemp={this.toggleTemp}
                        item={{
                            plsProfileId: item.plsProfileId,
                            profileId: null,
                            site: item.site,
                            sellerId: null,
                            _isAdd: !!item._isAdd,
                            copyPlsProfileId:item.copyPlsProfileId,
                            _isRepalceTemp: !!item._isRepalceTemp
                        }}
                        onCancel={() => this.setState({
                            visible: false
                        })}
                    />
                </div>
            </Functions>
        )
    }
}

export default Form.create()(App)
