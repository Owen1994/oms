import { timestampFromat, randNum } from '../../../../util/baseTool'
export const parseLogData = (data) => {
    data.lst = data.data.map(item => {
        item.key = item.listingId;
        item.time = timestampFromat(item.time, 2)
        item.result = parseResult(item.result)
        item.type = parseType(item.type)
        item.remark = item.remark.map(it=>{
            it.key = item.listingId;
            return it;
        })
        return item
    })
    return data
}

const parseResult = (result) => {
    if(result === "0"){
        return "--"
    }else if(result === "1"){
        return "成功"
    }else if(result === "2"){
        return "失败"
    }else{
        return "--"
    }
}
const parseType = (type) => {
    if(type === "0"){
        return "创建"
    }else if(type === "1"){
        return "修改"
    }else if(type === "2"){
        return "刊登"
    }else if(type === "3"){
        return "下架"
    }else if(type === "4"){
        return "删除"
    }else{
        return "--"
    }
}