import { skuInfo as initSkuInfo } from "../constants/listingDetail"
import { strTrim } from '../../../../util/baseTool'
import { message } from 'antd'
export const parseParams = (state, formObj, type, pageInfo) => {
    const basicData = state.basicData;
    const skuInfo = state.skuinfoData;
    const buyerPolicy = formObj.buyerPolicy;
    const productinfoData = state.productinfoData;
    const templatiesData = state.templatiesData;
    const anotherData = state.anotherData;
    const vrelationship = state.vrelationship;
    const vlist = state.vlist;
    const images = [];
    const cancatObj = {}
    const pageType = pageInfo.pageType;
    let editType = type - 1;
    const saleType = formObj.basicData.saleType;
    //过滤相同属性名
    let newObj = {};
    let upcOrEan = null;
    if (vlist[0].upc || vlist[0].UPC) {
        upcOrEan = 'UPC';
    } else if (vlist[0].ean || vlist[0].EAN) {
        upcOrEan = 'EAN';
    }
    if(upcOrEan){
        newObj = {[upcOrEan]: true};
    }
    for(var i in vrelationship.data){
        let pName = vrelationship.data[i].propsName;
        if(pName){
            if(newObj[pName.toUpperCase()]){
                message.info('属性名不能相同！');
                return 'samepropsname';
            }
            newObj[pName.toUpperCase()] = true;
        }
    }
    cancatObj.upcOrEan = skuInfo.upcOrEan;
    if (saleType === 0) {
        cancatObj.bestOffer = {};
        cancatObj.variationInfo = {};
    }
    if (saleType === 1) {
        cancatObj.bestOffer = formObj.skuInfo.bestOffer;
        cancatObj.variationInfo = {};
    }
    if (saleType === 2) {
        let mainPic = getImgList(vlist, vrelationship.specificName);
        let specificSetJson = getSpecSetJson(vrelationship.data, vlist);
        let newVlist = getVarSpecsJson(vrelationship.data, vlist);
        // 因后端框架原因，多属性页面仍需将其它模块的Object类型字段传输到后台
        cancatObj.bestOffer = initSkuInfo.bestOffer;
        cancatObj.variationInfo = initSkuInfo.variationInfo;
        cancatObj.variationInfo.specificName = vrelationship.specificName;
        cancatObj.variationInfo.mainPic = JSON.stringify(mainPic);
        cancatObj.variationInfo.specificSetJson = JSON.stringify(specificSetJson);
        cancatObj.variationInfo.spu = formObj.skuInfo.spu;
        cancatObj.variationInfo.variationDetail = newVlist;
    }
    const productInfo = {
        descriptionContent: productinfoData.descriptionContent,
        descriptionTemplate: templatiesData.descriptionTemplateObj.tempId
    }
    const newProductAttr = formObj.newProductAttr ? formObj.newProductAttr : [];
    const newProductAttr1 = formObj.newProductAttr1 ? formObj.newProductAttr1 : [];
    cancatObj.productAttr = filterProductAttr([...newProductAttr, ...newProductAttr1]);
    cancatObj.sellingTimeObj = { id: formObj.skuInfo.sellingTime }
    cancatObj.itemConditionObj = skuInfo.itemConditionObj;
    cancatObj.publishTemplId = templatiesData.publishTemplObj.id;
    cancatObj.paymentTemplateId = templatiesData.paymentTemplate.tempId;
    cancatObj.returnTemplateId = templatiesData.returnTemplate.tempId;
    cancatObj.transportTemplateId = templatiesData.transportTemplate.tempId;
    cancatObj.productInfo = productInfo;
    cancatObj.packageType = anotherData.newPackageType;
    cancatObj.editType = editType;
    if (pageType === "edit") {
        cancatObj.listingId = pageInfo.listingId;
        cancatObj.itemId = pageInfo.itemId;
        if (pageInfo.itemId === "null") {
            cancatObj.itemId = null
        }
    } else {
        cancatObj.listingId = null;
        cancatObj.itemId = null;
    }
    // 刊登时间转换成时间戳
    if (basicData.publishTimeStr) {
        cancatObj.publishTime = basicData.publishTimeStr.locale('zh-cn').valueOf()
    }
    // 获取SKU图片参数
    skuInfo.img.forEach(v => {
        if (v.oldUrl) {
            images.push(v.oldUrl)
        } else {
            images.push(v.url)
        }

    })
    cancatObj.img = images;
    cancatObj.privacy = buyerPolicy.privacy ? 2 : 1;
    return cancatObj
}

