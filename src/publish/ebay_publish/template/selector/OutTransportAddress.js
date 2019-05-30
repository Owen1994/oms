import { createSelector } from 'reselect'

const getOutTransportAddress = state => state.transportAllData.outTransportAddress;
/**
 * 描述模板列表数据转换
 */
export const parseOutTransportAddress = createSelector(
    [getOutTransportAddress],
    outTransportAddress => {
        if(outTransportAddress.data.length > 0){
            outTransportAddress.data=  outTransportAddress.data.map((item,index) => {
                item.key = index;
                item.locationCodeArr = item.locationCodeArr || [];
                let flag = true;
                item.locationCodeArr = item.locationCodeArr.map(it => {
                    if(!it.checked){
                        it.checked = false;
                        flag = false;
                    }
                    return it
                });
                item.checked = flag;
                return item
            });
        }
        return outTransportAddress;
    });

export const parseOutTransportAddressFormParams = (data) => {
    let result = [];
    data.data.forEach(item => {
        // const dObj = { locationCode: item.locationCode };
        const locationCodeArr = item.locationCodeArr
                                .filter(it => it.checked)
                                .map(it => {
                                    return  {locationCode:it.locationCode}
                                });
        // return result;
        if(locationCodeArr.length > 0) {
            result.push({regionCode: item.regionCode, locationCodeArr})
        }
    });
    return result;
};
