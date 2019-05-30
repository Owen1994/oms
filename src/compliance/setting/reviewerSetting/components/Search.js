import React from 'react';
import { Form } from 'antd';
import BtnSearch from '../../../../components/BtnSearch';
import Screen from "./Screen";

export default class Search extends React.Component {
   
    handleSubmit = () => {
        this.props.listFetch()
    }
    
    render() {
        const { onSubmit } = this.props;
        return (
            <div className="search breadcrumb padding-sm-top padding-sm-bottom overflow-hidden">
                <Form layout="inline" onSubmit={onSubmit}>
                    <Screen {...this.props}/>
                </Form>
            </div>
        )
    }
}