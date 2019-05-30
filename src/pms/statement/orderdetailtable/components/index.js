import React from 'react';
import { Form, message } from 'antd';
import Search from './Search';
import Tables from './Tables';
import { parseStrToArray } from '../../../../util/StrUtil';
import Functions from '../../../../components/functions';
import SearchModal from './SearchModal';
import '../css/css.css';
import { getTimeStamp } from '../../../../compliance/utils';
class Retrieval extends React.Component {
    state = {
        pageData: 20,
        pageNumber: 1,
        visible: false,
    }

    componentDidMount() {
        this.handleSearch();
    }

    handleSearch = (pageNumber = 1, pageData = 20) => {
        this.setState({
            pageData,
            pageNumber,
        });
        const formData = { ...this.props.form.getFieldsValue() };

        const purchaseTimes = formData.purchaseTimes ? formData.purchaseTimes.map(t => getTimeStamp(t)) : [];
        const payTime = formData.payTime ? formData.payTime.map(t => getTimeStamp(t)) : [];

        let searchContents = undefined;
        let searchType = undefined;
        if (formData.searchContents) {
            if (parseStrToArray(formData.searchContents).length > 10) {
                message.warning('搜索内容不能超过10个');
                return false;
            } else {
                searchContents = parseStrToArray(formData.searchContents);
                searchType = formData.searchType;
            }
        }

        const data = {
            data: {
                ...formData,
                purchaseTimes,
                searchContents,
                searchType,
                payTime,
                pageNumber,
                pageData,
            }
        };

        this.props.getDataList(data);
    };

    onReset = () => {
        this.props.form.resetFields();
    };

    render() {
        const {
            pageData,
            pageNumber,
            visible,
        } = this.state;
        return (
            <div className="yks-erp-search_order">
                <Search
                    {...this.props}
                    onSearch={this.handleSearch}
                    onReset={this.onReset}
                    toggleModal={() => this.setState({
                        visible: true,
                    })}
                />
                <SearchModal
                    {...this.props}
                    visible={visible}
                    onCancel={() => this.setState({
                        visible: false,
                    })}
                    onSearch={this.handleSearch}
                />
                <Tables
                    pageData={pageData}
                    pageNumber={pageNumber}
                    onSearch={this.handleSearch}
                    {...this.props}
                />
            </div>
        );
    }
}

export default Form.create()(Retrieval);
