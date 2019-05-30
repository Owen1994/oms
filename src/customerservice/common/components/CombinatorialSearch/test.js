import React from 'react';
import CombinatorialSearch from './index';

// 配合公共组件TextSearch的组合搜索
export default class Treelist extends React.Component {
    render() {
        return (
            <CombinatorialSearch
                {...this.props}
                data={searchType}
            />
        );
    }
}
// eg:searchType示例
export const searchTypes = [
    {
        id: 1,
        name: '卖家账号',
        type: 2,
        field: 'accountName', // 要上传的字段名
    }, {
        id: 2,
        name: '收件人',
        type: 2,
        field: 'addressee',
    }, {
        id: 3,
        name: '发件人',
        type: 2,
        field: 'sender',
    },
];
