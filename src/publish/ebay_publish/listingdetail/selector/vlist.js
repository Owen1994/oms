/**
 * 作者: pzt
 * 描述: 模板信息(skuInfo)数据转换
 * 时间: 2018/8/31 15:57
 * @param <object> skuInfo 后台返回的原始数据
 **/
import { createSelector } from 'reselect'
import { angentPicUrl } from '../../../../util/baseTool'
const getVlist = state => state.vlist

const parseVimgs = createSelector(
    [getVlist],
    (vlist=[]) => {
        return vlist.map(item => {
            if(item.images){
                item.images = angentPicUrl(item.images);
                item._images = item.images;
            }
            if(item.img){
                item.img = angentPicUrl(item.img);
                item._img = item.img;
            }
            
            return item;
        });
    }
)

export default parseVimgs;
