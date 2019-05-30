import React from 'react';
import { Form, Tabs } from 'antd';

import TextSearch from "../../../../components/TextSearch";
import BtnSearch from '../../../../components/BtnSearch';

import { searchType, TABS } from '../constants';

const TabPane = Tabs.TabPane;

export default class Search extends React.Component {
    state = {

    }

    handleSubmit = () => {
        this.props.listFetch()
    }
    resetFields = () => {
        this.props.form.resetFields();
    }
    callback = (value)=> {
        this.props.form.setFieldsValue({
            searchContent:undefined
        })
        this.props.handleTabsChange(value)
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
            <div>
                <div>
                    <Tabs onChange={this.callback} type="card" defaultActiveKey='1'>
                        {
                            TABS.map((item, i) => {
                                return (
                                    <TabPane tab={item.name} key={item.id} />
                                )
                            })
                        }
                    </Tabs>
                </div>
                <div className="search breadcrumb overflow-hidden">
                    <Form layout="inline" onSubmit={onSubmit}>
                        {textSearch}
                        {btnSearch}
                    </Form>
                </div>
            </div>
        )
    }
}