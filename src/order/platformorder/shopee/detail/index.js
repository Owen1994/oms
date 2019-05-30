/**
 *作者: 陈文春
 *功能描述:  ebay订单抓单详情
 *时间: 2018/11/20 09:42
 */
import React from 'react'
import App from './containers'
import Functions from '@/components/functions'

export default class Entrance extends React.Component {
    render() {
        return (
            <Functions isPage={true} {...this.props} functionkey={'001-000001-000007-000001-001'}>
                <App />
            </Functions>
        );
    }
}
