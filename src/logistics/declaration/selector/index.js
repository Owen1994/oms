/**
 * 作者: pzt
 * 描述: 为返回的数组添加key值
 * 时间: 2018/7/5 14:34
 * @params <object> arg1
 **/
export const addKey = (obj) => {
    if(obj.data && obj.data.length > 0){
        obj.data = obj.data.map(v=>{
            v.key = v.id;
            return v
        })
    }
    return obj;
}