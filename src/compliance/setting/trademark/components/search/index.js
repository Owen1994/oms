import React, { Component } from 'react';
import { Form } from 'antd';

import TextSearch from './TextSearch';
import HightSearch from './HightSearch';
import BtnSearch from './BtnSearch';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHightSearch: false    // 是否切换高级搜索
        };
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
        const { isHightSearch } = this.state;
        const heightSearch = isHightSearch ? (
            <HightSearch {...this.props} />
        ) : null;

        return (
            <div className="search breadcrumb padding-sm-bottom overflow-hidden">
                <Form layout="inline" onSubmit={this.onSubmit}>
                    <TextSearch {...this.props} />
                    {heightSearch}
                    <BtnSearch {...this.props} onChangeHightSearch={this.onChangeHightSearch} isHightSearch={this.state.isHightSearch} />
                </Form>
            </div>
        );
    }
}

export default Search;