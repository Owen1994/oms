import { createSelector } from 'reselect'
import { timestampFromat } from '../../../../util/baseTool'

const getRules = state => state.rules


export const parseRules = createSelector(
  [getRules],
  rules => {
    rules.list = rules.list.map(item => {
      item.key = item.id;
      item.createdTime = timestampFromat(item.createdTime, 2);
      item.modifiedTime = timestampFromat(item.modifiedTime, 2);
      return item;
    })
    return rules
  }
)