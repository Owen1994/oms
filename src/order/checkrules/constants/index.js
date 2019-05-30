export const RECEIVE_CHECKRULES_LIST = 'receive_checkrules_list'
export const LOADING_CHECKRULES_LIST = 'loading_checkrules_list'

export const IS_ENABLAD = [
    {'code': 0, 'name': '全部'}, 
    {'code': 1, 'name': '启用'}, 
    {'code': 2, 'name': '禁用'}
];  //授权状态，0或空-全部，1-启用，2-停用
export const REFRESH_RSLT = [
    {'code': 0, 'name': '全部'}, 
    {'code': 2, 'name': '授权成功'}, 
    {'code': 3, 'name': '授权失败'}
];  //Token状态，0或空-全部，2-授权成功,3-授权失败