import { createSelector } from 'reselect';
import { timestampFromat } from '../../../../util/moment';

const data = state => state.data;
/**
 * 描述列表数据转换
 */
export const parsedataListData = createSelector(
    [data],
    (data) => {
        let list = data.list;
        list = list.map((item) => {

            item.orderNumber = item.orderNumber || '--';
            item.trackNum1 = item.trackNum1 || '--';
            item.destCountry = item.destCountry || '--';
            item.logisticsChannel = item.logisticsChannel || '--';
            item.logisticsService = item.logisticsService || '--';
            item.packageState = item.packageState || '无';
            item.platform = item.platform || '--';
            item.shipmentsTime = item.shipmentsTime || '--';
            item.trackNum = item.trackNum || '--';
            
            if (item.shipmentsTime !== '--') {
                item.shipmentsTime = timestampFromat(item.shipmentsTime, 'yyyy-mm-dd hh:MM');
            }

            item.trajectoryState = item.trajectoryState || '上网';
            item.trajectoryStateTimes = item.trajectoryStateTimes || [];
            item.trajectoryStateTimes = item.trajectoryStateTimes.map((item2) => {
                item2.value = timestampFromat(item2.value, 'yyyy-mm-dd hh:MM');
                return item2;
            });

            return item;
        });
        return data;
    },
);

export const conversionData = (data) => {
    if (data.goERPTime) {
        data.goERPTime = timestampFromat(data.goERPTime, 'yyyy-mm-dd hh:MM');
    } else {
        data.goERPTime = '--';
    }

    if (data.ordrePrintTime) {
        data.ordrePrintTime = timestampFromat(data.ordrePrintTime, 'yyyy-mm-dd hh:MM');
    } else {
        data.ordrePrintTime = '--';
    }

    if (data.payTime) {
        data.payTime = timestampFromat(data.payTime, 'yyyy-mm-dd hh:MM');
    } else {
        data.payTime = '--';
    }

    if (data.trackNum1Time) {
        data.trackNum1Time = timestampFromat(data.trackNum1Time, 'yyyy-mm-dd hh:MM');
    } else {
        data.trackNum1Time = '--';
    }

    data.ordermMoney = data.ordermMoney || '--';
    data.packageType = data.packageType || '--';
    data.salesAccount = data.salesAccount || '--';
    data.trackType = data.trackType || '--';
    data.warehouse = data.warehouse || '--';
    
    return data;
}

