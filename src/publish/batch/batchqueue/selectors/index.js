import { createSelector } from 'reselect'

const getListData = state => state.listData;

export const parseListData = createSelector(
  [getListData],
  listData => {
    // let { total, list } = listData;
    if (listData.list) {
      listData.list = listData.list.filter(item => item.id)
    }
    return listData
  }
)
