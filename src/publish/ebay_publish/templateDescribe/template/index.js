
import getLeft from './left'
import { getImageList, getTable, getTitle } from './details'
import getFooter from './footer'
import getBanner from './banner'
import getStore from './store'
import getStyle from './style'
function getFramework(content, banner, store,style) {
    return `<div>${style}${banner}${content}${store}</div>`
}

function getLayoutMode(type, content, left) {
    // 左右布局
    if (type === 1) {
        return `<div id="wrapper">
                    <div id="sidebar">
                    ${left}
                    </div>
                    <div class="pl40 main" id="main">
                        ${content}
                    </div>
                </div>`
    } else {
        return `<div class="main">${content}</div>`
    }
}

export default (state) => {
    const {
        banner, footer, module, layout
    } = state;
    const {
        category, hotItem, newListItem, specifics
    } = module;
    const {
        relevancyType,  // 关联类型
        describeType, // 描述类型类型
        footerType, // 底部类型
        color, // 底部类型
        fscolor, // 底部类型
    } = layout
    let left = '', content = '', tableStr = '';
    if (relevancyType === 1) {
        left = getLeft(module)
    }
    const infoStr = getImageList(describeType);
    if (module.specifics.has) {
        tableStr = getTable(module.specifics.name)
    }
    const footerStr = getFooter(footerType, footer);
    const bannerStr = getBanner(banner)
    const titleStr = getTitle('name')
    const storeStr = getStore(encodeURIComponent(JSON.stringify(state)))
    content = titleStr + infoStr + tableStr + footerStr
    const style = getStyle(color,fscolor)
    return getFramework(getLayoutMode(relevancyType, content, left), bannerStr, storeStr,style)
}