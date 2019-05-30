import React from 'react';
import { Form } from 'antd';
import { searchType } from '../constants';

import TextSearch from "../../../../components/TextSearch";
import BtnSearch from '../../../../components/BtnSearch';

export default class Search extends React.Component {
    render(){
        const btn = [
            {
                name: "搜索",
                type: "primary",
                htmlType: "submit",
                onClick: null
            }, {
                name: "重置",
                type: null,
                htmlType: null,
                onClick: this.props.onReset
            }
        ];
        return (
            <div className="breadcrumb padding-sm-bottom overflow-hidden position-relative">
                <Form layout="inline" onSubmit={this.props.onSubmit}>
                    <TextSearch
                        title='知产代码'
                        {...this.props}
                        isSingle={true}
                        placeholder='支持单个模糊搜索'
                        searchType={searchType}
                        name='searchContent'
                    />
                    <BtnSearch btn={btn}/>
                </Form>
            </div>
        )
    }
}