export const addKeyToArray = (data) => {
    if(!data.list || data.list.length < 1) {
        return data;
    }
    data.list = data.list.map((item, index) => {
        item.key = item.id || index;
        return item;
    });
    return data;
}

export const parseProjectState = (type) => {
    switch(type) {
        case 1001:
            return '添加供应商成功'
        case 1002:
            return '待对样'
        case 1003:
            return '绑定成功'        
        case 101:
            return '待提交'
        case 2001:
            return '已解锁'
        case 2002:
            return '未锁定'
        case 2003:
            return '开发经理通过'        
        case 201:
            return '待销售主管审核'
        case 202:
            return '销售主管驳回'
        case 3001:
            return '已锁定'
        case 301:
            return '待销售经理审核'
        case 302:
            return '销售经理驳回'
        case 303:
            return '代销商经理确认'    
        case 4001:
            return '待物流专员确认'
        case 4002:
            return '物流专员驳回'
        case 401:
            return '待销售总监审核'
        case 402:
            return '销售总监驳回'
        case 403:
            return '待销售总监复核'
        case 404:
            return '销售总监复核驳回'
        case 405:
            return '产权不通过'    
        case 5001:
            return '待产权专员确认'
        case 5002:
            return '产权专员驳回'
        case 501:
            return '待开发确认'
        case 502:
            return '开发驳回'
        case 6001:
            return '待产权确认'    
        case 6002:
            return '知产驳回'
        case 601:
            return '待开发经理审核'
        case 602:
            return '开发经理驳回'
        case 7001:
            return '已完成'   
        case 701:
            return '待开发总监审核'
        case 702:
            return '开发总监驳回'
        case 801:
            return '待分派' 
        case 802:
            return '待绑定' 
        case -1:
            return '未知状态'                                                              
        default:
            return type;                           
    }
}

export const parseSample = (type) => {
    if(!type) {
        return ;
    }
    type = Number.parseInt(type, 10);
    switch(type) {
        case 1:
            return '买样'
        case 2:
            return '借样'
        case 3:
            return '送样'
        default:
            return type;      
    }
}

export const parseCurrency = (type) => {
    if(!type) {
        return ;
    }
    type = Number.parseInt(type, 10);
    switch(type) {
        case 1:
            return 'RMB'
        case 2:
            return 'USD'
        case 3:
            return 'HK'
        case 4:
            return 'CAD'
        case 5:
            return 'EUR'
        default:
            return type;      
    }
}

export const currencys = {
    1:"RMB",
    2:"USD",
    3:"HK",
    4:"CAD",
    5:"EUR"
}

export const parseSkuConfirmState = (type) => {
    switch(type){
        case 1:
            return '待开发确认'
        case 2:
            return '待销售经理确认'  
        case 3:
            return '待知产确认'
        case 4:
            return '已确认'       
    }
}

export const parsePdType = (type) => {
    switch(type) {
        case 1:
            return '热销引入'
        case 2:
            return '自主引入'
        default:
            return type;    
    }
}