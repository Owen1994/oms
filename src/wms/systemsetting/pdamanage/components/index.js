import React from 'react';
import {
    Form,
} from 'antd';
import TableList from './TableList';
import Functions from '@/components/functions';

/**
 * PDA管理
 */
class App extends React.Component {
    componentDidMount() {
        this.handleSubmit();
    }

    /**
     * 加载列表数据
     */
    handleSubmit = () => {
        this.props.queryPickerList();
    };

    render() {
        return (
            <Functions {...this.props} isPage functionkey="012-000005-000011-001">
                <div>
                    <TableList
                        {...this.props}
                        handleSubmit={this.handleSubmit}
                        onSetting={this.onSetting}
                    />
                </div>
            </Functions>
        );
    }
}

export default Form.create()(App);
