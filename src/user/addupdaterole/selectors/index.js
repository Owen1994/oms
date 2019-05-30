export const parseLstOwnerInfoData = (data) => {
    const {createBy, lstOwnerInfo } = data;
    if (!createBy || !lstOwnerInfo || lstOwnerInfo.length < 1) {
        return data
    }
    const obj = { };
    for(let i = 0; i < lstOwnerInfo.length; i++) {
        const item = lstOwnerInfo[i];
        if (!obj[item.userName]) {
            obj[item.userName] = i+1;
        }
    }
    const index = obj[createBy] - 1;
    if (index >= 0) {
        const fItem = lstOwnerInfo.splice(index, 1);
        lstOwnerInfo.splice(0,0, fItem[0]);    
    }
    return data;
}