export const isSkuExistSend = (state, values) => {
    const result = {
        state: -1,
        msg: ""
    }
    const { saleAccount } = values;
    const { site } = state.basicData;
    const { sellerSku } = state.skuinfoData;
    if (!saleAccount) {
        result.msg = "请选择销售账号！";
        return result
    }
    if (!site) {
        result.msg = "请选择站点！";
        return result
    }
    if (!sellerSku) {
        result.msg = "请输入sellerSku！";
        return result
    }
    result.state = 1;
    return result

}
export const isDraftSave = state => {
    const { site, saleAccount } = state.basicData
    const result = {
        state: 1,
        msg: "",
        type: "sendFormAction",
        resultType: 1
    }
    if (!saleAccount) {
        result.state = -1;
        result.msg = "请选择销售账号！"
        return result
    }
    if (!site) {
        result.state = -1;
        result.msg = "请选择站点！"
        return result
    }
    return result
}

export const isPublishSave = (state, formObj) => {
    // console.log("reducer1", state);
    // console.log("formObj1",formObj);
    const result = {
        state: -1,
        msg: "",
        type: "sendFormAction",
        resultType: 2
    }
    const skuInfo = state.skuinfoData;
    const ebayCategoryId1 = formObj.ebayCategoryId1;
    const ebayCategoryId2 = formObj.ebayCategoryId2;
    const shopclass1 = formObj.basicData.shopclass1;
    const shopclass2 = formObj.basicData.shopclass2;
    const title = formObj.basicData.title;
    const subtitle = formObj.basicData.subtitle;
    const newProductAttr = formObj.newProductAttr ? formObj.newProductAttr : [];
    const newProductAttr1 = formObj.newProductAttr1 ? formObj.newProductAttr1 : [];
    const productAttr = filterProductAttr([...newProductAttr, ...newProductAttr1]);
    const startPrice = formObj.skuInfo.startingPrice;
    const price = formObj.skuInfo.price;
    const reservePrice = formObj.skuInfo.reservePrice;
    const skuImages = skuInfo.img;
    let sellerSku = formObj.skuInfo.sellerSku;
    const country = formObj.templateInfo.country;
    const salestax = formObj.templateInfo.salestax;
    // ebay 分类验证
    if (!ebayCategoryId1) {
        result.msg = "eBay分类1不能为空！";
        return result
    }
    if (ebayCategoryId1 && ebayCategoryId2 && ebayCategoryId1 === ebayCategoryId2) {
        result.msg = "eBay分类1与eBay分类2不能相同！";
        return result
    }
    // 店铺分类验证
    if (shopclass1.length>0 && shopclass2.length>0) {
        if (JSON.stringify(shopclass1) === JSON.stringify(shopclass2)) {
            result.msg = "店铺分类1与分类2不能相同！";
            return result;
        }
    }
    // 标题长度验证
    if (title && title.length > 80) {
        result.msg = `标题长度已超出${title.length - 80}个字符, 请重新输入！`;
        return result
    }
    if (subtitle && subtitle.length > 55) {
        result.msg = `副标题长度已超出${title.length - 55}个字符, 请重新输入！`;
        return result
    }
    // 产品属性验证
    if (productAttr.length > 25) {
        result.msg = "产品属性总数超出25项，无法继续刊登！"
        return result
    }
    // 起拍价/保底价/一口价验证
    // if(startPrice && reservePrice && startPrice >= reservePrice){
    //     result.msg = "起拍价必须小于保底价！";
    //     return result
    // }
    // if(startPrice && price && startPrice >= price){
    //     result.msg = "起拍价必须小于一口价！";
    //     return result
    // }
    // if(reservePrice && price && reservePrice >= price){
    //     result.msg = "保底价必须小于一口价！";
    //     return result
    // }

    // SKU 图片验证
    if (skuImages.length === 0) {
        result.msg = "请添加SKU图片！";
        return result
    }
    if (skuImages.length > 12) {
        result.msg = "SKU图片最多仅能保留12张！";
        return result
    }
    // 根据国家校验 Seller SKU 前缀
    if (country && sellerSku) {
        sellerSku = sellerSku.toUpperCase()
        if (country === "AU") {  // AU对应国家为Australia
            result.msg = skuExists(sellerSku, /^.*?(CU_|AUE_|AUXB_|OZ_|XZCN_){1}.*/, "CU_或AUE_或AUXB_或OZ_或XZCN_");
            if (result.msg !== "") {
                return result
            }
        }else if (country === "US") {  // US对应国家为United States
            result.msg = skuExists(sellerSku, /^.*?(UU_|USA_|CNUS_|USUS_|XZCN_){1}.*/, "UU_或USA_或CNUS_或USUS_或XZCN_");
            if (result.msg !== "") {
                return result
            }
        }else if (country === "GB") {  //  GB 对应国家为United Kingdom
            result.msg = skuExists(sellerSku, /^.*?(CK_|UKRO_|WU_|WZ_|UKWL_|XZCN_|UKFU_){1}.*/, "CK_或UKRO_或WU_或WZ_或UKWL_或XZCN_或UKFU_");
            if (result.msg !== "") {
                return result
            }
        }else if (country === "DE") {  // DE对应国家为Germany
            result.msg = skuExists(sellerSku, /^.*?(GY_|POL_|GDE_|HDE_|CZ_){1}.*/, "GY_或POL_或GDE_或HDE_或CZ_")
            if (result.msg !== "") {
                return result
            }
        }else if (country === "FR") {  // FR对应国家为France
            result.msg = skuExists(sellerSku, /^.*?(FR_|POL_|YDFR_){1}.*/, "FR_或POL_或YDFR_");
            if (result.msg !== "") {
                return result
            }
        }else if (country === "IT") {  // IT对应国家为Italy
            result.msg = skuExists(sellerSku, /^.*?(IT_|POL_){1}.*/, "IT_或POL_");
            if (result.msg !== "") {
                return result
            }
        }else if(country === "ES") { // ES对应国家为Spain
            result.msg = skuExists(sellerSku, /^.*?(POL_|ES_|YDES_){1}.*/, "POL_或ES_或YDES_");
            if (result.msg !== "") {
                return result
            }
        }
    }
    // 销售税 验证
    if (salestax && salestax.taxId && !salestax.rate) {
        result.msg = "请输入销售税的值！";
        return result
    }
    if (salestax && !salestax.taxId && salestax.rate) {
        result.msg = "请选择销售税！";
        return result
    }
    result.state = 1;
    return result
}

