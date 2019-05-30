function singleFooter(data){
    const {
        name,
        htmlStr
    } = data
    return `
    <div class="policy mt20 thin-border template-describe-footer">
        <p class="title-bgcolor title policy-title-unfold thin-border-bottom fscolor">${name}</p>
        <div class="policy-content">${htmlStr}</div>
    </div>
    `
}

function moreFooter(list){
    let str = ''
    let content = ''
    if(!list || !list.length) return str;
    str += '<div class="tabs">'
    list.forEach((v,i)=>{
        if(i === 0){
            str += `<input type="radio" name="tabs" id="tab${i + 1}" checked="checked"><label class='fscolor' for="tab${i + 1}"><span>${v.name}</span></label>`
            
        }else {
            str += `<input type="radio" name="tabs" id="tab${i + 1}"><label class='fscolor' for="tab${i + 1}"><span>${v.name}</span></label>`
        }
        content += `<div id="tab-content${i + 1}" class="tab-content">${v.htmlStr}</div>`
    })
    content += '</div>'
    return str + content;
}

export default  (type,footer)=>{
    let str = "";
    if(type === 1){
        footer.forEach(v=>{
            str += singleFooter(v);
        })
    }else {
        str = moreFooter(footer);
    }
    return str
}