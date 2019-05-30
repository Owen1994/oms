export const RECEIVE_AUTHORIZATION_LIST = 'receive_authorization_list'
export const LOADING_AUTHORIZATION_LIST = 'loading_authorization_list'

export const IS_ENABLAD = [
    {'code': '', 'name': '全部'}, 
    {'code': 1, 'name': '启用'}, 
    {'code': 0, 'name': '禁用'}
];  //授权状态，空-全部，1-启用，0-停用
export const REFRESH_RSLT = [
    {'code': '', 'name': '全部'}, 
    {'code': 1, 'name': '授权成功'}, 
    {'code': 0, 'name': '授权失败'}
];  //Token状态，空-全部，1-授权成功,0-授权失败 