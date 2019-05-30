// 转换实体对象数据
export const parseCommonEntityDatas = (array = []) => {
    const result = { array: [], map: new Map() };
    result.array = parseLstShop(array, result.map);
    return result;
};

const parseLstShop = (array, map, index2 = 0) => array.map((item, index1) => {
    item.code = item.code;
    item.key = `${item.code}-${index1}-${index2}`;
    item.title = item.name;
    map.set(item.code, item.name);
    if (item.children) {
        item.children = parseLstShop(item.children, map, index1);
    }
    return item;
});

// 回显选择的数据
export const parseESEntityData = (checkArr, datas) => {
    resetDatas(datas);
    for (const code of checkArr) {
        queryDatas(code, datas);
    }
    let newArray = datas.filter(item => item.flag);
    newArray = filterDatas(newArray);
    return newArray;
};

const queryDatas = (code, datas) => {
    let flag = false;
    for (const item of datas) {
        if (item.key === code) {
            flag = true;
            item.flag = true;
            break;
        }
        if (item.children) {
            flag = queryDatas(code, item.children);
            if (!item.flag) {
                item.flag = flag;
            }
        }
    }
    return flag;
};

const resetDatas = (datas) => {
    for (const item of datas) {
        item.flag = false;
        if (item.children) {
            return resetDatas(item.children);
        }
    }
};

const filterDatas = (datas) => {
    const array = [];
    for (const item of datas) {
        if (item.flag) {
            array.push(item);
            if (item.children) {
                item.children = filterDatas(item.children);
            }
        }
    }
    return array;
};


export const parseESEntityCheckArray = (array) => {
    const result = [];
    parseCheck(array, result);
    return result;
};

const parseCheck = (datas, result) => {
    for (const item of datas) {
        if (item.children) {
            parseCheck(item.children, result);
        } else {
            result.push(item.key);
        }
    }
};
