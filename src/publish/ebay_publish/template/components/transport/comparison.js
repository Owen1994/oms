import { deepCopyobject } from '../../../../../util/baseTool'
const comparisonArray = (n, o, field) => {
    // debugger;
    // 空数组  和  null undefined 都相同
    if ((!n && !o) || n && !n.length && !o || o && !o.length && !n || (!n.length && !o.length)) return true;
    if (n.length !== o.length) return false;
    let nObj = {};
    n.forEach(v => {
        nObj[v[field]] = true
    })
    for (let j = 0; j < n.length; j++) {
        if (!nObj[o[j][field]]) return false
    }
    return true

}

// 获取格式化后的 排除运输地区
export const getExcludeShipToLocationArr = (arr) => {
    const obj = {};
    arr = arr || [];
    for (let i = 0; i < arr.length; i++) {
        let key = arr[i].regionCode;
        if (!obj[key]) {
            obj[key] = {
                regionCode: key,
                locationCodeArr: []
            }
        }
        obj[key].locationCodeArr.push(...arr[i].locationCodeArr)
    }
    return obj
}
// 比较是否相同 ；  相同为 true  不同 为false；
export const comparisonExcludeShipToLocationArr = (n, o) => {
    let nKey = Object.keys(n);
    let oKey = Object.keys(o);
    if (nKey.length !== oKey.length) return false;
    for (let i = 0; i < nKey.length; i++) {
        let k = nKey[i];
        if (!o[k]) return false;
        let nlocationArr = n[k].locationCodeArr
        let olocationArr = o[k].locationCodeArr
        let flag = comparisonArray(nlocationArr, olocationArr, "locationCode")
        if (!flag) return false
    }
    return true
}

export const comparisonDomesticShippingPolicyInfoServiceArr = (n, o) => {
    if ((!n && !o) || (!n.length && !o.length)) return true
    if (n.length !== o.length) return false;
    let keys = Object.keys(n[0]);
    for (let i = 0; i < n.length; i++) {
        for (let j = 0; j < keys.length; j++) {
            let key = keys[j];
            if (key === "key") {
                continue
            } else if (key === 'shippingService') {
                if ((n[i][key] && (!o[i][key] || !o[i][key].code)) || n[i][key] !== o[i][key].code) return false
            } else if (n[i][key] !== o[i][key]) return false;
        }
    }
    return true
}

const comparisonIntlShippingPolicyInfoServiceArr = (n, o) => {
    if ((!n && !o) || (!n.length && !o.length)) return true
    if (n.length !== o.length) return false;
    let keys = Object.keys(n[0]);
    for (let i = 0; i < n.length; i++) {
        for (let j = 0; j < keys.length; j++) {
            let key = keys[j];
            if (key === "key") continue;
            let no = n[i][key]
            let oo = o[i][key]
            if (key === 'shippingService') {
                if ((!no && !oo) || (no && oo && no !== oo.code)) return false
            } else if (key === 'shipToLocationsArr') {
                if ((n[i].shipToLocationType !== "0" || o[i].shipToLocationType !== "0") && !comparisonArray(no, oo, "locationCode")) {
                    return false
                }
            } else if (no !== oo) {
                return false;
            }
        }
    }
    return true
}
const comparisonShipToLocationsType = (n, o) => {
    for (let i = 0; i < n.length; i++) {
        if (n[i].shipToLocationType !== '0' || o[i].shipToLocationType !== '0') return true;
    }
}

const comparisonSalestax = (n, o) => {
    let arr = ['rate', 'shippingIncludedInTax', 'taxId']
    for (let i = 0; i < arr.length; i++) {
        let k = arr[i]
        if (n[k] !== o[k]) return false
    }
    return true
}
// 获取格式化后的 排除运输地区
export const getintlShippingPolicyInfoServiceArr = (arr) => {
    const obj = {};
    arr = arr || [];
    for (let i = 0; i < arr.length; i++) {
        let key = arr[i].regionCode;
        if (!obj[key]) {
            obj[key] = {
                regionCode: key,
                locationArr: []
            }
        }
        obj[key].locationArr.push(...arr[i].locationArr)
    }
    return obj
}

// 复制数据格式 用于判断当前模板是否有修改
export const getFormatData = (data) => {
    data = deepCopyobject(data)
    let obj = {}
    for (let k in data) {
        if (k === 'country' || k === 'site') {
            obj[k] = data[k] && data[k].id;
        } else if (k === 'dispatchTimeMax') {
            obj[k] = data[k] && data[k].code;
        } else if (k === 'domesticShippingPolicyInfoServiceArrVO') {
            obj.domesticShippingPolicyInfoServiceArr = data[k]
        } else if (k === 'intlShippingPolicyInfoServiceArrVO') {
            obj.intlShippingPolicyInfoServiceArr = data[k]
        } else if (k === 'excludeShipToLocationArrVO') {
            // 格式化后的对象  方便比对
            obj.excludeShipToLocationArr = getExcludeShipToLocationArr(data[k]);
        } else if (k === 'shipToLocationsArrVO') {
            if(data.shipToLocationsType === 1){
                obj.shipToLocationsArr = ''
            }else {
                obj.shipToLocationsArr = data[k]
            }
            
        } else {
            obj[k] = data[k]
        }
    }
    return obj
}
// 比对字段
const comparisonField = [
    'city',
    'country',
    'dispatchTimeMax',
    'domesticShippingPolicyInfoServiceArr',
    'domesticShippingType',
    'excludeShipToLocationArr',
    'internationalPackagingHandlingCosts',
    'intlShippingPolicyInfoServiceArr',
    'intlShippingType',
    'packagingHandlingCosts',
    'plsProfileId',
    'profileName',
    'saleAccount',
    'salestax',
    'shipToLocationsArr',
    'shipToLocationsType',
    'site',
    'zip',
]
export const comparison = (n, o) => {
    let flag = true;
    let k;
    for (let i = 0; i < comparisonField.length; i++) {
        if (!flag) {
            console.log(k);
            return false;
        }
        k = comparisonField[i]
        if (k === "domesticShippingPolicyInfoServiceArr") {
            flag = comparisonDomesticShippingPolicyInfoServiceArr(n[k], o[k])
        } else if (k === "excludeShipToLocationArr") {
            let newObj = getExcludeShipToLocationArr(n[k]);
            flag = comparisonExcludeShipToLocationArr(newObj, o[k])
        } else if (k === 'intlShippingPolicyInfoServiceArr') {
            flag = comparisonIntlShippingPolicyInfoServiceArr(n[k], o[k])
        } else if (k === 'salestax') {
            flag = comparisonSalestax(n[k], o[k])
        } else if (k === 'shipToLocationsType') {
            let nonlocal = comparisonShipToLocationsType(n['intlShippingPolicyInfoServiceArr'], o['intlShippingPolicyInfoServiceArr'])
            if (!nonlocal) {
                flag = n[k] !== o[k];
            }
        } else {
            if (!n[k] && !o[k]) {
            } else if (n[k] !== o[k]) {
                flag = false;
            }
        }
    }
    return flag
}