export const getTitle = ()=>{
    return '<h1>${title}</h1>';
}

export const getImageList = (type)=>{
    const field = '${imageInfo2}'
    const field1 = '${description}'
    if(type === 1){
        return '<div class="info" id="info">${imageInfo1}</div>'
    }else {
        return `
        <div class="gallery-container">
            <div class="gallery">
                <div class="white-box"></div>
                <ul class="thumbnails">
                    ${field}
                </ul>
            </div>
            <div id="descriptionContent" class="description-content mt20">${field1}</div>
        </div>`
    }
}

export const getTable = (name)=>{
    const field = '${specifics}';
    return `<div id="table" class="table mt20">
    <p class="title-bgcolor table-title fscolor">${name}</p>
    <table>
        <colgroup>
            <col style=" width: 100px; min-width: 100px">
            <col style=" width: 100px; min-width: 100px">
        </colgroup>
        <tbody>
        ${field}
        </tbody>
    </table>
    </div>`
}

// <li class="image1">
//     <div class="item-container"><img src="https://image.photo137.com/CDM1/ZC38406-D-6-1.jpg"
//             class="thumb-image"></div>
//     <div class="gallery-content" id="image1">
//         <div class="item-wrapper"><img src="https://image.photo137.com/CDM1/ZC38406-D-6-1.jpg"></div>
//     </div>
// </li>
// <div class="defaultimg"><img src="https://image.photo137.com/CDM1/ZC38406-D-6-1.jpg"></div>