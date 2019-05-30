import axios from '../../../util/axios';
import * as config from '../../../util/connectConfig';

export const baseInfo = 'baseInfo';
export const orgsntableInfo = 'orgsntableInfo';
export const PaginationmodelInfo = 'PaginationmodelInfo';
export const treelistInfo = 'treelistInfo';

export const baseInfoForm = value => ({
    type: baseInfo,
    payload: value,
});

export const organtableaction = value => ({ type: orgsntableInfo, payload: value });
export const Paginationmodelaction = value => ({ type: PaginationmodelInfo, payload: value });
export const treelistaction = value => ({ type: treelistInfo, payload: value });

export const fetchPosts = ({ key, value }) => (dispatch, getState) => {
    let url = '';
    if (value.type == 1) {
        url = `${config.api_url}/urc/motan/service/api/IUrcService/getUserByDingOrgId`;
    } else if (value.type == 2) {
        url = `${config.api_url}/urc/motan/service/api/IUrcService/getUserByUserInfo`;
    }
    console.log(value);
    return axios.post(url, value)
        .then((response) => {
            if (response.status == 200) {
                const total = response.data.data.total;
                dispatch(Paginationmodelaction({
                    current: value.pageNumber || 1,
                    total,
                    pageSize: value.pageData || 20,
                }));
                dispatch(organtableaction({ [key]: response.data.data.lst, loading: false }));
            }
        }).catch((e) => {
            console.log(e);
        });
};

const actions = {
    baseInfoForm, organtableaction, Paginationmodelaction, treelistaction, fetchPosts,
};

export default actions;
