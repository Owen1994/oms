// 组拼发送参数
export const parselstDataRule = (userNames, dataMap, sysStateArr) => {
    const item = parseSaveParams(dataMap, sysStateArr);
    const data = { lstUserName: userNames, lstDataRuleSys: item };
    return { data }
};


// 组拼保存参数
export const parseSaveParams = (dataMap, sysStateArr) => {
    const sysKeys = Array.from(dataMap.keys());
    return sysKeys.map((sysKey) => {
        let sysName = '';
        for (const item of sysStateArr) {
            if (item.sysKey === sysKey) {
                sysName = item.sysName;
                break;
            }
        }
        const subWhereClause = Array.from(dataMap.get(sysKey).values()).map((item) => {
            if (!item.fieldCode) {
                item.fieldCode = item.entityCode.replace(/^E/, 'F');
            }
            item.operValuesArr = item.operValuesArr.map(item1 => JSON.stringify(item1));
            return item;
        });
        const item = { sysKey, sysName, row: { isAnd: 1, subWhereClause } };
        return item;
    });
};
