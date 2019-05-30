import { createSelector } from 'reselect'

const fieldData = state => state;

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
