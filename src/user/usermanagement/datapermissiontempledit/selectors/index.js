export const parsePlatformListToTree = (array = []) => {
    const result = { array: [], map: new Map() };
    result.array = parseLstShop(array, result.map);
    return result;
};

const parseLstShop = (array, platformMap) => array.map((item) => {
    item.key = item.platformId;
    item.title = item.platformName;
    platformMap.set(item.platformId, item.platformName);
    const platformObj = { platformId: item.platformId, platformName: item.platformName };
    if (item.lstShop) {
        item.children = parseAccountMap(item.lstShop, platformMap, platformObj);
    }
    return item;
});

const parseAccountMap = (array, accountMap, platformObj) => array.map((item) => {
    item.key = item.shopId;
    item.title = item.shopName;
    const result = { ...platformObj };
    result.shopId = item.shopId;
    result.shopName = item.shopName;
    accountMap.set(result.shopId, result);
    return item;
});

// 新方法重构
export const sysRuleArrToMap = (list) => {
    const sysMap = new Map();
    list.forEach((item1) => {
        if (item1.lstDataRuleSys && item1.lstDataRuleSys.length > 0) {
            item1.lstDataRuleSys.forEach((item2) => {
                const ruleMap = new Map();
                const sysKey = item2.sysKey;
                sysMap.set(sysKey, ruleMap);
                if (item2.row && item2.row.subWhereClause) {
                    item2.row.subWhereClause.forEach((item3) => {
                        const entityCode = item3.entityCode;
                        delete item3.operValues;
                        item3.operValuesArr = item3.operValuesArr || [];
                        // if(item3.operValuesArr){
                        item3.operValuesArr = item3.operValuesArr.map((item4) => {
                            if (typeof item4 === 'string') {
                                item4 = JSON.parse(item4);
                            }
                            return item4;
                        });
                        // }
                        ruleMap.set(entityCode, item3);
                    });
                }
            });
        }
    });
    return sysMap;
};

// 初始化选中项的数据
export const operValuesArrToCheckArr = (array) => {
    const result = [];
    array.forEach((item1) => {
        if (item1.lstShop) {
            item1.lstShop.forEach((item2) => {
                result.push(item2.shopId);
            });
        }
    });
    return result;
};

// 插入到显示数据列表
export const checkArrToOperValueArr = (checkArr, sourceMap) => {
    const result = [];
    const map = new Map();
    checkArr.forEach((item) => {
        const obj = sourceMap.get(item);
        if (map.get(obj.platformId) >= 0) {
            const index = map.get(obj.platformId);
            const lstShop = result[index].lstShop;
            lstShop.push({ shopId: obj.shopId, shopName: obj.shopName });
        } else {
            map.set(obj.platformId, result.length);
            result.push({
                platformId: obj.platformId,
                platformName: obj.platformName,
                lstShop: [{ shopId: obj.shopId, shopName: obj.shopName }],
            });
        }
    });
    return result.filter(item => item.platformId);
};

// // 组拼发送参数
// export const parselstDataRule = (userNames, dataMap, sysStateArr) => {
//     const item = parseSaveParams(dataMap, sysStateArr);
//     return userNames.map((userName) => {
//         const obj = { userName, lstDataRuleSys: item };
//         return obj;
//     });
// };
// // 组拼保存参数
// export const parseSaveParams = (dataMap, sysStateArr) => {
//     const sysKeys = Array.from(dataMap.keys());
//     return sysKeys.map((sysKey) => {
//         let sysName = '';
//         for (const item of sysStateArr) {
//             if (item.sysKey === sysKey) {
//                 sysName = item.sysName;
//                 break;
//             }
//         }
//         const subWhereClause = Array.from(dataMap.get(sysKey).values()).map((item) => {
//             if (!item.fieldCode) {
//                 item.fieldCode = item.entityCode.replace(/^E/, 'F');
//             }
//             item.operValuesArr = item.operValuesArr.map(item1 => JSON.stringify(item1));
//             return item;
//         });
//         const item = { sysKey, sysName, row: { isAnd: 1, subWhereClause } };
//         return item;
//     });
// };

// 解析已选方案数据
export const parsePlanData = (array = []) => {
    const sysMap = new Map();
    array.forEach((item2) => {
        const ruleMap = new Map();
        const sysKey = item2.sysKey;
        sysMap.set(sysKey, ruleMap);
        if (item2.row && item2.row.subWhereClause) {
            item2.row.subWhereClause.forEach((item3) => {
                const entityCode = item3.entityCode;
                delete item3.operValues;
                item3.operValuesArr = item3.operValuesArr || [];
                item3.operValuesArr = item3.operValuesArr
                    .filter(item => item)
                    .map((item4) => {
                        if (typeof item4 === 'string') {
                            item4 = JSON.parse(item4);
                        }
                        return item4;
                    });
                ruleMap.set(entityCode, item3);
            });
        }
    });
    return sysMap;
};