// 判断SKU前缀
const skuExists = (sku, reg, msg) => {
    if (!reg.test(sku)) {
        return `Seller SKU前缀应为${msg}`;
    }
    return ""
}

// 获取 mainPic 多属性主图数据
const getImgList = (dataSource, currentProp) => {
    let propNames = [];
    let imagesObj = [];
    let uniqueArr = [];
    let uniqueObj = {};
    dataSource.forEach(item => {
        if (item[currentProp]) {
            propNames.push({
                prop: item[currentProp],
                images: item.images ? item.images : null
            })
        }
    })
    // propNames = Array.from(new Set(propNames));
    propNames.forEach(v => { // 数组对象去重
        if (!uniqueObj[v.prop]) {
            uniqueArr.push(v)
            uniqueObj[v.prop] = true
        }
    })
    uniqueArr.forEach(v => {
        imagesObj.push({
            specificValue: v.prop,
            pic: v.images ? [v.images] : null
        })
    });
    return imagesObj
}

// 获取 specificSetJson 多属性定义数据
const getSpecSetJson = (propsNameArr, vlist) => {
    let obj = {};
    let arr = [];
    propsNameArr.forEach((item, index) => {
        arr[index] = [];
        vlist.forEach(_item => {
            arr[index].push(_item[item.propsName]);
        });
        arr[index] = Array.from(new Set(arr[index]));
        if (item.propsName) {
            obj[item.propsName] = arr[index]
        }
    })
    return obj
}

// 获取多属性明细 variationSpecificsJson 数据
const getVarSpecsJson = (propsNameArr, vlist) => {
    vlist = vlist.map(item => {
        let obj = {}
        propsNameArr.forEach(_item => {
            if (_item.propsName) {
                obj[_item.propsName] = item[_item.propsName]
            }
        });
        item.variationSpecificsJson = JSON.stringify(obj);
        return item
    });

    return vlist
}

const filterProductAttr = (arr = []) => {
    return arr.filter(item => {
        const itemName = item.name;
        const itemVal = item.value[0];
        if(itemName !== undefined && itemName !== null && itemVal !== undefined && itemVal !== null){
            // if (typeof itemName === 'number') {
            //     return true;
            // }
            if (strTrim(itemName) !== '' && strTrim(itemVal) !== '') {
                return true;
            }
            return false;
        }
    }).map(item => {
        item.value = item.value || [];
        item.value = item.value.filter(it => it)
            .map(it => it.replace(/^\s+|\s+$/g, '')
            );
        if (typeof item.isRequired !== 'boolean') {
            item.isRequired = false;
        }
        return item;
    });
}