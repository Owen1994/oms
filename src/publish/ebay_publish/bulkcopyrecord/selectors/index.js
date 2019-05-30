import { createSelector } from 'reselect'
import { timestampFromat } from '../../../../util/baseTool'

const getRecords = state => state.records


export const parseRecords = createSelector(
  [getRecords],
  records => {
    if(!records){ //records为null时，避免出现白屏
      records = {};
    }
    records.data = records.data ? records.data.map(item => {
      let txt1, txt2;
      item.key = item.id;
      item.createdTime = timestampFromat(item.createdTime, 2);
      item.finishTime = timestampFromat(item.finishTime, 2);
      switch (item.duplicationStrategy) {
        case 0: txt1 = '跳过'; break;
        case 1: txt1 = '新增'; break;
        default: txt1 = '--';
      }
      item.duplicationStrategy = txt1;
      switch (item.cpStatus) {
        case 0: txt2 = '待处理'; break;
        case 1: txt2 = '处理中'; break;
        case 2: txt2 = '已完成'; break;
        default: txt2 = '--';
      }
      item.cpStatus = txt2;
      return item;
    }) : [];
    return records
  }
)
