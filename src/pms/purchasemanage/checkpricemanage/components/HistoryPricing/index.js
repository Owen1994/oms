import React from 'react';
import Search from './Search';
import TableList from './TableList';
import Functions from '../../../../../components/functions';

/**
 *作者: huangjianfeng
 *功能描述: 核价管理
 *时间: 2018/10/11 15:55
 */
class App extends React.Component {
    render() {
        return (
            <Functions
                isPage
                {...this.props}
                functionkey="010-000003-000002-007"
            >
                <div className="unordered-purchase">
                    <Search
                        {...this.props}
                    />
                    <TableList
                        {...this.props}
                    />
                </div>
            </Functions>
        );
    }
}
export default App;
