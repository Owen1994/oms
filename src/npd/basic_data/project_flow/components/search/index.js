import React from 'react';
import { Form, Button } from 'antd';

import DefaultSearch from './DefaultSearch';
import TextSearch from './TextSearch';
// import BtnSearch from './BtnSearch';
import TabSearch from './TabSearch';
import '../../css/index.css';
import BtnSearch from '../../../../common/components/BtnSearch'
import StandardFormRow from '../../../../../components/StandardFormRow';
import ItemSelect from '../../../../../common/components/itemSelect'
import * as API from '../../../../constants/Api'

const FormItem = Form.Item;

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch: false,        // 是否切换搜索
            isHightSearch: false,
        };
    }

    // 筛选、搜索切换
    onChangeSearch = (event) => {
        if (event.target.value === 'select') {
            this.setState({ isSearch: false });
            this.setState({ isHightSearch: false })
        } else {
            this.setState({ isSearch: true });
        }
        this.props.onReset();
    }

    // 高级搜索
    onChangeHightSearch = () => {
        if (this.state.isHightSearch === false) {
            this.setState({ isHightSearch: true })
        } else {
            this.setState({ isHightSearch: false })
        }
    }

    // 全局搜索
    onSubmit = (event) => {
        event.preventDefault();
        this.props.listFetch();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const textSearch = this.state.isSearch ?
            <TextSearch {...this.props} listFetch={this.props.listFetch} />
            : null;
        const btnSearch = this.state.isSearch ? (
            <div className="npd-project-btnSearch">
                <Button type="primary" onClick={() => this.props.listFetch()}>搜索</Button>
                <Button onClick={this.props.onReset}>重置</Button>
                <Button onClick={this.onChangeHightSearch}>
                    {
                        this.state.isHightSearch ? '取消高级搜索' : '高级搜索'
                    }
                </Button>
            </div>
        ) : null;
        const tabSearch = <TabSearch {...this.props} onChangeSearch={this.onChangeSearch} />;
        const defaultSearch = <DefaultSearch {...this.props} />;
        const heightSearch = this.state.isHightSearch ? (
            <div className="npd-project-heightSearch">
                <StandardFormRow title="项目流名称">
                    <FormItem style={{ width: 286 }}>
                        <div style={{ width: '344px' }}>
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='projectName'
                            url={API.PROJECT_FLOW_LIST_API}
                            code="name"
                            name="name"
                            searchColumn="projectName"
                            params={{'pageData': 20, 'pageNumber': 1}}
                        />
                        </div>
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title="平台">
                    <FormItem>
                        <div style={{ width: '344px' }}>
                            <ItemSelect
                                mode="multiple"
                                getFieldDecorator={getFieldDecorator}
                                formName='platformCode'
                                url={API.PLATFORM_LIST_API}
                                code="code"
                                name="name"
                                params={{'pageData': 20, 'pageNumber': 1}}
                            />
                        </div>
                    </FormItem>
                </StandardFormRow>
            </div>
        ) : null;

        return (
            <div className="npd-project-search">
                {tabSearch}
                <Form layout="inline" onSubmit={this.onSubmit}>
                    {defaultSearch}
                    {textSearch}
                    {heightSearch}
                    {btnSearch}
                </Form>
            </div>
        );
    }
}

export default Search;