import { createSelector } from 'reselect'
import { timestampFromat } from '../../../../util/baseTool'

const getSkus = state => state.skus


export const parseSkus = createSelector(
  [getSkus],
  skus => {
    var line = "--";
    skus.list = skus.list.map(item => {
      item.key = item.id;
      if(item.createTime){
        item.createTime = timestampFromat(Number.parseInt(item.createTime, 10),0)
      }
      if(item.modifyTime){
        item.modifyTime = timestampFromat(Number.parseInt(item.modifyTime, 10),0)
      }
      for(let k in item){
        if(!item[k] && "skuPrefix" != k && "skuSufix" != k ){
          item[k] = line
        }
      }

      return item;
    })
    return skus
  }
)