import { createSelector } from 'reselect'

// 处理计算入参
const submitData = state => state;

const fieldData = state => state;

// 描述模板列表数据转换
export const filterSubmitData = createSelector(
    [submitData],
    submitData => {
        submitData.skus = submitData.skus.split('\n');
        submitData.type = 2;
        return { data: submitData };
    }
)

// 处理平台和站点select的字段名code,name
export const changeFieldName = createSelector(
    [fieldData],
    fieldData => {
        if (fieldData) {
            return [{
                code: fieldData[0].key,
                name: fieldData[0].label,
            }]
        }
        return [{}];
    }
)
