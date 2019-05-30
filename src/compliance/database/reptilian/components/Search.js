import React from 'react';
import { Form } from 'antd';

import Screen from './Screen';

export default class Search extends React.Component {

    render(){
        return (
            <div className="breadcrumb padding-sm-top padding-sm-bottom overflow-hidden position-relative">
                <Form layout="inline" onSubmit={this.props.onSubmit}>
                    <Screen {...this.props}/>
                </Form>
            </div>
        )
    }
}