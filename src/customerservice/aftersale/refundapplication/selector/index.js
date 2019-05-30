import { createSelector } from 'reselect';
import moment from 'moment';
import { returnGoodsType, refundModeType, refundStatusType, refundTypes } from '../constants';

const refundlist = state => state;
// 是否展示同意/拒绝退款按钮
const recordData = state => state;
// 处理筛选类型数据
const screenTypes = state => state;
// 根据id匹配数据项文字
const dataType = state => state.type;
const dataCode = state => state.code;
// 搜索参数过滤
const searchSelector = state => state;

export const screenTypeFilter = createSelector(
    [screenTypes],
    types => {
        let typeArr = types.map(item => ({
            ...item,
            code: +item.code,
            name: `${item.text}(${item.num})`
        }));
        // typeArr.unshift({
        //     code: 0,
        //     name: '全部'
        // })
        return typeArr;
    }
)

export const addChecked = createSelector(
    [refundlist],
    refunditem => {
        refunditem.forEach(item => {
            item.orderRefunds.forEach(element => {
                element.isChecked = false;
            });
        });
        return refunditem;
    }
)

export const getStateText = createSelector(
    [dataType, dataCode],
    (type, code) => {
        let operateData;
        let textWord = '';
        switch(type) {
            case 'returnGoodsType':
                operateData = returnGoodsType;
                break;
            case 'refundModeType':
                operateData = refundModeType;
                break;
            case 'refundStatus':
                operateData = refundStatusType;
                break;
            case 'refundType':
                operateData = refundTypes;
                break;
            default: 
                operateData = [];
                break;
        }
        operateData = operateData.find(item => item.code === code);
        if (operateData) {
            textWord = operateData.name;
        }
        return textWord;
    }
)

export const ifShowAgreenOrRefuse = createSelector(
    [recordData],
    recordItem => {
        let flag = true;
        if (recordItem.refundType && recordItem.refundReason && recordItem.refundAmount) {
                const fieldData = recordItem.fieldData;
                if (fieldData && fieldData.length) {
                    for (let i = 0; i < fieldData.length;i++) {
                        if (fieldData[i].isRequre === 2 && !fieldData[i].fieldValue) {
                            flag = false;
                            break;
                        }
                    }
                }
        } else {
            flag = false;
        }
        return flag;
    }
)

export const filterSeachData = createSelector(
    [searchSelector],
    values => {
        const orderTime = values.orderTime;
        const refundReasonId = values.refundReasonId;
        const refundAmountStart = values.refundAmountStart;
        const refundAmountEnd = values.refundAmountEnd;
        // 退款金额参数检验
        if (refundAmountStart && !refundAmountEnd) {
            values.refundAmount = [refundAmountStart];
        }
        if (refundAmountEnd && !refundAmountStart) {
            values.refundAmount = [0, refundAmountEnd];
        }
        if (refundAmountEnd && refundAmountStart) {
            values.refundAmount = [refundAmountStart, refundAmountEnd];
        }
        delete values.refundAmountStart;
        delete values.refundAmountEnd;
        // 时间参过滤
        if (orderTime) {
            const startTime = moment(orderTime[0]).startOf('days').unix();
            const endTime = moment(orderTime[1]).endOf('days').unix();
            values.orderTime = [startTime, endTime];
        }
        if (refundReasonId) {
            values.refundReasonId = refundReasonId[refundReasonId.length - 1];
        }
        return values;
    }
)
