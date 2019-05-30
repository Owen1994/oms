import {createSelector} from 'reselect'
import {timestampFromat} from '../../../../../util/baseTool'

const getEbayOrders = state => state.ebayOrders;

export const parseEbayOrders = createSelector(
    [getEbayOrders],
    ebayOrders => {
        ebayOrders.list = ebayOrders.list.map(item => {
            item.deliveryTime = timestampFromat(item.deliveryTime, 2);  //发货时间
            item.orderCacheTime = timestampFromat(item.orderCacheTime, 2);  //抓单时间
            item.orderTime = timestampFromat(item.orderTime, 2);  //	下单时间
            item.payTime = timestampFromat(item.payTime, 2);  //付款时间
            return item;
        });
        return ebayOrders;
    }
);