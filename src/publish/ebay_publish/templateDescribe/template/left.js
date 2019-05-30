export const getCategory = (name)=>{
    const temp = '${category}'
    return `<div class="category thin-border">
				<p class="title-bgcolor title thin-border-bottom fscolor">${name}</p>
                <ul id="category">${temp}</ul>
            </div>`
}

export const getRecommend = (name,id)=>{
    const temp = '${' + id +'}';
    return `
    <div class="mt20 recommend thin-border">
        <p class="title-bgcolor title thin-border-bottom fscolor">${name}</p>
        <ul id="${id}">${temp}</ul>
    </div>`
}


export default (module)=>{
    const {
        category,hotItem,newListItem
    } = module
    let str = '';
    if(category.has){
        str += getCategory(category.name)
    }
    if(hotItem.has){
        str += getRecommend(hotItem.name,'hotItem')
    }
    if(newListItem.has){
        str += getRecommend(newListItem.name,'newListItem')
    }
    return str
}