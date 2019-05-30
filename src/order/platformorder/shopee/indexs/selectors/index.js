import {createSelector} from 'reselect'
import {timestampFromat} from '../../../../../util/baseTool'

const getshopeeList = state => state.shopeeList;

export const parseshopeeList = createSelector(
    [getshopeeList],
    shopeeList => {
        shopeeList.list = shopeeList.list.map(item => {
            item.payTime = timestampFromat(item.payTime, 2);  //	付款时间
            item.grapTime = timestampFromat(item.grapTime, 2);  //抓单时间
            item.orderTime = timestampFromat(item.orderTime, 2);  //	下单时间
            item.deliveryDeadline = timestampFromat(item.deliveryDeadline, 2);  //发货截止日期
            return item;
        });
        return shopeeList;
    }
);