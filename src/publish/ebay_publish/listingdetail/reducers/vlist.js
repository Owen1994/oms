import * as types from "../constants/reducerTypes";
import defaultUrl from '../../../common/constants/imgs/default.png'

let upcOrEanObj;
export const vlist = (state = [{key: Date.now()}] //dataSource
    , action) => {
    switch (action.type){
        case types.ADD_VLISTITEM:
            if(upcOrEanObj){
                const upcOrEan = upcOrEanObj['UPC'] ? 'UPC' : 'EAN';
                let upcOrEanVal = '';
                upcOrEanVal = upcOrEanObj['UPC'] ? upcOrEanObj['UPC'] : upcOrEanObj['EAN'];
                state.push({key: Date.now(), [upcOrEan]: upcOrEanVal});
            }else{
                state.push({key: Date.now()});
            }
            return [...state];
        case types.DEL_VLISTITEM: // index
            state.splice(action.index,1);
            return [...state];
        case types.EDIT_VLISTITEM: // index key value
            const specificName = action.vrelationship;
            if(specificName === action.key){ // 修改主图属性修改图片
                let imgUrl = '';
                for(let i = 0; i < state.length; i++){
                    const item = state[i];
                    if(item[action.key] === action.value){
                        if(item.images){
                            imgUrl = item.images;
                            break;
                        }
                    }
                }
                state[action.index].images = imgUrl;
            }
            state[action.index][action.key] = action.value;
            return [...state];
        case types.EDIT_VLISTALL:
            state.map(item=>{
                item[action.key] = action.value
            })
            return [...state]
        case types.EDIT_VAR_LISTING:
            action.value.forEach(item => {
                state.forEach(ele => {
                    if (item.sellerSku === ele.sku) {
                        ele.startPrice = item.price;
                    }
                })
            })
            return [...state]
        case types.UPLOAD_VIMG:// propsName propsVal picUrl
            state.map(item=>{
                if(item[action.propsName] === action.propsVal){
                    item.images = action.picUrl
                }
                return item
            })
            return [...state];
        case types.DEL_VPROPSNAME: // index, propsName
            state.map(item=>{
                delete item[action.propsName];
                return item
            })
            return [...state];
        case types.EDIT_VPROPSNAME: // index key value oldSpecificName specificName  data
            const resData = action.data;
            if(resData && resData.length > 0){
                resData.forEach(v=>{
                    state.map(_v=>{
                        if(!_v[v.mainSpecificName]){
                            _v.images = defaultUrl
                            return _v
                        }
                        if(_v[v.mainSpecificName] && _v[v.mainSpecificName] === v.mainSpecificValue){
                            _v.images = v.pic
                            return _v
                        }
                    })
                })
            }
            return [...state];
        case types.SWITCH_SITE:
            // 切换站点时  加入upcOrEan
            state.map(item=>{
                item[action.upcOrEan] =  action.upcOrEanVal;
                upcOrEanObj = {[action.upcOrEan]: action.upcOrEanVal};
                return item
            })
            return [...state]
        case types.INIT_UPCOREAN:
            // 编辑初始化
            state.map(item=>{
                item[action.upcOrEan] =  action.upcOrEanVal;
                upcOrEanObj = {[action.upcOrEan]: action.upcOrEanVal};
                return item
            })
            return [...state]
        case types.LOADING_SKUINFO:
            const {data} = action.data;
            const {variationInfo} = data;
            state = getVlist(variationInfo);
            return state
        case types.LISTING_DETAIL_DATA_FETCH:
            let skuInfo = action.data.skuInfo;
            state = getVlist(skuInfo.variationInfo);
            return state;
        case types.RESET_DETAIL_DATA:
            return [{key: Date.now()}]
        default:
            return state
    }
};

export const delVlist  = (state =[],action)=>{
    switch(action.type){
        case types.SAVE_DEL_VLISTITEM:
            state.push(action.payload)
            return [...state]
        default :
            return state
    }
}

const getVlist = (variationInfo)=>{   // 获取多属性列表数据
    if(variationInfo && variationInfo.variationDetail){
        let variationDetail = variationInfo.variationDetail;
        return variationDetail.map((item,index)=>{
            if(!item.key){
                item.key = index
            }
            item.variationSpecificsJson = JSON.parse(item.variationSpecificsJson);
            return {...item, ...item.variationSpecificsJson}
        })
    }
    return [{key: Date.now()}]
}
