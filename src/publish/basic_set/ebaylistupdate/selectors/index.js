import { createSelector } from 'reselect'
import { timestampFromat } from '../../../../util/baseTool'

const getUpdates = state => state.updates


export const parseUpdates = createSelector(
  [getUpdates],
  updates => {
    updates.list = updates.list.map(item => {
      item.key = item.id;
      item.createdTime = timestampFromat(item.createdTime, 2);
      item.modifiedTime = timestampFromat(item.modifiedTime, 2);
      return item;
    })
    return updates
  }
)