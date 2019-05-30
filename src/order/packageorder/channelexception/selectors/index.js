import { createSelector } from 'reselect';
import { strTrim, getGangeGimes } from '@/util/baseTool';

const getListData = state => state.listdata;

/**
 * 转换列表数据
 */
export const parseListData = createSelector(
    [getListData],
    (lists) => {
        lists.list = lists.list ? lists.list.map((item) => {
            return item;
        }) : [];
        return lists;
    },
);

/**
 * 转换渠道获取/异常类型数据成TAGS公共组件所需格式
 */
export const formatToTags = data => {
    const newData = data.map(v => ({code: v.id, name: `${v.state}(${v.num})`}));
    newData.unshift({code: '', name: '全部'});
    return newData;
}

/**
 * 缓存数据处理
 */
export const revertFormPageCache = (params) => {
    const times = params.formData['range-time'];
    let momentData;
    if (times) {
        momentData = times.map((time) => moment(time));
        delete params.formData['range-time'];
    }
    return {
        formData: params.formData,
        momentData
    }
}

/**
 * 搜索条件处理
 */
export const filterSearchParams = (values) => {
    // 删除转仓/渠道修改中的四个字段
    delete values.channelCode;
    delete values.forecastFreight;
    delete values.packageCode;
    delete values.warehouseCode;
    // 销售账号
    if (values.sellerIds && values.sellerIds.length === 0) {
        delete  values.sellerIds;
    }
    // 搜索类型
    if (!values.searchContent) {
        delete values.searchType;
        delete values.searchContent;
    } else {
        const arr = values.searchContent.replace(/[\n]/g, ',').split(',');
        const newArr = arr.map(v => strTrim(v));
        values.searchContent = newArr;
    }
    // 渠道类型
    values.channelOnline = values.channelOnline[0];
    // 渠道获取
    values.channelGetStatus = values.channelGetStatus[0];
    // 异常类型
    values.newExceptionType = values.newExceptionType[0];
    const keys = Object.keys(values);
    for(let j = 0; j < keys.length; j++) {
        const i = keys[j];
        if (!values[i] && values[i] !== 0) {
            delete values[i];
        }
        // 销售平台
        if (i === 'platformCode' && values.platformCode ) {
            values.platformCode = values.platformCode[0].id;
        }
        // 物流渠道
        if (i === 'channelId' && values.channelId ) {
            values.channelId = values.channelId[0].id;
        }
        // 付款时间
        if (i == 'paymentTime' && values[i]) {
            values.paymentTime = getGangeGimes(values[i]);
        }
    }
}
