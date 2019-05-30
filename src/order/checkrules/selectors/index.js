import {createSelector} from 'reselect'
import {timestampFromat} from '../../../util/baseTool'

const getCheckrules = state => state.checkrules;

export const parseCheckRules = createSelector(
    [getCheckrules],
    checkrules => {
        checkrules.data = checkrules.data.map(item => {
            item.key = item.ruleId;
            item.modifiedTime = timestampFromat(item.modifiedTime, 2, '-');  //最后更新时间
            return item;
        });
        return checkrules;
    }
);