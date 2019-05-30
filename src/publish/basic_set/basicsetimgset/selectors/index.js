import { createSelector } from 'reselect'
import { timestampFromat } from '../../../../util/baseTool'
const getGallers = state => state.gallery

/**
 * 图库设置列表数据转换
 */
export const parseGallers = createSelector(
  [getGallers],
  gallerys => {
    gallerys.list = gallerys.list.map((gallery, index) => {
      if(gallery.createTime){
        gallery.createTime = timestampFromat(Number.parseInt(gallery.createTime, 10),0)
      }else {
        gallery.createTime = '--'
      }
      if(gallery.modifyTime) {
        gallery.modifyTime = timestampFromat(Number.parseInt(gallery.modifyTime, 10),0)
      }else{
        gallery.modifyTime = '--'
      }
      for(let k in gallery){
        if(!gallery[k]){
          gallery[k] = '--'
        }
      }
      gallery.key = gallery.id
      if(gallery.imgTypes && typeof gallery.imgTypes === 'string'){
        try {
          gallery.imgTypes = JSON.parse(gallery.imgTypes)
        }catch(err){
          gallery.imgTypes = []
        }
        gallery.imgTypes = gallery.imgTypes.map((ga, i) => {
          ga.key = Date.now() + i
          return ga
        })
        gallery.imgTypes.sort((a,b)=>{
          return a.level - b.level
        })
        if(gallery.imgTypes.length > 0){
          gallery.imgTypesDesc = gallery.imgTypes.map(imgType => imgType.imgType).join('，')
        }
      }
      return gallery
    })
    return gallerys
  }
)