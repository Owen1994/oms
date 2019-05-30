import React from 'react';
import { Form } from 'antd';

import TextSearch from "../../../../components/TextSearch";
import BtnSearch from '../../../../components/BtnSearch';

import { searchType } from '../constants';

export default class Search extends React.Component {
    state = {

    }

    handleSubmit = () => {
        this.props.listFetch()
    }
    resetFields = () => {
        this.props.form.resetFields();
    }
    render() {
        const { onSubmit } = this.props;
        const textSearch = (
            <TextSearch
                {...this.props}
                isSingle={false}
                searchType={searchType}
            />
        )
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
        const btnSearch = (<BtnSearch btn={btn}/>)

        return (
            <div className="search breadcrumb overflow-hidden padding-sm-bottom">
                <Form layout="inline" onSubmit={onSubmit}>
                    {textSearch}
                    {btnSearch}
                </Form>
            </div>
        )
    }
}