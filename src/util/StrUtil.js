/**
 * 字符串通过逗号或者换行符拆分成数组
 */
export const parseStrToArray = (str) => {
    if (str && str.length > 0) {
        const array = str.split(/\s|,|，/g);
        return array.filter(item => item);
    }
    return [];
}

export const parseStrToChineseArray = (str) => {
    if (str && str.length > 0) {
        const array = str.split(/,&|,|，/g);
        return array.filter(item => item);
    }
    return [];
}

/**
 * 转义正则表达式中的特殊字符串
 *
 * $ ( ) * + . [ ] ? ^ { } |
 */
export const escapeRegularExpressionString = (str) => {
    let sEscape = str.replace('\\', '');
    sEscape = sEscape.replace('(', '\\(');
    sEscape = sEscape.replace(')', '\\)');
    sEscape = sEscape.replace('*', '\\*');
    sEscape = sEscape.replace('+', '\\+');
    sEscape = sEscape.replace('.', '\\.');
    sEscape = sEscape.replace('[', '\\[');
    sEscape = sEscape.replace(']', '\\]');
    sEscape = sEscape.replace('?', '\\?');
    sEscape = sEscape.replace('^', '\\^');
    sEscape = sEscape.replace('{', '\\{');
    sEscape = sEscape.replace('}', '\\}');
    sEscape = sEscape.replace('|', '\\|');
    sEscape = sEscape.replace('$', '\\$');
    return sEscape;
};

