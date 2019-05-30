/**
 * 作者: pzt
 * 描述: 模板管理页
 * 时间: 2018/7/27 15:52
 * */
import React from 'react';
import { Form } from 'antd';
import Search from './Search';
import Table from './table';
import Functions from '../../../../../components/functions';
import AddEditModal from './addeditmodal';
import { filterParams, strTrim } from '../../../../../util/baseTool';
import '../../css/css.css';
import '../../css/newSearch.css';
import '../css/index.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            pageSize: 20,
            visible: false,
            // newVisible: false,
            item: undefined, // 选中的条目
        };
    }

    componentDidMount() {
        this.handleSearch();
    }

    // 请求列表
    handleSearch = (pageNumber, pageSize) => {
        pageNumber = pageNumber || 1;
        pageSize = pageSize || 20;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const params = filterParams(values);
                params.pageNumber = pageNumber;
                params.pageData = pageSize;
                if (values.templateName) {
                    params.templateName = strTrim(values.templateName);
                }
                const filters = { ...this.state.params, ...params };
                this.setState({
                    params: filters,
                    pageNumber,
                    pageSize,
                });
                this.props.getMatchList(params);
            }
        });
    }

    render() {
        const {
            pageSize, pageNumber, visible, item,
        } = this.state;
        const paginationData = {
            pageSize,
            pageNumber,
        };
        return (
            <Functions {...this.props} isPage functionkey="008-000001-000007-001">
                <div className="pbh-tle-list_container yks-erp-search_order">
                    <div style={{ backgroundColor: '#fff' }}>
                        <Search
                            {...this.props}
                            onSearch={this.handleSearch}
                        />
                    </div>
                    <Table
                        {...this.props}
                        onSearch={this.handleSearch}
                        paginationData={paginationData}
                        showModal={item => this.setState({
                            item,
                            visible: true,
                        })}
                    />
                    <AddEditModal
                        onSearch={this.handleSearch}
                        visible={visible}
                        item={item}
                        onCancel={() => this.setState({
                            visible: false,
                        })}
                    />
                </div>
            </Functions>
        );
    }
}

export default Form.create()(App);
