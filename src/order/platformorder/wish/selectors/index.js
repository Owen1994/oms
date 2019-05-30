import {createSelector} from 'reselect'
import {timestampFromat, randNum} from '../../../../util/baseTool'

const getWishOrders = state => state.wishOrders;

export const parseWishOrders = createSelector(
    [getWishOrders],
    wishOrders => {
        wishOrders.data = wishOrders.data.map(item => {
            item.key = randNum();
            item.paymentTime = timestampFromat(item.paymentTime, 2, '-');  //付款时间
            item.grabTime = timestampFromat(item.grabTime, 2, '-');  //抓单时间
            item.operationTime = timestampFromat(item.operationTime, 2, '-');  //操作时间
            //平台订单状态转换
            switch (item.platformOrderState){
                case 1 : item.platformOrderState = '待发货'; break;
                case 2 : item.platformOrderState = '已发货'; break;
                case 3 : item.platformOrderState = '已退款'; break;
                case 4 : item.platformOrderState = '审核中'; break;
                default : item.platformOrderState = '--';
            }
            return item;
        });
        return wishOrders;
    }
);
