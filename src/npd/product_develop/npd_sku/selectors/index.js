export const parseList = (result) => {
    const list = result.list || [];
    result.list = list.map((item,  index) => {
        item.key = item.skuId;
        if(!item.dimensionHeight) {
            item.dimensionHeight = ''
        }
        if(!item.dimensionLength) {
            item.dimensionLength = ''
        }
        if(!item.dimensionWidth) {
            item.dimensionWidth = ''
        }
        if(!item.dimensionUnit) {
            item.dimensionUnit = ''
        }
        item.permissions&&item.permissions.forEach(it => {
            if(it.code === 'batch_confirm') {
                item.pchecked = 1
                return false;
            }
        })
        return item;
    })
    return result;
}
