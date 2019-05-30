import {
  createSelector
} from 'reselect'
import {
  timestampFromat,
} from "../../../../util/baseTool"
const getListData = state => state.listData
const transformDate = (listData) => {
  let {
    list
  } = listData;
  var str = "--"
  list.forEach((v, k) => {
    v.createTime && (v.createTime = timestampFromat(Number(v.createTime), 0))
    v.modifyTime && (v.modifyTime = timestampFromat(Number(v.modifyTime), 0))
    for (var i in v) {
      if (!v[i] && i != "daysToShip") {
        v[i] = str
      }
    }
    v.key = v.id
    v.platformCodeDesc = v.platformCode;
    if (v.platformCode === 'EBAY') {
      v.platformCodeDesc = 'eBay';
      v.paypalAccounts = v.paypalAccounts || [];
    }
  })
  return listData
}

export const getTransformDate = createSelector(
  [getListData],
  transformDate
)