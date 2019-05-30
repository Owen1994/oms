import React from 'react';
import {
    Form,
} from 'antd';
import Search from './Search';
import TableList from './TableList';
import { fetchPost } from '../../../../util/fetch';
import { SCAN_CARD_NUMBER } from '../constants/Api';

/**
 * 三无产品退件
 */
class App extends React.Component {
    /**
     * 搜索
     */
    onSubmit = () => {
        this.props.form.validateFields((err, value) => {
            if (err) {
                return;
            }
            fetchPost(SCAN_CARD_NUMBER, { data: value }, 1)
                .then((result) => {
                    if (result.state === '000001') {
                        this.tableRef.onFocus();
                    }
                });
        });
    };

    render() {
        return (
            <div>
                <Search
                    onSearchListener={this.onSubmit}
                    {...this.props}
                />
                <TableList
                    ref={(ref) => {
                        this.tableRef = ref;
                    }}
                    {...this.props}
                />
            </div>
        );
    }
}

export default Form.create()(App);
