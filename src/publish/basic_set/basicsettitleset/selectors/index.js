import { createSelector } from 'reselect'
import { timestampFromat } from '../../../../util/baseTool'

const getTitles = state => state.titles


export const parseTitles = createSelector(
  [getTitles],
  titles => {
    var line = "--"
    titles.list = titles.list.map(item => {
      item.key = item.id;
      if(item.createTime){
        item.createTime = timestampFromat(Number.parseInt(item.createTime, 10),0)
      }
      if(item.modifyTime){
        item.modifyTime = timestampFromat(Number.parseInt(item.modifyTime, 10),0)
      }
      for(let k in item){
        if(!item[k] && "titlePrefix" != k && "titleSufix" != k){
          item[k] = line
        }
      }
      return item;
    })
    return titles
  }
)