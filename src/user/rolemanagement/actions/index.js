import axios from '../../../util/axios';
import * as config from '../../../util/connectConfig';


export const baseInfo = 'baseInfo';
export const roletableInfo = 'roletableInfo';
export const PaginationmodelInfo = 'PaginationmodelInfo';
export const deletemodalInfo = 'deletemodalInfo';
export const copymodalInfo = 'copymodalInfo';

export const baseInfoForm = value => ({
    type: baseInfo,
    payload: value,
});
export const roletableaction = value => ({
    type: roletableInfo,
    payload: value,
});
export const deletemodalaction = value => ({
    type: deletemodalInfo,
    payload: value,
});
export const copymodalaction = value => ({
    type: copymodalInfo,
    payload: value,
});

export const fetchPosts = ({ key, value }) => (dispatch, getState) => {
    const url = `${config.api_url}/urc/motan/service/api/IUrcService/getRolesByInfo`;
    return axios.post(url, value)
        .then((response) => {
            if (response.status == 200) {
                const total = response.data.data.total;
                dispatch(Paginationmodelaction({
                    current: value.pageNumber || 1,
                    total,
                    pageSize: value.pageData || 20,
                }));
                dispatch(roletableaction({ data: response.data.data.lst }));
            }
        }).catch((e) => {
            console.log(e);
        });
};

export const Paginationmodelaction = value => ({ type: PaginationmodelInfo, payload: value });
const actions = {
    baseInfoForm, roletableaction, Paginationmodelaction, deletemodalaction, copymodalaction, fetchPosts,
};
export default actions;
