import { getGangeGimes } from 'util/baseTool';
import moment from 'moment';
import {
    message,
} from 'antd';

export const filterSearchParams = (values) => {
    delete values.auditStatus;
    if (values.saleAccount) {
        if (values.saleAccount.length === 0) {
            delete  values.saleAccount;
        }
    }
    if (!values.searchContent) {
        delete values.searchType;
        delete values.searchContent;
    } else {
        values.searchContent = values.searchContent.replace(/[\n]/g, ',').replace(/[\s]/g, '');
    }
    
    // 试算包裹利润
    if ((values.profitMin || Number(values.profitMin) === 0) && (values.profitMax || Number(values.profitMax) === 0)) {
        if (values.profitMin > values.profitMax) {
            message.warning("试算包裹利润查询须后者大于前者");
            delete values.profitMin;
            delete values.profitMax;
        }
    } else if (values.profitMin && !values.profitMax || !values.profitMin && values.profitMax) {
        message.warning("请填写完整试算包裹利润");
        delete values.profitMin;
        delete values.profitMax;
    }

    values.exceptionType = values.exceptionType[0];
    const keys = Object.keys(values);
    for(let j = 0; j < keys.length; j++) {
        const i = keys[j];
        if (!values[i] && values[i] !== 0) {
            delete values[i];
        }
        // 销售平台
        if (i === 'platformId' && values.platformId ) {
            values.platformId = values.platformId[0].id;
        }
       
        // 销售账号
        // if (i === 'saleAccount' && values.saleAccount ) {
        //     values.saleAccount = values.saleAccount.map(item =>{
        //         return item.id;
        //     });
        // }
        // 物流渠道
        if (i === 'logisticsChannel' && values.logisticsChannel ) {
            values.logisticsChannel = values.logisticsChannel[0].id;
        }
        // 国家全称
        if (i === 'countryId' && values.countryId ) {
            values.countryId = values.countryId[0].id;
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