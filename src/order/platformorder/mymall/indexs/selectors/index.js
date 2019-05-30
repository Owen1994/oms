import { createSelector } from 'reselect';
import {timestampFromat, angentPicUrl} from '../../../../../util/baseTool'
import moment from 'moment';
import { message } from 'antd';

const getListData = state => state.listdata;

// 解析列表数据
const parseListData = createSelector(
    [getListData],
    (lists) => {
        lists.data = lists.data.map((item) => {
            item.key = item.platformOrderNumber;
            item.expireTime = timestampFromat(item.expireTime, 2);  //到期时间
            item.grapTime = timestampFromat(item.grapTime, 2);  //抓单时间
            item.markTime = timestampFromat(item.markTime, 2);  //标记时间
            item.orderTime = timestampFromat(item.orderTime, 2);  //下单时间
            item.realDeliverTime = timestampFromat(item.realDeliverTime, 2);  //实际发货时间
            item.productInfo.img = angentPicUrl(item.productInfo.img);  // 图片http -> https
            return item;
        });
        return lists;
    },
);

// 过滤搜索条件
export const parseSearchParams = (filter) => {
    if (!filter.searchContent) {
        delete filter.searchType;
        delete filter.searchContent;
    } else if (typeof filter.searchContent === 'string') {
        filter.searchContent = filter.searchContent.replace(/[\n]/g, ',').replace(/[\s]/g, '').split(',');
        if ( filter.searchContent.length >= 100 ){
            return message.info('最大支持100个订单号查询!');
        }
    }
    // 销售账号
    if (filter.sellerIds && !filter.sellerIds[0]) {
        delete filter.sellerIds;
    }
    // 发货类型
    filter.carrierType = filter.carrierType[0];
    // 是否推送
    filter.isPushedToOm = filter.isPushedToOm[0];
    for (let i in filter) {
        if (!filter[i] && filter[i] !== 0) {
            delete filter[i];
        }
        //下单时间
        if( i === 'orderTime' && filter.orderTime) {
            filter.orderTime = [new Date(filter.orderTime[0]).getTime(), new Date(filter.orderTime[1]).getTime()];
        }
        //付款时间
        if( i === 'deliverDeadline' && filter.deliverDeadline){
            filter.deliverDeadline = [new Date(filter.deliverDeadline[0]).getTime(), new Date(filter.deliverDeadline[1]).getTime()];
        }
        //抓单时间
        if( i === 'grapTime' && filter.grapTime){
            filter.grapTime = [new Date(filter.grapTime[0]).getTime(), new Date(filter.grapTime[1]).getTime()];
        }
    }
    return filter;
}

// 解析页面缓存时间信息数据
export const parseCacheTimeData = (params) => {
    let data = params;
    for (let i in data) {
        if(i.toLocaleLowerCase().indexOf('time') > -1 || i === 'deliverDeadline') {
            data[i] = data[i].map((time) => moment(time));
        }
    }
    return data;
}

export default parseListData;
