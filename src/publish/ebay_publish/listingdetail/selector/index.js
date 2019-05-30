
export const categoryFocus = (obj)=>{
    if(!obj){
        return [];
    }
    return parseSubs(obj);
}

const parseSubs=(obj, arr=[])=>{
    if(obj.value && obj.label){
        arr.push([{
            id:obj.value,
            name:obj.label,
        }])
    }
    if(obj.children){
        return parseSubs(obj.children[0], arr);
    }
    return arr;
}