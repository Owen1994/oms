import { parsePdType } from '../../../selector'
export const parseList = (data) => {
    if(!data.list){
        return {list: []}
    }
    data.list = data.list.map((item, index) => {
        item.key = index;
        item.ntsTypeDesc = parsePdType(item.ntsType)
        item.isNtsRecordDesc = item.isNtsRecord===1?'是':'否'
        item.isSupplierRecordDesc = item.isSupplierRecord===1?'是':'否'
        return item;
    });
    return data;
}
