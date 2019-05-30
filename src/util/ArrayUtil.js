/**
 * 数组对象去重
 * @param {*} array 要去重的数组 
 * @param {*} key 要比较的key字段
 */
export const repeatArrayWithObj = (array = [], key) => {
    const repeatObj = {}, newArray = [];
    for(let i = 0;i < array.length; i++) {
        if (repeatObj[array[i].userName] >= 0) {
            continue;
        }
        repeatObj[array[i][key]] = i;
        newArray.push(array[i]);
    }
    return newArray;
}

/**
 * 单个字符串或者数字内容去重
 * @param {*} array 要去重的数组
 */
export const repeatArrayWithSingle = (array = []) => {
    return Array.from(new Set(array));
}