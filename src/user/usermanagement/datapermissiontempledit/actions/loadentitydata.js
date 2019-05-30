import { fetchPost } from '../../../../util/fetch';
import {
    parseCommonEntityDatas,
} from '../selectors/commonruledata';
import {
    parsePlatformListToTree,
} from '../selectors';
import {
    SET_TEMP_DATA
} from '../constants';
import {
    GET_PLATFORM_SHOP_BY_ENTITYCODE,
} from '../constants/Api';

const setTempData = (data, dispatch) => {
    dispatch({
        type: SET_TEMP_DATA,
        data,
    });
};

export const getPlatformShopByEntityCode = (value) => (dispatch) => {
    fetchPost(GET_PLATFORM_SHOP_BY_ENTITYCODE, { entityCode: value }) // getPlatformShopSite getPlatformList
    .then((response) => {
        if (response.state == '000001') {
            let result;
            if (value === 'E_CsOrg') {
                result = parseCommonEntityDatas(response.data);
            } else {
                result = parsePlatformListToTree(response.data);
            }
            setTempData({
                platformList: result.array,
                platformMap: result.map,
                datas: response.data
            }, dispatch);
        } else {
            setTempData({
                platformList: [],
            }, dispatch);
        }
    });
}
