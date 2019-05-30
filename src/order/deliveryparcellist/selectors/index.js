import { getGangeGimes } from 'util/baseTool';
import moment from 'moment';
import { message } from 'antd'

export const filterSearchParams = (values) => {
    if (!values.searchContent) {
        delete values.searchType;
        delete values.searchContent;
    } else {
        values.searchContent = values.searchContent.replace(/[\n]/g, ',').replace(/[\s]/g, '');
    }
    // 订单来源
    if (values.orderType) {
        values.orderType = values.orderType[0];
    }
    // 是否负利润
    if(values.isProfit) {
        values.isProfit = values.isProfit[0];
    }
    // 是否偏远
    if(values.isFaraway) {
        values.isFaraway = values.isFaraway[0];
    }
    // 分仓状态
    if (values.warehouseState) {
        values.warehouseState = values.warehouseState[0];
    }
    for (let i in values) {
        if (!values[i] && values[i] !== 0) {
            delete values[i];
        }
        // 销售平台
        if (i === 'platformName' && values.platformName ) {
            if (Array.isArray(values.platformName)) {
                values.platformName = values.platformName[0].id;
            }
        }
        // 物流渠道
        if (i === 'logisticsBusiness' && values.logisticsBusiness ) {
            values.logisticsBusiness = values.logisticsBusiness[0].id;
        }
        // 发货仓库
        if (i === 'warehouseDeliver' && values.warehouseDeliver ) {
            values.warehouseDeliver = values.warehouseDeliver[0].id;
        }
        // 国家全称
        if (i === 'countryId' && values.countryId ) {
            values.countryId = values.countryId[0].id;
        }
        // 老ERP状态
        if (i === 'erpStatus' && values.erpStatus ) {
            values.erpStatus = values.erpStatus[0].id;
        }

        if (values.planUploadTimes) {
            const firstTime = (values.planUploadTimes[0]).valueOf();
            const secondTime = (values.planUploadTimes[1]).valueOf();

        }
        // 付款时间
        if (i == 'range-time' && values[i]) {
            const arr = getGangeGimes(values[i])
            values['paymentStartTime'] = arr[0] ? arr[0] : '';
            values['paymentEndTime'] = arr[1] ? arr[1] : '';
            delete values['range-time'];
        }
        // 抓单时间
        if (values['grabTime'] && values['grabTime'].length > 0) {
            values['grabTime'] = getGangeGimes(values['grabTime']);
        } else {
            delete values['grabTime'];
        }
    }
}

export const revertFormPageCache = (params) => {
    let times = null, momentData;
    if(params.formData['range-time']){
        times = params.formData['range-time'];
    }else if(params.formData['grabTime']){
        times = params.formData['grabTime']
    }
    if (times) {
        momentData = times.map((time) => moment(time));
    }
    return {
        formData: params.formData,
        momentData
    }
}
