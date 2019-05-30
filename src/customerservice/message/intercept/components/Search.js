import React from 'react';
import HightSearch from './HightSearch';

/**
 *作者: zhj
 *功能描述:  消息拦截搜索
 *时间: 2018/8/27 15:55
 */
export default class Search extends React.Component {
    render() {
        return (
            <div className="breadcrumb overflow-hidden position-relative">
                <HightSearch {...this.props} />
            </div>
        );
    }
}
